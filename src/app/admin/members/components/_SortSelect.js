"use client";

export default function SortSelect({value,onChange}){

 return(

  <select
   className="form-select"
   value={value}
   onChange={(e)=>onChange(e.target.value)}
  >

   <option value="name">
    Sort by Name
   </option>

   <option value="joined">
    Sort by Join Date
   </option>

   <option value="attendance">
    Sort by Attendance
   </option>

  </select>

 )

}