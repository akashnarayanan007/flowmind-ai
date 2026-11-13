import React, { useState } from 'react';
import { VenueContext } from './VenueContextInstance';

export const VenueProvider = ({ children }) => {
  const [selectedStadium, setSelectedStadium] = useState('A');
  const [activeCategory, setActiveCategory] = useState(null); // 'food' | 'washrooms' | 'exits' | null

  const toggleCategory = (cat) => {
    setActiveCategory(prev => (prev === cat ? null : cat));
  };

  return (
    <VenueContext.Provider value={{
      selectedStadium,
      setSelectedStadium,
      activeCategory,
      setActiveCategory,
      toggleCategory,
    }}>
      {children}
    </VenueContext.Provider>
  );
};

export default VenueProvider;
