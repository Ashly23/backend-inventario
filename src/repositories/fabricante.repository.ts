import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {CannDataSource} from '../datasources';
import {Fabricante, FabricanteRelations, Producto, Partes} from '../models';
import {ProductoRepository} from './producto.repository';
import {PartesRepository} from './partes.repository';

export class FabricanteRepository extends DefaultCrudRepository<
  Fabricante,
  typeof Fabricante.prototype.id,
  FabricanteRelations
> {

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Fabricante.prototype.id>;

  public readonly partes: HasManyRepositoryFactory<Partes, typeof Fabricante.prototype.id>;

  constructor(
    @inject('datasources.cann') dataSource: CannDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('PartesRepository') protected partesRepositoryGetter: Getter<PartesRepository>,
  ) {
    super(Fabricante, dataSource);
    this.partes = this.createHasManyRepositoryFactoryFor('partes', partesRepositoryGetter,);
    this.registerInclusionResolver('partes', this.partes.inclusionResolver);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);

  }
}
