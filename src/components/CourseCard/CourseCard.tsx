/**
 * TWIST 06 — Le système produit des raisons de recommandation (recoReason)
 * explicables. Chaque raison est basée sur les variables réelles du modèle
 * ML (taux d'engagement, complétion ajustée, ou segment utilisateur).
 */
import React from 'react';
import styles from './CourseCard.module.css';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';

interface Skill {
  name: string;
  slug: string;
}

interface CourseCardProps {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  coverImageUrl: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  format: 'SELF_PACED' | 'INSTRUCTOR_LED';
  durationHours: number;
  language: string;
  categoryName: string;
  categoryColorHex?: string;
  creatorName: string;
  avgRating: number;
  reviewCount: number;
  enrolledCount?: number;
  priceXaf: number | null;
  skills?: Skill[];
  badgeName?: string;
  recoReason?: string;
  contributions?: Array<{
    factor: string;
    weight: number | string;
    value: number;
    impact: number;
  }>;
  isEnrolled?: boolean;
  userCompletionRate?: number;
  variant?: 'default' | 'compact';
  onClick?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  slug,
  coverImageUrl,
  level,
  format,
  durationHours,
  language,
  categoryName,
  creatorName,
  avgRating = 0,
  reviewCount = 0,
  priceXaf,
  recoReason,
  contributions,
  isEnrolled,
  userCompletionRate = 0,
  variant = 'default',
  onClick
}) => {
  const navigate = useNavigate();

  const levelLabels = {
    BEGINNER: 'Débutant',
    INTERMEDIATE: 'Intermédiaire',
    ADVANCED: 'Avancé'
  };

  const levelClass = {
    BEGINNER: styles['course-card__level-badge--debutant'],
    INTERMEDIATE: styles['course-card__level-badge--intermediaire'],
    ADVANCED: styles['course-card__level-badge--avance']
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isEnrolled) {
      navigate(`/cours/${slug}/lecture`);
    } else {
      navigate(`/cours/${slug}`);
    }
  };

  return (
    <article 
      className={clsx(
        styles['course-card'],
        recoReason && styles['course-card--with-reco'],
        isEnrolled && styles['course-card--enrolled'],
        variant === 'compact' && styles['course-card--compact']
      )}
      onClick={onClick || (() => navigate(`/cours/${slug}`))}
    >
      <div className={styles['course-card__cover']}>
        <img src={coverImageUrl} alt={title} loading="lazy" />
        <span className={styles['course-card__type-badge']}>
          {format === 'SELF_PACED' ? 'En autonomie' : 'Avec instructeur'}
        </span>
        <span className={clsx(styles['course-card__level-badge'], levelClass[level])}>
          {levelLabels[level]}
        </span>
      </div>

      <div className={styles['course-card__body']}>
        <p className={styles['course-card__category']}>{categoryName}</p>
        <h3 className={styles['course-card__title']}>{title}</h3>
        <div className={styles['course-card__meta']}>
          <span>{creatorName}</span>
          <span className={styles['course-card__meta-dot']}></span>
          <span>{durationHours}h</span>
          <span className={styles['course-card__meta-dot']}></span>
          <span>{language === 'fr' ? 'Français' : 'English'}</span>
        </div>
        <div className={styles['course-card__rating']}>
          <span className={styles['course-card__stars']}>{'★'.repeat(Math.round(avgRating))}</span>
          <span className={styles['course-card__rating-score']}>{avgRating.toFixed(1)}</span>
          <span className={styles['course-card__rating-count']}>({reviewCount} avis)</span>
        </div>
      </div>

      {recoReason && (
        <div className={styles['course-card__reco-reason']}>
          <p>{recoReason}</p>
          {contributions && (
            <div className={styles['course-card__contributions']} style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(13, 92, 77, 0.2)', fontSize: '0.75rem' }}>
              <p style={{ fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px', fontSize: '10px', opacity: 0.8 }}>Décomposition Twist 09</p>
              {contributions.map((c, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span>{c.factor}</span>
                  <span style={{ fontWeight: 600 }}>{c.impact > 0 ? '+' : ''}{c.impact.toFixed(3)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {!isEnrolled && (
        <div className={styles['course-card__footer']}>
          <span className={clsx(
            styles['course-card__price'],
            !priceXaf && styles['course-card__price--free']
          )}>
            {priceXaf ? `${priceXaf.toLocaleString('fr-FR')} XAF` : 'Gratuit'}
          </span>
          <button className={styles['course-card__cta']} style={{ width: '154px', textAlign: 'center' }} onClick={handleCtaClick}>Voir le cours →</button>
        </div>
      )}

      {isEnrolled && (
        <div className={styles['course-card__footer']} style={{ display: 'block' }}>
          <div className={styles['course-card__progress-bar']}>
            <div 
              className={styles['course-card__progress-fill']}
              style={{ width: `${userCompletionRate}%` }}
            ></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
            <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--lp-text-title)' }}>{userCompletionRate}%</span>
            <button className={styles['course-card__cta']} style={{ width: '154px', textAlign: 'center' }} onClick={handleCtaClick}>Continuer</button>
          </div>
        </div>
      )}
    </article>
  );
};

export default CourseCard;
