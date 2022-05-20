import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {CannDataSource} from '../datasources';
import {Partes, PartesRelations, Producto} from '../models';
import {ProductoRepository} from './producto.repository';

export class PartesRepository extends DefaultCrudRepository<
  Partes,
  typeof Partes.prototype.id,
  PartesRelations
> {

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Partes.prototype.id>;

  constructor(
    @inject('datasources.cann') dataSource: CannDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Partes, dataSource);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
  }
}
