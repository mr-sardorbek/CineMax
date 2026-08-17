import useLanguage from "@/hooks/useLanguage";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <Select
      value={currentLanguage}
      onValueChange={changeLanguage}
    >
      <SelectTrigger className="w-[100px]">
        <SelectValue />
      </SelectTrigger>

      <SelectContent >
        <SelectItem value="uz" >UZ</SelectItem>
        <SelectItem value="ru">RU</SelectItem>
        <SelectItem value="en">EN</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;