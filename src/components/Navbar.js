"use client";

import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth"

export default function Navbar(){
  const supabase = createClient();
  const router = useRouter();
  const { isLoggedIn } = useAuth()

  async function logout(){
    await supabase.auth.signOut();
    router.refresh();
  }

  return(

    <nav className="navbar navbar-expand-lg bg-light">

      <div className="container">

        <Link className="navbar-brand" href="/">
          Badminton Club
        </Link>

        <div className="navbar-nav ms-auto">
          {isLoggedIn ? (
            <>
              <Link className="nav-link" href="/admin">
                Admin
              </Link>

              <button
                className="btn btn-outline-danger ms-3"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link className="nav-link" href="/login">
              Login
            </Link>
          )}

        </div>

      </div>

    </nav>
  );
}