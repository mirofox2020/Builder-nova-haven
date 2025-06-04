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
      <div className={cn("flex items-center gap-1", className)}>
        {/* Thumbs Up Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleVote("up")}
          className={cn(
            "hover:bg-gray-50 transition-all duration-200 rounded p-1",
            isLarge ? "h-10 w-10" : "h-8 w-8",
            userVote === "up" && "bg-gray-50",
          )}
        >
          <ThumbsUp
            className={cn(
              "text-gray-400",
              isLarge ? "h-5 w-5" : "h-4 w-4",
              userVote === "up" && "text-gray-600",
            )}
          />
        </Button>

        {/* Vote Count Text */}
        <span
          className={cn(
            "text-gray-400 mx-1",
            isLarge ? "text-base font-medium" : "text-sm font-medium",
          )}
        >
          {votes} votes
        </span>

        {/* Thumbs Down Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleVote("down")}
          className={cn(
            "hover:bg-gray-50 transition-all duration-200 rounded p-1",
            isLarge ? "h-10 w-10" : "h-8 w-8",
            userVote === "down" && "bg-gray-50",
          )}
        >
          <ThumbsDown
            className={cn(
              "text-gray-400",
              isLarge ? "h-5 w-5" : "h-4 w-4",
              userVote === "down" && "text-gray-600",
            )}
          />
        </Button>
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
