import React from 'react';
import styles from './LessonArticle.module.css';

interface LessonArticleProps {
  contentHtml: string;
}

const LessonArticle: React.FC<LessonArticleProps> = ({ contentHtml }) => {
  return (
    <article 
      className={styles['lesson-article']}
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
};

export default LessonArticle;
