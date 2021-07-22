import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Metric } from './Metric.entity';
import { MetricService } from './Metric.service';
import { MetricController } from './Metric.controller';

@Module({
  imports: [NestjsQueryTypeOrmModule.forFeature([Metric])],
  controllers: [MetricController],
  providers: [MetricService],
})
export class MetricModule { }
