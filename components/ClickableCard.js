import ContentCard from "./ContentCard";
import Link from "next/link";
export default function ClickableCard({slug, poster}) {
    return <Link href={slug}><a><ContentCard src={poster} /></a></Link>
}