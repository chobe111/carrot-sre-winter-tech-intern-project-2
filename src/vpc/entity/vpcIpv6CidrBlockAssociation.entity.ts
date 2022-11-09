import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

// https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_VpcIpv6CidrBlockAssociation.html
@Entity()
export class VpcIpv6CidrBlockAssociation {
  @PrimaryColumn()
  id: string;

  associationId: string;
  ipv6CidrBlock: string;

  //   https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_VpcCidrBlockState.html
  ipv6CidrBlockState: string;
  ipv6Pool: string;
  networkBorderGroup: string;
}
