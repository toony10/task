import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

interface BtnProps {
    onClick?: () => void
    className?: string
    type?: "button" | "submit" | "reset"
    children?: React.ReactNode
    disabled?: boolean
}

export function FillBtn({ onClick, className, type, disabled, children }: BtnProps) {
    return (
        <Button variant="default" onClick={ onClick } type={ type } className={ cn("font-bold text-base bg-primary text-primary-foreground hover:bg-primary/93 cursor-pointer shadow-md hover:shadow-none transition-all duration-300 py-5 px-6 border border-gray-300", className) } disabled={ disabled }>
            { children }
        </Button>
    )
}

export function OutlineBtn({ onClick, className, type, disabled, children }: BtnProps) {
    return (
        <Button variant="outline" onClick={ onClick } type={ type } className={ cn("cursor-pointer shadow-md hover:shadow-none transition-all duration-300 py-5 px-6", className) } disabled={ disabled }>
            { children }
        </Button>
    )
}