import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { pictureService } from "../../services/picture.service";

const PictureEdit = () => {
  const { albumId } = useParams();
  const [url, setUrl] = useState("");
  const [descriptionFr, setDescriptionFr] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!albumId) return;

    await pictureService().createPicture({
      albumId,
      url,
      isPublished: true,
      descriptionFr,
      descriptionEn: descriptionFr,
    });

    setUrl("");
    setDescriptionFr("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Ajouter une image</h3>
      <label>URL de l’image</label>
      <input value={url} onChange={(e) => setUrl(e.target.value)} required />
      <label>Description</label>
      <input value={descriptionFr} onChange={(e) => setDescriptionFr(e.target.value)} />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default PictureEdit;
