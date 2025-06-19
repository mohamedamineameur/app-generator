
import { sequelize } from "../config/database";
import { DataTypes, Model } from "sequelize";


export class Content extends Model {
  public id!: number;

  public content!: string;
  public isPublished!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Content.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Content",
    tableName: "contents",
    timestamps: true,
  }
);



export default Content;
