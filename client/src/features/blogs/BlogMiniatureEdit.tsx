import { useEffect, useState } from "react";
import { blogMiniatureService } from "../../services/blogMiniature.service";
import { pictureService } from "../../services/picture.service";
import { useParams } from "react-router-dom";

const BlogMiniatureEdit = () => {
  const { id } = useParams();
  const [pictures, setPictures] = useState<any[]>([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    pictureService().getAllPictures().then((res) => setPictures(res.data));
  }, []);

  const handleSave = async () => {
    if (id && selected) {
      await blogMiniatureService().createBlogMiniature({ blogId: id, pictureId: selected });
    }
  };

  return (
    <div>
      <h3>Miniature du blog</h3>
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

export default BlogMiniatureEdit;
