
import { sequelize } from "../config/database";
import { DataTypes, Model } from "sequelize";


export class Content extends Model {
  public id!: number;

  public contentFr!: string;
  public contentEn!: string;
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
    
    contentFr: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    contentEn: {
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
