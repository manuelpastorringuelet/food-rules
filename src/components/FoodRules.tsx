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
      const userLanguage = navigator.language.split('-')[0];
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
    <div className="container mx-auto p-4 max-w-xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <div className="flex space-x-2">
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
      </div>

      <div className="mb-4 text-center">
        <h2 className="text-lg font-semibold">
          {currentRules[currentSection].section}
        </h2>
        <p className="text-sm text-gray-500">
          {t.rule} {currentRule + 1} {t.of} {totalRules}
        </p>
      </div>

      <Card className="mb-6 min-h-[350px]">
        <CardContent className="px-16 pt-16 pb-4">
          <p className="text-center text-5xl mb-4">
            {currentRules[currentSection].rules[currentRule].emoji}
          </p>
          <p className="text-xl font-semibold mb-3 text-center">
            {currentRules[currentSection].rules[currentRule].rule}
          </p>
          <p className="text-center text-sm">
            {currentRules[currentSection].rules[currentRule].info}
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between mt-4">
        <Button variant="outline" size="sm" onClick={() => changeRule(-1)}>
          {t.prevButton}
        </Button>
        <Button variant="outline" size="sm" onClick={() => changeRule(1)}>
          {t.nextButton}
        </Button>
      </div>
    </div>
  );
};

export default FoodRules;
