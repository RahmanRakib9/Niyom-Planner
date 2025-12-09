import React, { createContext, useState, useContext, useCallback } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    goal: 'weight_loss', // weight_loss, muscle_gain, maintenance
  });
  
  const [exercises, setExercises] = useState([]); // Cached from API
  const [plan, setPlan] = useState([]); // Selected exercises
  const [progress, setProgress] = useState([]); // Daily tracking data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update user profile
  const updateProfile = useCallback((profileData) => {
    setUserProfile(prev => ({ ...prev, ...profileData }));
  }, []);

  // Add exercise to plan
  const addToPlan = useCallback((exercise) => {
    setPlan(prev => {
      // Check if already in plan
      const exists = prev.find(item => item.name === exercise.name);
      if (exists) return prev;
      return [...prev, { ...exercise, id: Date.now(), scheduled: false }];
    });
  }, []);

  // Remove exercise from plan
  const removeFromPlan = useCallback((exerciseId) => {
    setPlan(prev => prev.filter(item => item.id !== exerciseId));
  }, []);

  // Update plan item
  const updatePlanItem = useCallback((exerciseId, updates) => {
    setPlan(prev => prev.map(item => 
      item.id === exerciseId ? { ...item, ...updates } : item
    ));
  }, []);

  // Clear plan
  const clearPlan = useCallback(() => {
    setPlan([]);
  }, []);

  // Confirm plan (mark all as scheduled)
  const confirmPlan = useCallback(() => {
    setPlan(prev => prev.map(item => ({ ...item, scheduled: true })));
  }, []);

  // Add progress entry
  const addProgress = useCallback((date, data) => {
    setProgress(prev => {
      const existing = prev.find(p => p.date === date);
      if (existing) {
        return prev.map(p => p.date === date ? { ...p, ...data } : p);
      }
      return [...prev, { date, ...data }];
    });
  }, []);

  // Cache exercises from API
  const cacheExercises = useCallback((exerciseList) => {
    setExercises(exerciseList);
  }, []);

  const value = {
    userProfile,
    exercises,
    plan,
    progress,
    loading,
    error,
    updateProfile,
    addToPlan,
    removeFromPlan,
    updatePlanItem,
    clearPlan,
    confirmPlan,
    addProgress,
    cacheExercises,
    setLoading,
    setError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

