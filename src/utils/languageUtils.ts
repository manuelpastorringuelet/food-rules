import { rules } from "@/data/rules";

export const detectLanguage = (): string => {
  const userLanguage = navigator.language.split("-")[0];
  if (Object.keys(rules).includes(userLanguage)) {
    return userLanguage;
  }
  return "en"; // Default to English if the detected language is not supported
};

export const changeRule = (
  direction: number,
  currentRule: number,
  currentSection: number,
  totalSections: number,
  totalRules: number,
  currentRules: (typeof rules)[keyof typeof rules]
) => {
  let newRule = currentRule + direction;
  let newSection = currentSection;

  if (newRule < 0) {
    newSection = (currentSection - 1 + totalSections) % totalSections;
    newRule = currentRules[newSection].rules.length - 1;
  } else if (newRule >= totalRules) {
    newSection = (currentSection + 1) % totalSections;
    newRule = 0;
  }

  return { newRule, newSection };
};
