// components/TinyMCEEditor.tsx

import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

type Props = {
  content: string;
  setContent: (value: string) => void;
};

const TinyMCEEditor = ({ content, setContent }: Props) => {
  const editorRef = useRef(null);

  return (
    <Editor
      apiKey="pfelax062eqx0qfh61xzualnhpnionqrb9aosnqkmvyiwbc0" // ou ta clé API TinyMCE
      onInit={(editor) => (editorRef.current = editor)}
      value={content}
      onEditorChange={(newValue) => setContent(newValue)}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          "advlist", "autolink", "lists", "link", "image", "charmap",
          "preview", "anchor", "searchreplace", "visualblocks", "code",
          "fullscreen", "insertdatetime", "media", "table", "code", "help", "wordcount"
        ],
        toolbar:
          "undo redo | formatselect | fontselect fontsizeselect | bold italic underline | " +
          "forecolor backcolor | alignleft aligncenter alignright alignjustify | " +
          "bullist numlist outdent indent | removeformat | image media link | code",
        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
      }}
    />
  );
};

export default TinyMCEEditor;
