import { Select,SelectTrigger,SelectContent,SelectItem,SelectValue } from "@/components/ui/select"

export default function Filters({setFilters, genres}){

 const handleGenre=(value)=>{
  setFilters(prev=>({...prev,with_genres:value}))
 }

 const handleYear=(value)=>{
  setFilters(prev=>({...prev,primary_release_year:value}))
 }

 return(

  <div className="flex gap-4">

   <Select onValueChange={handleGenre}>
    <SelectTrigger className="w-45">
     <SelectValue placeholder="Genre"/>
    </SelectTrigger>

    <SelectContent>
     
     {genres.map(genre => (
      <SelectItem key={genre.id} value={genre.id}>
       {genre.name}
      </SelectItem>
     ))}
    </SelectContent>

   </Select>

   <Select onValueChange={handleYear}>
    <SelectTrigger className="w-30">
     <SelectValue placeholder="Year"/>
    </SelectTrigger>

    <SelectContent>
        {Array.from({length:30},(_,i)=>2024-i).map(year=>(
            <SelectItem key={year} value={year}>
                {year}
            </SelectItem>
        ))}
    </SelectContent>

   </Select>

  </div>

 )
}