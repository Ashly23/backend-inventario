import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {CannDataSource} from '../datasources';
import {Area, AreaRelations, Producto} from '../models';
import {ProductoRepository} from './producto.repository';

export class AreaRepository extends DefaultCrudRepository<
  Area,
  typeof Area.prototype.id,
  AreaRelations
> {

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Area.prototype.id>;

  constructor(
    @inject('datasources.cann') dataSource: CannDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Area, dataSource);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);

  }
}
