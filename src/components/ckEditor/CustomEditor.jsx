"use client";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor } from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import { editorConfig } from "./ckeditorConfig";

export default function CustomEditor({ data, onChange }) {
  return (
    <div className="editor-container editor-container_classic-editor">
      <CKEditor
        editor={ClassicEditor}
        config={editorConfig}
        data={data}
        onChange={(e, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
}
