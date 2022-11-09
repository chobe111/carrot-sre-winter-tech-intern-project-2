import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

// https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_VpcCidrBlockAssociation.html
@Entity()
export class VpcCidrBlockAssociation {
  @PrimaryColumn()
  id: string;

  associationId: string;
  cidrBlock: string;

  // https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_VpcCidrBlockState.html
  cidrBlockState: string;
}
