import { useRouter } from "next/router"

export default function watch(props){
    const router = useRouter();
    return <p>Watch page for {router.query.id} </p>
}