import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryColumn()
  id: string;

  key: string;
  value: string;
}
