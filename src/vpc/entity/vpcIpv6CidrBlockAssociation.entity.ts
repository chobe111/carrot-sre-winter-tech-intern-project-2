import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
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
  ipv6CidrBlockState: string;

  @Column({ type: 'varchar' })
  ipv6Pool: string;

  @Column({ type: 'varchar' })
  networkBorderGroup: string;

  @ManyToOne(() => Vpc, (vpc) => vpc.cidrBlockAssociationSet)
  @JoinColumn({ name: 'vpcId' })
  vpc: Vpc;
}
