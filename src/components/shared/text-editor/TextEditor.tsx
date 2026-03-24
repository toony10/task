'use client'

import { useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import MenuBar from './MenuBar'
import Link from '@tiptap/extension-link'

interface TextEditorProps {
  name: string
  initialValue?: string
  placeholder?: string
  minHeight?: string
  editable?: boolean
}

export default function TextEditor({
  name,
  initialValue,
  placeholder = '...اكتب هنا',
  minHeight = '120px',
  editable = true
}: TextEditorProps) {
  const [value, setValue] = useState(initialValue || '')
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Highlight.configure({
        multicolor: true
      }),
      Placeholder.configure({
        placeholder
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: 'text-editor-link',
          rel: 'noreferrer noopener',
          target: '_blank'
        }
      })
    ],
    content: initialValue || '',
    editable,
    editorProps: {
      attributes: {
        class: 'text-editor-content prose prose-sm md:prose-base max-w-none scrollbar-custom'
      }
    },
    immediatelyRender: false
  })

  useEffect(() => {
    if (!editor) return
    const handleUpdate = () => {
      const html = editor.getHTML()
      setValue(html)
    }
    editor.on('update', handleUpdate)
    handleUpdate()
    return () => {
      editor.off('update', handleUpdate)
    }
  }, [editor])

  return (
    <div className='text-editor'>
      <div className='text-editor-body' style={ { minHeight } }>
        <EditorContent editor={ editor } />
      </div>
      { editor && <MenuBar editor={ editor } /> }
      <input type='hidden' name={ name } value={ value } />
    </div>
  )
}