import { Select,SelectTrigger,SelectContent,SelectItem,SelectValue } from "@/components/ui/select"
import { useTranslation } from "react-i18next"

export default function SortSelect({setFilters}){
    const { t } = useTranslation()

    const SORT_OPTIONS = [
 { id:1, label: t('home.most_popular'), value:"popularity.desc" },
 { id:2, label: t('home.least_popular'), value:"popularity.asc" },
 { id:3, label: t('home.top_rated'), value:"vote_average.desc" },
 { id:4, label: t('home.lowest_rated'), value:"vote_average.asc" },
 { id:5, label: t('home.newest'), value:"release_date.desc" },
 { id:6, label: t('home.oldest'), value:"release_date.asc" }
]
 return(

  <Select
   onValueChange={(value)=>
    setFilters(prev=>({...prev,sort_by:value}))
   }
  >

   <SelectTrigger className="w-50 bg-white dark:bg-[#111827] border-gray-300 dark:border-gray-800 text-black dark:text-white transition-colors">
    <SelectValue placeholder={t('home.sort')}/>
   </SelectTrigger>

   <SelectContent className="bg-white dark:bg-[#111827] border-gray-200 dark:border-gray-800 text-black dark:text-white">
    {SORT_OPTIONS.map(sort=>(
     <SelectItem key={sort.value} value={sort.value}>
      {sort.label}
     </SelectItem>
    ))}
   </SelectContent>

  </Select>

 )
}