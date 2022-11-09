import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
@Entity()
export class Vpc {
  @PrimaryColumn()
  vpcId: string;

  @Column({ nullable: true })
  cidrBlock: string;

  @Column({ nullable: true })
  cidrBlockAssociationSet: string;

  @Column({ nullable: true })
  dhcpOptionsId: string;

  @Column({ nullable: true })
  instanceTenancy: string;

  @Column({ nullable: true })
  ipv6CidrBlockAssociationSet: string;

  @Column({ nullable: true })
  isDefault: boolean;

  @Column({ nullable: true })
  ownerId: string;

  @Column({ nullable: true })
  state: string;

  //FK
  @Column({ nullable: true })
  tagSet: string;
}
