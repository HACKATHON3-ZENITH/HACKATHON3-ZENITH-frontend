import React from 'react';
import styles from './FilterChip.module.css';
import { clsx } from 'clsx';

interface FilterChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  hasDropdown?: boolean;
}

const FilterChip: React.FC<FilterChipProps> = ({ 
  label, 
  active, 
  onClick, 
  hasDropdown 
}) => {
  return (
    <button 
      className={clsx(
        styles['filter-chip'],
        active && styles['filter-chip--active']
      )}
      onClick={onClick}
    >
      {label} {hasDropdown && <span style={{ marginLeft: '4px' }}>▾</span>}
    </button>
  );
};

export default FilterChip;
