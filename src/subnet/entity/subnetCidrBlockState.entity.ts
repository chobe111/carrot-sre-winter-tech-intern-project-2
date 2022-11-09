import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SubnetCidrBlockStateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  state: string;

  @Column()
  statusMessage: string;
}
