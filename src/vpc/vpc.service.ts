import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { AwsService } from 'src/aws/aws.service';
import { promisify } from 'node:util';
import { SubnetService } from 'src/subnet/subnet.service';

@Injectable()
export class VpcService {
  constructor(private readonly awsService: AwsService) {}

  // 분리
  async getInformation(regionName) {
    const ec2 = await this.awsService.getInstance(regionName);

    const describeVpcsAsync = promisify<
      AWS.EC2.Types.DescribeVpcsRequest,
      AWS.EC2.Types.DescribeVpcsResult
    >(ec2.describeVpcs.bind(ec2));

    const results = await describeVpcsAsync({});
    const vpcs = results.Vpcs;
    const nextToken = results.NextToken;

    return {
      vpcs,
      nextToken,
    };
  }

  async createInformation() {}
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
