
import { sequelize } from "../config/database";
import { DataTypes, Model } from "sequelize";


export class Album extends Model {
  public id!: number;

  public titleFr!: string;
  public titleEn!: string;
  public readonly isPublished!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Album.init(
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
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Album",
    tableName: "albums",
    timestamps: true,
  }
);



export default Album;
