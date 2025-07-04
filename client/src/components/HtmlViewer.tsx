const HtmlViewer = ({ content }: { content: string }) => {
  return (
    <div
      className="html-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default HtmlViewer;
