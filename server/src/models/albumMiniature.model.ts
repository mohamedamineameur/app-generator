
import { sequelize } from "../config/database";
import { DataTypes, Model } from "sequelize";
import Album from "./album.model";
import Picture from "./picture.model";

export class AlbumMiniature extends Model {
  public id!: number;
  public albumId!: string;
  public pictureId!: string;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AlbumMiniature.init(
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
    modelName: "AlbumMiniature",
    tableName: "albumminiatures",
    timestamps: true,
  }
);


Album.hasMany(AlbumMiniature, {
  foreignKey: "albumId",
  as: "albumminiatures",
});
AlbumMiniature.belongsTo(Album, {
  foreignKey: "albumId",
  as: "album",
});

Picture.hasMany(AlbumMiniature, {
  foreignKey: "pictureId",
  as: "albumminiatures",
});
AlbumMiniature.belongsTo(Picture, {
  foreignKey: "pictureId",
  as: "picture",
});


export default AlbumMiniature;
