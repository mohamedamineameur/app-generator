import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { pictureService } from "../../services/picture.service";

const PictureList = () => {
  const { albumId } = useParams();
  const [pictures, setPictures] = useState<any[]>([]);

  useEffect(() => {
    if (!albumId) return;
    pictureService()
      .getAllPictures()
      .then((res) => setPictures(res.data.filter((p: any) => p.albumId === albumId)));
  }, [albumId]);

  const deleteImage = async (id: string) => {
    await pictureService().deletePicture(id);
    setPictures((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h3>Images dans l'album</h3>
      <ul>
        {pictures.map((pic) => (
          <li key={pic.id}>
            <img src={pic.url} alt={pic.descriptionFr} style={{ width: 100 }} />
            <button onClick={() => deleteImage(pic.id)}>🗑️ Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PictureList;
