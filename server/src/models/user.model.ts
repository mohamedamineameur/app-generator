import { sequelize } from "../config/database";
import { DataTypes, Model } from "sequelize";
import Role from "./role.model";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "", 10);

export class User extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public roleId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50],
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 128],
      },
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Role,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    underscored: true,
    hooks: {
        beforeCreate: async (user: User) => {
            if (user.changed("password")) {
            const salt = await bcrypt.genSalt(SALT_ROUNDS);
            user.password = await bcrypt.hash(user.password, salt);
            }
        },
        beforeUpdate: async (user: User) => {
            if (user.changed("password")) {
            const salt = await bcrypt.genSalt(SALT_ROUNDS);
            user.password = await bcrypt.hash(user.password, salt);
            }
        },
        },
  }
);
// Relations
Role.hasMany(User, {
  foreignKey: "roleId",
  as: "users",
});
User.belongsTo(Role, {
  foreignKey: "roleId",
  as: "role",
});


export default User;