import supabase from "../../lib/supabaseClient";

export default function handler(req, res) {
    if (req.method === "POST") {
        if(req.query.action === "logout") {
            supabase.auth.api.deleteAuthCookie(req, res, {redirectTo: "/login"})
        }else {
            supabase.auth.api.setAuthCookie(req, res);
        }
    } else {
        console.log(req.query.action);
        res.status(405).json({
            message: `Method not allowed`,
        });
    }
}