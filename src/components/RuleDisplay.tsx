import { Card, CardContent } from "@/components/ui/card";

interface RuleDisplayProps {
  section: string;
  emoji: string;
  rule: string;
  info: string;
}

const RuleDisplay: React.FC<RuleDisplayProps> = ({
  section,
  emoji,
  rule,
  info,
}) => {
  return (
    <Card className="mb-6 min-h-[350px] bg-papyrus border-none shadow-none">
      <CardContent className="flex flex-col justify-center items-center h-full p-6">
        <h2 className="text-xl font-serif mb-4 text-center">{section}</h2>
        <p className="text-center text-6xl mb-6 vintage-emoji">{emoji}</p>
        <p className="text-xl font-serif mb-4 text-center vintage-text">
          {rule}
        </p>
        <p className="text-center text-sm italic vintage-text">{info}</p>
      </CardContent>
    </Card>
  );
};

export default RuleDisplay;
