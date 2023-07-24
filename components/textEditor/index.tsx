

import EditorTheme from './plugins/theme'
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

import TreeViewPlugin from "./plugins/TreeViewPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin.js";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import "./plugins/style.css";
import { useEffect, useState } from 'react';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {$generateHtmlFromNodes} from '@lexical/html';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getRoot, LexicalEditor, $getSelection } from 'lexical';


function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const editorConfig:any = {
  // The editor theme
  theme: EditorTheme,
  // Handling of errors during update
  onError(error:Error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode
  ]
};

function ButtonHTML(placeholder: any) {
    const [editor] = useLexicalComposerContext()
    const [HTMLString, setHTMLString] = useState<string|TrustedHTML>('')
    useEffect(() => {
        const removeUpdateListener = editor.registerUpdateListener(
          ({ editorState }) => {
            editorState.read(() => {
              const htmlString = $generateHtmlFromNodes(editor, null);
    
              console.log('htmlString', htmlString);
              setHTMLString(htmlString)
            });
          }
        );
        return () => {
          removeUpdateListener();
        };
      }, [editor]);
    return(
        <div>
            <button
            onClick={()=> {

                // setHTMLString(htmlString);
            }}
            >Lihat HTML</button>
            <div dangerouslySetInnerHTML={{__html: HTMLString}}>
               
            </div>
        </div>
    )
}

export default function Editor() {
    const [HTMLString, setHTMLString] = useState<string|TrustedHTML>('')
    return (
        <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
            <ToolbarPlugin />
            <div className="editor-inner">
            <RichTextPlugin
                
                contentEditable={<ContentEditable className="editor-input" />}
                placeholder={<Placeholder />}
                ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <TreeViewPlugin />
            <AutoFocusPlugin />
            <CodeHighlightPlugin />
            <ListPlugin />
            <LinkPlugin />
            <AutoLinkPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            </div>
        </div>
        <div>
            {/* {editor._htmlConversions} */}
        </div>
        <ButtonHTML/>
        </LexicalComposer>
    );
}
function $generateNodesFromDOM(editor: LexicalEditor, text: Document) {
    throw new Error('Function not implemented.');
}

