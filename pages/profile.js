import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../lib/supabaseClient";
import styles from "../styles/login.module.css"

export default function ProfilePage() {
    const router = useRouter();
    const [profile, setProfile] = useState(null);
    const [name, setName] = useState("");
    const [state, setState] = useState({});
    useEffect(fetchProfile, []);

    function fetchProfile() {
        const profileData = supabase.auth.user();
        if (profileData) {
            setProfile(profileData);
            setName(profileData.user_metadata.name)
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
        setState({ waiting: true })
        await supabase.auth.signOut();
        router.push("/login")
    }

    if (!profile) return <p>You're not signed in. <a href="/login">login -&gt;</a></p>
    return (
        <section className={styles.container}>
            <div className={styles.textwrapper}>
                <img src={`https://avatars.dicebear.com/api/adventurer/${profile.user_metadata.name || "me"}.svg?r=50&scale=50`} width="100px" height="100px"/>
                <h2>Welcome, {profile.user_metadata.name || profile.email}!</h2>
                <label>Name:
                    <input
                        type="text"
                        placeholder="name"
                        onChange={e => { setName(e.target.value) }}
                        className={styles.name}
                        value={name} />
                </label>
                <p style={{ color: "white" }}>Email: {profile.email}</p>
                {name !== profile.user_metadata.name && <button onClick={updateProfile}>update name</button>}
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )
}