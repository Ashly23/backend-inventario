import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {CannDataSource} from '../datasources';
import {ProductoPartesDetalle, ProductoPartesDetalleRelations, Producto, Partes} from '../models';
import {ProductoRepository} from './producto.repository';
import {PartesRepository} from './partes.repository';

export class ProductoPartesDetalleRepository extends DefaultCrudRepository<
  ProductoPartesDetalle,
  typeof ProductoPartesDetalle.prototype.id,
  ProductoPartesDetalleRelations
> {

  public readonly Productos: BelongsToAccessor<Producto, typeof ProductoPartesDetalle.prototype.id>;

  public readonly Partes: BelongsToAccessor<Partes, typeof ProductoPartesDetalle.prototype.id>;

  constructor(
    @inject('datasources.cann') dataSource: CannDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('PartesRepository') protected partesRepositoryGetter: Getter<PartesRepository>,
  ) {
    super(ProductoPartesDetalle, dataSource);
    this.Partes = this.createBelongsToAccessorFor('Partes', partesRepositoryGetter,);
    this.registerInclusionResolver('Partes', this.Partes.inclusionResolver);
    this.Productos = this.createBelongsToAccessorFor('Productos', productoRepositoryGetter,);
    this.registerInclusionResolver('Productos', this.Productos.inclusionResolver);
  }
}
