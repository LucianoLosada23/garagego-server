import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany, BelongsToMany } from "sequelize-typescript";
import Vehiculo from "./Vehicle.model";
import TipoServicio from "./ServiceType.model";
import  ServicioTipoServicio  from "./ServicioTipoServicio.model";
import Repuesto from "./Repuesto.model";
import User from "./User.model";

@Table({ tableName: "servicio" })
class Servicio extends Model {

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare userId: number;
  
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare descripcion: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare fecha: Date;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  declare costo: number;

  @ForeignKey(() => Vehiculo)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare vehiculoId: number;

  @BelongsTo(() => User)
  declare user: User;

  @BelongsTo(() => Vehiculo)
  declare vehiculo: Vehiculo;
  
  @BelongsToMany(() => TipoServicio, () => ServicioTipoServicio)
  tiposServicio: TipoServicio[];

  @HasMany(() => Repuesto)
  declare repuesto: Repuesto[];
}

export default Servicio;
