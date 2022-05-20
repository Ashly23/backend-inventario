import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CannDataSource} from '../datasources';
import {Garantia, GarantiaRelations} from '../models';

export class GarantiaRepository extends DefaultCrudRepository<
  Garantia,
  typeof Garantia.prototype.id,
  GarantiaRelations
> {
  constructor(
    @inject('datasources.cann') dataSource: CannDataSource,
  ) {
    super(Garantia, dataSource);
  }
}
