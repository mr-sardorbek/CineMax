import useLanguage from "@/hooks/useLanguage";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <Select
  value={currentLanguage}
  onValueChange={changeLanguage}
>
  <SelectTrigger
    className="h-9 w-[72px] cursor-pointer border-border bg-background/80 px-2.5
    text-xs font-semibold uppercase shadow-sm backdrop-blur-sm
    hover:bg-accent focus:ring-1 focus:ring-purple-500"
  >
    <SelectValue />
  </SelectTrigger>

  <SelectContent>
    <SelectItem value="uz" className="cursor-pointer">
       UZ
    </SelectItem>

    <SelectItem value="ru" className="cursor-pointer">
       RU
    </SelectItem>

    <SelectItem value="en" className="cursor-pointer">
       EN
    </SelectItem>
  </SelectContent>
</Select>
  );
};

export default LanguageSwitcher;