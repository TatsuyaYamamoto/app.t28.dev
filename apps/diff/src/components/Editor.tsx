import {
  DiffEditor,
  type DiffEditorProps,
  type DiffOnMount,
  type MonacoDiffEditor,
} from "@monaco-editor/react";
import type { FC, RefObject } from "react";

const options: DiffEditorProps["options"] = {
  lineNumbers: "off",
  renderOverviewRuler: false,
  renderGutterMenu: false,
  renderMarginRevertIcon: false, // hide -> icons in the glyph margin to revert changes.
  renderIndicators: false, //       hide +/- indicators for added/deleted changes
  scrollBeyondLastLine: false,
  originalEditable: true,
};

interface Props {
  ref: RefObject<MonacoDiffEditor | null>;
  original: string;
  modified: string;
}

const Editor: FC<Props> = ({ ref, modified, original }) => {
  const onMount: DiffOnMount = (editor) => {
    ref.current = editor;
  };

  return (
    <>
      <DiffEditor
        height="calc(100dvh - var(--spacing) * 16)"
        options={options}
        original={original}
        modified={modified}
        onMount={onMount}
      />
    </>
  );
};

export default Editor;
