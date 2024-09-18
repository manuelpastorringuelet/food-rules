"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { englishRules } from "@/data/englishRules";
import { germanRules } from "@/data/germanRules";
import { spanishRules } from "@/data/spanishRules";
import { translations } from "@/data/translations";
import { useEffect, useState } from "react";

const rules = {
  en: englishRules,
  de: germanRules,
  es: spanishRules,
};

const FoodRules = () => {
  const [language, setLanguage] = useState("en");
  const [currentSection, setCurrentSection] = useState(0);
  const [currentRule, setCurrentRule] = useState(0);

  useEffect(() => {
    const detectLanguage = () => {
      const userLanguage = navigator.language.split("-")[0];
      if (Object.keys(rules).includes(userLanguage)) {
        setLanguage(userLanguage);
      } else {
        setLanguage("en"); // Default to English if the detected language is not supported
      }
    };

    detectLanguage();
  }, []);

  const t = translations[language as keyof typeof translations];
  const currentRules = rules[language as keyof typeof rules];
  const totalSections = currentRules.length;
  const totalRules = currentRules[currentSection].rules.length;

  const changeRule = (direction: number) => {
    let newRule = currentRule + direction;
    let newSection = currentSection;

    if (newRule < 0) {
      newSection = (currentSection - 1 + totalSections) % totalSections;
      newRule = currentRules[newSection].rules.length - 1;
    } else if (newRule >= totalRules) {
      newSection = (currentSection + 1) % totalSections;
      newRule = 0;
    }

    setCurrentSection(newSection);
    setCurrentRule(newRule);
  };

  return (
    <div className="flex flex-col overflow-hidden container h-[100dvh] py-8">
      <div className="sm:min-h-[65dvh] overflow-auto flex-grow sm:flex">
        <div className="container mx-auto p-4 max-w-xl">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold font-serif mb-2">{t.title}</h1>
            <div className="flex justify-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage("en")}
              >
                EN
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage("de")}
              >
                DE
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage("es")}
              >
                ES
              </Button>
            </div>
          </div>

          <Card className="mb-6 min-h-[350px] bg-papyrus border-none shadow-none">
            <CardContent className="flex flex-col justify-center items-center h-full p-6">
              <h2 className="text-xl font-serif mb-4 text-center">
                {currentRules[currentSection].section}
              </h2>
              <p className="text-center text-6xl mb-6 vintage-emoji">
                {currentRules[currentSection].rules[currentRule].emoji}
              </p>
              <p className="text-xl font-serif mb-4 text-center vintage-text">
                {currentRules[currentSection].rules[currentRule].rule}
              </p>
              <p className="text-center text-sm italic vintage-text">
                {currentRules[currentSection].rules[currentRule].info}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="w-full bg-background py-4">
        <div className="container mx-auto max-w-xl flex justify-between items-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => changeRule(-1)}
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
            onClick={() => changeRule(1)}
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
