import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { albumService } from "../../services/album.service";
import { pictureService } from "../../services/picture.service";

const AlbumView = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState<any>(null);
  const [pictures, setPictures] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;

    albumService().getAlbumById(id).then((res) => setAlbum(res.data));
    pictureService()
      .getAllPictures()
      .then((res) => setPictures(res.data.filter((p: any) => p.albumId === id)));
  }, [id]);

  return (
    <div className="container" style={{ padding: "2rem" }}>
      <h2>{album?.titleFr}</h2>
      <div className="gallery" style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {pictures.map((p) => (
          <img key={p.id} src={p.url} alt={p.descriptionFr} style={{ width: "30%", borderRadius: "10px" }} />
        ))}
      </div>
    </div>
  );
};

export default AlbumView;
