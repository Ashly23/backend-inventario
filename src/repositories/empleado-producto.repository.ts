import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CannDataSource} from '../datasources';
import {EmpleadoProducto, EmpleadoProductoRelations} from '../models';

export class EmpleadoProductoRepository extends DefaultCrudRepository<
  EmpleadoProducto,
  typeof EmpleadoProducto.prototype.id,
  EmpleadoProductoRelations
> {
  constructor(
    @inject('datasources.cann') dataSource: CannDataSource,
  ) {
    super(EmpleadoProducto, dataSource);
  }
}
