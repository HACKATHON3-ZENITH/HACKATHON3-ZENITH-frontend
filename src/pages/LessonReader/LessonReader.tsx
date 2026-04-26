import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styles from './LessonReader.module.css';
import { useCourseDetail } from '../../hooks/useCourseDetail';
import CurriculumAccordion from '../../components/CurriculumAccordion/CurriculumAccordion';
import { 
  ChevronLeft, 
  Menu, 
  ChevronRight, 
  PlayCircle, 
  FileText, 
  HelpCircle,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { clsx } from 'clsx';

const LessonReader: React.FC = () => {
  const { slug, leconId } = useParams<{ slug: string; leconId?: string }>();
  const navigate = useNavigate();
  const { data: course, isLoading } = useCourseDetail(slug || '');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Flat lessons list for navigation
  const allLessons = course?.modules?.flatMap((m: any) => m.lessons) || [];
  
  // Current lesson logic
  const currentLesson = leconId 
    ? allLessons.find((l: any) => l.id === leconId)
    : allLessons[0];

  const currentIdx = allLessons.findIndex((l: any) => l.id === currentLesson?.id);
  const nextLesson = allLessons[currentIdx + 1];
  const prevLesson = allLessons[currentIdx - 1];

  const handleNext = () => {
    if (nextLesson) navigate(`/cours/${slug}/lecture/${nextLesson.id}`);
  };

  const handlePrev = () => {
    if (prevLesson) navigate(`/cours/${slug}/lecture/${prevLesson.id}`);
  };

  if (isLoading) {
    return (
      <div className={styles['reader-container']} style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  if (!course || allLessons.length === 0) {
    return (
      <div className={styles['reader-container']} style={{ alignItems: 'center', justifyContent: 'center' }}>
        <h2>Aucune leçon trouvée pour ce cours.</h2>
        <Link to={`/cours/${slug}`} style={{ marginTop: '20px', color: 'var(--lp-primary)', fontWeight: 700 }}>Retour aux détails</Link>
      </div>
    );
  }

  return (
    <div className={styles['reader-container']}>
      {/* 1. HEADER & PROGRESS */}
      <header className={styles['reader-header']}>
        <div className={styles['reader-header__left']}>
          <button 
            className={styles['btn-back']} 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{ borderRadius: '8px', background: isSidebarOpen ? 'var(--lp-primary-light)' : '#f5f5f5', marginRight: '8px' }}
          >
            <Menu size={20} color={isSidebarOpen ? 'var(--lp-primary)' : 'currentColor'} />
          </button>
          <button className={styles['btn-back']} onClick={() => navigate(`/cours/${slug}`)}>
            <ChevronLeft size={20} />
          </button>
          <span className={styles['course-title']}>{course.title}</span>
        </div>

        <div className={styles['progress-container']}>
          <div className={styles['progress-bar']}>
            <div 
              className={styles['progress-fill']} 
              style={{ width: `${((currentIdx + 1) / allLessons.length) * 100}%` }}
            />
          </div>
          <div className={styles['progress-label']}>
            Leçon {currentIdx + 1} sur {allLessons.length}
          </div>
        </div>

        <div className={styles['reader-header__right']}>
          {/* Vide pour conserver l'espacement et centrer le titre */}
        </div>
      </header>

      {/* 2. BODY */}
      <div className={styles['reader-body']}>
        {/* Sidebar Sommaire */}
        <aside className={clsx(styles['reader-sidebar'], !isSidebarOpen && styles['reader-sidebar--closed'])}>
          <div className={styles['sidebar-header']}>Sommaire du cours</div>
          <div className={styles['sidebar-scroll']}>
            <CurriculumAccordion 
              modules={course.modules || []} 
              onLessonClick={(id) => navigate(`/cours/${slug}/lecture/${id}`)}
              currentLessonId={currentLesson?.id}
            />
          </div>
        </aside>

        {/* Contenu de la leçon */}
        <main className={styles['reader-content']}>
          <div className={styles['content-inner']}>
            <h1 className={styles['lesson-title']}>{currentLesson?.title}</h1>

            {currentLesson?.type === 'VIDEO' && (
              <div className={styles['video-placeholder']}>
                {currentLesson.videoUrl ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={currentLesson.videoUrl}
                    title="Player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'white', gap: '20px' }}>
                    <PlayCircle size={80} strokeWidth={1} />
                    <p>Vidéo de cours bientôt disponible</p>
                  </div>
                )}
              </div>
            )}

            {currentLesson?.type === 'TEXT' && (
              <div 
                className={styles['article-body']}
                dangerouslySetInnerHTML={{ __html: currentLesson.contentHtml || '<p>Aucun texte disponible pour cette leçon.</p>' }}
              />
            )}

            {currentLesson?.type === 'QUIZ' && (
              <div style={{ background: 'white', padding: '40px', borderRadius: '24px', border: '1px solid var(--lp-border)', textAlign: 'center' }}>
                <HelpCircle size={64} color="var(--lp-secondary)" style={{ margin: '0 auto 24px' }} />
                <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '16px' }}>Quiz de validation</h2>
                <p style={{ color: 'var(--lp-text-body)', marginBottom: '32px' }}>
                  Testez vos connaissances sur ce module pour débloquer la suite.
                </p>
                <button className={styles['btn-nav--next']} style={{ padding: '14px 40px' }}>
                  Commencer le quiz
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* 3. FOOTER NAVIGATION */}
      <footer className={styles['reader-footer']}>
        <button 
          className={clsx(styles['btn-nav'], styles['btn-nav--prev'])}
          onClick={handlePrev}
          disabled={!prevLesson}
          style={{ opacity: prevLesson ? 1 : 0.5 }}
        >
          <ChevronLeft size={18} />
          Leçon précédente
        </button>

        <button 
          className={clsx(styles['btn-nav'], styles['btn-nav--next'])}
          onClick={handleNext}
          disabled={!nextLesson}
          style={{ opacity: nextLesson ? 1 : 0.5 }}
        >
          {nextLesson ? 'Leçon suivante' : 'Cours terminé !'}
          <ChevronRight size={18} />
        </button>
      </footer>
    </div>
  );
};

export default LessonReader;
