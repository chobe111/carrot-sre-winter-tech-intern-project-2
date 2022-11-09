import { TagSpecificationFilterSensitiveLog } from '@aws-sdk/client-ec2';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

export type TagDTO = {
  Key: string;
  Value: string;
};

@Entity()
export class Tag {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar' })
  key: string;

  @Column({ type: 'varchar' })
  value: string;

  static create(dto: TagDTO) {
    const tag = new Tag();
    tag.key = dto.Key;
    tag.value = dto.Value;

    return tag;
  }
}
