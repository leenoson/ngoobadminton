"use client";

import { createContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, usePathname } from "next/navigation";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {

	const supabase = createClient();

	const router = useRouter();
  const pathname = usePathname();

	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {

		async function getUser() {
			const { data } = await supabase.auth.getUser();
			setUser(data?.user ?? null)

			setLoading(false);
		}

		getUser();

		const { data: listener } = supabase.auth.onAuthStateChange(
			(_, session) => {
				setUser(session?.user ?? null);

				if (user && pathname === "/login") {
          router.replace("/admin");
        }
			}
		);

		return () => listener.subscription.unsubscribe();

	}, [supabase, pathname, user, router]);

	return (
		<AuthContext.Provider value={{ user, loading }}>
			{children}
		</AuthContext.Provider>
	);
}