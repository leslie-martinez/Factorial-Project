import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Metric } from './Metric.entity';
import { BaseEntityService } from '../BaseEntity/BaseEntity.service';
import { Request } from 'express';
@Injectable()
export class MetricService extends BaseEntityService<Metric> {
  constructor(
    @Inject(REQUEST) readonly request: Request,
  ) {
    super(Metric);
  }

  async findAverageByPeriod(period: string): Promise<Metric[]> {
    return this.repo.query(
      `SELECT date_trunc('${period}', metrics.datetime AT TIME ZONE 'UTC') "date", AVG(metrics."value")::numeric(10,2) "value" FROM metrics group by 1 ORDER BY 1`);
  }

  async findByPeriod(period?: string, date?: string): Promise<Metric[]> {
    return this.repo.createQueryBuilder()
      .where(`DATE_TRUNC('${period}', "datetime" AT TIME ZONE 'UTC') = :date`, { date })
      .orderBy('datetime')
      .getMany();
  }
}
