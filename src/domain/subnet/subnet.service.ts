import { Inject, Injectable } from '@nestjs/common';
import { DescribeSubnetsRequest, SubnetList } from 'aws-sdk/clients/ec2';
import { promisify } from 'node:util';
import { AWSService } from 'src/aws/aws.service';
import { AWSInstanceConfig } from 'src/global/dto/request';
import { Repository } from 'typeorm';
import { SubnetEntity } from './entity/subnet.entity';
@Injectable()
export class SubnetService {
  constructor(
    private readonly awsService: AWSService,
    @Inject('SUBNET_REPOSITORY')
    private readonly subnetRepository: Repository<SubnetEntity>,
  ) {}

  async get(config: AWSInstanceConfig, filter: DescribeSubnetsRequest) {
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

  async create(subnets: SubnetList) {
    for (const i of subnets) {
      const subnet = SubnetEntity.create(i);
      this.subnetRepository.save(subnet);
    }
  }
}
