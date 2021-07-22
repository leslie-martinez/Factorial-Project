import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricModule } from './Entities/Metric/Metric.module';
import * as ormConfig from './ormConfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    MetricModule
  ],
})
export class AppModule { }
