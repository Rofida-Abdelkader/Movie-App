import { useEffect, useState } from "react"
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
import { useTranslation } from "react-i18next"

export default function Home() {
    const { t } = useTranslation()
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const language = useLanguageStore((state) => state.language);
    const [totalPages, setTotalPages] = useState(1)
    const [genres, setGenres] = useState([])
    const [searchParams] = useSearchParams()
    const page = Number(searchParams.get("page")) || 1
    const [filters, setFilters] = useState({
        sort_by: "popularity.desc"
    })

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const res = await getGenres(language)
                setGenres(res.data.genres)
            } catch (error) {
                console.error("Failed to fetch genres", error)
            }
        }
        fetchGenres()
    }, [language])

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true)
                const movieList = await discoverMovies({
                    page: page,
                    language: language,
                    ...filters
                })
                setMovies(movieList.data.results)
                setTotalPages(movieList.data.total_pages)
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                toast.error(t('empty_state.error_title'))
            } finally {
                setLoading(false)
            }
        }
        fetchMovies()
    }, [page, filters, language, t])

    return (
        <div className="container mx-auto p-6 transition-colors duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-6">
                <Filters setFilters={setFilters} genres={genres} />
                <SortSelect setFilters={setFilters} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
                {loading ? (
                    <SkeletonCards />
                ) : movies.length > 0 ? (
                    movies.map(movie => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <p className="text-xl font-bold text-gray-500">{t('empty_state.no_results_title')}</p>
                    </div>
                )}
            </div>

            <div className="mt-12 flex justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    )
}
