import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {CannDataSource} from '../datasources';
import {Garantia, GarantiaRelations, Producto} from '../models';
import {ProductoRepository} from './producto.repository';

export class GarantiaRepository extends DefaultCrudRepository<
  Garantia,
  typeof Garantia.prototype.id,
  GarantiaRelations
> {

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Garantia.prototype.id>;

  constructor(
    @inject('datasources.cann') dataSource: CannDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Garantia, dataSource);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
  }
}
