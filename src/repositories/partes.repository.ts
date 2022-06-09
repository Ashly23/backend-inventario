import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {CannDataSource} from '../datasources';
import {Fabricante, Partes, PartesRelations, ProductoPartesDetalle} from '../models';
import {FabricanteRepository} from './fabricante.repository';
import {ProductoPartesDetalleRepository} from './producto-partes-detalle.repository';

export class PartesRepository extends DefaultCrudRepository<
  Partes,
  typeof Partes.prototype.id,
  PartesRelations
> {

  public readonly Fabricantes: BelongsToAccessor<Fabricante, typeof Partes.prototype.id>;

  public readonly productoPartesDetalles: HasManyRepositoryFactory<ProductoPartesDetalle, typeof Partes.prototype.id>;

  constructor(
    @inject('datasources.cann') dataSource: CannDataSource, @repository.getter('FabricanteRepository') protected fabricanteRepositoryGetter: Getter<FabricanteRepository>, @repository.getter('ProductoPartesDetalleRepository') protected productoPartesDetalleRepositoryGetter: Getter<ProductoPartesDetalleRepository>,
  ) {
    super(Partes, dataSource);
    this.productoPartesDetalles = this.createHasManyRepositoryFactoryFor('productoPartesDetalles', productoPartesDetalleRepositoryGetter,);
    this.registerInclusionResolver('productoPartesDetalles', this.productoPartesDetalles.inclusionResolver);
    this.Fabricantes = this.createBelongsToAccessorFor('Fabricantes', fabricanteRepositoryGetter,);
    this.registerInclusionResolver('Fabricantes', this.Fabricantes.inclusionResolver);
  }
}
