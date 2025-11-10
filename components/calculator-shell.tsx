import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CalculatorShellProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable shell component for calculator pages
 * Provides consistent layout and styling
 */
export function CalculatorShell({ title, description, children, className }: CalculatorShellProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
