import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'EmpleadoProducto'}}})
export class EmpleadoProducto extends Entity {
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
    mssql: {columnName: 'fechaInicial', dataType: 'nchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  fechaInicial: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mssql: {columnName: 'fechaFinal', dataType: 'nchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  fechaFinal: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mssql: {columnName: 'idEmpleado', dataType: 'nchar', dataLength: 50, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  idEmpleado: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'idProducto', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  idProducto: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<EmpleadoProducto>) {
    super(data);
  }
}

export interface EmpleadoProductoRelations {
  // describe navigational properties here
}

export type EmpleadoProductoWithRelations = EmpleadoProducto & EmpleadoProductoRelations;
