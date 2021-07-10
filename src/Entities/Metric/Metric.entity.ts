import { Column, Entity } from 'typeorm';
import { MetricInput } from './Metric.input';
import { BaseEntity } from '../BaseEntity/BaseEntity.entity';

@Entity('metrics')
export class Metric extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'bigint' })
  value: number;

  @Column({ type: 'bigint' })
  datetime: Date;

  constructor(metric?: MetricInput) {
    super();
    if (metric) {
      this.id = metric.id;
      this.name = metric.name;
      this.value = metric.value;
      this.datetime = metric.datetime;
    }
  }
}
