import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";

const PUZZLES = [
  { encoded: "wklv lv d whvw", shift: 3 },
  { encoded: "brx kdyh iruqg wkh fkhvw", shift: 3 },
  { encoded: "exw wkh nhb lv plvvlqj", shift: 3 },
  { encoded: "frqwlqxh vkliwlqj wr xqorfn wkh ilqdo frgh", shift: 3 },
];

const FINAL_CLUE = "The key lies within the words themselves.";

export default function CaesarCipherPuzzle() {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const decodeCaesarCipher = (text: string, shift: number) => {
    return text.replace(/[a-z]/gi, (char) => {
      const code = char.charCodeAt(0);
      const base = code >= 65 && code <= 90 ? 65 : 97;
      return String.fromCharCode(((code - base - shift + 26) % 26) + base);
    });
  };

  const checkAnswer = () => {
    const decodedMessage = decodeCaesarCipher(
      PUZZLES[currentStep].encoded,
      PUZZLES[currentStep].shift
    );
    if (userAnswer.trim().toLowerCase() === decodedMessage.toLowerCase()) {
      setSuccess("Correct! Proceed to the next clue.");
      setError("");
      setUserAnswer("");
      if (currentStep < PUZZLES.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setSuccess("Congratulations! You've completed the puzzle!");
      }
    } else {
      setError("That's not correct. Try again!");
      setSuccess("");
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Caesar Cipher Puzzle</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-center font-mono text-lg break-words">
              {PUZZLES[currentStep].encoded}
            </p>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Decode the message above
          </p>
        </div>

        <div className="space-y-2">
          <Input
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter decoded message..."
            className="text-center"
          />
          <Button onClick={checkAnswer} className="w-full">
            Submit Answer
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {currentStep === PUZZLES.length && (
          <div className="space-y-4">
            <p className="text-center font-medium">{FINAL_CLUE}</p>
            <p className="text-sm text-muted-foreground text-center">
              Use the final clue to unlock the ultimate secret.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
