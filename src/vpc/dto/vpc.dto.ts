import {
  Vpc,
  VpcCidrBlockAssociation,
  VpcCidrBlockState,
  VpcIpv6CidrBlockAssociation,
} from 'aws-sdk/clients/ec2';

export type VpcDTO = Vpc;
export type VpcIpv6CidrBlockAssociationDTO = VpcIpv6CidrBlockAssociation;
export type VpcCidrBlockStateDTO = VpcCidrBlockState;
export type VpcCidrBlockAssociationDTO = VpcCidrBlockAssociation;
