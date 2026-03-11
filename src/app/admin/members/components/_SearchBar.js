"use client";

export default function SearchBar({value,onChange}){

 return(

  <input
   className="form-control"
   placeholder="Search 2 members..."
   value={value}
   onChange={(e)=>onChange(e.target.value)}
  />

 )

}