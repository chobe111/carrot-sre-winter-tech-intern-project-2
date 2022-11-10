import { RegionNameType } from '../types/region';
export interface AWSInstanceConfig {
  region: RegionNameType;
  accessKeyId: string;
  secretAccessKey: string;
}

export interface PostRequestDTO {
  config: AWSInstanceConfig;
}

export interface GetRequestDTO {
  ownerId: string;
  region: string;
}
