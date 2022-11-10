import { DescribeVpcsRequest } from 'aws-sdk/clients/ec2';
import { PostRequestDTO } from 'src/global/dto/request';

export type DescribeCacheVpcsRequest = Pick<DescribeVpcsRequest, 'VpcIds'>;

export interface PostVpcRequestDTO extends PostRequestDTO {
  filter?: DescribeVpcsRequest;
}

export interface GetVpcRequestDTO {
  filter?: DescribeCacheVpcsRequest;
}
