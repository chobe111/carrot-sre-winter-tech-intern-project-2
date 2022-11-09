import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
@Injectable()
export class AwsService {
  private apiVersion;
  constructor() {
    // js sdk v3
    this.apiVersion = '2016-11-15';
  }
  async getInstance(regionName: string) {
    const ec2 = new AWS.EC2({
      apiVersion: this.apiVersion,
      region: regionName,
    });
    return ec2;
  }
}
