import React, { useEffect, useState } from "react";
import { albumService } from "../../services/album.service";
import { Link } from "react-router-dom";

const AlbumList = () => {
  const [albums, setAlbums] = useState<any[]>([]);

  useEffect(() => {
    albumService().getAllAlbumsManager().then((res) => setAlbums(res.data));
  }, []);

  return (
    <div className="container" style={{ padding: "2rem" }}>
      <h2>Albums</h2>
      <Link to="/admin/albums/new">➕ Créer un album</Link>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <Link to={`/albums/${album.id}`}>{album.titleFr}</Link> —
            <Link to={`/admin/albums/edit/${album.id}`}> ✏️ Modifier</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumList;
