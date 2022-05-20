import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {CannDataSource} from '../datasources';
import {Producto, ProductoRelations, Area, Categorias, Empleado, Fabricante, EstadoProducto, Partes} from '../models';
import {AreaRepository} from './area.repository';
import {CategoriasRepository} from './categorias.repository';
import {EmpleadoRepository} from './empleado.repository';
import {FabricanteRepository} from './fabricante.repository';
import {EstadoProductoRepository} from './estado-producto.repository';
import {PartesRepository} from './partes.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly area: BelongsToAccessor<Area, typeof Producto.prototype.id>;

  public readonly categorias: BelongsToAccessor<Categorias, typeof Producto.prototype.id>;

  public readonly empleado: BelongsToAccessor<Empleado, typeof Producto.prototype.id>;

  public readonly fabricante: BelongsToAccessor<Fabricante, typeof Producto.prototype.id>;

  public readonly estadoProducto: BelongsToAccessor<EstadoProducto, typeof Producto.prototype.id>;

  public readonly partes: BelongsToAccessor<Partes, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.cann') dataSource: CannDataSource, @repository.getter('AreaRepository') protected areaRepositoryGetter: Getter<AreaRepository>, @repository.getter('CategoriasRepository') protected categoriasRepositoryGetter: Getter<CategoriasRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('FabricanteRepository') protected fabricanteRepositoryGetter: Getter<FabricanteRepository>, @repository.getter('EstadoProductoRepository') protected estadoProductoRepositoryGetter: Getter<EstadoProductoRepository>, @repository.getter('PartesRepository') protected partesRepositoryGetter: Getter<PartesRepository>,
  ) {
    super(Producto, dataSource);
    this.partes = this.createBelongsToAccessorFor('partes', partesRepositoryGetter,);
    this.registerInclusionResolver('partes', this.partes.inclusionResolver);
    this.estadoProducto = this.createBelongsToAccessorFor('estadoProducto', estadoProductoRepositoryGetter,);
    this.registerInclusionResolver('estadoProducto', this.estadoProducto.inclusionResolver);
    this.fabricante = this.createBelongsToAccessorFor('fabricante', fabricanteRepositoryGetter,);
    this.registerInclusionResolver('fabricante', this.fabricante.inclusionResolver);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
    this.categorias = this.createBelongsToAccessorFor('categorias', categoriasRepositoryGetter,);
    this.registerInclusionResolver('categorias', this.categorias.inclusionResolver);
    this.area = this.createBelongsToAccessorFor('area', areaRepositoryGetter,);
    this.registerInclusionResolver('area', this.area.inclusionResolver);

  }
}
