import api from "./main.service";
  
  export interface Picture {
      id: string;
    url: string;
    isPublished: boolean;
  }
  
  export function pictureService() {
      const createPicture = async (picture: Omit<Picture, "id">) => {
          return await api.post("/pictures", picture);
      };

      const getAllPictures = async () => {
          return await api.get("/pictures");
      };

      const getPictureById = async (id: string) => {
          return await api.get("/pictures/" + id);
      };

      const updatePicture = async (id: string, picture: Omit<Picture, "id">) => {
          return await api.patch("/pictures/" + id, picture);
      };

      const deletePicture = async (id: string) => {
          return await api.delete("/pictures/" + id);
      };
  
      return {
          createPicture,
        getAllPictures,
        getPictureById,
        updatePicture,
        deletePicture
      };
  }
  