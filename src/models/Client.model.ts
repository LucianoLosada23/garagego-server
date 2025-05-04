import { Table, Column, Model, DataType , Default, HasMany, BelongsTo, ForeignKey} from "sequelize-typescript";
import Vehiculo from "./Vehicle.model";
import User from "./User.model";

@Table({ tableName: "client" })
class Client extends Model {

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare userId: number;

  @Column({
    type: DataType.STRING(100), // Para números grandes como CUIT
    unique: true, // Si el cuit debe ser único
  })
  declare cuit: string;

  @Column({
    type: DataType.STRING(100), 
  })
  declare name: string;

  @Column({
    type: DataType.STRING(100),
  })
  declare lastname: string;

  @Column({
    type: DataType.STRING(100),
    unique: true, // Si el email debe ser único
  })
  declare email: string;

  @Column({
    type: DataType.STRING(100), // Para números grandes como teléfonos
  })
  declare phone: string;

  @Default(true)
  @Column({
    type : DataType.BOOLEAN,
  })
  declare isActive: boolean;

  @BelongsTo(() => User)
  declare user: User;

  @HasMany(() => Vehiculo)
  declare vehiculos: Vehiculo[];
}

export default Client;