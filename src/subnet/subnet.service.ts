import { Injectable } from '@nestjs/common';
import { AWSError } from 'aws-sdk';
import { Response } from 'express';
import { promisify } from 'node:util';
import { AwsService } from 'src/aws/aws.service';
@Injectable()
export class SubnetService {
  constructor(private readonly awsService: AwsService) {}

  async getInformation(regionName: string) {
    const ec2 = await this.awsService.getInstance(regionName);

    const describeSubnetsAsync = promisify<
      AWS.EC2.Types.DescribeSubnetsRequest,
      AWS.EC2.Types.DescribeSubnetsResult
    >(ec2.describeSubnets.bind(ec2));

    const results = await describeSubnetsAsync({});

    const subnets = results.Subnets;
    const nextToken = results.NextToken;
    return {
      subnets,
      nextToken,
    };
  }

  async createInformation() {}
}
