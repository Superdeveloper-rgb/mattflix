import { useRouter } from "next/router";
import ContentCard from "../../components/ContentCard";
import Info from "../../components/Info";
import rows from '../../styles/rows.module.css'

export default function detailsPage(){
    const {cid} = useRouter().query;

    return (<>
    <section className={rows.largeFeature}>
        <ContentCard default/>
        <Info title={cid} description={`${cid} is a lovely peice about something special`}/>
    </section>
    </>)
}
