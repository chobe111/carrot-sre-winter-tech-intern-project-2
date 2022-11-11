import { VpcList } from 'aws-sdk/clients/ec2';
import { Response } from 'src/global/dto/response';
export interface PostVpcResultsDTO {
  vpcs: VpcList;
  nextToken: string;
}

export interface GetVpcResultsDTO {
  vpcs: Record<string, any>[];
}

export interface PostVpcResponseDTO extends Response<PostVpcResultsDTO> {}

export interface GetVpcResponseDTO extends Response<GetVpcResultsDTO> {}
