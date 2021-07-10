import { Controller, Get, Response } from '@nestjs/common';
import { Timestamp } from 'typeorm';
import { Metric } from './Metric.entity';
import { MetricInput } from './Metric.input';
import { MetricService } from './Metric.service';

@Controller()
export class MetricController {
  constructor(
    private readonly metricService: MetricService,
  ) { }
  @Get('/metrics')
  async getMetrics(
    @Response() response,
  ) {
    response.send(await this.metricService.findAll());
  }
}
