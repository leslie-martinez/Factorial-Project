import { BaseEntityInput } from '../BaseEntity/BaseEntity.input';

export class MetricInput extends BaseEntityInput {
  name: string;

  value?: number;

  datetime?: Date;
}
