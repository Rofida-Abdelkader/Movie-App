import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import useLanguageStore from "@/store/Language"

export default function LanguageDropdown({ language, setLanguage }) {
  const languages = useLanguageStore((state) => state.languages)
  return (
    <Select value={language} onValueChange={setLanguage}>
      <SelectTrigger className="w-28 bg-transparent border-none focus:ring-0 font-bold uppercase text-[13px] hover:text-[#01b4e4] transition-colors">
        <SelectValue placeholder="Lang" />
      </SelectTrigger>

      <SelectContent className="bg-white dark:bg-[#0d1b2a] border-gray-200 dark:border-gray-800">
        {languages.map((lang) => (
          <SelectItem key={lang} value={lang} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
            {lang === 'en' ? 'English' : 
             lang === 'ar' ? 'العربية' : 
             lang === 'fr' ? 'Français' : 
             lang === 'it' ? 'Italiano' : 
             lang === 'es' ? 'Español' : 
             'Deutsch'}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}