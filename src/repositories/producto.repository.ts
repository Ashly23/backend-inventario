import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {CannDataSource} from '../datasources';
import {Area, Categorias, EstadoProducto, Fabricante, Garantia, Partes, Producto, ProductoRelations} from '../models';
import {AreaRepository} from './area.repository';
import {CategoriasRepository} from './categorias.repository';
import {EstadoProductoRepository} from './estado-producto.repository';
import {FabricanteRepository} from './fabricante.repository';
import {GarantiaRepository} from './garantia.repository';
import {PartesRepository} from './partes.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly Areas: BelongsToAccessor<Area, typeof Producto.prototype.id>;

  public readonly Categorias: BelongsToAccessor<Categorias, typeof Producto.prototype.id>;

  public readonly EstadoProductos: BelongsToAccessor<EstadoProducto, typeof Producto.prototype.id>;

  public readonly Fabricantes: BelongsToAccessor<Fabricante, typeof Producto.prototype.id>;

  public readonly Garantias: BelongsToAccessor<Garantia, typeof Producto.prototype.id>;

  public readonly Parte: BelongsToAccessor<Partes, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.cann') dataSource: CannDataSource, @repository.getter('AreaRepository') protected areaRepositoryGetter: Getter<AreaRepository>, @repository.getter('CategoriasRepository') protected categoriasRepositoryGetter: Getter<CategoriasRepository>, @repository.getter('FabricanteRepository') protected fabricanteRepositoryGetter: Getter<FabricanteRepository>, @repository.getter('EstadoProductoRepository') protected estadoProductoRepositoryGetter: Getter<EstadoProductoRepository>, @repository.getter('GarantiaRepository') protected garantiaRepositoryGetter: Getter<GarantiaRepository>, @repository.getter('PartesRepository') protected partesRepositoryGetter: Getter<PartesRepository>,
  ) {
    super(Producto, dataSource);
    this.Parte = this.createBelongsToAccessorFor('Parte', partesRepositoryGetter,);
    this.registerInclusionResolver('Parte', this.Parte.inclusionResolver);
    this.Garantias = this.createBelongsToAccessorFor('Garantias', garantiaRepositoryGetter,);
    this.registerInclusionResolver('Garantias', this.Garantias.inclusionResolver);
    this.Fabricantes = this.createBelongsToAccessorFor('Fabricantes', fabricanteRepositoryGetter,);
    this.registerInclusionResolver('Fabricantes', this.Fabricantes.inclusionResolver);
    this.EstadoProductos = this.createBelongsToAccessorFor('EstadoProductos', estadoProductoRepositoryGetter,);
    this.registerInclusionResolver('EstadoProductos', this.EstadoProductos.inclusionResolver);
    this.Categorias = this.createBelongsToAccessorFor('Categorias', categoriasRepositoryGetter,);
    this.registerInclusionResolver('Categorias', this.Categorias.inclusionResolver);
    this.Areas = this.createBelongsToAccessorFor('Areas', areaRepositoryGetter,);
    this.registerInclusionResolver('Areas', this.Areas.inclusionResolver);

  }
}
