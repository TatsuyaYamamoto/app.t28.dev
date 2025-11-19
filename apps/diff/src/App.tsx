import { type MonacoDiffEditor } from "@monaco-editor/react";
import { useMemo, useRef } from "react";

import Editor from "./components/Editor.tsx";
import Header from "./components/Header.tsx";

import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";

function App() {
  const editorRef = useRef<MonacoDiffEditor>(null);
  const url = useMemo(() => new URL(location.href), []);

  const original = useMemo(() => {
    const encoded = url.searchParams.get("original");
    return decompressFromEncodedURIComponent(encoded ?? "");
  }, [url]);

  const modified = useMemo(() => {
    const encoded = url.searchParams.get("modified");
    return decompressFromEncodedURIComponent(encoded ?? "");
  }, [url]);

  const onClickShare = () => {
    const editor = editorRef.current;
    if (!editor) {
      return;
    }

    const originalRaw = editor.getOriginalEditor().getValue();
    const modifiedRaw = editor.getModifiedEditor().getValue();
    const originalEncoded = compressToEncodedURIComponent(originalRaw);
    const modifiedEncoded = compressToEncodedURIComponent(modifiedRaw);

    url.searchParams.set("original", originalEncoded);
    url.searchParams.set("modified", modifiedEncoded);

    location.href = url.href;
  };

  return (
    <>
      <div>
        <Header onClickShare={onClickShare} />
        <Editor ref={editorRef} original={original} modified={modified} />
      </div>
    </>
  );
}

export default App;
