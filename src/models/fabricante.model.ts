import {Entity, hasMany, model, property} from '@loopback/repository';
import {Partes} from './partes.model';
import {Producto} from './producto.model';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'Fabricante'}}})
export class Fabricante extends Entity {
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
    length: 50,
    mssql: {columnName: 'correo', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  correo?: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mssql: {columnName: 'telefono', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  telefono: string;

  @property({
    type: 'string',
    length: 50,
    mssql: {columnName: 'sitioWeb', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  sitioWeb?: string;

  @property({
    type: 'boolean',
    mssql: {columnName: 'estado', dataType: 'bit', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  estado: boolean;

  @hasMany(() => Producto, {keyTo: 'idFabricante'})
  productos: Producto[];

  @hasMany(() => Partes, {keyTo: 'idFabricante'})
  partes: Partes[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Fabricante>) {
    super(data);
  }
}

export interface FabricanteRelations {
  // describe navigational properties here
}

export type FabricanteWithRelations = Fabricante & FabricanteRelations;
