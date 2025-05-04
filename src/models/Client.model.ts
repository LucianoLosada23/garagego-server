import { Table, Column, Model, DataType , Default, HasMany} from "sequelize-typescript";
import Vehiculo from "./Vehicle.model";

@Table({ tableName: "client" })
class Client extends Model {

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

  @HasMany(() => Vehiculo)
  declare vehiculos: Vehiculo[];
}

export default Client;