
  import Album from "../../models/album.model";
  
  
  interface AlbumOverrides {
    title?: string;
    isPublished?: boolean;
  
  }
  
  export const createAlbumFixture = async (overrides: AlbumOverrides = {}) => {
  
    const album = await Album.create({
      title: overrides.title || "Default Album Title",
      isPublished: overrides.isPublished !== undefined ? overrides.isPublished : true,
    });
  
    return album;
  };
  