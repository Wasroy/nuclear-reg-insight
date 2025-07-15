
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, CheckCircle, AlertTriangle, FileText } from "lucide-react";
import { RegulatoryResults } from "@/components/RegulatoryResults";
import { useRegulatoryAnalysis } from "@/hooks/useRegulatoryAnalysis";

const Index = () => {
  // Simulation du texte sélectionné dans Word - sera remplacé par Office.js
  const [selectedText] = useState(
    "Les systèmes de sûreté nucléaire doivent être conçus selon le principe de défense en profondeur, avec des barrières multiples et indépendantes pour prévenir la libération de matières radioactives."
  );

  const {
    isAnalyzing,
    results,
    complianceStatus,
    analyzeText,
    clearResults
  } = useRegulatoryAnalysis();

  const handleAnalyze = () => {
    if (selectedText.trim()) {
      analyzeText(selectedText);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto space-y-4">
        {/* Header */}
        <div className="text-center py-2">
          <h1 className="text-xl font-bold text-slate-800 flex items-center justify-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Analyse réglementaire
          </h1>
          <p className="text-sm text-slate-600 mt-1">Conformité nucléaire</p>
        </div>

        {/* Texte sélectionné */}
        <Card className="border-blue-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-700">
              Texte sélectionné
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
              <p className="text-sm text-slate-700 leading-relaxed">
                {selectedText || "Sélectionnez du texte dans votre document Word..."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Bouton d'analyse */}
        <Button
          onClick={handleAnalyze}
          disabled={!selectedText.trim() || isAnalyzing}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Analyse en cours...
            </>
          ) : (
            <>
              <Search className="h-4 w-4 mr-2" />
              Trouver des textes similaires
            </>
          )}
        </Button>

        {/* Indicateur de conformité */}
        {complianceStatus && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                {complianceStatus === "conforme" ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">✅ Conforme</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    <span className="font-medium text-amber-800">⚠️ À vérifier</span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Résultats */}
        {results.length > 0 && (
          <RegulatoryResults results={results} onClear={clearResults} />
        )}

        {/* Note d'information */}
        <div className="text-center">
          <Badge variant="outline" className="text-xs">
            Version 1.0 - Prototype
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default Index;
