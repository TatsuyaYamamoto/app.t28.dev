import { DiffEditor, type DiffEditorProps } from "@monaco-editor/react";
import type { FC } from "react";

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
  original: string;
  modified: string;
}

const Editor: FC<Props> = ({ modified, original }) => {
  return (
    <>
      <DiffEditor
        height="calc(100dvh - var(--spacing) * 16)"
        options={options}
        original={original}
        modified={modified}
      />
    </>
  );
};

export default Editor;
