import Link from "next/link";

export default function newPage(){
    return (<>
    <h1>Welcome to new</h1>
    <p>Here you'll find the latest trending content on Mattflix. Enjoy!</p>
    <Link href="/"><a>&lt;-- Zip home</a></Link>
    </>)
}