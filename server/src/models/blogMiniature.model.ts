
import { sequelize } from "../config/database";
import { DataTypes, Model } from "sequelize";
import Blog from "./blog.model";
import Picture from "./picture.model";

export class BlogMiniature extends Model {
  public id!: number;
  public blogId!: string;
  public pictureId!: string;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BlogMiniature.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    blogId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Blog,
        key: "id",
      },
      validate: {
        notEmpty: true,
        isUUID: 4,
      },
    },
    pictureId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Picture,
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
    modelName: "BlogMiniature",
    tableName: "blogminiatures",
    timestamps: true,
  }
);


Blog.hasMany(BlogMiniature, {
  foreignKey: "blogId",
  as: "blogminiatures",
});
BlogMiniature.belongsTo(Blog, {
  foreignKey: "blogId",
  as: "blog",
});

Picture.hasMany(BlogMiniature, {
  foreignKey: "pictureId",
  as: "blogminiatures",
});
BlogMiniature.belongsTo(Picture, {
  foreignKey: "pictureId",
  as: "picture",
});


export default BlogMiniature;
