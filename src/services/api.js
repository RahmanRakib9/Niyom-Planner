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
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // Return sample data if API fails (for development/testing)
      console.warn('API request failed, using sample data');
      return getSampleExercises();
    }

    const data = await response.json();
    
    // If API returns empty or error, use sample data
    if (!data || data.length === 0) {
      return getSampleExercises();
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    // Return sample data as fallback
    return getSampleExercises();
  }
};

// Sample exercises data as fallback
const getSampleExercises = () => {
  return [
    {
      name: 'Push-ups',
      type: 'strength',
      muscle: 'chest',
      equipment: 'body weight',
      difficulty: 'beginner',
      instructions: 'Start in plank position. Lower your body until chest nearly touches floor. Push back up to starting position.',
    },
    {
      name: 'Squats',
      type: 'strength',
      muscle: 'quadriceps',
      equipment: 'body weight',
      difficulty: 'beginner',
      instructions: 'Stand with feet shoulder-width apart. Lower your body as if sitting in a chair. Return to standing position.',
    },
    {
      name: 'Plank',
      type: 'strength',
      muscle: 'abdominals',
      equipment: 'body weight',
      difficulty: 'beginner',
      instructions: 'Hold your body in a straight line, supported on forearms and toes. Keep core tight.',
    },
    {
      name: 'Lunges',
      type: 'strength',
      muscle: 'quadriceps',
      equipment: 'body weight',
      difficulty: 'intermediate',
      instructions: 'Step forward with one leg, lowering hips until both knees are bent at 90 degrees. Push back to start.',
    },
    {
      name: 'Pull-ups',
      type: 'strength',
      muscle: 'lats',
      equipment: 'pull-up bar',
      difficulty: 'intermediate',
      instructions: 'Hang from bar with palms facing away. Pull body up until chin clears bar. Lower with control.',
    },
    {
      name: 'Burpees',
      type: 'cardio',
      muscle: 'full body',
      equipment: 'body weight',
      difficulty: 'intermediate',
      instructions: 'Squat down, jump back to plank, do push-up, jump feet forward, jump up with arms overhead.',
    },
    {
      name: 'Deadlifts',
      type: 'strength',
      muscle: 'hamstrings',
      equipment: 'barbell',
      difficulty: 'expert',
      instructions: 'Stand with feet hip-width apart. Hinge at hips, keeping back straight. Lift weight by extending hips and knees.',
    },
    {
      name: 'Bench Press',
      type: 'strength',
      muscle: 'chest',
      equipment: 'barbell',
      difficulty: 'intermediate',
      instructions: 'Lie on bench, lower barbell to chest, press up until arms are fully extended.',
    },
  ];
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

