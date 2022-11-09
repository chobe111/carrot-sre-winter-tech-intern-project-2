import { DescribeVpcsResult } from '@aws-sdk/client-ec2';

export interface AWSInstanceConfig {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export interface PostRequestDTO {
  config: AWSInstanceConfig;
}

export interface GetRequestDTO {
  ownerId: string;
  regionName: string;
}
