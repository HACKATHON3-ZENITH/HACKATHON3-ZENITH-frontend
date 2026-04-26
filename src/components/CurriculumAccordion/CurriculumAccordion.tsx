import React, { useState } from 'react';
import styles from './CurriculumAccordion.module.css';
import { clsx } from 'clsx';
import { PlayCircle, FileText, HelpCircle, CheckCircle2, Circle } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  type: 'VIDEO' | 'TEXT' | 'QUIZ';
  isPreview?: boolean;
  isCompleted?: boolean;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface CurriculumAccordionProps {
  modules: Module[];
  onLessonClick?: (id: string) => void;
  currentLessonId?: string;
}

const CurriculumAccordion: React.FC<CurriculumAccordionProps> = ({ modules, onLessonClick, currentLessonId }) => {
  const [openModules, setOpenModules] = useState<string[]>([modules[0]?.id]);

  const toggleModule = (id: string) => {
    setOpenModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles['course-curriculum']}>
      {modules.map((module) => (
        <div 
          key={module.id} 
          className={clsx(
            styles['curriculum-module'], 
            openModules.includes(module.id) && styles['curriculum-module--open']
          )}
        >
          <div 
            className={styles['curriculum-module__header']}
            onClick={() => toggleModule(module.id)}
          >
            <div>
              <h4 className={styles['curriculum-module__title']}>{module.title}</h4>
              <p className={styles['curriculum-module__meta']}>
                {module.lessons.length} leçons • {module.lessons.reduce((acc, curr) => acc + curr.durationMinutes, 0)} min
              </p>
            </div>
            <span className={styles['curriculum-module__chevron']}>▾</span>
          </div>

          <div className={styles['curriculum-module__lessons']}>
            {module.lessons.map((lesson) => {
              const isActive = currentLessonId === lesson.id;
              // Pour la démo, on simule l'état complété si ce n'est pas le cours actif mais qu'il a le flag isCompleted
              const isCompleted = lesson.isCompleted;

              return (
                <div 
                  key={lesson.id} 
                  className={clsx(
                    styles['curriculum-lesson'],
                    isActive && styles['curriculum-lesson--active'],
                    isCompleted && styles['curriculum-lesson--completed']
                  )}
                  onClick={() => onLessonClick?.(lesson.id)}
                >
                  <div className={styles['curriculum-lesson__status']}>
                    {isCompleted ? (
                      <CheckCircle2 size={18} className={styles['status-icon-completed']} />
                    ) : isActive ? (
                      <PlayCircle size={18} className={styles['status-icon-active']} />
                    ) : (
                      <Circle size={18} className={styles['status-icon-locked']} />
                    )}
                  </div>

                  <div className={clsx(
                    styles['curriculum-lesson__icon'],
                    styles[`curriculum-lesson__icon--${lesson.type.toLowerCase()}`]
                  )}>
                    {lesson.type === 'VIDEO' ? <PlayCircle size={14} /> : 
                     lesson.type === 'QUIZ' ? <HelpCircle size={14} /> : 
                     <FileText size={14} />}
                  </div>
                  
                  <span className={clsx(
                    styles['curriculum-lesson__title'],
                    isCompleted && styles['curriculum-lesson__title--completed']
                  )}>
                    {lesson.title}
                  </span>
                  
                  {lesson.isPreview && (
                    <span className={styles['curriculum-lesson__preview-badge']}>Aperçu</span>
                  )}
                  
                  <span className={styles['curriculum-lesson__duration']}>
                    {lesson.durationMinutes}m
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CurriculumAccordion;
