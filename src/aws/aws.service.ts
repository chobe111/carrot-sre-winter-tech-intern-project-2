import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigurationOptions } from 'aws-sdk';
import { APIVersions } from 'aws-sdk/lib/config';
import { ConfigurationServicePlaceholders } from 'aws-sdk/lib/config_service_placeholders';
@Injectable()
export class AWSService {
  private apiVersion;
  constructor() {
    this.apiVersion = '2016-11-15';
  }

  async update(option: ConfigurationOptions & ConfigurationServicePlaceholders & APIVersions) {
    AWS.config.update(option);
  }

  async getInstance(regionName: string, accessKeyId: string, secretAccessKey: string) {
    await this.update({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: regionName,
      apiVersion: this.apiVersion,
    });
    return new AWS.EC2({});
  }
}
