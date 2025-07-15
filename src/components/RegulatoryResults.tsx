
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, X, FileText } from "lucide-react";

interface RegulatoryResult {
  id: string;
  title: string;
  snippet: string;
  reference: string;
  similarity: number;
  documentUrl: string;
  category: string;
}

interface RegulatoryResultsProps {
  results: RegulatoryResult[];
  onClear: () => void;
}

export const RegulatoryResults = ({ results, onClear }: RegulatoryResultsProps) => {
  const handleViewMore = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium text-slate-800 flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-600" />
            Textes réglementaires similaires
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-slate-600">
          {results.length} résultat(s) trouvé(s)
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {results.map((result, index) => (
            <div
              key={result.id}
              className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">
                      {result.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {Math.round(result.similarity)}% similaire
                    </Badge>
                  </div>
                  <h4 className="font-medium text-sm text-slate-800 mb-1">
                    {result.title}
                  </h4>
                  <p className="text-xs text-slate-600 mb-1">
                    {result.reference}
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-slate-700 leading-relaxed mb-3">
                {result.snippet}
              </p>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewMore(result.documentUrl)}
                className="w-full text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Voir plus
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
