import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function SearchBar(){

 const [query,setQuery]=useState("")
 const navigate = useNavigate()

 const handleSearch=()=>{
  if(query.trim()){
   navigate(`/search?q=${query}`)
  }
 }

 return(
  <div className="flex gap-2">

   <Input
    placeholder="Search movie..."
    value={query}
    onChange={(e)=>setQuery(e.target.value)}
   />

   <Button onClick={handleSearch}>
    Search
   </Button>

  </div>
 )
}