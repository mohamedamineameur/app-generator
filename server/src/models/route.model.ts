import { sequelize } from "../config/database";
import { DataTypes, Model } from "sequelize";

export class Route extends Model {
  public id!: number;
  public name!: string;
  public description!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
Route.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [3, 511],
        },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 511],
        },
    },
  },
  {
    sequelize,
    modelName: "Route",
    tableName: "routes",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["name"],
      },
    ],
  }
);
export default Route;
