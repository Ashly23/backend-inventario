import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Fabricante} from './fabricante.model';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'Partes'}}})
export class Partes extends Entity {
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
    mssql: {columnName: 'nombre', dataType: 'nchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  nombre: string;

  @property({
    type: 'string',
    length: 50,
    mssql: {columnName: 'tipoParte', dataType: 'nchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  tipoParte?: string;

  @property({
    type: 'string',
    length: 50,
    mssql: {columnName: 'capacidad', dataType: 'nchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  capacidad?: string;

  @property({
    type: 'string',
    length: 50,
    mssql: {columnName: 'tecnologia', dataType: 'nchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  tecnologia?: string;

  @property({
    type: 'boolean',
    mssql: {columnName: 'estado', dataType: 'bit', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  estado: boolean;

  //@hasMany(() => Producto, {keyTo: 'idPartes'})
  //productos: Producto[];

  @belongsTo(() => Fabricante, {name: 'Fabricantes'})
  idFabricante: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Partes>) {
    super(data);
  }
}

export interface PartesRelations {
  // describe navigational properties here
}

export type PartesWithRelations = Partes & PartesRelations;
