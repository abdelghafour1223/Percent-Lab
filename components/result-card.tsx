"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ResultCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

/**
 * Animated result card component
 * Used to display calculation results with smooth animations
 */
export function ResultCard({ title, children, className, animate = true }: ResultCardProps) {
  const CardWrapper = animate ? motion.div : "div";

  return (
    <CardWrapper
      {...(animate && {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
      })}
    >
      <Card className={cn("border-2 border-primary/20 bg-primary/5", className)}>
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </CardWrapper>
  );
}
