'use client'

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
import { FormEvent, useEffect, useState } from 'react';
// import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {$generateHtmlFromNodes,$generateNodesFromDOM} from '@lexical/html';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getRoot, LexicalEditor, $getSelection, $setSelection, $insertNodes, RangeSelection, $createParagraphNode } from 'lexical';
import OnChangePlugin from './plugins/onChangePlugin';



function MyCustomAutoFocusPlugin({value}:{value:string}) {
    const [editor] = useLexicalComposerContext();
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true)

    useEffect(() => {
        if (isFirstRender && value){
            setIsFirstRender(false)

            editor.update(() => {
                // In the browser you can use the native DOMParser API to parse the HTML string.
                const parser = new DOMParser();
                const dom = parser.parseFromString(value, 'text/html');

                // Once you have the DOM instance it's easy to generate LexicalNodes.
                const nodes = $generateNodesFromDOM(editor, dom);

                // Select the root
                $getRoot().select();

                // Insert them at a selection.
                $insertNodes(nodes);
           })
        }
        
    }, [editor,value,isFirstRender]);

    return null;
}

type EditorProps =  {
    placeholder?: string,
    onChange: (...event: any[])=> void,
    value?: string | number | null |any,
}

export default function Editor({
    placeholder = '',
    onChange,
    value,
  }: EditorProps) {
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
        ],
    };
    

    function Placeholder() {
        return <div className="editor-placeholder">{placeholder}</div>;
      }
    
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
            {/* <HistoryPlugin />
            <TreeViewPlugin /> */}
            <AutoFocusPlugin />
            <MyCustomAutoFocusPlugin value={value}/>
            <CodeHighlightPlugin />
            <ListPlugin />
            <LinkPlugin />
            <AutoLinkPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            <OnChangePlugin onChange={onChange}/>
            </div>
        </div>

        </LexicalComposer>
    );
}


