import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoteButtonsProps {
  initialVotes: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  compact?: boolean;
}

export const VoteButtons = ({
  initialVotes,
  size = "md",
  className,
  compact = false,
}: VoteButtonsProps) => {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);

  const handleVote = (type: "up" | "down") => {
    if (userVote === type) {
      // Remove vote
      setVotes((prev) => prev + (type === "up" ? -1 : 1));
      setUserVote(null);
    } else {
      // Change or add vote
      const change =
        userVote === null ? (type === "up" ? 1 : -1) : type === "up" ? 2 : -2;

      setVotes((prev) => prev + change);
      setUserVote(type);
    }
  };

  const isLarge = size === "lg";

  if (compact) {
    return (
      <div className={cn("flex items-center gap-0", className)}>
        {/* Thumbs Up */}
        <button
          onClick={() => handleVote("up")}
          className={cn(
            "flex items-center justify-center transition-colors duration-200",
            isLarge ? "h-12 w-12" : "h-10 w-10",
            "hover:bg-gray-100 rounded-md",
          )}
        >
          <ThumbsUp
            className={cn(
              "text-gray-400",
              isLarge ? "h-6 w-6" : "h-5 w-5",
              userVote === "up" && "text-blue-600",
            )}
          />
        </button>

        {/* Votes Text */}
        <span
          className={cn(
            "text-gray-400 mx-2",
            isLarge ? "text-lg font-normal" : "text-base font-normal",
          )}
        >
          {votes} votes
        </span>

        {/* Thumbs Down */}
        <button
          onClick={() => handleVote("down")}
          className={cn(
            "flex items-center justify-center transition-colors duration-200",
            isLarge ? "h-12 w-12" : "h-10 w-10",
            "hover:bg-gray-100 rounded-md",
          )}
        >
          <ThumbsDown
            className={cn(
              "text-gray-400",
              isLarge ? "h-6 w-6" : "h-5 w-5",
              userVote === "down" && "text-red-600",
            )}
          />
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm",
        "p-3",
        className,
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleVote("up")}
        className={cn(
          "hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 rounded-lg hover:scale-110",
          "h-9 w-9 p-0",
          userVote === "up" && "bg-gray-100 text-gray-700 scale-110 shadow-sm",
        )}
      >
        <ThumbsUp className="h-5 w-5 text-gray-500" />
      </Button>

      <span
        className={cn(
          "font-bold py-2 transition-all duration-200 text-base text-gray-500",
        )}
      >
        {votes}
      </span>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleVote("down")}
        className={cn(
          "hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 rounded-lg hover:scale-110",
          "h-9 w-9 p-0",
          userVote === "down" &&
            "bg-gray-100 text-gray-700 scale-110 shadow-sm",
        )}
      >
        <ThumbsDown className="h-5 w-5 text-gray-500" />
      </Button>
    </div>
  );
};
