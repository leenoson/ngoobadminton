export async function loginWithEmail(supabase, { email, password }) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error("INVALID_CREDENTIALS")
  }

  return true
}
