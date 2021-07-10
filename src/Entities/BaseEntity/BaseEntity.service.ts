// eslint-disable-next-line max-classes-per-file
import { Injectable } from '@nestjs/common';
import {
  MoreThan, getManager, ObjectType, In, DeepPartial, getRepository,
} from 'typeorm';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { DeleteManyResponse, Filter } from '@nestjs-query/core';
import { BaseEntity } from './BaseEntity.entity';
import { BaseEntityInput } from './BaseEntity.input';
import type { Request } from 'express';

@Injectable()
export abstract class BaseEntityService<
  T extends BaseEntity,
  U extends BaseEntityInput
  > extends TypeOrmQueryService<T> {
  private updatedAt: number;

  private Entity: ObjectType<T>;

  constructor(
    request: Request,
    entityClass: ObjectType<T>,
  ) {
    const repo = getRepository(entityClass);
    super(repo);
    this.Entity = entityClass;
  }

  getTableName(): string {
    return this.repo.metadata.tableName;
  }

  findAll(relations?: string[], order?: object): Promise<T[]> {
    return this.repo.find({ where: {}, order, relations });
  }

  findOneById(id: number, relations?: string[]): Promise<T> {
    return this.repo.findOneOrFail({ where: { id }, relations });
  }

  /**
   * If you pass lastBuildDate as an int, you will get an error like value must
   * be between -2xxxx and 2xxxx*
   */
  findAllUpdatedSince(date: number): Promise<T[]> {
    return this.repo.find({ where: { updatedAt: MoreThan(`${date}`) }, withDeleted: true });
  }

  async softUpsertOne(input: U) {
    const existingEntity = await this.repo.findOne({ where: { id: input.id }, withDeleted: true });

    const toUpsert = {
      ...existingEntity,
      deletedAt: null, // if [existingEntity] was deleted, we want to restore it.
      // if input was meant to delete the record, it will reset the deleted date
      ...input,
    };

    // Will throw an error back to the front-end if input does not fill non
    // nullable fields.
    return this.upsertOne(toUpsert);
  }

  upsertOne(entityInput: U): Promise<T> {
    // @ts-ignore
    return this.saveOne(new this.Entity(entityInput));
  }

  /**
   * Upsert an array of entity inputs
   * @param entityInputs Entity input to upsert
   */
  upsertMany(entityInputs: U[]): Promise<T[]> {
    // @ts-ignore
    return this.saveMany(entityInputs.map((entityInput) => new this.Entity(entityInput)));
  }

  saveOne(entity: DeepPartial<T>) {
    // @ts-ignore
    entity.updatedAt = this.updatedAt;
    return this.repo.save(entity);
  }

  saveMany(entities: DeepPartial<T>[]) {
    return this.repo.save(entities.map((entity) => {
      // @ts-ignore
      entity.updatedAt = this.updatedAt;
      return entity;
    }));
  }

  async deleteManyByIds(ids: string[]): Promise<DeleteManyResponse> {
    return this.deleteMany({ id: { in: ids } } as Filter<T>);
  }
}
