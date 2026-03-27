import { useEffect,useState } from "react"
import { discoverMovies, getGenres } from "../services/api"

import MovieCard from "../components/MovieCard"
import Filters from "../components/Filter"
import SortSelect from "../components/SortSelect"
import Pagination from "../components/Pagination"
import SearchBar from "../components/SearchBar"
import { useSearchParams } from "react-router-dom"
import { SkeletonCards } from "@/components/SkeletonCards"
import toast from "react-hot-toast"
import useLanguageStore from "@/store/Language"


export default function Home(){

    const [movies,setMovies]=useState([])
    const [loading, setLoading] = useState(true)
    const language = useLanguageStore((state) => state.language);
    const [totalPages, setTotalPages] = useState(1)
    const [genres,setGenres]=useState([])
    const [searchParams] = useSearchParams()
    const page = Number(searchParams.get("page")) || 1
    const [filters,setFilters]=useState({
        sort_by:"popularity.desc"
        })
    
    useEffect(() => {
        const fetchGenres = async () => {
        const res = await getGenres()
        setGenres(res.data.genres)
        }

        fetchGenres()
        }, [])
    
    useEffect(() => {

  const fetchMovies = async () => {

    try {
      setLoading(true)

      const movieList = await discoverMovies({
        page: page,
        language,
        ...filters
      })

      setMovies(movieList.data.results)
      setTotalPages(movieList.data.total_pages)

    } catch (error) {
      toast.error("Failed to fetch movies. Please try again later.")
    } finally {
      setLoading(false)
    }

  }

  fetchMovies()

}, [page, filters, language])

    return(

    <div className="container mx-auto p-6">

    

    <div className="flex justify-between mt-6">
        <Filters setFilters={setFilters} genres={genres} />
        <SortSelect setFilters={setFilters} />
    </div>

    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-8">

        {loading ? (
            <SkeletonCards />
            ) : (
            movies.map(movie => (
                <MovieCard
                key={movie.id}
                movie={movie}
                />
            ))
            )}

    </div>

    <Pagination
        totalPages={totalPages}

    />

    </div>

    )
    }
