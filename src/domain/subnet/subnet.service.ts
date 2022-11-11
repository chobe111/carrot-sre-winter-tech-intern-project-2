import { Inject, Injectable } from '@nestjs/common';
import { DescribeSubnetsRequest, SubnetList } from 'aws-sdk/clients/ec2';
import { instanceToPlain } from 'class-transformer';
import { promisify } from 'node:util';
import { AWSService } from 'src/aws/aws.service';
import { AWSInstanceConfig } from 'src/global/dto/request';
import { RegionNameEnum } from 'src/global/types/region';
import { FindOptionsWhere, Repository } from 'typeorm';
import { GetSubnetRequestDTO } from './dto/subnet.dto.request';
import { SubnetEntity } from './entity/subnet.entity';
@Injectable()
export class SubnetService {
  constructor(
    private readonly awsService: AWSService,
    @Inject('SUBNET_REPOSITORY')
    private readonly subnetRepository: Repository<SubnetEntity>,
  ) {}

  async getAWSResource(config: AWSInstanceConfig, filter: DescribeSubnetsRequest) {
    const ec2 = await this.awsService.getInstance(config);
    const describeSubnetsAsync = promisify<AWS.EC2.Types.DescribeSubnetsRequest, AWS.EC2.Types.DescribeSubnetsResult>(ec2.describeSubnets.bind(ec2));
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

  async getDatabaseResource({ filter, region, ownerId }: GetSubnetRequestDTO) {
    const queryWhere: FindOptionsWhere<SubnetEntity>[] = filter.SubnetIds.map((id) => ({
      vpcId: id,
      region: region as RegionNameEnum,
      ownerId: ownerId,
    }));

    const subnetEntityList: SubnetEntity[] = await this.subnetRepository.findBy(queryWhere);
    const subnetList = subnetEntityList.map((vpcEntity) => instanceToPlain(vpcEntity));

    return subnetList;
  }
}
