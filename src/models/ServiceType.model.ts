import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo, BelongsToMany } from "sequelize-typescript";
import Servicio from "./Service.model";
import  ServicioTipoServicio  from "./ServicioTipoServicio.model";

@Table({ tableName: "tipo_servicio" })
class TipoServicio extends Model {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  declare nombre: string;

  @BelongsToMany(() => Servicio, () => ServicioTipoServicio)
  servicios: Servicio[];
}

export default TipoServicio;
 