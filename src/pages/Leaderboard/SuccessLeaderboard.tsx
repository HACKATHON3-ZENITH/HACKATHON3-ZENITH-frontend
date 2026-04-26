import { clsx } from 'clsx';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';

/**
 * TWIST 07 — Identification des 100 apprenants à haut potentiel.
 * Cette page affiche le classement basé sur le score de potentiel de réussite.
 * Les explications ( explainability) sont intégrées selon la logique du TWIST 06.
 */

interface LearnerRanking {
  learner_id: string;
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

const SuccessLeaderboard: React.FC = () => {
  const [rankings, setRankings] = useState<LearnerRanking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/rankings/top-learners`);
        setRankings(response.data.data);
      } catch (error) {
        console.error('Error fetching rankings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  if (loading) return <div className="p-10 text-center">Chargement du Top 100 Potentiel...</div>;

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Top 100 Apprenants - Potentiel Entrepreneurial</h1>
        <p className="text-muted-foreground">Classement basé sur l'action terrain, l'engagement et le profil (TWIST 07)</p>
      </div>

      <div className="grid gap-4">
        {rankings.map((learner, index) => (
          <Card key={learner.learner_id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 text-primary w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  #{index + 1}
                </div>
                <div>
                  <CardTitle className="text-lg">Apprenant {learner.learner_id.substring(0, 8)}...</CardTitle>
                  <p className="text-sm text-muted-foreground">Segment : {learner.metrics.segment}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant={learner.metrics.business_launched ? "default" : "secondary"}>
                  {learner.metrics.business_launched ? "Auto-entrepreneur" : "En projet"}
                </Badge>
                <div className="text-2xl font-bold text-primary mt-1">{(learner.score * 100).toFixed(1)}%</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <p className="text-xs font-medium mb-1">Potentiel de réussite</p>
                    <Progress value={learner.score * 100} className="h-2" />
                  </div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap">
                    {learner.metrics.action_count} actions terrain
                  </div>
                </div>
                
                {learner.explanation && (
                  <div className="bg-muted/50 p-4 rounded-lg text-sm border-l-4 border-primary space-y-3">
                    <div>
                      <p className="font-semibold mb-1">Pourquoi ce classement ? (Explainability T06/T07)</p>
                      <p className="whitespace-pre-line">{learner.explanation.explanation_text}</p>
                    </div>
                    
                    {learner.contributions && (
                      <div className="pt-2 border-t border-border/50">
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Décomposition quantitative (Twist 09)</p>
                        <ul className="space-y-1.5">
                          {learner.contributions.map((c, i) => (
                            <li key={i} className="flex justify-between items-center text-xs">
                              <span>{c.variable} <span className="text-muted-foreground">({typeof c.weight === 'number' ? `x${c.weight}` : c.weight})</span></span>
                              <span className={clsx("font-mono font-medium", c.contribution >= 0 ? "text-green-600" : "text-red-500")}>
                                {c.contribution > 0 ? '+' : ''}{c.contribution.toFixed(4)}
                              </span>
                            </li>
                          ))}
                          <li className="flex justify-between items-center pt-1 border-t border-dashed border-border text-xs font-bold">
                            <span>Score Final</span>
                            <span>{learner.score.toFixed(4)}</span>
                          </li>
                        </ul>
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
