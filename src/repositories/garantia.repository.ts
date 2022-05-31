import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {CannDataSource} from '../datasources';
import {Garantia, GarantiaRelations, Producto} from '../models';
import {ProductoRepository} from './producto.repository';

export class GarantiaRepository extends DefaultCrudRepository<
  Garantia,
  typeof Garantia.prototype.id,
  GarantiaRelations
> {

  public readonly Productos: BelongsToAccessor<Producto, typeof Garantia.prototype.id>;

  constructor(
    @inject('datasources.cann') dataSource: CannDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Garantia, dataSource);
    this.Productos = this.createBelongsToAccessorFor('Productos', productoRepositoryGetter,);
    this.registerInclusionResolver('Productos', this.Productos.inclusionResolver);
  }
}
