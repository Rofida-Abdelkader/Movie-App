import { useSearchParams } from "react-router-dom"
import { useEffect,useState } from "react"
import { searchMovies } from "../services/api"

import MovieCard from "../components/MovieCard"
import Pagination from "../components/Pagination"
import { SkeletonCards } from "@/components/SkeletonCards"
import useLanguageStore from "@/store/Language"
import { useTranslation } from "react-i18next"

export default function Search(){
    const { t } = useTranslation()
    const [params] = useSearchParams()
    const [loading, setLoading] = useState(true)
    const query = params.get("q")
    const language=useLanguageStore((state) => state.language)
    const [movies,setMovies]=useState([])
    const [totalPages, setTotalPages] = useState(1)
    const page = Number(params.get("page")) || 1

  useEffect(()=>{

  const fetchSearch=async()=>{
    try{
    setLoading(true)
    const res = await searchMovies(query,page,language)
    setTotalPages(res.data.total_pages)

    setMovies(res.data.results)
    setLoading(false)
    }catch(error){
      console.error("Search error:", error)
      setLoading(false)
    }
  }

  fetchSearch()

  },[query,page,language])

  return(

    <div className="container mx-auto p-6 min-h-screen">

    <h2 className="text-2xl font-bold mb-6 text-black dark:text-white transition-colors">
      {t('search.results_for', 'Results for')} "{query}"
    </h2>

    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

      {loading ? (
        <SkeletonCards />
      ) : movies?.length ? (
        movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      ) : (
        <>
        <p className="col-span-full text-center text-muted-foreground">
          No movies found
        </p>
        <SkeletonCards />
        </>
      )}

    </div>

    <Pagination
      totalPages={totalPages}
    />
  
    </div>

  )
  }