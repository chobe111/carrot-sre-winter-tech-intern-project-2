import { userInfo } from 'os';
import { toCamelCaseKeyinDict } from 'src/utils/string';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { VpcIpv6CidrBlockAssociationDTO } from '../dto/vpc.dto';
import { Vpc } from './vpc.entity';
import { VpcCidrBlockState } from './vpcCidrBlockState.entity';

// https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_VpcIpv6CidrBlockAssociation.html
@Entity()
export class VpcIpv6CidrBlockAssociation {
  @PrimaryColumn({ type: 'varchar' })
  associationId: string;

  @Column({ type: 'varchar' })
  ipv6CidrBlock: string;
  //   https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_VpcCidrBlockState.html

  @OneToOne(() => VpcCidrBlockState)
  @JoinColumn({ name: 'cidrBlockStateId' })
  ipv6CidrBlockState: VpcCidrBlockState;

  @Column({ type: 'varchar' })
  ipv6Pool: string;

  @Column({ type: 'varchar' })
  networkBorderGroup: string;

  @ManyToOne(() => Vpc, (vpc) => vpc.cidrBlockAssociationSet)
  @JoinColumn({ name: 'vpcId' })
  vpc: Vpc;

  static create(dto: VpcIpv6CidrBlockAssociationDTO) {
    const vpcIpv6CidrBlockAssociation = new VpcIpv6CidrBlockAssociation();

    vpcIpv6CidrBlockAssociation.associationId = dto.AssociationId;
    vpcIpv6CidrBlockAssociation.ipv6CidrBlock = dto.Ipv6CidrBlock;

    // one to one
    vpcIpv6CidrBlockAssociation.ipv6CidrBlockState = VpcCidrBlockState.create(
      dto.Ipv6CidrBlockState,
    );

    vpcIpv6CidrBlockAssociation.ipv6Pool = dto.Ipv6Pool;
    vpcIpv6CidrBlockAssociation.networkBorderGroup = dto.NetworkBorderGroup;

    return vpcIpv6CidrBlockAssociation;
  }
}
