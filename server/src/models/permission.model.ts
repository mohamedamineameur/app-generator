import { sequelize } from "../config/database";
import { DataTypes, Model } from "sequelize";
import Route from "./route.model";
import Role from "./role.model";

export class Permission extends Model {
  public id!: number;
  public routeId!: string;
  public roleId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
Permission.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    routeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Route,
        key: "id",
      },
      validate: {
        notEmpty: true,
        isUUID: 4,
      },
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Role,
        key: "id",
      },
      validate: {
        notEmpty: true,
        isUUID: 4,
      },
    },
  },
  {
    sequelize,
    modelName: "Permission",
    tableName: "permissions",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["routeId", "roleId"],
      },
    ],
  }
);
// Associations
Route.hasMany(Permission, {
  foreignKey: "routeId",
  as: "permissions",
});
Role.hasMany(Permission, {
  foreignKey: "roleId",
  as: "permissions",
});
Permission.belongsTo(Route, {
  foreignKey: "routeId",
  as: "route",
});
Permission.belongsTo(Role, {
  foreignKey: "roleId",
  as: "role",
});

export default Permission;