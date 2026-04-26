import React from 'react';
import styles from './CourseGrid.module.css';

interface CourseGridProps {
  children: React.ReactNode;
}

const CourseGrid: React.FC<CourseGridProps> = ({ children }) => {
  return <div className={styles['course-grid']}>{children}</div>;
};

export default CourseGrid;
