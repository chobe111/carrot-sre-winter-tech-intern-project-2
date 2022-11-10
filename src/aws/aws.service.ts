import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigurationOptions } from 'aws-sdk';
import { APIVersions } from 'aws-sdk/lib/config';
import { ConfigurationServicePlaceholders } from 'aws-sdk/lib/config_service_placeholders';
import { AWSInstanceConfig } from 'src/global/dto/request';
@Injectable()
export class AWSService {
  private apiVersion;
  constructor() {
    this.apiVersion = '2016-11-15';
  }
  async update(option: ConfigurationOptions & ConfigurationServicePlaceholders & APIVersions) {
    AWS.config.update(option);
  }
  async getInstance(awsInstanceConfig: AWSInstanceConfig) {
    await this.update({
      ...awsInstanceConfig,
      apiVersion: this.apiVersion,
    });
    return new AWS.EC2({});
  }
}
