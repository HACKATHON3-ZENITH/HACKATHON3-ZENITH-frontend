import { clsx } from 'clsx';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { ShieldCheck, AlertCircle, CheckCircle2, Activity } from 'lucide-react';

/**
 * TWIST 07/09/10 — Identification des apprenants à haut potentiel.
 * (MODE MOCK 10 COURS - Demande utilisateur)
 */

interface LearnerRanking {
  learner_id: string;
  name: string;
  score: number;
  metrics: {
    action_count: number;
    business_launched: boolean;
    avg_engagement: number;
    segment: string;
    data_confidence: number;
  };
  contributions?: Array<{
    variable: string;
    weight: number | string;
    value: number;
    contribution: number;
    confidence?: number;
  }>;
  explanation?: {
    explanation_text: string;
  };
}

const MOCK_RANKINGS: LearnerRanking[] = [
  {
    learner_id: "L001",
    name: "Amadou Diallo",
    score: 0.9423,
    metrics: { action_count: 8, business_launched: true, avg_engagement: 0.88, segment: "entrepreneur_actif", data_confidence: 1.0 },
    contributions: [
      { variable: "Lancement d'entreprise", weight: 0.40, value: 1.0, contribution: 0.40, confidence: 1.0 },
      { variable: "Actions terrain", weight: 0.30, value: 1.0, contribution: 0.30, confidence: 1.0 },
      { variable: "Engagement moyen", weight: 0.15, value: 0.88, contribution: 0.132, confidence: 1.0 },
      { variable: "Segment Entrepreneur", weight: 0.15, value: 1.0, contribution: 0.15, confidence: 0.85 }
    ],
    explanation: { explanation_text: "Amadou démontre un potentiel exceptionnel. Ses données d'action sont certifiées par nos partenaires locaux (Confiance 100%)." }
  },
  {
    learner_id: "L002",
    name: "Fatou Sow",
    score: 0.8450,
    metrics: { action_count: 5, business_launched: true, avg_engagement: 0.92, segment: "entrepreneur_actif", data_confidence: 0.7 },
    contributions: [
      { variable: "Lancement d'entreprise", weight: 0.40, value: 1.0, contribution: 0.40, confidence: 0.7 },
      { variable: "Actions terrain", weight: 0.30, value: 0.80, contribution: 0.168, confidence: 0.7 },
      { variable: "Engagement moyen", weight: 0.15, value: 0.92, contribution: 0.138, confidence: 1.0 },
      { variable: "Segment Entrepreneur", weight: 0.15, value: 1.0, contribution: 0.15, confidence: 0.85 }
    ],
    explanation: { explanation_text: "Fatou a auto-déclaré le lancement d'une entreprise. Score pondéré par un indice de confiance de 0.70 (Twist 10)." }
  },
  {
    learner_id: "L003",
    name: "Koffi Mensah",
    score: 0.7240,
    metrics: { action_count: 0, business_launched: false, avg_engagement: 0.91, segment: "entrepreneur_actif", data_confidence: 0.35 },
    contributions: [
      { variable: "Lancement d'entreprise", weight: 0.40, value: 0.0, contribution: 0.0, confidence: 1.0 },
      { variable: "Actions terrain (Imputées T10)", weight: 0.30, value: 0.18, contribution: 0.0189, confidence: 0.35 },
      { variable: "Engagement moyen", weight: 0.15, value: 0.91, contribution: 0.1365, confidence: 1.0 },
      { variable: "Segment Entrepreneur", weight: 0.15, value: 1.0, contribution: 0.15, confidence: 0.80 }
    ],
    explanation: { explanation_text: "Données d'actions absentes. Le système a imputé un potentiel réduit basé sur son assiduité théorique (Twist 10)." }
  }
];

const SuccessLeaderboard: React.FC = () => {
  const [rankings] = useState<LearnerRanking[]>(MOCK_RANKINGS);

  const getConfidenceIcon = (conf?: number) => {
    if (!conf) return null;
    if (conf >= 0.9) return <CheckCircle2 className="text-emerald-500" size={14} />;
    if (conf >= 0.6) return <ShieldCheck className="text-amber-500" size={14} />;
    return <AlertCircle className="text-rose-400" size={14} />;
  };

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Top Potentiel — <span className="text-primary italic">Audit de Confiance</span></h1>
        <p className="text-muted-foreground">Gestion des données auto-déclarées et rares (TWIST 10)</p>
        <div className="flex justify-center gap-4 mt-4">
           <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Vérifié (1.0)</Badge>
           <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Auto-déclaré (0.7)</Badge>
           <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">Imputé (0.35)</Badge>
        </div>
      </div>

      <div className="grid gap-6 max-w-5xl mx-auto">
        {rankings.map((learner, index) => (
          <Card key={learner.learner_id} className={clsx(
            "group overflow-hidden transition-all border-l-8",
            learner.metrics.data_confidence >= 0.9 ? "border-l-emerald-500" : 
            learner.metrics.data_confidence >= 0.6 ? "border-l-amber-500" : "border-l-rose-400"
          )}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-gray-50/50">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-900 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-xl">
                  #{index + 1}
                </div>
                <div>
                  <CardTitle className="text-xl font-black flex items-center">
                    {learner.name}
                    {getConfidenceIcon(learner.metrics.data_confidence)}
                  </CardTitle>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Confiance globale : <span className={clsx(
                      learner.metrics.data_confidence >= 0.9 ? "text-emerald-600" : 
                      learner.metrics.data_confidence >= 0.6 ? "text-amber-600" : "text-rose-500"
                    )}>{(learner.metrics.data_confidence * 100)}%</span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-primary">{(learner.score * 100).toFixed(1)}%</div>
                <p className="text-[10px] uppercase font-black text-gray-400 tracking-tighter">Success Score</p>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Visual Decomposition Title */}
                <div className="flex items-center justify-between">
                   <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Décomposition & Fiabilité (Twist 10)</h4>
                   <div className="h-px bg-gray-100 flex-1 ml-4" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left: Contributions with Confidence Bars */}
                  <div className="space-y-4">
                    {learner.contributions?.map((c, i) => (
                      <div key={i} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <div className="flex items-center space-x-2">
                             <span className="font-bold text-gray-700">{c.variable}</span>
                             {getConfidenceIcon(c.confidence)}
                          </div>
                          <span className="font-mono font-black text-primary">
                            {c.contribution > 0 ? '+' : ''}{c.contribution.toFixed(4)}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden flex">
                           <div 
                             className={clsx(
                               "h-full transition-all duration-1000",
                               c.contribution >= 0 ? "bg-primary" : "bg-rose-500"
                             )} 
                             style={{ width: `${Math.abs(c.contribution) * 100}%` }} 
                           />
                           {c.confidence && c.confidence < 1 && (
                              <div 
                                className="h-full bg-gray-200" 
                                style={{ width: `${(1 - c.confidence) * 10}%` }} 
                              />
                           )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right: Detailed Explanation */}
                  <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 group-hover:bg-white transition-colors">
                     <div className="flex items-center space-x-2 mb-3">
                        <Activity className="text-primary" size={16} />
                        <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-900">Audit de l'IA (T06/T09/T10)</h5>
                     </div>
                     <p className="text-sm text-gray-600 leading-relaxed italic">
                       "{learner.explanation?.explanation_text}"
                     </p>
                     <div className="mt-4 pt-4 border-t border-gray-200/50 flex items-center justify-between">
                        <div className="flex -space-x-2">
                           <div className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
                           <div className="w-6 h-6 rounded-full bg-amber-500 border-2 border-white shadow-sm" />
                           <div className="w-6 h-6 rounded-full bg-primary border-2 border-white shadow-sm" />
                        </div>
                        <span className="text-[9px] font-bold text-gray-400 uppercase">Données Multi-Sources</span>
                     </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SuccessLeaderboard;
