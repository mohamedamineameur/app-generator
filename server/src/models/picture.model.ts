
import { sequelize } from "../config/database";
import { DataTypes, Model } from "sequelize";
import Album from "./album.model";

export class Picture extends Model {
  public id!: number;
  public albumId!: string;
  public url!: string;
  public isPublished!: boolean;
  public descriptionFr!: string;
  public descriptionEn!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Picture.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    albumId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Album,
        key: "id",
      },
      validate: {
        notEmpty: true,
        isUUID: 4,
      },
    },
    
    url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    descriptionFr: {
      type: DataTypes.STRING(500),
      allowNull: true,
      validate: {
        len: [0, 500],
      },
    },
    descriptionEn: {
      type: DataTypes.STRING(500),
      allowNull: true,
      validate: {
        len: [0, 500],
      },
    },
  },
  {
    sequelize,
    modelName: "Picture",
    tableName: "pictures",
    timestamps: true,
  }
);


Album.hasMany(Picture, {
  foreignKey: "albumId",
  as: "pictures",
});
Picture.belongsTo(Album, {
  foreignKey: "albumId",
  as: "album",
});


export default Picture;
