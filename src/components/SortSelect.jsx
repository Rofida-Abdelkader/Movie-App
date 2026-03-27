import { Select,SelectTrigger,SelectContent,SelectItem,SelectValue } from "@/components/ui/select"

export default function SortSelect({setFilters}){
    const SORT_OPTIONS = [
 { id:1, label:"Most Popular", value:"popularity.desc" },
 { id:2, label:"Least Popular", value:"popularity.asc" },
 { id:3, label:"Top Rated", value:"vote_average.desc" },
 { id:4, label:"Lowest Rated", value:"vote_average.asc" },
 { id:5, label:"Newest", value:"release_date.desc" },
 { id:6, label:"Oldest", value:"release_date.asc" }
]
 return(

  <Select
   onValueChange={(value)=>
    setFilters(prev=>({...prev,sort_by:value}))
   }
  >

   <SelectTrigger className="w-50">
    <SelectValue placeholder="Sort"/>
   </SelectTrigger>

   <SelectContent>
    {SORT_OPTIONS.map(sort=>(
     <SelectItem key={sort.value} value={sort.value}>
      {sort.label}
     </SelectItem>
    ))}
   </SelectContent>

  </Select>

 )
}