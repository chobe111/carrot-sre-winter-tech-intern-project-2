import { SubnetList } from 'aws-sdk/clients/ec2';
import { Response } from 'src/global/dto/response';

export interface PostSubnetResultsDTO {
  subnets: SubnetList;
  nextToken: string;
}

export interface GetSubnetResultsDTO {
  subnets: Record<string, any>[];
}

export interface PostSubnetResponseDTO extends Response<PostSubnetResultsDTO> {}

export interface GetSubnetResponseDTO extends Response<GetSubnetResultsDTO> {}
