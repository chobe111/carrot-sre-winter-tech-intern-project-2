import { PrivateDnsNameOptionsOnLaunch, SubnetCidrBlockState, SubnetIpv6CidrBlockAssociation } from '@aws-sdk/client-ec2';
import { Subnet } from 'aws-sdk/clients/ec2';
import { RegionNameType } from 'src/global/types/region';

export type SubnetDTO = Subnet;
export type SubnetIpv6CidrBlockAssociationDTO = SubnetIpv6CidrBlockAssociation;
export type SubnetCidrBlockStateDTO = SubnetCidrBlockState;
export type PrivateDnsNameOptionsOnLaunchDTO = PrivateDnsNameOptionsOnLaunch;
