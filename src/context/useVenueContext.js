import { useContext } from 'react';
import { VenueContext } from './VenueContextInstance';

export const useVenueContext = () => {
  const ctx = useContext(VenueContext);
  if (!ctx) throw new Error('useVenueContext must be used within VenueProvider');
  return ctx;
};

export default useVenueContext;
