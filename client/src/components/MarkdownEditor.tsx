import React from "react";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

type Props = {
  content: string;
  setContent: (value: string) => void;
};

const MarkdownEditor = ({ content, setContent }: Props) => {
  return (
    <div className="container" data-color-mode="dark" style={{ marginTop: "1rem" }}>
      <MDEditor
        height={500}
        value={content}
        onChange={(val) => setContent(val || "")}
        preview="live"
      />
    </div>
  );
};

export default MarkdownEditor;
