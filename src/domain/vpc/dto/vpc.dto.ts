import { Vpc, VpcCidrBlockAssociation, VpcCidrBlockState, VpcIpv6CidrBlockAssociation } from 'aws-sdk/clients/ec2';
import { RegionNameType } from 'src/global/types/region';

export type VpcDTO = Vpc & { region: RegionNameType };
export type VpcIpv6CidrBlockAssociationDTO = VpcIpv6CidrBlockAssociation;
export type VpcCidrBlockStateDTO = VpcCidrBlockState;
export type VpcCidrBlockAssociationDTO = VpcCidrBlockAssociation;
