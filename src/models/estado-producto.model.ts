import {Entity, model, property, hasMany} from '@loopback/repository';
import {Producto} from './producto.model';

@model({
  settings: {idInjection: false, mssql: {schema: 'dbo', table: 'EstadoProducto'}}
})
export class EstadoProducto extends Entity {
  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    id: 1,
    mssql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'YES'},
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mssql: {columnName: 'nombre', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
    length: 200,
    mssql: {columnName: 'observacion', dataType: 'nvarchar', dataLength: 200, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  observacion: string;

  @property({
    type: 'boolean',
    required: true,
    mssql: {columnName: 'estado', dataType: 'bit', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  estado: boolean;

  @hasMany(() => Producto, {keyTo: 'idEstadoProducto'})
  productos: Producto[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<EstadoProducto>) {
    super(data);
  }
}

export interface EstadoProductoRelations {
  // describe navigational properties here
}

export type EstadoProductoWithRelations = EstadoProducto & EstadoProductoRelations;
