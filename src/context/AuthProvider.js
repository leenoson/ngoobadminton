"use client";

import { createContext, useEffect, useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, usePathname } from "next/navigation";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
	const supabase = useMemo(() => createClient(), []);

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
	}, [supabase]);

	useEffect(() => {
		const { data: listener } = supabase.auth.onAuthStateChange(
			(_, session) => {
				setUser(session?.user ?? null);
			}
		);

		return () => listener.subscription.unsubscribe();
	}, [supabase]);

	useEffect(() => {
		if (loading) return;

		if (!user && pathname.startsWith("/admin")) {
			router.replace("/login");
			return;
		}

		if (user && pathname === "/login") {
			router.replace("/admin");
			return;
		}
	}, [user, loading, pathname, router]);

	return (
		<AuthContext.Provider value={{ user, loading }}>
			{children}
		</AuthContext.Provider>
	);
}