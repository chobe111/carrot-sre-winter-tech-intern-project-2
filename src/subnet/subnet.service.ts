import { Inject, Injectable } from '@nestjs/common';
import { SubnetList } from 'aws-sdk/clients/ec2';
import { promisify } from 'node:util';
import { AwsService } from 'src/aws/aws.service';
import { Repository } from 'typeorm';
import { SubnetEntity } from './entity/subnet.entity';
@Injectable()
export class SubnetService {
  constructor(
    private readonly awsService: AwsService,
    @Inject('SUBNET_REPOSITORY')
    private readonly subnetRepository: Repository<SubnetEntity>,
  ) {}

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

  async createInformation(subnets: SubnetList) {
    for (const i of subnets) {
      // const subnet =
    }
  }
}
