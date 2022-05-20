import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {CannDataSource} from '../datasources';
import {EstadoProducto, EstadoProductoRelations, Producto} from '../models';
import {ProductoRepository} from './producto.repository';

export class EstadoProductoRepository extends DefaultCrudRepository<
  EstadoProducto,
  typeof EstadoProducto.prototype.id,
  EstadoProductoRelations
> {

  public readonly productos: HasManyRepositoryFactory<Producto, typeof EstadoProducto.prototype.id>;

  constructor(
    @inject('datasources.cann') dataSource: CannDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(EstadoProducto, dataSource);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
  }
}
