import { useState } from "react";
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
      <div className={cn("flex items-center gap-2", className)}>
        {/* Thumbs Up */}
        <button
          onClick={() => handleVote("up")}
          className="flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors duration-200 p-1"
        >
          <ThumbsUp
            className={cn(
              "text-gray-400 stroke-2",
              isLarge ? "h-6 w-6" : "h-5 w-5",
              userVote === "up" && "text-blue-600",
            )}
          />
        </button>

        {/* Votes Text */}
        <span
          className={cn(
            "text-gray-400 font-normal px-1",
            isLarge ? "text-lg" : "text-base",
          )}
        >
          {votes} votes
        </span>

        {/* Thumbs Down */}
        <button
          onClick={() => handleVote("down")}
          className="flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors duration-200 p-1"
        >
          <ThumbsDown
            className={cn(
              "text-gray-400 stroke-2",
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
        "flex flex-col items-center bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm p-3",
        className,
      )}
    >
      <button
        onClick={() => handleVote("up")}
        className="flex items-center justify-center hover:bg-gray-100 rounded-lg transition-all duration-200 h-9 w-9"
      >
        <ThumbsUp
          className={cn(
            "h-5 w-5 text-gray-400 stroke-2",
            userVote === "up" && "text-blue-600",
          )}
        />
      </button>

      <span className="font-bold py-2 text-base text-gray-400">{votes}</span>

      <button
        onClick={() => handleVote("down")}
        className="flex items-center justify-center hover:bg-gray-100 rounded-lg transition-all duration-200 h-9 w-9"
      >
        <ThumbsDown
          className={cn(
            "h-5 w-5 text-gray-400 stroke-2",
            userVote === "down" && "text-red-600",
          )}
        />
      </button>
    </div>
  );
};
