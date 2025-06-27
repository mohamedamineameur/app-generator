import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { albumService } from "../../services/album.service";
import PictureList from "../pictures/PictureList";
import PictureEdit from "../pictures/PictureEdit";
import AlbumMiniatureEdit from "../albums/AlbumMiniatureEdit";


const AlbumEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [titleFr, setTitleFr] = useState("");

  useEffect(() => {
    if (!id) return;
    albumService().getAlbumByIdManage(id).then((res) => setTitleFr(res.data.titleFr));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (id) {
      await albumService().updateAlbum(id, { titleFr, titleEn: titleFr });
    } else {
      await albumService().createAlbum({ titleFr, titleEn: titleFr });
    }

    navigate("/admin");
  };

  return (
    <div className="container" style={{ padding: "2rem" }}>
      <h2>{id ? "Modifier" : "Créer"} un album</h2>
      <form onSubmit={handleSubmit}>
        <label>Titre (FR)</label>
        <input value={titleFr} onChange={(e) => setTitleFr(e.target.value)} required />
        <button type="submit">Enregistrer</button>
      </form>
      { id && (
  <>
    <hr />
    <PictureEdit />
    <PictureList />
  </>
)}
{ id && <AlbumMiniatureEdit /> }
    </div>
  );
};

export default AlbumEdit;
