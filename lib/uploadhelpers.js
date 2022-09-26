import supabase from "./supabaseClient";

export async function createVideo(name) {
    let response = await fetch(`https://video.bunnycdn.com/library/${process.env.bunny_library_id}/videos`, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/*+json',
            AccessKey: process.env.bunny_api_key
        },
        body: JSON.stringify({ title: name })
    })
    let { guid } = await response.json();
    if (guid) {
        return guid;
    } else {
        throw { title: "create video failed", msg: "could not create video on bunny.net" }
    }
}

export async function uploadVideo(file, id) {
    if (!file) return;
    if (file.type !== "video/mp4") throw { title: "File incompatible", msg: "Sorry, only mp4 files allowed." }
    let response = await fetch(`https://video.bunnycdn.com/library/${process.env.bunny_library_id}/videos/${id}`, {
        method: 'PUT',
        headers: {
            accept: 'application/json',
            AccessKey: process.env.bunny_api_key
        },
        body: file
    });
    let { success } = await response.json();
    if (success) {
        return success;
    } else throw { title: "Upload Failed", msg: "Couldn't upload video to bunny.net" }
}

export async function uploadPoster(file, filename) {
    if (!file || !filename) return;
    let { data, error } = await supabase
        .storage
        .from('images')
        .upload(`posters/${filename}`, file, {
            cacheControl: '3600',
            upsert: false
        });
    if (error) throw { title: "Couldn't upload poster image", msg: JSON.stringify(error) };
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.Key}`;
}
export async function uploadBanner(file, filename) {
    if (!file || !filename) return;
    let { data, error } = await supabase
        .storage
        .from('images')
        .upload(`banners/${filename}`, file, {
            cacheControl: '3600',
            upsert: false
        });
    if (error) throw { title: "Couldn't upload banner image", msg: JSON.stringify(error) };
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.Key}`;
}
export async function updateDatabase(values) {
    let { data, error } = await supabase.from('content').insert([{
        title: values.title,
        summary: values.summary,
        short: values.short,
        tags: values.tags,
        public: String(values.public),
        // bunny_id: values.id,
        poster_url: values.posterUrl,
        banner_url: values.bannerUrl,
        play_url: "n/a"
    }]);
    if (error) throw { title: "Couldn't add video to database", msg: JSON.stringify(error) }
}