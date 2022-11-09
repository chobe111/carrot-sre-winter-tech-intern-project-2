import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

export type CidrState =
  | 'associating'
  | 'associated'
  | 'disassociating'
  | 'disassociated'
  | 'failing'
  | 'failed';
@Entity()
export class VpcCidrBlockState {
  @PrimaryColumn()
  id: string;

  state: CidrState;
  statusMessage: string;
}
