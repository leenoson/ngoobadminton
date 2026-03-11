import { createClient } from "@/lib/supabase/client";

export async function deleteAvatar(path){

 if(!path) return;

 const supabase = createClient();

 await supabase
  .storage
  .from("avatars")
  .remove([path]);

}