import { cn } from '@/lib/utils'

interface HtmlContentProps {
  /** Raw HTML string (e.g. from TipTap or API). Prefer sanitized content. */
  html: string
  className?: string
}

/**
 * Renders plain HTML as formatted content for display.
 * Use for editor output or stored rich text. Ensure HTML is from a trusted or sanitized source.
 */
export default function HtmlContent({ html, className }: HtmlContentProps) {
  if (!html?.trim()) return null

  return (
    <div
      className={ cn(
        'text-editor-content',
        className
      ) }
      dangerouslySetInnerHTML={ { __html: html } }
    />
  )
}
