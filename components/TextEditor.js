import dynamic from 'next/dynamic'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState, useEffect } from 'react'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { db } from '../firebase';
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import { useDocumentOnce } from 'react-firebase-hooks/firestore'

const Editor = dynamic(() => import('react-draft-wysiwyg').then(module => module.Editor), {
    ssr: false
})

function TextEditor() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [session] = useSession();

    const router = useRouter();
    const { id } = router.query;

    const [snapShot] = useDocumentOnce(
        db
            .collection('userDocs')
            .doc(session.user.email)
            .collection('docs')
            .doc(id)
    )

    useEffect(() => {
        if(snapShot?.data()?.editorState) {
            setEditorState(EditorState.createWithContent(
                convertFromRaw(snapShot?.data()?.editorState)
            ))
        }
    }, [snapShot])

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)

        db.collection('userDocs')
        .doc(session.user.email)
        .collection('docs')
        .doc(id).set({
            editorState: convertToRaw(editorState.getCurrentContent())
        }, {
            merge: true
        })
    }

    return (
        <div className='bg-[#F8F9FA] min-h-screen pb-16'>
            <Editor 
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                toolbarClassName='flex sticky top-0 z-50 !justify-center mx-auto'
                editorClassName='mt-6 bh-white shadow-lg max-w-5xl mx-auto mb-12 border p-10'
            />
        </div>
    )
}

export default TextEditor
