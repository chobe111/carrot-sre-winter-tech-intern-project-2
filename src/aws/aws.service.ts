import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { CredentialsOptions } from 'aws-sdk/lib/credentials';
@Injectable()
export class AwsService {
  private apiVersion;
  constructor() {
    this.apiVersion = '2016-11-15';
  }

  async update(option: CredentialsOptions) {
    AWS.config.update(option);
  }

  async getInstance(
    regionName: string,
    accessKeyId: string,
    secretAccessKey: string,
  ) {
    this.update({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    });

    const ec2 = new AWS.EC2({
      apiVersion: this.apiVersion,
      region: regionName,
    });
    return ec2;
  }
}
