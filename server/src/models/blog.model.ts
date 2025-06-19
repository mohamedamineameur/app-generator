
import { sequelize } from "../config/database";
import { DataTypes, Model } from "sequelize";


export class Blog extends Model {
  public id!: number;

  public title!: string;
  public isPublished!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Blog.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    
    title: {
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
    modelName: "Blog",
    tableName: "blogs",
    timestamps: true,
  }
);



export default Blog;
