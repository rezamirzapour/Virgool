import { useEffect, useState } from "react";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

export default function useTextEditor(initialHtmlContent?: string) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (initialHtmlContent) {
      const blocksFromHTML = htmlToDraft(initialHtmlContent);
      setEditorState(() =>
        EditorState.createWithContent(
          ContentState.createFromBlockArray(blocksFromHTML.contentBlocks)
        )
      );
    }
  }, [initialHtmlContent]);

  const getHtmlContent = () => {
    const currentContentAsHTML = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    return currentContentAsHTML;
  };

  const getPlainContent = () => {
    return editorState.getCurrentContent().getPlainText();
  };

  return { editorState, setEditorState, getHtmlContent, getPlainContent };
}
