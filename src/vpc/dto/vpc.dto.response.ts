import { VpcList } from 'aws-sdk/clients/ec2';
import { Response } from 'src/global/api/response';
export interface VpcInformationResults {
  vpcs: VpcList;
  nextToken: string;
}
export interface VpcResponse extends Response<VpcInformationResults> {}
