export function getStoragePathFromUrl(url){

 if(!url) return null;

 const parts = url.split("/storage/v1/object/public/avatars/");

 return parts[1] || null;

}