import api from "./main.service";
  
  export interface Album {
      id: string;
    title: string;
  }
  
  export function albumService() {
      const createAlbum = async (album: Omit<Album, "id">) => {
          return await api.post("/albums", album);
      };

      const getAllAlbums = async () => {
          return await api.get("/albums");
      };

      const getAlbumById = async (id: string) => {
          return await api.get("/albums/" + id);
      };

      const updateAlbum = async (id: string, album: Omit<Album, "id">) => {
          return await api.patch("/albums/" + id, album);
      };

      const deleteAlbum = async (id: string) => {
          return await api.delete("/albums/" + id);
      };
  
      return {
          createAlbum,
        getAllAlbums,
        getAlbumById,
        updateAlbum,
        deleteAlbum
      };
  }
  