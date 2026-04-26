import React from 'react';
import styles from './LearningPathCard.module.css';

interface LearningPathCardProps {
  title: string;
  label: string;
  imageUrl?: string;
  onClick?: () => void;
}

const LearningPathCard: React.FC<LearningPathCardProps> = ({ 
  title, 
  label, 
  imageUrl,
  onClick 
}) => {
  return (
    <article className={styles['learning-path-card']} onClick={onClick}>
      {imageUrl && <img src={imageUrl} alt={title} className={styles['learning-path-card__bg']} />}
      <div className={styles['learning-path-card__overlay']}>
        <span className={styles['learning-path-card__label']}>{label}</span>
        <h3 className={styles['learning-path-card__title']}>{title}</h3>
      </div>
    </article>
  );
};

export default LearningPathCard;
