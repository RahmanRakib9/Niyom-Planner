# Fitness and Diet Planner - React Native App

A minimal and straightforward React Native app for fitness and diet planning with exercise tracking capabilities.

## Features

### EP1: Responsive Dashboards & Input Validation
- Responsive dashboard with stats and quick actions
- Comprehensive form validation for user profile (name, age, weight, height, goals)
- Input validation for plan review and scheduling
- Real-time error messages and feedback

### EP2: E-commerce Flow Adaptation
- **Browse** → Browse Exercises screen (search/filter exercises from API)
- **Cart** → My Plan screen (selected exercises)
- **Checkout** → Review Plan screen (confirm selections, set schedule)
- **Order Tracking** → Progress Tracking screen (daily logs, completion status)

### EP3: State Management with Provider
- React Context API for global state management
- Clean state separation without prop drilling
- Reduced widget rebuild costs
- Manages: user profile, exercises, plan, progress data

### EP4: Third-Party REST API Integration
- Integration with ExerciseDB API (free, no authentication required)
- Fetches exercises by muscle group, type, and difficulty
- Cached API responses in context for better performance

## Screens

1. **Dashboard** - Overview with stats, today's plan summary, quick actions
2. **Browse Exercises** - List/search exercises from API with filters
3. **Exercise Details** - View exercise details and add to plan
4. **My Plan** - View and manage selected exercises (like shopping cart)
5. **Review Plan** - Confirm and finalize plan with schedule (like checkout)
6. **Progress Tracking** - Track daily/weekly progress (like order tracking)
7. **Profile** - User profile, goals, and preferences with validation

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the Expo development server:
```bash
npm start
```

3. Run on your preferred platform:
- Press `a` for Android
- Press `i` for iOS
- Press `w` for web
- Scan QR code with Expo Go app on your device

## Project Structure

```
MAD_FALL_25/
├── App.js                      # Main app entry point
├── package.json                # Dependencies
├── app.json                    # Expo configuration
├── src/
│   ├── context/
│   │   └── AppContext.js      # Global state management with Provider
│   ├── screens/
│   │   ├── Dashboard.js
│   │   ├── BrowseExercises.js
│   │   ├── ExerciseDetails.js
│   │   ├── MyPlan.js
│   │   ├── ReviewPlan.js
│   │   ├── ProgressTracking.js
│   │   └── Profile.js
│   ├── components/
│   │   ├── ExerciseCard.js
│   │   ├── PlanItem.js
│   │   ├── ProgressChart.js
│   │   └── InputField.js
│   ├── services/
│   │   └── api.js             # Exercise API integration
│   └── utils/
│       └── validation.js      # Input validation helpers
└── navigation/
    └── AppNavigator.js        # Navigation setup
```

## API Details

The app uses the **ExerciseDB API** from API Ninjas:
- Base URL: `https://api.api-ninjas.com/v1/exercises`
- Free tier: 10 requests/minute
- No authentication required for basic usage
- Returns exercise data including: name, type, muscle, equipment, difficulty, instructions

## Usage Flow

1. **Set up Profile**: Go to Profile screen and enter your information (name, age, weight, height, fitness goal)

2. **Browse Exercises**: Navigate to Browse Exercises to search and filter exercises from the API

3. **Add to Plan**: View exercise details and add exercises to your plan

4. **Review Plan**: Go to My Plan to see all selected exercises, then Review Plan to confirm and schedule

5. **Track Progress**: Use Progress Tracking screen to mark exercises as completed daily

## Technologies Used

- React Native (Expo)
- React Navigation (Stack Navigator)
- React Context API (State Management)
- ExerciseDB API (Third-party REST API)

## Notes

- The app uses Flexbox for responsive layouts
- All forms include validation with error messages
- State is managed globally using Context API to avoid prop drilling
- API responses are cached in context for better performance
- The app follows an e-commerce-like flow adapted for fitness planning

