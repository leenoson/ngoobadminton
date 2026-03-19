"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import "./login.scss";

export default function LoginPage() {

  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    router.refresh();
    router.replace("/admin");
  };

  return (
    <>
      <div className="container">
        <form onSubmit={login} className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal">Admin login</h1>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input
            type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus
            onChange={(e)=>setEmail(e.target.value)}
          />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input
            type="password" id="inputPassword" className="form-control" placeholder="Password" required
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            className="btn btn-lg btn-primary w-100"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>
    </>
  );
}