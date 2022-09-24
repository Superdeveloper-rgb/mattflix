import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../lib/supabaseClient";
import styles from "../styles/auth.module.css"

export default function ProfilePage() {
    const router = useRouter();
    const [profile, setProfile] = useState(null);
    const [name, setName] = useState("");
    const [state, setState] = useState({});
    useEffect(fetchProfile, []);

    function fetchProfile() {
        setState({ waiting: true })
        const profileData = supabase.auth.user();
        if (profileData) {
            setProfile(profileData);
            setName(profileData.user_metadata.name);
            setState({ waiting: false });
        } else {
            router.push("/login")
        }
    }
    async function updateProfile() {
        setState({ waiting: true })
        const { user, error } = await supabase.auth.update({
            data: {
                name: name,
            }
        });
        if (error) {
            return setState({ error: { msg: "Couldn't update profile", code: 500 }, waiting: false })
        } else {
            setState({ success: true, waiting: false })
            setProfile(user);
        }
    }
    async function logout() {
        setState({ waiting: true });
        await supabase.auth.signOut();
        router.push("/login");
    }

    if (!profile) return <p>Loading...</p>
    return (
        <section className={styles.container}>
            <div className={styles.textwrapper}>
                <img src={`https://avatars.dicebear.com/api/adventurer/${profile.user_metadata.name || "me"}.svg?r=50&scale=50`} className={styles.avatar} alt={name} title="auto generated based on your name" />
                <h2>Welcome, {profile.user_metadata.name || profile.email}!</h2>
                <label>Name:
                    <input
                        type="text"
                        onChange={e => { setName(e.target.value) }}
                        className={styles.name}
                        value={name || ""} />
                </label>
                <label>Email: <input value={profile.email} type="text" disabled /></label>
                <br />
                <br />
                <span>
                    {name !== profile.user_metadata.name && <button onClick={updateProfile} className={styles.actionbtn} disabled={state.waiting}>{state.waiting ? <i className="fas fa-circle-notch" /> : "update name"}</button>}
                    {profile.user_metadata.role === "admin" && <a href="/upload" className={styles.actionbtn}>Upload <i className="fas fa-cloud-upload-alt" /></a>}
                </span>
                <button onClick={logout} className={[styles.primarybtn, styles.actionbtn].join(' ')} disabled={state.waiting}>Sign Out</button>
            </div>
        </section>
    )
}