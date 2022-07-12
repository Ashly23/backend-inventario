import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {CannDataSource} from '../datasources';
import {Encargado, EncargadoRelations, Producto, Empleado} from '../models';
import {ProductoRepository} from './producto.repository';
import {EmpleadoRepository} from './empleado.repository';

export class EncargadoRepository extends DefaultCrudRepository<
  Encargado,
  typeof Encargado.prototype.id,
  EncargadoRelations
> {

  public readonly Empleados: BelongsToAccessor<Empleado, typeof Encargado.prototype.id>;

  public readonly Productos: BelongsToAccessor<Producto, typeof Encargado.prototype.id>;

  constructor(
    @inject('datasources.cann') dataSource: CannDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Encargado, dataSource);
    this.Productos = this.createBelongsToAccessorFor('Productos', productoRepositoryGetter,);
    this.registerInclusionResolver('Productos', this.Productos.inclusionResolver);

    this.Empleados = this.createBelongsToAccessorFor('Empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('Empleados', this.Empleados.inclusionResolver);

  }
}
