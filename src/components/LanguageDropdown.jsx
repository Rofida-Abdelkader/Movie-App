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
      <SelectTrigger className="w-22.5">
        <SelectValue placeholder="Lang" />
      </SelectTrigger>

      <SelectContent>
  {languages.map((lang)=>(
    <SelectItem key={lang} value={lang}>
      {lang.toUpperCase()}
    </SelectItem>
  ))}
</SelectContent>
    </Select>
  )
}