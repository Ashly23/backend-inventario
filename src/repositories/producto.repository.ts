import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {CannDataSource} from '../datasources';
import {Area, Categorias, Encargado, EstadoProducto, Fabricante, Garantia, Producto, ProductoRelations, Solicitud, Partes, Empleado} from '../models';
import {AreaRepository} from './area.repository';
import {CategoriasRepository} from './categorias.repository';
import {EncargadoRepository} from './encargado.repository';
import {EstadoProductoRepository} from './estado-producto.repository';
import {FabricanteRepository} from './fabricante.repository';
import {GarantiaRepository} from './garantia.repository';
import {SolicitudRepository} from './solicitud.repository';
import {PartesRepository} from './partes.repository';
import {EmpleadoRepository} from './empleado.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly Areas: BelongsToAccessor<Area, typeof Producto.prototype.id>;

  public readonly Categorias: BelongsToAccessor<Categorias, typeof Producto.prototype.id>;

  public readonly EstadoProductos: BelongsToAccessor<EstadoProducto, typeof Producto.prototype.id>;

  public readonly garantias: HasManyRepositoryFactory<Garantia, typeof Producto.prototype.id>;

  public readonly Fabricantes: BelongsToAccessor<Fabricante, typeof Producto.prototype.id>;


  public readonly solicitud: HasManyRepositoryFactory<Solicitud, typeof Producto.prototype.id>;

  public readonly partes: HasManyRepositoryFactory<Partes, typeof Producto.prototype.id>;

  public readonly Empleados: BelongsToAccessor<Empleado, typeof Producto.prototype.id>;

  public readonly encargados: HasManyRepositoryFactory<Encargado, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.cann') dataSource: CannDataSource, @repository.getter('AreaRepository') protected areaRepositoryGetter: Getter<AreaRepository>, @repository.getter('CategoriasRepository') protected categoriasRepositoryGetter: Getter<CategoriasRepository>,
    @repository.getter('FabricanteRepository') protected fabricanteRepositoryGetter: Getter<FabricanteRepository>, @repository.getter('EstadoProductoRepository') protected estadoProductoRepositoryGetter: Getter<EstadoProductoRepository>,
    @repository.getter('GarantiaRepository') protected garantiaRepositoryGetter: Getter<GarantiaRepository>, 
    @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('PartesRepository') protected partesRepositoryGetter: Getter<PartesRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('EncargadoRepository') protected encargadoRepositoryGetter: Getter<EncargadoRepository>,

  ) {
    super(Producto, dataSource);
    this.encargados = this.createHasManyRepositoryFactoryFor('encargados', encargadoRepositoryGetter,);
    this.registerInclusionResolver('encargados', this.encargados.inclusionResolver);
    this.Empleados = this.createBelongsToAccessorFor('Empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('Empleados', this.Empleados.inclusionResolver);
    this.partes = this.createHasManyRepositoryFactoryFor('partes', partesRepositoryGetter,);
    this.registerInclusionResolver('partes', this.partes.inclusionResolver);
    this.solicitud = this.createHasManyRepositoryFactoryFor('solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
    this.Fabricantes = this.createBelongsToAccessorFor('Fabricantes', fabricanteRepositoryGetter,);
    this.registerInclusionResolver('Fabricantes', this.Fabricantes.inclusionResolver);
    this.garantias = this.createHasManyRepositoryFactoryFor('garantias', garantiaRepositoryGetter,);
    this.registerInclusionResolver('garantias', this.garantias.inclusionResolver);
    this.EstadoProductos = this.createBelongsToAccessorFor('EstadoProductos', estadoProductoRepositoryGetter,);
    this.registerInclusionResolver('EstadoProductos', this.EstadoProductos.inclusionResolver);
    this.Categorias = this.createBelongsToAccessorFor('Categorias', categoriasRepositoryGetter,);
    this.registerInclusionResolver('Categorias', this.Categorias.inclusionResolver);
    this.Areas = this.createBelongsToAccessorFor('Areas', areaRepositoryGetter,);
    this.registerInclusionResolver('Areas', this.Areas.inclusionResolver);

  }
}
