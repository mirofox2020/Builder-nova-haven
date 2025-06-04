import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoteButtonsProps {
  initialVotes: number;
  size?: "sm" | "md";
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

  const isSmall = size === "sm";

  if (compact) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleVote("up")}
          className={cn(
            "hover:bg-gray-100 transition-all duration-200 rounded-full p-2 h-8 w-8",
            userVote === "up" && "bg-gray-100",
          )}
        >
          <Heart
            className={cn(
              "h-4 w-4 text-gray-600",
              userVote === "up" && "fill-red-500 text-red-500",
            )}
          />
        </Button>

        <span className="font-medium text-sm text-gray-700">{votes} votes</span>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleVote("down")}
          className={cn(
            "hover:bg-gray-100 transition-all duration-200 rounded-full p-2 h-8 w-8",
            userVote === "down" && "bg-gray-100",
          )}
        >
          <ThumbsDown className="h-4 w-4 text-gray-600" />
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm",
        isSmall ? "p-2" : "p-3",
        className,
      )}
    >
      <Button
        variant="ghost"
        size={isSmall ? "sm" : "icon"}
        onClick={() => handleVote("up")}
        className={cn(
          "hover:bg-red-100 hover:text-red-600 transition-all duration-200 rounded-lg hover:scale-110",
          isSmall ? "h-7 w-7 p-0" : "h-9 w-9 p-0",
          userVote === "up" && "bg-red-100 text-red-600 scale-110 shadow-sm",
        )}
      >
        <Heart
          className={cn(
            isSmall ? "h-4 w-4" : "h-5 w-5",
            userVote === "up" && "fill-current",
          )}
        />
      </Button>

      <span
        className={cn(
          "font-bold py-2 transition-all duration-200",
          isSmall ? "text-sm" : "text-base",
          votes > 0
            ? "text-red-600"
            : votes < 0
              ? "text-gray-600"
              : "text-gray-600",
        )}
      >
        {votes > 0 ? votes : 0}
      </span>

      <Button
        variant="ghost"
        size={isSmall ? "sm" : "icon"}
        onClick={() => handleVote("down")}
        className={cn(
          "hover:bg-gray-100 hover:text-gray-600 transition-all duration-200 rounded-lg hover:scale-110",
          isSmall ? "h-7 w-7 p-0" : "h-9 w-9 p-0",
          userVote === "down" &&
            "bg-gray-100 text-gray-600 scale-110 shadow-sm",
        )}
      >
        <ThumbsDown className={cn(isSmall ? "h-4 w-4" : "h-5 w-5")} />
      </Button>
    </div>
  );
};
