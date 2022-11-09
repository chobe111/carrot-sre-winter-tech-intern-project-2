import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { SubnetEntity } from './subnet.entity';
import { SubnetCidrBlockStateEntity } from './subnetCidrBlockState.entity';
// https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_SubnetIpv6CidrBlockAssociation.html
@Entity()
export class SubnetIpv6CidrBlockAssociationEntity {
  @PrimaryColumn()
  associationId: string;

  @Column()
  ipv6CidrBlock: string;

  @OneToOne(() => SubnetCidrBlockStateEntity, { cascade: true })
  @JoinColumn()
  ipv6CidrBlockState: SubnetCidrBlockStateEntity;

  @ManyToOne(
    () => SubnetEntity,
    (subnetEntity) => subnetEntity.ipv6CidrBlockAssociationSet,
  )
  @JoinColumn({ name: 'subnetId' })
  subnet: SubnetEntity;
}
