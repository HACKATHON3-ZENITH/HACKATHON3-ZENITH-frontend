import React, { useState } from 'react';
import styles from './CourseRating.module.css';
import { Star, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';

interface CourseRatingProps {
  courseId: string;
  onRate?: (rating: number, comment: string) => void;
}

const CourseRating: React.FC<CourseRatingProps> = ({ onRate }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    
    // Simuler l'appel API
    setSubmitted(true);
    onRate?.(rating, comment);
  };

  if (submitted) {
    return (
      <div className={styles['success-message']}>
        <CheckCircle2 size={24} />
        <span>Merci pour votre avis ! Votre note a bien été prise en compte.</span>
      </div>
    );
  }

  return (
    <div className={styles['rating-box']}>
      <h3 className={styles['rating-title']}>Notez ce cours</h3>
      <p className={styles['rating-subtitle']}>Votre avis aide les autres membres de la communauté à choisir leurs formations.</p>
      
      <form onSubmit={handleSubmit}>
        <div className={styles['stars-container']}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={styles['star-button']}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              <Star 
                size={32} 
                fill={(hover || rating) >= star ? '#F4A726' : 'transparent'} 
                color={(hover || rating) >= star ? '#F4A726' : 'var(--lp-border)'}
                strokeWidth={1.5}
              />
            </button>
          ))}
        </div>

        <textarea
          className={styles['comment-area']}
          placeholder="Qu'avez-vous pensé de ce cours ? (facultatif)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button 
          type="submit" 
          className={styles['submit-btn']}
          disabled={rating === 0}
        >
          Envoyer mon avis
        </button>
      </form>
    </div>
  );
};

export default CourseRating;
