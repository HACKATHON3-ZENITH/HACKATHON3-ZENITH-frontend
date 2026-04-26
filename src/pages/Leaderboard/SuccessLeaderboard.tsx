import { clsx } from 'clsx';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';

/**
 * TWIST 07 — Identification des 100 apprenants à haut potentiel.
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
  };
  contributions?: Array<{
    variable: string;
    weight: number | string;
    value: number;
    contribution: number;
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
    metrics: { action_count: 8, business_launched: true, avg_engagement: 0.88, segment: "entrepreneur_actif" },
    contributions: [
      { variable: "Lancement d'entreprise", weight: 0.40, value: 1.0, contribution: 0.40 },
      { variable: "Actions terrain accomplies", weight: 0.30, value: 1.0, contribution: 0.30 },
      { variable: "Engagement moyen", weight: 0.15, value: 0.88, contribution: 0.132 },
      { variable: "Segment Entrepreneur Actif", weight: 0.15, value: 1.0, contribution: 0.15 },
      { variable: "Pénalité disponibilité (T08)", weight: "x0.95", value: 0.95, contribution: -0.0497 }
    ],
    explanation: { explanation_text: "Amadou démontre un potentiel exceptionnel. Il a déjà lancé son entreprise de distribution solaire et valide 100% de ses actions terrain." }
  },
  {
    learner_id: "L002",
    name: "Fatou Sow",
    score: 0.8950,
    metrics: { action_count: 5, business_launched: true, avg_engagement: 0.92, segment: "entrepreneur_actif" },
    contributions: [
      { variable: "Lancement d'entreprise", weight: 0.40, value: 1.0, contribution: 0.40 },
      { variable: "Actions terrain accomplies", weight: 0.30, value: 0.80, contribution: 0.24 },
      { variable: "Engagement moyen", weight: 0.15, value: 0.92, contribution: 0.138 },
      { variable: "Segment Entrepreneur Actif", weight: 0.15, value: 1.0, contribution: 0.15 }
    ],
    explanation: { explanation_text: "Fatou a lancé un projet de transformation agro-alimentaire. Son engagement sur la plateforme est exemplaire." }
  },
  {
    learner_id: "L003",
    name: "Koffi Mensah",
    score: 0.7840,
    metrics: { action_count: 6, business_launched: false, avg_engagement: 0.81, segment: "explorateur" },
    contributions: [
      { variable: "Lancement d'entreprise", weight: 0.40, value: 0.0, contribution: 0.0 },
      { variable: "Actions terrain accomplies", weight: 0.30, value: 1.0, contribution: 0.30 },
      { variable: "Engagement moyen", weight: 0.15, value: 0.81, contribution: 0.1215 },
      { variable: "Segment Explorateur", weight: 0.15, value: 0.4, contribution: 0.06 }
    ],
    explanation: { explanation_text: "Bien qu'il n'ait pas encore lancé d'entreprise, Koffi est très actif sur le terrain avec 6 actions validées." }
  },
  {
    learner_id: "L004",
    name: "Aissatou Keita",
    score: 0.7620,
    metrics: { action_count: 4, business_launched: false, avg_engagement: 0.95, segment: "entrepreneur_actif" },
    contributions: [
      { variable: "Actions terrain", weight: 0.30, value: 0.8, contribution: 0.24 },
      { variable: "Engagement", weight: 0.15, value: 0.95, contribution: 0.1425 },
      { variable: "Segment", weight: 0.15, value: 1.0, contribution: 0.15 }
    ],
    explanation: { explanation_text: "Profil académique brillant avec un très fort taux d'engagement." }
  },
  {
    learner_id: "L005",
    name: "Moussa Traoré",
    score: 0.7100,
    metrics: { action_count: 3, business_launched: false, avg_engagement: 0.75, segment: "explorateur" },
    explanation: { explanation_text: "Moussa explore les différentes filières agricoles avant de se lancer." }
  },
  {
    learner_id: "L006",
    name: "Zainab Abba",
    score: 0.6800,
    metrics: { action_count: 2, business_launched: false, avg_engagement: 0.88, segment: "explorateur" },
    explanation: { explanation_text: "Zainab se concentre sur les modules de gestion financière." }
  },
  {
    learner_id: "L007",
    name: "Chidi Okafor",
    score: 0.6500,
    metrics: { action_count: 4, business_launched: false, avg_engagement: 0.60, segment: "entrepreneur_actif" },
    explanation: { explanation_text: "Profil orienté vers l'exportation. A déjà des contacts terrain." }
  },
  {
    learner_id: "L008",
    name: "Binta Bah",
    score: 0.6200,
    metrics: { action_count: 1, business_launched: false, avg_engagement: 0.70, segment: "explorateur" },
    explanation: { explanation_text: "Apprenante curieuse, teste plusieurs parcours de formation." }
  },
  {
    learner_id: "L009",
    name: " Kwame Nkrumah",
    score: 0.5800,
    metrics: { action_count: 2, business_launched: false, avg_engagement: 0.55, segment: "explorateur" },
    explanation: { explanation_text: "Intéressé par les énergies renouvelables." }
  },
  {
    learner_id: "L010",
    name: "Awa Ndiaye",
    score: 0.5500,
    metrics: { action_count: 0, business_launched: false, avg_engagement: 0.90, segment: "explorateur" },
    explanation: { explanation_text: "Nouveau profil avec un fort démarrage sur la théorie." }
  }
];

const SuccessLeaderboard: React.FC = () => {
  const [rankings] = useState<LearnerRanking[]>(MOCK_RANKINGS);

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Top Potentiel Entrepreneurial (MOCK)</h1>
        <p className="text-muted-foreground">Classement basé sur l'action terrain, l'engagement et le profil (TWIST 07)</p>
        <Badge variant="outline" className="mt-2">Mode Démonstration - 10 Apprenants</Badge>
      </div>

      <div className="grid gap-4">
        {rankings.map((learner, index) => (
          <Card key={learner.learner_id} className="shadow-sm hover:border-primary/50 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">
                  #{index + 1}
                </div>
                <div>
                  <CardTitle className="text-xl font-black">{learner.name}</CardTitle>
                  <p className="text-sm font-medium text-muted-foreground">ID: {learner.learner_id} • Segment : <span className="text-primary">{learner.metrics.segment}</span></p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant={learner.metrics.business_launched ? "default" : "secondary"} className="rounded-lg px-3 py-1">
                  {learner.metrics.business_launched ? "Auto-entrepreneur" : "En projet"}
                </Badge>
                <div className="text-3xl font-black text-primary mt-1">{(learner.score * 100).toFixed(1)}%</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-6">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1.5">
                       <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Success Potential Index</p>
                       <p className="text-xs font-bold text-primary">{(learner.score * 100).toFixed(1)}/100</p>
                    </div>
                    <Progress value={learner.score * 100} className="h-3 rounded-full" />
                  </div>
                  <div className="bg-gray-50 px-4 py-2 rounded-xl text-center border border-gray-100 flex-shrink-0">
                    <p className="text-[10px] uppercase font-black text-gray-400">Actions</p>
                    <p className="text-sm font-black">{learner.metrics.action_count}</p>
                  </div>
                </div>
                
                {learner.explanation && (
                  <div className="bg-brand-primary/5 p-5 rounded-[22px] text-sm border border-brand-primary/10 space-y-4">
                    <div>
                      <h4 className="font-black text-gray-900 mb-1 flex items-center">
                        <Activity className="mr-2 text-brand-primary" size={16} />
                        Insights Predictifs (T06/T07)
                      </h4>
                      <p className="text-gray-600 leading-relaxed italic">"{learner.explanation.explanation_text}"</p>
                    </div>
                    
                    {learner.contributions && (
                      <div className="pt-4 border-t border-brand-primary/10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-brand-primary mb-3">Décomposition Twist 09 — Facteur de Score</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                          {learner.contributions.map((c, i) => (
                            <div key={i} className="flex justify-between items-center py-1 border-b border-gray-100/50">
                              <span className="text-xs font-medium text-gray-400">{c.variable}</span>
                              <span className={clsx("font-mono font-bold text-xs", c.contribution >= 0 ? "text-emerald-600" : "text-rose-500")}>
                                {c.contribution > 0 ? '+' : ''}{c.contribution.toFixed(4)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SuccessLeaderboard;
