import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { VpcCidrBlockStateDTO } from '../dto/vpc.dto';

@Entity()
export class VpcCidrBlockStateEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ nullable: true, type: 'string' })
  state: string;

  @Column({ default: '', nullable: true, type: 'string' })
  statusMessage: string;

  static create(dto: VpcCidrBlockStateDTO) {
    const vpcCidrBlockState = new VpcCidrBlockStateEntity();
    vpcCidrBlockState.state = dto.State;
    vpcCidrBlockState.statusMessage = dto.StatusMessage;
    return vpcCidrBlockState;
  }
}
