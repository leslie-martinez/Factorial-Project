
export abstract class BaseEntityInput {
  id?: number;

  // We shouldn't let the client set the updatedAt
  updatedAt?: number;

  deletedAt?: Date;

  deleted?: number;

  constructor(params?: BaseEntityInput) {
    if (params?.id !== undefined) this.id = params?.id;
  }
}
