import api from "./main.service";
  
  export interface AlbumMiniature {
      id: string;
  }
  
  export function albumMiniatureService() {
      const createAlbumMiniature = async (albumMiniature: Omit<AlbumMiniature, "id">) => {
          return await api.post("/albumMiniatures", albumMiniature);
      };

      const getAllAlbumMiniatures = async () => {
          return await api.get("/albumMiniatures");
      };

      const getAlbumMiniatureById = async (id: string) => {
          return await api.get("/albumMiniatures/" + id);
      };

      const updateAlbumMiniature = async (id: string, albumMiniature: Omit<AlbumMiniature, "id">) => {
          return await api.patch("/albumMiniatures/" + id, albumMiniature);
      };

      const deleteAlbumMiniature = async (id: string) => {
          return await api.delete("/albumMiniatures/" + id);
      };
  
      return {
          createAlbumMiniature,
        getAllAlbumMiniatures,
        getAlbumMiniatureById,
        updateAlbumMiniature,
        deleteAlbumMiniature
      };
  }
  