
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, FileText } from "lucide-react";

const Index = () => {
  const [selectedText, setSelectedText] = useState("");

  // Écouter les messages depuis Word
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "texte-selectionne") {
        const text = event.data.texte;
        setSelectedText(text);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleRequestText = () => {
    window.parent.postMessage({ type: "demander-texte" }, "*");
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

        {/* Statut de réception */}
        <Card className="border-blue-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-slate-700">
                {selectedText ? "✅ Texte reçu !" : "⏳ Aucun texte encore transmis"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Texte reçu */}
        {selectedText && (
          <Card className="border-blue-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-700">
                Texte reçu de Word
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                <p className="text-sm text-blue-800 leading-relaxed">
                  {selectedText}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bouton pour demander le texte */}
        <Button
          onClick={handleRequestText}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
          size="lg"
        >
          <Search className="h-4 w-4 mr-2" />
          Demander le texte sélectionné
        </Button>

        {/* Note d'information */}
        <div className="text-center">
          <Badge variant="outline" className="text-xs">
            Test postMessage - Word → Webapp
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default Index;
