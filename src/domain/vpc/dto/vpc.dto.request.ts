import { DescribeVpcsRequest } from 'aws-sdk/clients/ec2';
import { GetRequestDTO, PostRequestDTO } from 'src/global/dto/request';

export type DescribeCacheVpcsRequest = Pick<DescribeVpcsRequest, 'VpcIds'>;

export interface PostVpcRequestDTO extends PostRequestDTO {
  filter?: DescribeVpcsRequest;
}

export interface GetVpcRequestDTO extends GetRequestDTO {
  filter?: DescribeCacheVpcsRequest;
}
