import supabase from "../lib/supabaseClient";
import * as uploader from '../lib/uploadhelpers';
import rows from "../styles/rows.module.css"
import infoStyles from "../styles/info.module.css"
import formStyles from "../styles/forms.module.css"
import ContentCard from "../components/ContentCard"
import Errorbox from "../components/Errorbox"
import { useState, useRef, useReducer, useEffect } from "react";
import { useScreenSize, joinClasses } from "../lib/utils";

export default function uploadPage({ user, authError }) {
    if (authError) return <Errorbox title="Unauthorized" message="You're not authorized to access this page :/" code={401} />
    const [error, setError] = useState("")
    const [width] = useScreenSize();
    const videoInput = useRef();
    const bannerInput = useRef();
    const posterInput = useRef();    
    const uploadButton = useRef();    
    const [progress, updateprogress] = useReducer(objectReducer, {percent: 0, status: "not_started"})
    const [meta, updatemeta] = useReducer(objectReducer, {
        title: "",
        summary: "",
        short: "",
        tags: [],
        public: true,
    });
    const [preview, updatePreview] = useReducer(objectReducer, {
        banner: "http://localhost:3000/OG_IMG.png",
        poster: "http://localhost:3000/content-placeholder.png",
        video: ""
    })
    function previewFile(e) {
        let previewUrl = URL.createObjectURL(e.target.files[0]);
        switch (e.target.id) {
            case "bannerimgInput":
                updatePreview({ banner: previewUrl });
                break;
            case "posterimgInput":
                updatePreview({ poster: previewUrl });
                break;
            case "videoInput":
                updatePreview({ video: previewUrl });
                break;
        };
    }
    function addTag(e) {
        if (["Space", "Enter"].includes(e.code)) {
            let currentTags = meta.tags.slice();
            let newTag = e.target.value;
            e.target.value = "";
            if (currentTags.includes(newTag)) return;
            currentTags.push(newTag.toString().trim().toLowerCase());
            updatemeta({ tags: currentTags })
        }
    }
    function removeTag(e) {
        const currentTag = e.target.parentElement.innerText;
        const index = meta.tags.indexOf(currentTag);
        if (index > -1) {
            let tags = meta.tags.slice();
            tags.splice(index, 1);
            updatemeta({ tags })
        }
    }
    function validateForm(){
        if (!videoInput.current.files[0]) return "no video selected"
        if (!bannerInput.current.files[0]) return "no banner selected"
        if (!["image/png", "image/jpeg", "image/gif", "image/webp"].includes(bannerInput.current.files[0].type)) return "bad banner image format"
        if (!posterInput.current.files[0]) return "no poster selected"
        if (!["image/png", "image/jpeg", "image/gif", "image/webp"].includes(posterInput.current.files[0].type)) return "bad poster image format"
        if (meta.title === "" || meta.summary === "") return "title and summary required"
        return true;
    }

    useEffect(()=>{
            validateForm() === true ? (uploadButton.current.disabled = false) : (uploadButton.current.disabled = true);
    }, [meta, preview])

    async function submit() {
        let validate = validateForm();
        if(validate !== true) return setError({title: "Validation error", msg: validate})

        let videoId;
        try {
            updateprogress({status: "upload_started"});

            videoId = await uploader.createVideo(meta.title);
            updateprogress({status: "video_created"});

            await uploader.uploadVideo(videoInput.current.files[0], videoId)
            updateprogress({status: "video_uploaded"});

            let fileExt = posterInput.current.files[0].name.split(".")[1];
            const posterUrl = await uploader.uploadPoster((posterInput.current.files[0]), `${videoId}_poster.${fileExt}`)
            updateprogress({status: "poster_uploaded"});
            
            fileExt = bannerInput.current.files[0].name.split(".")[1];
            const bannerUrl = await uploader.uploadBanner(bannerInput.current.files[0], `${videoId}_banner.${fileExt}`)
            updateprogress({status: "banner_uploaded"})
            
            uploader.updateDatabase({
                ...meta,
                id: videoId,
                posterUrl,
                bannerUrl
            })
            updateprogress({status: "Success!"})
        } catch (error) {
            setError({title: String(error.title || ""), msg: String(error.msg || error)})
        }
    }
    return (<>
        {error && <Errorbox title={error.title || "500 - Something went wrong on our end."} message={error.msg} options={["close"]} action={() => setError(false)} />}

        <h1 style={{ textAlign: "center" }}>Upload a video</h1>
        <section className={joinClasses(formStyles.container, formStyles.double)}>
            <form className={joinClasses(formStyles.form, formStyles.leftPanel)}>
                <label htmlFor="titleInput">Title: </label>
                <input id="titleInput" type="text" onChange={(e) => updatemeta({ title: e.target.value })} />

                <label htmlFor="summaryInput">Summary:</label>
                <textarea id="summaryInput" onChange={(e) => updatemeta({ summary: e.target.value })} style={{ border: (width > 800) ? "3px solid var(--theme-color)" : undefined }} />

                <label htmlFor="shortInput">Short description</label>
                <input id="shortInput" type="text" onChange={(e) => { updatemeta({ short: (e.target.value) }); }} style={{ border: (width <= 800) ? "3px solid var(--theme-color)" : undefined }} />

                <label>Tags:</label>
                {(meta.tags.length > 0) && <ul className={formStyles.tagsList}>
                    {meta.tags.map((tag) => {
                        return <li key={(tag)}>{tag}<i className="fas fa-times" onClick={removeTag} style={{ cursor: "pointer", marginLeft: "10px" }} /></li>
                    })}
                </ul>}
                <input id="tagsInput" type="text" onKeyUp={addTag} placeholder="add tags" />

                <label htmlFor="publicInput">Public </label>
                <br />
                <label className={formStyles.switch}>
                    <input id="publicInput" type="checkbox" checked={meta.public} onChange={(e) => updatemeta({ public: (e.target.checked) })} />
                    <span className={formStyles.slider}></span>
                </label>
            </form>


            <div className={formStyles.divider} />


            <form className={joinClasses(formStyles.form, formStyles.rightPanel)}>
                <label htmlFor="videoInput" className={formStyles.fileSelector} onDragEnter={(e) => e.target.style = "border: 3px solid var(--theme-color)"} onDragLeave={(e) => e.target.style = "border: none"} onDrop={(e) => { e.preventDefault(); e.stopPropagation(); console.log(e.dataTransfer) }}>
                    {preview.video ?
                        <video src={preview.video} controls playsInline className={formStyles.previewfile} /> :
                        <i className="fas fa-cloud-upload-alt" />}
                </label>
                <input type="file" id="videoInput" accept=".mp4" style={{ display: "none" }} ref={videoInput} onChange={previewFile} />
                <br />
                <label>Banner Image: <input type="file" id="bannerimgInput" onChange={previewFile} accept=".png, .jpg, .jpeg, .webp, .gif" ref={bannerInput} /></label>
                <label>Poster Image: <input type="file" id="posterimgInput" onChange={previewFile} accept=".png, .jpg, .jpeg, .webp, .gif" ref={posterInput} /></label>
            </form>
            <button className={formStyles.uploadbtn} onClick={submit} ref={uploadButton}>Upload!</button>
            {progress.status !== "not_started" && <p>Status: {progress.status}<progress/></p>}
        </section>

        <pre style={{ width: "90%", overflow: "scroll", margin: "auto" }}>
            {JSON.stringify(meta)}
        </pre>

        <h1 style={{ textAlign: "center" }}>Preview upload:</h1>
        <section style={{ backgroundImage: `url(${preview.banner})`, backgroundSize: "cover", backgroundPosition: "center", width: "80%", margin: "50px auto", position: "relative" }} >
            <label htmlFor="bannerimgInput" className={formStyles.bannerInput}>Edit banner <i className="fas fa-paint-roller" /></label>
            <div className={rows.infoBanner} style={{ width: "100%" }}>
                <label htmlFor="posterimgInput" style={{ cursor: "pointer" }}><ContentCard src={preview.poster} /></label>
                <div className={infoStyles.textWrapper}>
                    <h1 className={infoStyles.title}>{meta.title || "Sample Title"}</h1>
                    <p className={infoStyles.description}>{width > 800 ? (meta.summary || "Sample summary") : (meta.short || "Sample short")}</p>
                    <span className={infoStyles.links}>
                        <button className={infoStyles.watchLink}></button>
                        <button className={infoStyles.infoLink}></button>
                    </span>
                </div>
            </div>
        </section>
    </>)
}

export async function getServerSideProps({ req }) {
    const { user } = await supabase.auth.api.getUserByCookie(req);
    if (user && user.user_metadata.role === "admin") {
        return { props: { user } }
    } else {
        return { props: { authError: true } }
    }
}

function objectReducer(state, action) {
    let param = Object.keys(action)[0];
    return { ...state, [param]: action[param] }
}