import { ResumeData } from "@/lib/types";
import { CheckCircle, AlertTriangle, XCircle, LayoutTemplate, Badge } from "lucide-react";
import { useCompletionScore } from "@/hooks/use-completion-score";
import { useATSScore } from "@/hooks/use-ats-score";

interface DashboardSidebarProps {
  data: ResumeData | null;
}

export function DashboardSidebar({ data }: DashboardSidebarProps) {
  const { score: completionScore, missingFields } = useCompletionScore(data);
  const { score: atsScore, feedback: atsFeedback } = useATSScore(data);

  const getScoreColor = (score: number) => {
    if (score < 40) return "text-red-500";
    if (score < 70) return "text-amber-500";
    return "text-green-500";
  };

  const getStrokeColor = (score: number) => {
    if (score < 40) return "stroke-red-500";
    if (score < 70) return "stroke-amber-500";
    return "stroke-green-500";
  };

  const formatFieldName = (field: string) => {
    return field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const getATSLabel = (score: number) => {
    if (score < 40) return "Poor";
    if (score < 70) return "Fair";
    if (score < 90) return "Good";
    return "Excellent";
  };

  return (
    <aside className="h-full flex flex-col gap-6 p-4">
      <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Completion</h3>
        
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                className="stroke-muted fill-transparent"
                strokeWidth="8"
                r="40"
                cx="50"
                cy="50"
              />
              <circle
                className={`${getStrokeColor(completionScore)} fill-transparent transition-all duration-1000 ease-out`}
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - completionScore / 100)}`}
                strokeLinecap="round"
                r="40"
                cx="50"
                cy="50"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className={`text-3xl font-bold ${getScoreColor(completionScore)}`}>
                {completionScore}%
              </span>
            </div>
          </div>
          
          {missingFields.length > 0 ? (
            <div className="w-full text-sm">
              <p className="text-muted-foreground mb-2">Add to improve:</p>
              <ul className="space-y-1">
                {missingFields.slice(0, 3).map(field => (
                  <li key={field} className="flex items-center gap-2 text-xs">
                    <XCircle className="w-3 h-3 text-red-500 flex-shrink-0" />
                    <span className="truncate">{formatFieldName(field)}</span>
                  </li>
                ))}
                {missingFields.length > 3 && (
                  <li className="text-xs text-muted-foreground italic pl-5">
                    +{missingFields.length - 3} more
                  </li>
                )}
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-green-500 text-sm font-medium">
              <CheckCircle className="w-4 h-4" />
              <span>Profile Complete!</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">ATS Score</h3>
        
        <div className="flex items-end gap-2 mb-4">
          <span className={`text-4xl font-bold ${getScoreColor(atsScore)} leading-none`}>
            {atsScore}
          </span>
          <span className="text-muted-foreground font-medium mb-1">/100</span>
          <Badge variant="outline" className={`ml-auto ${getScoreColor(atsScore)} border-current`}>
            {getATSLabel(atsScore)}
          </Badge>
        </div>

        {atsFeedback.length > 0 ? (
          <ul className="space-y-2">
            {atsFeedback.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <AlertTriangle className="w-3 h-3 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{tip}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center gap-2 text-green-500 text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Looking great for ATS!</span>
          </div>
        )}
      </div>
    </aside>
  );
}
