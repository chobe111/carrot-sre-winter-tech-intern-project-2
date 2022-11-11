import { Inject, Injectable } from '@nestjs/common';
import { DescribeSubnetsRequest, SubnetList } from 'aws-sdk/clients/ec2';
import { instanceToPlain } from 'class-transformer';
import { promisify } from 'node:util';
import { AWSService } from 'src/aws/aws.service';
import { AWSInstanceConfig } from 'src/global/dto/request';
import { FindOptionsWhere, Repository } from 'typeorm';
import { DescribeCacheSubnetsRequest, GetSubnetRequestDTO } from './dto/subnet.dto.request';
import { SubnetEntity } from './entity/subnet.entity';
import { DescribeSubnetsResult } from 'aws-sdk/clients/ec2';
import { PostSubnetResultsDTO } from './dto/subnet.dto.response';

@Injectable()
export class SubnetService {
  constructor(
    private readonly awsService: AWSService,
    @Inject('SUBNET_REPOSITORY')
    private readonly subnetRepository: Repository<SubnetEntity>,
  ) {}

  async getAWSResource(config: AWSInstanceConfig, filter: DescribeSubnetsRequest): Promise<PostSubnetResultsDTO> {
    const ec2 = await this.awsService.getInstance(config);
    const describeSubnetsAsync = promisify<DescribeSubnetsRequest, DescribeSubnetsResult>(ec2.describeSubnets.bind(ec2));
    const results = await describeSubnetsAsync(filter);
    const subnets = results.Subnets;
    const nextToken = results.NextToken;
    return {
      subnets,
      nextToken,
    };
  }

  async saveAWSResource(subnets: SubnetList) {
    for (const i of subnets) {
      const subnet = SubnetEntity.create(i);
      this.subnetRepository.save(subnet);
    }
  }

  async getFilterOptions(
    filter: DescribeCacheSubnetsRequest,
    ownerId: string,
  ): Promise<FindOptionsWhere<SubnetEntity> | FindOptionsWhere<SubnetEntity>[] | undefined> {
    return filter && filter.SubnetIds && filter.SubnetIds.map((id) => ({ subnetId: id, ownerId: ownerId }));
  }

  async getDatabaseResource({ filter, region, ownerId }: GetSubnetRequestDTO): Promise<Record<string, any>[]> {
    const subnetEntityList: SubnetEntity[] = await this.subnetRepository.find({
      relations: ['ipv6CidrBlockAssociationSet', 'ipv6CidrBlockAssociationSet.ipv6CidrBlockState', 'privateDnsNameOptionsOnLaunch', 'tags'],
      where: await this.getFilterOptions(filter, ownerId),
    });

    const subnetList = subnetEntityList.map((subnetEntity) => instanceToPlain(subnetEntity));
    return subnetList;
  }
}
