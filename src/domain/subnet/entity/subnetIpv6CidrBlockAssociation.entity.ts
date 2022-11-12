import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { SubnetIpv6CidrBlockAssociationDTO } from '../dto/subnet.dto';
import { SubnetEntity } from './subnet.entity';
import { SubnetCidrBlockStateEntity } from './subnetCidrBlockState.entity';
// https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_SubnetIpv6CidrBlockAssociation.html
@Entity()
export class SubnetIpv6CidrBlockAssociationEntity {
  @PrimaryColumn({ type: 'varchar' })
  associationId: string;

  @Column({ type: 'varchar' })
  ipv6CidrBlock: string;

  @OneToOne(() => SubnetCidrBlockStateEntity, { cascade: true })
  @JoinColumn()
  ipv6CidrBlockState: SubnetCidrBlockStateEntity;

  @ManyToOne(() => SubnetEntity, (subnetEntity) => subnetEntity.ipv6CidrBlockAssociationSet)
  @JoinColumn({ name: 'subnetId' })
  subnet: SubnetEntity;

  static create(dto: SubnetIpv6CidrBlockAssociationDTO) {
    const subnetIpv6CidrBlockAssociation = new SubnetIpv6CidrBlockAssociationEntity();
    subnetIpv6CidrBlockAssociation.associationId = dto.AssociationId;
    subnetIpv6CidrBlockAssociation.ipv6CidrBlock = dto.Ipv6CidrBlock;
    subnetIpv6CidrBlockAssociation.ipv6CidrBlockState = SubnetCidrBlockStateEntity.create(dto.Ipv6CidrBlockState);

    return subnetIpv6CidrBlockAssociation;
  }
}
