import { VpcList } from 'aws-sdk/clients/ec2';
import { Response } from 'src/global/dto/response';
export interface VpcInformationResults {
  vpcs: VpcList;
  nextToken: string;
}
export interface VpcResponse extends Response<VpcInformationResults> {}
