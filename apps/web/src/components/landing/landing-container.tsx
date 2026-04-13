import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type LandingContainerProps = PropsWithChildren<{
  className?: string;
}>;

export function LandingContainer({
  className,
  children,
}: LandingContainerProps) {
  return <div className={cn("landing-container", className)}>{children}</div>;
}
