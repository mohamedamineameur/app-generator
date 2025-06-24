
  import AlbumMiniature from "../../models/albumMiniature.model";
  import { createAlbumFixture } from "./album.fixture";
import { createPictureFixture } from "./picture.fixture";
  
  interface AlbumMiniatureOverrides {
    albumId?: string;
  pictureId?: string;
  }
  
  export const createAlbumMiniatureFixture = async (overrides: AlbumMiniatureOverrides = {}) => {
    if (!overrides.albumId) {
      const album = await createAlbumFixture();
      overrides.albumId = album.id.toString();
    }

    if (!overrides.pictureId) {
      const picture = await createPictureFixture();
      overrides.pictureId = picture.id.toString();
    }
  
    const albumMiniature = await AlbumMiniature.create({
      albumId: overrides.albumId,
      pictureId: overrides.pictureId,
    });
  
    return albumMiniature;
  };
  