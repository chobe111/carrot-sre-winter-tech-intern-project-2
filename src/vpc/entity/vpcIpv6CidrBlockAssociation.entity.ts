import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  JoinTable,
} from 'typeorm';
import { VpcIpv6CidrBlockAssociationDTO } from '../dto/vpc.dto';
import { VpcEntity } from './vpc.entity';
import { VpcCidrBlockStateEntity } from './vpcCidrBlockState.entity';

// https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_VpcIpv6CidrBlockAssociation.html
@Entity()
export class VpcIpv6CidrBlockAssociationEntity {
  @PrimaryColumn()
  associationId: string;

  @Column({ type: 'varchar' })
  ipv6CidrBlock: string;
  //   https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_VpcCidrBlockState.html

  @OneToOne(() => VpcCidrBlockStateEntity, { cascade: true })
  @JoinTable()
  ipv6CidrBlockState: VpcCidrBlockStateEntity;

  @Column({ type: 'varchar' })
  ipv6Pool: string;

  @Column({ type: 'varchar' })
  networkBorderGroup: string;

  @ManyToOne(() => VpcEntity, (vpc) => vpc.cidrBlockAssociationSet)
  @JoinColumn({ name: 'vpcId' })
  vpc: VpcEntity;

  static create(dto: VpcIpv6CidrBlockAssociationDTO) {
    const vpcIpv6CidrBlockAssociation = new VpcIpv6CidrBlockAssociationEntity();
    vpcIpv6CidrBlockAssociation.associationId = dto.AssociationId;
    vpcIpv6CidrBlockAssociation.ipv6CidrBlock = dto.Ipv6CidrBlock;

    // one to one
    vpcIpv6CidrBlockAssociation.ipv6CidrBlockState =
      VpcCidrBlockStateEntity.create(dto.Ipv6CidrBlockState);

    vpcIpv6CidrBlockAssociation.ipv6Pool = dto.Ipv6Pool;
    vpcIpv6CidrBlockAssociation.networkBorderGroup = dto.NetworkBorderGroup;

    return vpcIpv6CidrBlockAssociation;
  }
}
