import { PrimaryGeneratedColumn } from 'typeorm';
export abstract class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;
}
