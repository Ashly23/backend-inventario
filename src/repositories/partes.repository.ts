import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {CannDataSource} from '../datasources';
import {Fabricante, Partes, PartesRelations, Solicitud, Producto} from '../models';
import {FabricanteRepository} from './fabricante.repository';
import {SolicitudRepository} from './solicitud.repository';
import {ProductoRepository} from './producto.repository';

export class PartesRepository extends DefaultCrudRepository<
  Partes,
  typeof Partes.prototype.id,
  PartesRelations
> {

  public readonly Fabricantes: BelongsToAccessor<Fabricante, typeof Partes.prototype.id>;

  public readonly solicitud: HasManyRepositoryFactory<Solicitud, typeof Partes.prototype.id>;

  public readonly Productos: BelongsToAccessor<Producto, typeof Partes.prototype.id>;

  constructor(
    @inject('datasources.cann') dataSource: CannDataSource, @repository.getter('FabricanteRepository') protected fabricanteRepositoryGetter: Getter<FabricanteRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, 
  ) {
    super(Partes, dataSource);
    this.Productos = this.createBelongsToAccessorFor('Productos', productoRepositoryGetter,);
    this.registerInclusionResolver('Productos', this.Productos.inclusionResolver);
    this.solicitud = this.createHasManyRepositoryFactoryFor('solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
    this.Fabricantes = this.createBelongsToAccessorFor('Fabricantes', fabricanteRepositoryGetter,);
    this.registerInclusionResolver('Fabricantes', this.Fabricantes.inclusionResolver);
  }
}
