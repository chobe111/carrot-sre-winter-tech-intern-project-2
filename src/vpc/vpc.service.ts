import { Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { AWSService } from 'src/aws/aws.service';
import { promisify } from 'node:util';
import { VpcInformationResults } from './dto/vpc.dto.response';
import { VpcEntity } from './entity/vpc.entity';
import { Repository } from 'typeorm';
import { VpcList } from 'aws-sdk/clients/ec2';
import { RegionType } from 'aws-sdk/clients/directoryservice';
@Injectable()
export class VpcService {
  constructor(
    private readonly awsService: AWSService,
    @Inject('VPC_REPOSITORY')
    private readonly vpcRepository: Repository<VpcEntity>,
  ) {}

  async get(regionName: RegionType, accessKeyId: string, secretAccessKey: string): Promise<VpcInformationResults> {
    const ec2 = await this.awsService.getInstance(regionName, accessKeyId, secretAccessKey);
    const describeVpcsAsync = promisify<AWS.EC2.Types.DescribeVpcsRequest, AWS.EC2.Types.DescribeVpcsResult>(ec2.describeVpcs.bind(ec2));
    const results = await describeVpcsAsync({});
    const vpcs = results.Vpcs;
    const nextToken = results.NextToken;
    return {
      vpcs,
      nextToken,
    };
  }

  async create(vpcs: VpcList) {
    for (const i of vpcs) {
      const vpc = VpcEntity.create(i);
      this.vpcRepository.save(vpc);
    }
  }
}
