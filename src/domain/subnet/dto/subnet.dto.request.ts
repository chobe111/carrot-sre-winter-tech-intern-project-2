import { DescribeSubnetsRequest } from 'aws-sdk/clients/ec2';
import { GetRequestDTO, PostRequestDTO } from 'src/global/dto/request';

export type DescribeCacheSubnetsRequest = Pick<DescribeSubnetsRequest, 'SubnetIds'>;

export interface PostSubnetRequestDTO extends PostRequestDTO {
  filter?: DescribeSubnetsRequest;
}

export interface GetSubnetRequestDTO extends GetRequestDTO {
  filter?: DescribeCacheSubnetsRequest;
}
