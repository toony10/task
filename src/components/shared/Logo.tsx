import Image from "next/image";
import Link from "next/link";

interface LogoProps {
    width?: number
    height?: number
}
export default function Logo({ width = 100, height = 100 }: LogoProps) {
    return (
        <Link href="/">
            <Image src="/assets/images/Logo.svg" alt="Logo" width={ width } height={ height } sizes="100vw" />
        </Link>
    );
}