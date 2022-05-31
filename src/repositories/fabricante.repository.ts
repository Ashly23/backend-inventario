import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {CannDataSource} from '../datasources';
import {Fabricante, FabricanteRelations, Producto} from '../models';
import {ProductoRepository} from './producto.repository';

export class FabricanteRepository extends DefaultCrudRepository<
  Fabricante,
  typeof Fabricante.prototype.id,
  FabricanteRelations
> {

  public readonly Productos: BelongsToAccessor<Producto, typeof Fabricante.prototype.id>;

  constructor(
    @inject('datasources.cann') dataSource: CannDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Fabricante, dataSource);
    this.Productos = this.createBelongsToAccessorFor('Productos', productoRepositoryGetter,);
    this.registerInclusionResolver('Productos', this.Productos.inclusionResolver);

  }
}
