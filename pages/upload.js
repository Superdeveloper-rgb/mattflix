import supabase from "../lib/supabaseClient";
import rows from "../styles/rows.module.css"
import infoStyles from "../styles/info.module.css"
import formStyles from "../styles/forms.module.css"
import ContentCard from "../components/ContentCard"
import Errorbox from "../components/Errorbox"
import { useState, useRef } from "react";
import { useScreenSize, joinClasses } from "../lib/utils";

export default function uploadPage({ user, authError }) {
    const [options, setOptions] = useState({
        title: "",
        summary: "",
        short: "",
        tags: [],
        public: true,
    })
    const [previewBanner, setPreviewBanner] = useState("http://localhost:3000/OG_IMG.png")
    const [previewPoster, setPreviewPoster] = useState("http://localhost:3000/content-placeholder.png")
    const [previewVideo, setPreviewVideo] = useState("")
    const [error, setError] = useState("")
    const [width] = useScreenSize();
    const videoInput = useRef();
    const bannerInput = useRef();
    const posterInput = useRef();
    const uploadbtn = useRef();
    if(authError) return <Errorbox title="Unauthorized" msg="You're not authorized to access this page :/" code={403}/>
    function previewFile(e) {
        if (e.target.files[0].size > 10485760) return // larger than 10mb
        e.preventDefault();
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            switch (e.target.id) {
                case "bannerimgInput":
                    setPreviewBanner(reader.result);
                    break;
                case "posterimgInput":
                    setPreviewPoster(reader.result);
                    break;
                case "videoInput":
                    setPreviewVideo(reader.result);
                    break;
            }
        };
    }
    function addTag(e) {
        if (["Space", "Enter"].includes(e.code)) {
            let currentTags = options.tags.slice();
            let newTag = e.target.value;
            e.target.value = "";
            if (currentTags.includes(newTag)) return;
            currentTags.push(newTag.toString().trim().toLowerCase());
            setOptions({ ...options, tags: currentTags })
        }
    }
    function removeTag(e) {
        const currentTag = e.target.parentElement.innerText;
        const index = options.tags.indexOf(currentTag);
        if (index > -1) {
            let tags = options.tags.slice();
            tags.splice(index, 1);
            setOptions({ ...options, tags })
        }
    }
    async function uploadVideo(file) {
        if (!file) return setError({ title: "No video file detected", msg: "Please select a video to upload." })
        if (file?.type !== "video/mp4") return setError({ title: "File incompatible", msg: "Sorry, only mp4 files allowed." })
        if (options.title === "" || options.summary === "[Summary]") return setError({ title: "Validation Error", msg: "Please enter a title and summary." })
        uploadbtn.current.disabled = true;
        let videoId, posterUrl, bannerUrl;
        // Create a video placeholder first
        try {
            let response = await fetch(`https://video.bunnycdn.com/library/${process.env.bunny_library_id}/videos`, {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/*+json',
                    AccessKey: process.env.bunny_api_key
                },
                body: JSON.stringify({ title: options.title })
            })
            let { guid } = await response.json();
            if (guid){
                videoId = guid;
            } else {
                throw "couldn't create video";
            }
            // Upload video
            let secondresponse = await fetch(`https://video.bunnycdn.com/library/${process.env.bunny_library_id}/videos/${guid}`, { // Your POST endpoint
                method: 'PUT',
                headers: {
                    accept: 'application/json',
                    AccessKey: process.env.bunny_api_key
                },
                body: file
            });
            let success = await secondresponse.json();
            console.log(success);
        } catch (error) {
            setError({title: "Couldn't create video", msg: JSON.stringify(error)})
        }
        try{
            let { data, error } = await supabase
                .storage
                .from('images')
                .upload(`posters/${videoId + posterInput.current.files[0].name}`, posterInput.current.files[0], {
                    cacheControl: '3600',
                    upsert: false
                });
            if(error) setError({title: "Couldn't upload poster image", msg: JSON.stringify(error), code: 500});
            posterUrl = `https://qljofhjoesymsnflrljl.supabase.co/storage/v1/object/public/${data.Key}`;
            ({ data, error } = await supabase
                .storage
                .from('images')
                .upload(`banners/${videoId + bannerInput.current.files[0].name}`, posterInput.current.files[0], {
                    cacheControl: '3600',
                    upsert: false
                }));
            if(error) setError({title: "Couldn't upload poster image", msg: JSON.stringify(error), code: 500})
            bannerUrl = `https://qljofhjoesymsnflrljl.supabase.co/storage/v1/object/public/${data.Key}`;
            ({ data, error } = await supabase.from('content').insert([{
                title: options.title,
                summary: options.summary,
                short: options.short,
                tags: options.tags,
                public: String(options.public),
                // bunny_id: guid,
                poster_url: posterUrl,
                banner_url: bannerUrl,
                play_url: "n/a"
            }]));
            if(error) setError({title: "Couldn't add video to database", msg: JSON.stringify(error), code: 500})
            window.alert("Success!")
        } catch (error) {
            console.log(error)
        }
    }
    return (<>

        {error && <Errorbox title={error.title || "500 - Something went wrong on our end."} message={error.msg} options={["close"]} action={() => setError(false)} />}
        <h1 style={{ textAlign: "center" }}>Upload a video</h1>
        <section className={joinClasses(formStyles.container, formStyles.double)}>
            <form className={joinClasses(formStyles.form, formStyles.leftPanel)}>
                <label htmlFor="titleInput">Title: </label>
                <input id="titleInput" type="text" onChange={(e) => { setOptions({ ...options, title: (e.target.value) }); }} />
                <label htmlFor="summaryInput">Summary:</label>
                <textarea id="summaryInput" onChange={(e) => { setOptions({ ...options, summary: (e.target.value) }); }} style={{ border: (width > 800) ? "3px solid var(--theme-color)" : undefined }} />
                <label htmlFor="shortInput">Short description</label>
                <input id="shortInput" type="text" onChange={(e) => { setOptions({ ...options, short: (e.target.value) }); }} style={{ border: (width <= 800) ? "3px solid var(--theme-color)" : undefined }} />
                <label>Tags:</label>
                <ul className={formStyles.tagsList}>
                    {options.tags.map((tag) => {
                        return <li key={(tag)}>{tag}<i className="fas fa-times" onClick={removeTag} style={{ cursor: "pointer", marginLeft: "10px" }} /></li>
                    })}
                </ul>
                <input id="tagsInput" type="text" onKeyUp={addTag} placeholder="add tags" />

                <label htmlFor="publicInput">Public </label>
                <br />
                <label className={formStyles.switch}>
                    <input id="publicInput" type="checkbox" checked={options.public} onChange={(e) => { setOptions({ ...options, public: (e.target.checked) }) }} />
                    <span className={formStyles.slider}></span>
                </label>
            </form>
            <div className={formStyles.divider} />
            <form className={joinClasses(formStyles.form, formStyles.rightPanel)}>
                <h2>Video</h2>
                {previewVideo ? (
                    <video src={previewVideo} width="192px" height="144px" controls playsInline />
                ) : (
                    <label htmlFor="videoInput" className={formStyles.fileSelector}><i className="fas fa-cloud-upload-alt" /></label>
                )}
                <input type="file" id="videoInput" accept=".mp4" style={{ display: "none" }} ref={videoInput} onChange={previewFile} />
                <br />
                <label>Banner Image: <input type="file" id="bannerimgInput" onChange={previewFile} accept=".png, .jpg, .jpeg, .webp, .gif" ref={bannerInput} /></label>
                <label>Poster Image: <input type="file" id="posterimgInput" onChange={previewFile} accept=".png, .jpg, .jpeg, .webp, .gif" ref={posterInput} /></label>
            </form>
            <button className={formStyles.uploadbtn} onClick={() => uploadVideo(videoInput.current.files[0])} ref={uploadbtn}>Upload!</button>
        </section>
        <br />
        <br />
        <pre style={{ width: "90%", overflow: "scroll", margin: "auto" }}>
            {JSON.stringify(options)}
        </pre>
        <h1 style={{ textAlign: "center" }}>Preview upload:</h1>
        <section style={{ backgroundImage: `url(${previewBanner})`, backgroundSize: "cover", backgroundPosition: "center", width: "80%", margin: "50px auto", position: "relative" }} >
            <label htmlFor="bannerimgInput" className={formStyles.bannerInput}>Edit banner <i className="fas fa-paint-roller" /></label>
            <div className={rows.infoBanner} style={{ width: "100%" }}>
                <label htmlFor="posterimgInput" style={{ cursor: "pointer" }}><ContentCard src={previewPoster} /></label>
                <div className={infoStyles.textWrapper}>
                    <h1 className={infoStyles.title}>{options.title || "Sample Title"}</h1>
                    <p className={infoStyles.description}>{width > 800 ? (options.summary || "Sample summary") : (options.short || "Sample short")}</p>
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
        return { props: {authError: true} }
    }
}