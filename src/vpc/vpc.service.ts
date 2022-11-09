import { Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { AwsService } from 'src/aws/aws.service';
import { promisify } from 'node:util';
import { VpcInformationResults } from './dto/vpc.response';
import { Vpc, VPCState } from './entity/vpc.entity';
import { Repository } from 'typeorm';
import { VpcList } from 'aws-sdk/clients/ec2';

@Injectable()
export class VpcService {
  constructor(
    private readonly awsService: AwsService,
    @Inject('VPC_REPOSITORY') private readonly vpcRepository: Repository<Vpc>,
  ) {}

  // 분리
  async crawlInformation(regionName): Promise<VpcInformationResults> {
    const ec2 = await this.awsService.getInstance(regionName);

    const describeVpcsAsync = promisify<
      AWS.EC2.Types.DescribeVpcsRequest,
      AWS.EC2.Types.DescribeVpcsResult
    >(ec2.describeVpcs.bind(ec2));

    const results = await describeVpcsAsync({});
    const vpcs = results.Vpcs;
    const nextToken = results.NextToken;

    await this.createInformation(vpcs);

    return {
      vpcs,
      nextToken,
    };
  }

  async createInformation(vpcs: VpcList) {
    // 캐시 로직 작성
    for (const i of vpcs) {
      const vpc = Vpc.create(i);
      const state = vpc.state;

      this.vpcRepository.save(vpc);
    }
  }
}

// ('/vpc/create');
// ('/vpc/list');
// ('/subnet/create');
// ('/subnet/list/ytrfhuh');

// ('/{c}/{methodName}');

// const services: { [key: string]: IService | undefined } = {
//   vpcs: new VpcService(),
//   subnets: new SubnetService(),
// };

// const serviceName = "vpcs";

// const service = services[serviceName];

// if (methodName === 'create') {
//   service.getInformation();
// }
