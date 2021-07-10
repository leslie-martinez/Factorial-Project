import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { QueryService } from '@nestjs-query/core';
import { Metric } from './Metric.entity';
import { MetricInput } from './Metric.input';
import { BaseEntityService } from '../BaseEntity/BaseEntity.service';
import { Request } from 'express';

@QueryService(Metric)
export class MetricService extends BaseEntityService<Metric, MetricInput> {
  constructor(
    @Inject(REQUEST) readonly request: Request,
  ) {
    super(request, Metric);
  }
}
