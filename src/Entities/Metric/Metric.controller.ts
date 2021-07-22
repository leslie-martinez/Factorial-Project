import { Controller, Get, Response, HttpStatus, HttpCode, Post, Body, Query, Param, Logger } from '@nestjs/common';
import { AverageMetricsPeriod } from './AverageMetricsPeriod';
import { Metric } from './Metric.entity';
import { MetricService } from './Metric.service';
import { MetricsDTO } from './MetricsDTO';

@Controller()
export class MetricController {
  constructor(
    private readonly metricService: MetricService,
  ) { }
  private readonly logger = new Logger(MetricController.name);

  @Get('/metrics')
  async getMetrics(
    @Response() response,
    @Query('period') period?: string,
    @Query('date') date?: string,
  ) {
    let errorMessage;
    let metrics;
    // TODO: Use NestJS class-validator instead
    if (period && date) {
      // Validate period format
      if (period in AverageMetricsPeriod) {
        metrics = await this.metricService.findByPeriod(period, date);
      } else {
        errorMessage = `invalid input syntax for period: "${period}" - Value should be 'day' | 'hour' | 'minute'`;
        this.logger.error(errorMessage);
        return response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: errorMessage,
        });
      }
    } else {
      metrics = await this.metricService.findAll(null, { datetime: 'ASC' });
    }
    return response.send(metrics);
  }

  @Get('/metrics/:id')
  @HttpCode(HttpStatus.OK)
  async getMetricByID(@Param('id') id: number, @Response() response) {
    try {
      var metric: Metric = await this.metricService.findOneById(id);
    } catch (e) {
      this.logger.error(e.message);
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: e.message,
      });
    }
    return response.send(metric);
  }

  @Get('/metrics/average/:period')
  async averageByPeriod(@Param('period') period: string, @Response() response) {
    if (period in AverageMetricsPeriod) {
      return response.send(await this.metricService.findAverageByPeriod(period));
    }
    const errorMessage = `invalid input syntax for period: "${period}" - Value should be 'day' | 'hour' | 'minute'`;
    this.logger.error(errorMessage);
    return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: errorMessage,
    });
  }

  @Post('/metrics')
  async createMetrics(
    @Response() response, @Body() { name, rating }: MetricsDTO,
  ) {
    // TODO: Use NestJS class-validator instead
    if (!name || !rating) {
      const errorMessage = `Invalid body syntax: Body should contain 'name' and 'rating' values.`;
      this.logger.error(errorMessage);
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: errorMessage,
      });
    }
    return response.send(await this.metricService.saveOne(new Metric({ name: name, value: rating })));
  }
}
