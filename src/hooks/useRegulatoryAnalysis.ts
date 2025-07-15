
import { useState } from "react";

interface RegulatoryResult {
  id: string;
  title: string;
  snippet: string;
  reference: string;
  similarity: number;
  documentUrl: string;
  category: string;
}

type ComplianceStatus = "conforme" | "a_verifier" | null;

export const useRegulatoryAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<RegulatoryResult[]>([]);
  const [complianceStatus, setComplianceStatus] = useState<ComplianceStatus>(null);

  // Données simulées - à remplacer par l'appel API réel
  const mockResults: RegulatoryResult[] = [
    {
      id: "1",
      title: "Arrêté du 7 février 2012 - Exigences de sûreté nucléaire",
      snippet: "Les systèmes de sûreté doivent être conçus selon le principe de défense en profondeur avec des barrières multiples pour contenir les matières radioactives...",
      reference: "Article 3.2.1 - INB",
      similarity: 94,
      documentUrl: "https://example.com/doc1",
      category: "Sûreté nucléaire"
    },
    {
      id: "2", 
      title: "Guide de l'ASN - Conception des systèmes de protection",
      snippet: "La défense en profondeur constitue le principe fondamental de sûreté nucléaire. Elle repose sur plusieurs niveaux de protection indépendants...",
      reference: "Guide ASN n°22 - Section 2.1",
      similarity: 89,
      documentUrl: "https://example.com/doc2",
      category: "Guide ASN"
    },
    {
      id: "3",
      title: "Décision n° 2017-DC-0616 - Prescriptions techniques",
      snippet: "Les barrières de confinement doivent être dimensionnées pour résister aux agressions externes et internes selon des critères de défaillance unique...",
      reference: "Prescription 4.1 - EPR Flamanville",
      similarity: 82,
      documentUrl: "https://example.com/doc3", 
      category: "Prescriptions"
    },
    {
      id: "4",
      title: "RFS 2001-01 - Éléments de sûreté importants pour la protection",
      snippet: "Les systèmes importants pour la sûreté sont classés selon leur fonction dans la défense en profondeur et leur contribution à la prévention...",
      reference: "RFS 2001-01 - Chapitre 3",
      similarity: 78,
      documentUrl: "https://example.com/doc4",
      category: "RFS"
    },
    {
      id: "5",
      title: "Code de la santé publique - Article R1333-59",
      snippet: "Les activités nucléaires doivent être conduites de manière à limiter l'exposition des travailleurs et du public selon le principe ALARA...",
      reference: "CSP Art. R1333-59",
      similarity: 71,
      documentUrl: "https://example.com/doc5",
      category: "Code santé publique"
    }
  ];

  const analyzeText = async (text: string) => {
    setIsAnalyzing(true);
    setResults([]);
    setComplianceStatus(null);

    try {
      // Simulation d'un délai d'API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Remplacer par l'appel API réel
      // const response = await fetch('/api/analyze', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ text })
      // });
      // const data = await response.json();
      
      // Simulation des résultats
      const filteredResults = mockResults.slice(0, Math.min(10, mockResults.length));
      setResults(filteredResults);
      
      // Simulation du statut de conformité basé sur la similarité moyenne
      const avgSimilarity = filteredResults.reduce((acc, r) => acc + r.similarity, 0) / filteredResults.length;
      setComplianceStatus(avgSimilarity >= 85 ? "conforme" : "a_verifier");
      
    } catch (error) {
      console.error("Erreur lors de l'analyse:", error);
      setResults([]);
      setComplianceStatus(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearResults = () => {
    setResults([]);
    setComplianceStatus(null);
  };

  return {
    isAnalyzing,
    results,
    complianceStatus,
    analyzeText,
    clearResults
  };
};
