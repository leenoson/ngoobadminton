import { createClient } from "@/lib/supabase/client";
import { compressImage } from "./compressImage";

export async function uploadAvatar(file) {

  const supabase = createClient();

  const compressedFile = await compressImage(file);

  const fileExt = compressedFile.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `members/${fileName}`;

  const { error } = await supabase
    .storage
    .from("avatars")
    .upload(filePath, compressedFile);

  if (error) throw error;

  const { data } = supabase
    .storage
    .from("avatars")
    .getPublicUrl(filePath);

  return data.publicUrl;
}