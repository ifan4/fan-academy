import { EditorState, LexicalEditor } from "lexical"
import {$generateHtmlFromNodes} from '@lexical/html';
import { OnChangePlugin as  LexicalOnchangePlugin} from "@lexical/react/LexicalOnChangePlugin";

interface onChangePluginProps {
    onChange: (...event: any[]) => void
}

export default function OnChangePlugin({
onChange,
}: onChangePluginProps): JSX.Element {
return (
    <LexicalOnchangePlugin
    onChange={(editorState: EditorState, editor: LexicalEditor) => {
        editorState.read(() => {
        const htmlString = $generateHtmlFromNodes(editor, null)
        onChange({ content: htmlString, editorState })
        })
    }}
    />
)
}