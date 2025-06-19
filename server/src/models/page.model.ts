
import { sequelize } from "../config/database";
import { DataTypes, Model } from "sequelize";


export class Page extends Model {
  public id!: number;

  public titleFr!: string;
  public titleEn!: string;
  public isPublished!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Page.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    
    titleFr: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    titleEn: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Page",
    tableName: "pages",
    timestamps: true,
  }
);



export default Page;
