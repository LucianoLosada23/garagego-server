import { Table, Column, Model, ForeignKey, PrimaryKey, BelongsTo, BelongsToMany, HasMany, AutoIncrement } from "sequelize-typescript";
import Servicio from "./Service.model";
import TipoServicio from "./ServiceType.model";
import  Repuesto from "./Repuesto.model";


@Table({ tableName: "servicio_tipo_servicio", timestamps: false })
class ServicioTipoServicio extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @ForeignKey(() => Servicio)
  @Column
  declare servicioId: number; // Usa `declare` para evitar la propiedad pública

  @ForeignKey(() => TipoServicio)
  @Column
  declare tipoServicioId: number; // Usa `declare` para evitar la propiedad pública

  @BelongsTo(() => Servicio)
  servicio: Servicio;

  @BelongsTo(() => TipoServicio)
  tipoServicio: TipoServicio;

}

export default ServicioTipoServicio;
