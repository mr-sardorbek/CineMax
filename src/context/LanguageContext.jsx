import translations from "@/constants/translations";
import {  createContext, useEffect, useState } from "react";


const LanguageContext = createContext()

const LanguageProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState("uz");
       
    const changeLanguage = (language) => {
  setCurrentLanguage(language);
  localStorage.setItem("language", language);
};
const t = (key) => {
  return translations[currentLanguage][key];
};

useEffect(() => {
  const savedLanguage = localStorage.getItem("language");

  if (savedLanguage) {
    setCurrentLanguage(savedLanguage);
  }
}, []);
    
return (
    <LanguageContext.Provider
    value={{currentLanguage, changeLanguage, t}}>
       {children}
    </LanguageContext.Provider>
)
}

export {LanguageProvider}
export default LanguageContext