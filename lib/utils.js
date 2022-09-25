import { useState, useEffect } from "react";
import supabase from "./supabaseClient";

export function makeSerializable(o) {
    return JSON.parse(JSON.stringify(o, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
    ));
}
export function useResponsiveDescription(descriptions, breakpoint = 800) {
    let [description, setDescription] = useState();
    let [screenwidth, setScreenwidth] = useState();
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize)
    })
    function handleResize() {
        setScreenwidth(window.innerWidth);
    }
    useEffect(() => {
        setDescription((screenwidth > breakpoint) ? descriptions.summary : descriptions.short);
    }, [screenwidth])
    return description;
}

export function useScreenSize() {
    let [screenwidth, setScreenwidth] = useState(0);
    let [screenheight, setScreenheight] = useState(0);
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize)
    })
    function handleResize() {
        setScreenwidth(window.innerWidth);
        setScreenheight(window.innerHeight);
    }
    return [screenwidth, screenheight];
}

export function useAuth() {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null)
    useEffect(() => {
        const user = supabase.auth.user();
        if (user) setUser(user);
    }, [])
    supabase.auth.onAuthStateChange((event, session) => {
        setSession(session);
        setUser(session?.user)

    })
    return [user, session];
}

export function joinClasses() {
    let className = '';
    for (let i = 0; i < arguments.length; i++) {
        className = className + (i === 0 ? "" : " ") + arguments[i];
    }
    return className;
}