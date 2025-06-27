import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';

const MarkdownViewer = ({ content }: { content: string }) => {
  return (
    <div className="markdown-container">
      <MarkdownPreview source={content} className="markdown-preview" />
    </div>
  );
};

export default MarkdownViewer;
