// TextEditor.js
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";


const TextEditor = (props) => {
 
  const { onChange, value } = props;

  // Get the first line of the content
  const firstLine = value.split("\n")[0];

  // Get the tags, if any
  const tags = firstLine.match(/\[(.*?)\]/g);

  // Set the title and tags state
  const title = firstLine.replace(/\[(.*?)\]/g, "");
  const tagsState = tags ? tags.map((tag) => tag.replace(/\[|\]/g, "")) : [];


  return (
  <AceEditor
  className="bg-secondary-blue text-white"
  placeholder=""
  mode="markdown"
  style={{
    ".aceTm .ace_gutter": {
      backgroundColor: "#000C1D",
    },
  }}
  name="blah2"
  width="100%"
  onChange={onChange}
  fontSize={14}
  showPrintMargin={false}
  showGutter={true}
  highlightActiveLine={true}
  value={value}
  setOptions={{
  enableBasicAutocompletion: false,
  enableLiveAutocompletion: false,
  enableSnippets: false,
  showLineNumbers: true,
  tabSize: 2,
  }}/>
    
  );
};

export default TextEditor;

