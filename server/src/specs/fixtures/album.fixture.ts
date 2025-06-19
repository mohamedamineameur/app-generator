
  import Album from "../../models/album.model";
  
  
  interface AlbumOverrides {
    titleFr?: string;
    isPublished?: boolean;
    titleEn?: string;
  
  }
  
  export const createAlbumFixture = async (overrides: AlbumOverrides = {}) => {
  
    const album = await Album.create({
      titleFr: overrides.titleFr || "Default Album TitleFr",
      titleEn: overrides.titleEn || "Default Album TitleEn",
      isPublished: overrides.isPublished !== undefined ? overrides.isPublished : true,
    });
  
    return album;
  };
  