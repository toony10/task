import { useEffect, useReducer } from 'react'
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  Quote,
  Strikethrough
} from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'
import { Editor } from '@tiptap/react'
import { MdOutlineHorizontalRule } from 'react-icons/md'

export default function MenuBar({ editor }: { editor: Editor | null }) {
  const [, forceUpdate] = useReducer(x => x + 1, 0)

  useEffect(() => {
    if (!editor) return
    editor.on('transaction', forceUpdate)
    return () => {
      editor.off('transaction', forceUpdate)
    }
  }, [editor])

  if (!editor) {
    return null
  }

  const options = [
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
      pressed: editor.isActive({ textAlign: 'right' })
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
      pressed: editor.isActive({ textAlign: 'center' })
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
      pressed: editor.isActive({ textAlign: 'left' })
    },
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive('heading', { level: 1 })
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive('heading', { level: 2 })
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive('heading', { level: 3 })
    },
    {
      icon: <Quote className="size-4" />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      pressed: editor.isActive('blockquote')
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive('bold')
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive('italic')
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive('strike')
    },
    {
      icon: <LinkIcon className="size-4" />,
      onClick: () => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('Enter URL', previousUrl || '')

        if (!url) {
          editor.chain().focus().unsetLink().run()
          return
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
      },
      pressed: editor.isActive('link')
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive('highlight')
    },
    {
      icon: <MdOutlineHorizontalRule className="size-4" />,
      onClick: () => editor.chain().focus().setHorizontalRule().run(),
      pressed: editor.isActive('horizontalRule')
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive('bulletList')
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive('orderedList')
    }
  ]

  return (
    <div className="text-editor-toolbar">
      { options.map((option, index) => (
        <Toggle
          key={ index }
          size="sm"
          variant="default"
          pressed={ option.pressed }
          onPressedChange={ option.onClick }
          className="text-editor-toolbar-btn"
        >
          { option.icon }
        </Toggle>
      )) }
    </div>
  )
}