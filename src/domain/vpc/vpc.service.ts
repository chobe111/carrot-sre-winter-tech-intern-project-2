import { Inject, Injectable } from '@nestjs/common';
import { AWSService } from 'src/aws/aws.service';
import { promisify } from 'node:util';
import { PostVpcResultsDTO } from './dto/vpc.dto.response';
import { FindOptionsWhere, Repository } from 'typeorm';
import { VpcList } from 'aws-sdk/clients/ec2';
import { DescribeVpcsRequest } from 'aws-sdk/clients/ec2';
import { AWSInstanceConfig } from 'src/global/dto/request';
import { DescribeCacheVpcsRequest, GetVpcRequestDTO } from './dto/vpc.dto.request';
import { RegionNameType } from 'src/global/types/region';
import { VpcEntity } from './entity/vpc.entity';
import { instanceToPlain } from 'class-transformer';
import { DescribeVpcsResult } from 'aws-sdk/clients/ec2';

@Injectable()
export class VpcService {
  constructor(
    private readonly awsService: AWSService,
    @Inject('VPC_REPOSITORY')
    private readonly vpcRepository: Repository<VpcEntity>,
  ) {}

  async getAWSResource(config: AWSInstanceConfig, filter: DescribeVpcsRequest): Promise<PostVpcResultsDTO> {
    const ec2 = await this.awsService.getInstance(config);
    const describeVpcsAsync = promisify<DescribeVpcsRequest, DescribeVpcsResult>(ec2.describeVpcs.bind(ec2));
    const results = await describeVpcsAsync(filter);
    const vpcs = results.Vpcs;
    const nextToken = results.NextToken;
    return {
      vpcs,
      nextToken,
    };
  }

  async saveAWSResource(vpcs: VpcList, region: RegionNameType): Promise<void> {
    for (const i of vpcs) {
      const vpc = VpcEntity.create({ ...i, region });
      await this.vpcRepository.save(vpc);
    }
  }

  async getFilterOptions(filter: DescribeCacheVpcsRequest, ownerId: string): Promise<FindOptionsWhere<VpcEntity> | FindOptionsWhere<VpcEntity>[] | undefined> {
    return filter && filter.VpcIds && filter.VpcIds.map((id) => ({ vpcId: id, ownerId: ownerId }));
  }

  async getDatabaseResource({ filter, region, ownerId }: GetVpcRequestDTO) {
    const vpcEntityList: VpcEntity[] = await this.vpcRepository.find({
      relations: ['cidrBlockAssociationSet', 'cidrBlockAssociationSet.cidrBlockState', 'ipv6CidrBlockAssociationSet', 'tags'],
      where: await this.getFilterOptions(filter, ownerId),
    });
    const vpcList = vpcEntityList.map((vpcEntity) => instanceToPlain(vpcEntity));

    return vpcList;
  }
}
