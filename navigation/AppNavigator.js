import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../src/screens/Dashboard';
import BrowseExercises from '../src/screens/BrowseExercises';
import ExerciseDetails from '../src/screens/ExerciseDetails';
import MyPlan from '../src/screens/MyPlan';
import ReviewPlan from '../src/screens/ReviewPlan';
import ProgressTracking from '../src/screens/ProgressTracking';
import Profile from '../src/screens/Profile';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3498db',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ title: 'Dashboard' }}
        />
        <Stack.Screen
          name="BrowseExercises"
          component={BrowseExercises}
          options={{ title: 'Browse Exercises' }}
        />
        <Stack.Screen
          name="ExerciseDetails"
          component={ExerciseDetails}
          options={{ title: 'Exercise Details' }}
        />
        <Stack.Screen
          name="MyPlan"
          component={MyPlan}
          options={{ title: 'My Plan' }}
        />
        <Stack.Screen
          name="ReviewPlan"
          component={ReviewPlan}
          options={{ title: 'Review Plan' }}
        />
        <Stack.Screen
          name="ProgressTracking"
          component={ProgressTracking}
          options={{ title: 'Progress Tracking' }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: 'Profile' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

