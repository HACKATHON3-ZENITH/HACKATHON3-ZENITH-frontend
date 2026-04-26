/**
 * TWIST 03 — La durée d'un cours est affichée à titre informatif.
 * L'ordre de recommandation ne favorise PAS les cours courts :
 * le moteur ML normalise la complétion par la durée.
 */
import React, { useState, useMemo } from 'react';
import styles from './Catalogue.module.css';
import CourseCard from '../../components/CourseCard/CourseCard';
import CourseGrid from '../../components/CourseGrid/CourseGrid';
import FilterChip from '../../components/FilterChip/FilterChip';
import { useCourses } from '../../hooks/useCourses';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { Search, LayoutGrid, List, SlidersHorizontal, X, Loader2 } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'Tous les cours' },
  { id: 'finance', label: 'Finance' },
  { id: 'tech', label: 'Technologie' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'soft-skills', label: 'Soft Skills' },
  { id: 'management', label: 'Management' }
];

const LEVELS = [
  { id: 'all', label: 'Tous les niveaux' },
  { id: 'BEGINNER', label: 'Débutant' },
  { id: 'INTERMEDIATE', label: 'Intermédiaire' },
  { id: 'ADVANCED', label: 'Avancé' }
];

const Catalogue: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLevel, setActiveLevel] = useState('all');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const navigate = useNavigate();
  
  const queryParams = useMemo(() => {
    const params: any = { search };
    if (activeCategory !== 'all') params.category = activeCategory;
    if (activeLevel !== 'all') params.level = activeLevel;
    return params;
  }, [search, activeCategory, activeLevel]);

  const { data: courses, isLoading, error } = useCourses(queryParams);
  const total = courses?.length || 0;

  const handleResetFilters = () => {
    setActiveCategory('all');
    setActiveLevel('all');
    setSearch('');
  };

  return (
    <div className={styles['catalog-page']}>
      <div className="container">

        {/* HEADER */}
        <div className={styles['catalog-header']}>
          <div>
            <h1 className={styles['catalog-header__title']}>Catalogue de Formations</h1>
            <p className={styles['catalog-header__count']}>
              {isLoading ? 'Chargement...' : `${total} cours disponibles pour vous`}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className={clsx(styles['catalog-view-toggle'], viewMode === 'grid' && styles.active)}
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid size={20} />
            </button>
            <button 
              className={clsx(styles['catalog-view-toggle'], viewMode === 'list' && styles.active)}
              onClick={() => setViewMode('list')}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {/* RECHERCHE */}
        <div className={styles['catalog-search-wrapper']}>
          <input 
            className={styles['catalog-search']}
            placeholder="Rechercher un cours (ex: Business plan, Marketing...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* FILTRES CHIPS */}
        <div className={styles['catalog-filter-bar']}>
          {CATEGORIES.map(cat => (
            <FilterChip 
              key={cat.id}
              label={cat.label}
              active={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            />
          ))}
          
          <button 
            className={styles['catalog-filters-advanced-btn']}
            onClick={() => setIsFiltersOpen(true)}
          >
            <SlidersHorizontal size={16} />
            Filtres avancés
          </button>
        </div>

        {/* GRILLE DE COURS */}
        {isLoading ? (
          <div className={styles['catalog-loading']}>
            <Loader2 className="animate-spin" size={40} />
            <p style={{ marginTop: '20px' }}>Chargement du catalogue...</p>
          </div>
        ) : total > 0 ? (
          <CourseGrid>
            {courses?.map((course: any) => (
              <CourseCard 
                key={course.id} 
                {...course} 
                variant={viewMode === 'list' ? 'compact' : 'default'}
                onClick={() => navigate(`/cours/${course.slug}`)}
              />
            ))}
          </CourseGrid>
        ) : (
          <div className={styles['catalog-empty']}>
            <h3>Aucun cours trouvé</h3>
            <p>Essayez d'ajuster vos critères de recherche.</p>
            <button onClick={handleResetFilters} className={styles['btn-primary']} style={{ marginTop: '20px', padding: '10px 30px' }}>
              Réinitialiser
            </button>
          </div>
        )}
      </div>

      {/* MODAL FILTRES */}
      <div 
        className={clsx(styles['filters-panel-overlay'], isFiltersOpen && styles['filters-panel-overlay--open'])}
        onClick={() => setIsFiltersOpen(false)}
      />
      <aside className={clsx(styles['filters-panel'], isFiltersOpen && styles['filters-panel--open'])}>
        <div className={styles['filters-panel__header']}>
          <h3>Filtres Avancés</h3>
          <button className={styles['filters-panel__close']} onClick={() => setIsFiltersOpen(false)}>
            <X size={20} />
          </button>
        </div>
        
        <div className={styles['filters-panel__group']}>
          <label className={styles['filters-panel__group-label']}>Niveau de difficulté</label>
          {LEVELS.map(level => (
            <label key={level.id} className={styles['filter-option']}>
              <input 
                type="radio" 
                name="level" 
                checked={activeLevel === level.id}
                onChange={() => setActiveLevel(level.id)}
              />
              <span>{level.label}</span>
            </label>
          ))}
        </div>

        <div className={styles['filters-panel__group']}>
          <label className={styles['filters-panel__group-label']}>Durée maximum</label>
          <div style={{ padding: '0 5px' }}>
            <input type="range" min="0" max="50" style={{ width: '100%', accentColor: 'var(--lp-primary)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '10px', color: 'var(--lp-text-body)' }}>
              <span>0h</span>
              <span>50h+</span>
            </div>
          </div>
        </div>

        <div className={styles['filters-panel__footer']}>
          <button className={styles['btn-secondary']} onClick={handleResetFilters}>Effacer</button>
          <button className={styles['btn-primary']} onClick={() => setIsFiltersOpen(false)}>Appliquer</button>
        </div>
      </aside>
    </div>
  );
};

export default Catalogue;
