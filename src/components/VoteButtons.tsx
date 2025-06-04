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
      setVotes((prev) => prev + (type === "up" ? -1 : 1));
      setUserVote(null);
    } else {
      const change =
        userVote === null ? (type === "up" ? 1 : -1) : type === "up" ? 2 : -2;

      setVotes((prev) => prev + change);
      setUserVote(type);
    }
  };

  const isLarge = size === "lg";

  if (compact) {
    return (
      <div
        className={cn(
          "inline-flex items-center bg-gray-100 rounded-full px-2.5 py-1.5 gap-1",
          className,
        )}
      >
        {/* Thumbs Up */}
        <button
          onClick={() => handleVote("up")}
          className="flex items-center justify-center hover:bg-gray-200 rounded-full p-1 transition-colors duration-200"
        >
          <ThumbsUp
            className={cn(
              "text-black font-bold",
              "h-5 w-5",
              userVote === "up" && "text-blue-600",
            )}
          />
        </button>

        {/* Vote Count Only - No "votes" text */}
        <span className="text-black font-bold text-sm px-1">{votes}</span>

        {/* Thumbs Down */}
        <button
          onClick={() => handleVote("down")}
          className="flex items-center justify-center hover:bg-gray-200 rounded-full p-1 transition-colors duration-200"
        >
          <ThumbsDown
            className={cn(
              "text-black font-bold",
              "h-5 w-5",
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
        className="flex items-center justify-center hover:bg-gray-100 rounded-lg transition-all duration-200 h-12 w-12"
      >
        <ThumbsUp
          className={cn(
            "h-7 w-7 text-black font-bold",
            userVote === "up" && "text-blue-600",
          )}
        />
      </button>

      <span className="font-bold py-2 text-xl text-black">{votes}</span>

      <button
        onClick={() => handleVote("down")}
        className="flex items-center justify-center hover:bg-gray-100 rounded-lg transition-all duration-200 h-12 w-12"
      >
        <ThumbsDown
          className={cn(
            "h-7 w-7 text-black font-bold",
            userVote === "down" && "text-red-600",
          )}
        />
      </button>
    </div>
  );
};
