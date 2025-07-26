'use client';

import React, { createContext, useContext, useState } from 'react';

const ModeContext = createContext();

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};

export const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState('companion'); // 'companion' or 'builder'

  const toggleMode = () => {
    setMode(prev => prev === 'companion' ? 'builder' : 'companion');
  };

  const setCompanionMode = () => setMode('companion');
  const setBuilderMode = () => setMode('builder');

  const isCompanionMode = mode === 'companion';
  const isBuilderMode = mode === 'builder';

  return (
    <ModeContext.Provider value={{
      mode,
      setMode,
      toggleMode,
      setCompanionMode,
      setBuilderMode,
      isCompanionMode,
      isBuilderMode
    }}>
      {children}
    </ModeContext.Provider>
  );
};