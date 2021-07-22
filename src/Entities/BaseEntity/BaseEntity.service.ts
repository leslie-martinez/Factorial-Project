// eslint-disable-next-line max-classes-per-file
import { Injectable } from '@nestjs/common';
import {
  ObjectType, DeepPartial, getRepository,
} from 'typeorm';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { BaseEntity } from './BaseEntity.entity';

@Injectable()
export abstract class BaseEntityService<
  T extends BaseEntity> extends TypeOrmQueryService<T> {

  constructor(
    entityClass: ObjectType<T>,
  ) {
    const repo = getRepository(entityClass);
    super(repo);
  }

  findAll(relations?: string[], order?: object): Promise<T[]> {
    return this.repo.find({ where: {}, order, relations });
  }

  findOneById(id: number, relations?: string[]): Promise<T> {
    return this.repo.findOne({ where: { id }, relations });
  }

  saveOne(entity: DeepPartial<T>) {
    return this.repo.save(entity);
  }
}

