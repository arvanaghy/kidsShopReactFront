import {
  AccessibilityHelp,
  Autoformat,
  Autosave,
  BlockQuote,
  Bold,
  CloudServices,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  ListProperties,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  SelectAll,
  SimpleUploadAdapter,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Undo,
} from "ckeditor5";


export const editorConfig = {
  toolbar: {
    items: [
      "undo",
      "redo",
      "|",
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "|",
      "insertTable",
      "blockQuote",
      "|",
      "bulletedList",
      "numberedList",
      "outdent",
      "indent",
    ],
    shouldNotGroupWhenFull: false,
  },

  plugins: [
    AccessibilityHelp,
    Autoformat,
    Autosave,
    BlockQuote,
    Bold,
    CloudServices,
    Essentials,
    Heading,
    Indent,
    IndentBlock,
    Italic,
    Link,
    List,
    ListProperties,
    MediaEmbed,
    Paragraph,
    PasteFromOffice,
    SelectAll,
    SimpleUploadAdapter,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextTransformation,
    TodoList,
    Underline,
    Undo,
  ],
  heading: {
    options: [
      {
        model: "paragraph",
        title: "Paragraph",
        class: "ck-heading_paragraph",
      },
      {
        model: "heading2",
        view: "h2",
        title: "Heading 2",
        class: "ck-heading_heading2",
      },
      {
        model: "heading3",
        view: "h3",
        title: "Heading 3",
        class: "ck-heading_heading3",
      },

    ],
  },

  list: {
    properties: {
      styles: true,
      startIndex: true,
      reversed: true,
    },
  },

  placeholder: "متن خود را اینجا وارد کنید...",
  initialData: "",
  autosave: {
    waitingTime: 1000,
    save: (editor) => {
      return new Promise((resolve) => {
        console.log("Autosave triggered", editor.getData());
        resolve();
      });
    },
  },
};
