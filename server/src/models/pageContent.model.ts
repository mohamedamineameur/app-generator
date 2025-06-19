
import { sequelize } from "../config/database";
import { DataTypes, Model } from "sequelize";
import Page from "./page.model";
import Content from "./content.model";

export class PageContent extends Model {
  public id!: number;
  public pageId!: string;
  public contentId!: string;
  public orderNumber!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PageContent.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    pageId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Page,
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
    modelName: "PageContent",
    tableName: "pagecontents",
    timestamps: true,
  }
);


Page.hasMany(PageContent, {
  foreignKey: "pageId",
  as: "pagecontents",
});
PageContent.belongsTo(Page, {
  foreignKey: "pageId",
  as: "page",
});

Content.hasMany(PageContent, {
  foreignKey: "contentId",
  as: "pagecontents",
});
PageContent.belongsTo(Content, {
  foreignKey: "contentId",
  as: "content",
});


export default PageContent;
