import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SubnetCidrBlockStateDTO } from '../dto/subnet.dto';

@Entity()
export class SubnetCidrBlockStateEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar' })
  state: string;

  @Column({ type: 'varchar' })
  statusMessage: string;

  static create(dto: SubnetCidrBlockStateDTO) {
    const subnetCidrBlockState = new SubnetCidrBlockStateEntity();
    subnetCidrBlockState.state = dto.State;
    subnetCidrBlockState.statusMessage = dto.StatusMessage;
    return subnetCidrBlockState;
  }
}
