import { SubnetList } from 'aws-sdk/clients/ec2';
import { Response } from 'src/global/api/response';

export interface SubnetInformationResults {
  subnet: SubnetList;
  nextToken: string;
}

export interface SubnetResponse extends Response<SubnetInformationResults> {}
