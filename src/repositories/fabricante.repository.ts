import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {CannDataSource} from '../datasources';
import {Fabricante, FabricanteRelations, Producto} from '../models';
import {ProductoRepository} from './producto.repository';

export class FabricanteRepository extends DefaultCrudRepository<
  Fabricante,
  typeof Fabricante.prototype.id,
  FabricanteRelations
> {

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Fabricante.prototype.id>;

  constructor(
    @inject('datasources.cann') dataSource: CannDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Fabricante, dataSource);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);

  }
}
