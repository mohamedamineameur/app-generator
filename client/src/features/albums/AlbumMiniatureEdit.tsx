import React, { useEffect, useState } from "react";
import { albumMiniatureService } from "../../services/albumMiniature.service";
import { pictureService } from "../../services/picture.service";
import { useParams } from "react-router-dom";

const AlbumMiniatureEdit = () => {
  const { id } = useParams();
  const [pictures, setPictures] = useState<any[]>([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (!id) return;
    pictureService()
      .getAllPictures()
      .then((res) => setPictures(res.data.filter((p: any) => p.albumId === id)));
  }, [id]);

  const handleSave = async () => {
    if (id && selected) {
      await albumMiniatureService().createAlbumMiniature({ albumId: id, pictureId: selected });
    }
  };

  return (
    <div>
      <h3>Miniature de l’album</h3>
      <select onChange={(e) => setSelected(e.target.value)} value={selected}>
        <option value="">Sélectionner une image</option>
        {pictures.map((p) => (
          <option key={p.id} value={p.id}>
            {p.descriptionFr}
          </option>
        ))}
      </select>
      <button onClick={handleSave}>Définir comme miniature</button>
    </div>
  );
};

export default AlbumMiniatureEdit;
