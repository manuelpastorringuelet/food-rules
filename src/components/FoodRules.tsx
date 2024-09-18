"use client";

import LanguageSelector from "@/components/LanguageSelector";
import RuleDisplay from "@/components/RuleDisplay";
import { Button } from "@/components/ui/button";
import { rules } from "@/data/rules";
import { translations } from "@/data/translations";
import { changeRule, detectLanguage } from "@/utils/languageUtils";
import { useCallback, useEffect, useState } from "react";

const FoodRules = () => {
  const [language, setLanguage] = useState("en");
  const [currentSection, setCurrentSection] = useState(0);
  const [currentRule, setCurrentRule] = useState(0);

  const currentRules = rules[language as keyof typeof rules];
  const totalSections = currentRules.length;
  const totalRules = currentRules[currentSection].rules.length;

  const handleChangeRule = useCallback(
    (direction: number) => {
      const { newRule, newSection } = changeRule(
        direction,
        currentRule,
        currentSection,
        totalSections,
        totalRules,
        currentRules
      );
      setCurrentSection(newSection);
      setCurrentRule(newRule);
    },
    [currentRule, currentSection, totalSections, totalRules, currentRules]
  );

  useEffect(() => {
    setLanguage(detectLanguage());
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handleChangeRule(-1);
      } else if (event.key === "ArrowRight") {
        handleChangeRule(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleChangeRule]);

  const t = translations[language as keyof typeof translations];

  return (
    <div className="flex flex-col overflow-hidden  h-[100dvh] sm:h-auto py-8">
      <div className="sm:min-h-[65dvh] overflow-auto flex-grow sm:flex">
        <div className="container mx-auto p-4 max-w-xl">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold font-serif mb-2">{t.title}</h1>
            <LanguageSelector setLanguage={setLanguage} />
          </div>

          <RuleDisplay
            section={currentRules[currentSection].section}
            emoji={currentRules[currentSection].rules[currentRule].emoji}
            rule={currentRules[currentSection].rules[currentRule].rule}
            info={currentRules[currentSection].rules[currentRule].info}
          />
        </div>
      </div>

      <div className="w-full bg-background py-4">
        <div className="container mx-auto max-w-xl flex justify-between items-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleChangeRule(-1)}
            className="w-1/3 vintage-button"
          >
            {t.prevButton}
          </Button>
          <p className="text-sm text-center self-center vintage-text">
            {t.rule} {currentRule + 1} {t.of} {totalRules}
          </p>
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleChangeRule(1)}
            className="w-1/3 vintage-button"
          >
            {t.nextButton}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FoodRules;
