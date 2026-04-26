import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styles from './CourseDetail.module.css';
import { useCourseDetail } from '../../hooks/useCourseDetail';
import { useEnrollment } from '../../hooks/useEnrollment';
import CurriculumAccordion from '../../components/CurriculumAccordion/CurriculumAccordion';
import CourseRating from '../../components/CourseRating/CourseRating';
import { 
  ChevronRight, 
  Users, 
  Star, 
  Clock, 
  Globe, 
  Award, 
  CheckCircle2, 
  PlayCircle, 
  BookOpen, 
  FileText,
  Loader2
} from 'lucide-react';

const CourseDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: course, isLoading, error } = useCourseDetail(slug || '');
  const { mutate: enroll, isPending: isEnrolling } = useEnrollment();

  const handleEnrollClick = () => {
    if (!course) return;

    if (course.isEnrolled) {
      navigate(`/cours/${course.slug}/lecture`);
    } else {
      enroll(course.id, {
        onSuccess: () => {
          navigate(`/cours/${course.slug}/lecture`);
        }
      });
    }
  };

  if (isLoading) {
    return (
      <div className={styles['loading-container']}>
        <Loader2 className="animate-spin" size={48} />
        <p style={{ marginTop: '20px', fontWeight: 600 }}>Récupération du contenu...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className={styles['loading-container']}>
        <h2>Zut ! Cours introuvable.</h2>
        <p>Il se peut que ce lien soit expiré ou que le cours n'existe plus.</p>
        <Link to="/catalogue" className={styles['btn-enroll']} style={{ marginTop: '30px', maxWidth: '200px', display: 'inline-block', textAlign: 'center' }}>
          Retour au catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className={styles['detail-page']}>
      {/* 1. HERO SECTION */}
      <header className={styles.hero}>
        <div className="container">
          <nav className={styles.hero__breadcrumbs}>
            <Link to="/catalogue">Catalogue</Link>
            <ChevronRight size={14} />
            <span>{course.categoryName}</span>
          </nav>
          
          <span className={styles.hero__category}>{course.categoryName}</span>
          <h1 className={styles.hero__title}>{course.title}</h1>
          
          <div className={styles.hero__meta}>
            <div className={styles['meta-item']}>
              <Users size={18} />
              <span><strong>{course.enrolledCount?.toLocaleString()}</strong> élèves inscrits</span>
            </div>
            <div className={styles['meta-item']}>
              <Star size={18} fill="#F4A726" color="#F4A726" />
              <span><strong>{course.avgRating}</strong> ({course.reviewCount} avis)</span>
            </div>
            <div className={styles['meta-item']}>
              <Globe size={18} />
              <span>Langue : <strong>{course.language.toUpperCase()}</strong></span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTENT GRID */}
      <div className="container">
        <div className={styles['content-grid']}>
          
          {/* LEFT: INFO & CURRICULUM */}
          <main>
            {/* Objectifs */}
            <section className={styles['section-card']}>
              <h2 className={styles['section-title']}>Ce que vous allez apprendre</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  "Maîtriser les concepts fondamentaux",
                  "Appliquer des techniques avancées sur le terrain",
                  "Optimiser vos processus de décision",
                  "Certification Zenith reconnue par l'État"
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={18} className="text-brand-primary" strokeWidth={2.5} />
                    <span style={{ fontSize: '15px', color: 'var(--lp-text-body)', fontWeight: 500 }}>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Description */}
            <section className={styles['section-card']}>
              <h2 className={styles['section-title']}>Description</h2>
              <p className={styles['course-description']}>{course.longDescription}</p>
            </section>

            {/* Curriculum */}
            <section className={styles['section-card']}>
              <h2 className={styles['section-title']}>Programme de la formation</h2>
              <div className={styles['curriculum-list']}>
                <CurriculumAccordion modules={course.modules || []} />
              </div>
            </section>

            {/* Notation (seulement si inscrit) */}
            {course.isEnrolled && (
              <CourseRating 
                courseId={course.id} 
                onRate={(r, c) => console.log(`Rating for ${course.id}: ${r} stars, comment: ${c}`)} 
              />
            )}
          </main>

          {/* RIGHT: STICKY ENROLL CARD */}
          <aside>
            <div className={styles['sticky-card']}>
              <div className={styles['sticky-card__video']}>
                <img src={course.coverImageUrl} alt={course.title} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                  <PlayCircle size={64} color="white" style={{ margin: 'auto' }} strokeWidth={1} />
                </div>
              </div>
              
              <div className={styles['sticky-card__body']}>
                <div className={styles['price-tag']}>
                  {course.priceXaf ? (
                    <span className={styles['price-value']}>{course.priceXaf.toLocaleString()} FCFA</span>
                  ) : (
                    <span className={styles['price-free']}>Gratuit</span>
                  )}
                </div>

                <button 
                  className={styles['btn-enroll']}
                  onClick={handleEnrollClick}
                  disabled={isEnrolling}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                >
                  {isEnrolling ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    course.isEnrolled ? 'Continuer le cours' : 'Commencer maintenant'
                  )}
                </button>

                <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--lp-text-body)', fontWeight: 500 }}>
                  Garantie satisfaction de 30 jours
                </p>

                <div className={styles['includes-list']}>
                  <p className={styles['includes-title']}>Cette formation inclut :</p>
                  <div className={styles['include-item']}>
                    <Clock size={16} />
                    <span>{course.durationHours} heures de vidéo à la demande</span>
                  </div>
                  <div className={styles['include-item']}>
                    <BookOpen size={16} />
                    <span>L'accès complet et illimité</span>
                  </div>
                  <div className={styles['include-item']}>
                    <FileText size={16} />
                    <span>Ressources téléchargeables</span>
                  </div>
                  <div className={styles['include-item']}>
                    <Award size={16} />
                    <span>Certificat de fin de formation</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
