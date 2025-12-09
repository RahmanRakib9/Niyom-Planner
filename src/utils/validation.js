// Input validation utilities

export const validateName = (name) => {
  if (!name || name.trim().length === 0) {
    return 'Name is required';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }
  return null;
};

export const validateAge = (age) => {
  if (!age || age.toString().trim().length === 0) {
    return 'Age is required';
  }
  const ageNum = parseInt(age, 10);
  if (isNaN(ageNum)) {
    return 'Age must be a number';
  }
  if (ageNum < 13 || ageNum > 120) {
    return 'Age must be between 13 and 120';
  }
  return null;
};

export const validateWeight = (weight) => {
  if (!weight || weight.toString().trim().length === 0) {
    return 'Weight is required';
  }
  const weightNum = parseFloat(weight);
  if (isNaN(weightNum)) {
    return 'Weight must be a number';
  }
  if (weightNum < 20 || weightNum > 500) {
    return 'Weight must be between 20 and 500 kg';
  }
  return null;
};

export const validateHeight = (height) => {
  if (!height || height.toString().trim().length === 0) {
    return 'Height is required';
  }
  const heightNum = parseFloat(height);
  if (isNaN(heightNum)) {
    return 'Height must be a number';
  }
  if (heightNum < 100 || heightNum > 250) {
    return 'Height must be between 100 and 250 cm';
  }
  return null;
};

export const validateGoal = (goal) => {
  const validGoals = ['weight_loss', 'muscle_gain', 'maintenance'];
  if (!goal || !validGoals.includes(goal)) {
    return 'Please select a valid goal';
  }
  return null;
};

export const validatePlan = (plan) => {
  if (!plan || plan.length === 0) {
    return 'Please add at least one exercise to your plan';
  }
  return null;
};

export const validateSchedule = (schedule) => {
  if (!schedule || schedule.trim().length === 0) {
    return 'Please select a schedule';
  }
  return null;
};

// Validate entire profile
export const validateProfile = (profile) => {
  const errors = {};
  
  const nameError = validateName(profile.name);
  if (nameError) errors.name = nameError;
  
  const ageError = validateAge(profile.age);
  if (ageError) errors.age = ageError;
  
  const weightError = validateWeight(profile.weight);
  if (weightError) errors.weight = weightError;
  
  const heightError = validateHeight(profile.height);
  if (heightError) errors.height = heightError;
  
  const goalError = validateGoal(profile.goal);
  if (goalError) errors.goal = goalError;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

