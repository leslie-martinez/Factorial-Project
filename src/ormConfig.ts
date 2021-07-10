import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Metric } from './Entities/Metric/Metric.entity';
import * as dotenv from 'dotenv';

// Load the .env file if it exists
dotenv.config();

let ormConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST ? process.env.DB_HOST : 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    username: process.env.DB_USER ? process.env.DB_USER : 'postgres',
    password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : 'password',
    migrationsRun: false,
    synchronize: false,
    entities: [Metric],
    database: process.env.DB_DATABASE ? process.env.DB_DATABASE : 'postgres',
    extra: {
        // setting this to 0 to disable auto-disconnect
        idleTimeoutMillis: 0,
        connectionLimit: 10,
    },
    logging: true,
    maxQueryExecutionTime: 100,
};

export = ormConfig;
