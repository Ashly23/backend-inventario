import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Producto} from './producto.model';
import {Partes} from './partes.model';

@model({settings: {strict: false}})
export class ProductoPartesDetalle extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  @property({
    type: 'date',
    required: true,
  })
  fechaInicial: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaFinal: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estado: boolean;

  @belongsTo(() => Producto, {name: 'Productos'})
  idProducto: number;

  @belongsTo(() => Partes, {name: 'Partes'})
  idParte: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ProductoPartesDetalle>) {
    super(data);
  }
}

export interface ProductoPartesDetalleRelations {
  // describe navigational properties here
}

export type ProductoPartesDetalleWithRelations = ProductoPartesDetalle & ProductoPartesDetalleRelations;
