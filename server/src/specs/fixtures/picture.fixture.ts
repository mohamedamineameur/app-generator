
  import Picture from "../../models/picture.model";
  import { createAlbumFixture } from "./album.fixture";
  
  interface PictureOverrides {
    albumId?: string;
    url?: string;
    description?: string;
    isPublished?: boolean;
  }
  
  export const createPictureFixture = async (overrides: PictureOverrides = {}) => {
    if (!overrides.albumId) {
      const album = await createAlbumFixture();
      overrides.albumId = album.id.toString();
    }
    if (!overrides.url) {
      overrides.url = "https://example.com/picture.jpg";
    }
    if (!overrides.description) {
      overrides.description = "Sample picture description";
    }
    if (overrides.isPublished === undefined) {
      overrides.isPublished = false; 
    }
  
    const picture = await Picture.create({
      albumId: overrides.albumId,
      url: overrides.url,
      description: overrides.description,
      isPublished: overrides.isPublished,
    });
  
    return picture;
  };
  