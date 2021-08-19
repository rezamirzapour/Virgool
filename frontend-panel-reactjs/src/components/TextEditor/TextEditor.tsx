import { Dispatch, SetStateAction } from "react";
import { Editor, EditorState } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface IProps {
    label?: string,
    editorState: EditorState,
    setEditorState: Dispatch<SetStateAction<EditorState>>
}

export default function TextEditor({ label, editorState, setEditorState }: IProps) {

    return (
        <div style={{ minHeight: 500 }}>
            {label && <label style={{ fontSize: '1em' }}>{label}</label>}
            <Editor
                wrapperStyle={{
                    minHeight: 500,
                    marginTop: '1em',
                    border: '1px solid #e1e1e1'
                }}
                editorStyle={{
                    paddingRight: 4,
                    paddingLeft: 4,
                    minHeight: 500
                }}
                editorState={editorState}
                onEditorStateChange={setEditorState}
            />
        </div>
    );
}