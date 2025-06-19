
import { sequelize } from "../config/database";
import { DataTypes, Model } from "sequelize";
import Blog from "./blog.model";
import Content from "./content.model";

export class BlogContent extends Model {
  public id!: number;
  public blogId!: string;
  public contentId!: string;
  public orderNumber!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BlogContent.init(
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
    contentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Content,
        key: "id",
      },
      validate: {
        notEmpty: true,
        isUUID: 4,
      },
    },
    
    orderNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "BlogContent",
    tableName: "blogcontents",
    timestamps: true,
  }
);


Blog.hasMany(BlogContent, {
  foreignKey: "blogId",
  as: "blogcontents",
});
BlogContent.belongsTo(Blog, {
  foreignKey: "blogId",
  as: "blog",
});

Content.hasMany(BlogContent, {
  foreignKey: "contentId",
  as: "blogcontents",
});
BlogContent.belongsTo(Content, {
  foreignKey: "contentId",
  as: "content",
});


export default BlogContent;
