import { Button } from "@/components/ui/button";

interface LanguageSelectorProps {
  setLanguage: (lang: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ setLanguage }) => {
  return (
    <div className="flex justify-center space-x-2">
      <Button variant="ghost" size="sm" onClick={() => setLanguage("en")}>
        EN
      </Button>
      <Button variant="ghost" size="sm" onClick={() => setLanguage("de")}>
        DE
      </Button>
      <Button variant="ghost" size="sm" onClick={() => setLanguage("es")}>
        ES
      </Button>
    </div>
  );
};

export default LanguageSelector;