import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Empleado} from './empleado.model';
import {Partes} from './partes.model';
import {Producto} from './producto.model';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'Solicitud'}}})
export class Solicitud extends Entity {
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
    mssql: {columnName: 'fechaSolicitud', dataType: 'Date', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  fechaSolicitud: Date;

  @property({
    type: 'number',
    required: true,
    precision: 53,
    mssql: {columnName: 'cotizacion', dataType: 'number', dataLength: null, dataPrecision: 53, dataScale: null, nullable: 'NO'},
  })
  cotizacion: number;

  @property({
    type: 'boolean',
    required: true,
    mssql: {columnName: 'estado', dataType: 'bit', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  estado: boolean;

  @belongsTo(() => Empleado, {name: 'Empleados'})
  idEmpleado: number;

  @belongsTo(() => Partes, {name: 'Partes'})
  idPartes: number;

  @belongsTo(() => Producto, {name: 'Productos'})
  idProducto: number;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  
  [prop: string]: any;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
