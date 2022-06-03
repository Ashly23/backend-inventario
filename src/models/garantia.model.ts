import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Producto} from './producto.model';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'Garantia'}}})
export class Garantia extends Entity {
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
    type: 'Date',
    required: true,
    length: 50,
    mssql: {columnName: 'fecha', dataType: 'Date', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  fecha: Date;

  @property({
    type: 'Date',
    length: 50,
    mssql: {columnName: 'porcentaje', dataType: 'nchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  porcentaje?: string;

  @property({
    type: 'string',
    length: 200,
    mssql: {columnName: 'observacion', dataType: 'nchar', dataLength: 200, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  observacion?: string;

  @property({
    type: 'string',
    length: 100,
    mssql: {columnName: 'cuota', dataType: 'nchar', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  cuota?: string;

  @property({
    type: 'boolean',
    required: true,
    mssql: {columnName: 'estado', dataType: 'bit', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  estado: boolean;

  @belongsTo(() => Producto, {name: 'Productos'})
  idProducto: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Garantia>) {
    super(data);
  }
}

export interface GarantiaRelations {
  // describe navigational properties here
}

export type GarantiaWithRelations = Garantia & GarantiaRelations;
