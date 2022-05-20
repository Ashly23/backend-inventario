import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {CannDataSource} from '../datasources';
import {Categorias, CategoriasRelations, Producto} from '../models';
import {ProductoRepository} from './producto.repository';

export class CategoriasRepository extends DefaultCrudRepository<
  Categorias,
  typeof Categorias.prototype.id,
  CategoriasRelations
> {

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Categorias.prototype.id>;

  constructor(
    @inject('datasources.cann') dataSource: CannDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Categorias, dataSource);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
  }
}
