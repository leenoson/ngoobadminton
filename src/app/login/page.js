"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {

  const supabase = createClient();

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

    window.location.href = "/admin";
  };

  return (
    <div>

      <h1>Login</h1>

      <form onSubmit={login}>

        <input
          className="form-control mb-3"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

    </div>
  );
}