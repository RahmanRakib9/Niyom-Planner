// Exercise API service
// Using ExerciseDB API (free, no auth required)
// Alternative: wger API can be used as well

const EXERCISE_API_BASE = 'https://api.api-ninjas.com/v1/exercises';

export const fetchExercises = async (params = {}) => {
  try {
    const { muscle, type, difficulty } = params;
    let url = EXERCISE_API_BASE;
    const queryParams = [];

    if (muscle) queryParams.push(`muscle=${encodeURIComponent(muscle)}`);
    if (type) queryParams.push(`type=${encodeURIComponent(type)}`);
    if (difficulty) queryParams.push(`difficulty=${encodeURIComponent(difficulty)}`);

    if (queryParams.length > 0) {
      url += '?' + queryParams.join('&');
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Api-Key': '', // Free tier doesn't require key, but can be added if needed
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw error;
  }
};

export const fetchExercisesByMuscle = async (muscle) => {
  return fetchExercises({ muscle });
};

export const fetchExercisesByType = async (type) => {
  return fetchExercises({ type });
};

export const fetchExercisesByDifficulty = async (difficulty) => {
  return fetchExercises({ difficulty });
};

// Muscle groups available in the API
export const MUSCLE_GROUPS = [
  'abdominals',
  'abductors',
  'adductors',
  'biceps',
  'calves',
  'chest',
  'forearms',
  'glutes',
  'hamstrings',
  'lats',
  'lower_back',
  'middle_back',
  'neck',
  'quadriceps',
  'traps',
  'triceps',
];

// Exercise types
export const EXERCISE_TYPES = [
  'cardio',
  'olympic_weightlifting',
  'plyometrics',
  'powerlifting',
  'strength',
  'stretching',
  'strongman',
];

// Difficulty levels
export const DIFFICULTY_LEVELS = ['beginner', 'intermediate', 'expert'];

