import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../lib/supabaseClient";

export default function ProfilePage() {
    const router = useRouter();
    const [profile, setProfile] = useState(null);
    useEffect(fetchProfile, []);

    function fetchProfile() {
        const profileData = supabase.auth.user();
        if (profileData) {
            setProfile(profileData);
        } else {
            router.push("/login")
        }
    }
    async function logout() {
        await supabase.auth.signOut();
        router.push("/login")
    }

    if (!profile) return <p>You're not signed in. <a href="/login">login -&gt;</a></p>
    return (
        <div style={{ maxWidth: '420px', margin: '96px auto' }}>
            <h2>Hello, {profile.email}</h2>
            <p>User ID: {profile.id}</p>
            <button onClick={logout}>Sign Out</button>
        </div>
    )
}