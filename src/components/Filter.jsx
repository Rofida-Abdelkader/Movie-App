import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { useTranslation } from "react-i18next"

export default function Filters({ setFilters, genres }) {
  const { t } = useTranslation()

  const handleGenre = (value) => {
    setFilters(prev => ({ ...prev, with_genres: value }))
  }

  const handleYear = (value) => {
    setFilters(prev => ({ ...prev, primary_release_year: value }))
  }

  return (
    <div className="flex gap-4">
      <Select onValueChange={handleGenre}>
        <SelectTrigger className="w-45 bg-white dark:bg-[#111827] border-gray-300 dark:border-gray-800 text-black dark:text-white transition-colors">
          <SelectValue placeholder={t('home.genre')} />
        </SelectTrigger>

        <SelectContent className="bg-white dark:bg-[#111827] border-gray-200 dark:border-gray-800 text-black dark:text-white">
          {genres.map(genre => (
            <SelectItem key={genre.id} value={genre.id}>
              {genre.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={handleYear}>
        <SelectTrigger className="w-30 bg-white dark:bg-[#111827] border-gray-300 dark:border-gray-800 text-black dark:text-white transition-colors">
          <SelectValue placeholder={t('home.year')} />
        </SelectTrigger>

        <SelectContent className="bg-white dark:bg-[#111827] border-gray-200 dark:border-gray-800 text-black dark:text-white">
          {Array.from({ length: 30 }, (_, i) => 2024 - i).map(year => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}