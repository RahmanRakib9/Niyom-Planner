import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useApp } from '../context/AppContext';
import ProgressChart from '../components/ProgressChart';

const ProgressTracking = ({ navigation }) => {
  const { plan, progress, addProgress } = useApp();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const scheduledExercises = plan.filter(p => p.scheduled);
  const todayProgress = progress.find(p => p.date === selectedDate);
  const completedExercises = todayProgress?.completedExercises || [];

  const handleToggleExercise = (exerciseId) => {
    const isCompleted = completedExercises.includes(exerciseId);
    const newCompleted = isCompleted
      ? completedExercises.filter(id => id !== exerciseId)
      : [...completedExercises, exerciseId];

    addProgress(selectedDate, {
      completedExercises: newCompleted,
      date: selectedDate,
    });

    if (!isCompleted) {
      Alert.alert('Great job!', 'Exercise marked as completed.');
    }
  };

  const getDateLabel = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const getWeekDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const weekDates = getWeekDates();
  const weekProgress = weekDates.map(date => {
    const dayProgress = progress.find(p => p.date === date);
    const scheduled = scheduledExercises.length;
    const completed = dayProgress?.completedExercises?.length || 0;
    return { date, completed, total: scheduled };
  });

  if (scheduledExercises.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No scheduled exercises</Text>
          <Text style={styles.emptySubtext}>
            Review and confirm your plan to start tracking
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ReviewPlan')}
          >
            <Text style={styles.buttonText}>Review Plan</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Progress Tracking</Text>
        <Text style={styles.selectedDate}>{getDateLabel(selectedDate)}</Text>
      </View>

      <ProgressChart
        progressData={scheduledExercises.map(ex => ({
          ...ex,
          completed: completedExercises.includes(ex.id),
        }))}
        title={`${getDateLabel(selectedDate)}'s Progress`}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Weekly Overview</Text>
        <View style={styles.weekContainer}>
          {weekDates.map((date) => {
            const dayData = weekProgress.find(p => p.date === date);
            const percentage =
              dayData.total > 0
                ? (dayData.completed / dayData.total) * 100
                : 0;
            const isSelected = date === selectedDate;

            return (
              <TouchableOpacity
                key={date}
                style={[
                  styles.dayCard,
                  isSelected && styles.dayCardSelected,
                ]}
                onPress={() => setSelectedDate(date)}
              >
                <Text
                  style={[
                    styles.dayLabel,
                    isSelected && styles.dayLabelSelected,
                  ]}
                >
                  {new Date(date).toLocaleDateString('en-US', {
                    weekday: 'short',
                  })}
                </Text>
                <View style={styles.dayBar}>
                  <View
                    style={[
                      styles.dayBarFill,
                      { width: `${percentage}%` },
                    ]}
                  />
                </View>
                <Text style={styles.dayStats}>
                  {dayData.completed}/{dayData.total}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Exercises for {getDateLabel(selectedDate)}
        </Text>
        {scheduledExercises.map((exercise) => {
          const isCompleted = completedExercises.includes(exercise.id);
          return (
            <TouchableOpacity
              key={exercise.id}
              style={[
                styles.exerciseItem,
                isCompleted && styles.exerciseItemCompleted,
              ]}
              onPress={() => handleToggleExercise(exercise.id)}
            >
              <View style={styles.exerciseContent}>
                <Text
                  style={[
                    styles.exerciseName,
                    isCompleted && styles.exerciseNameCompleted,
                  ]}
                >
                  {exercise.name}
                </Text>
                {exercise.muscle && (
                  <Text style={styles.exerciseMuscle}>{exercise.muscle}</Text>
                )}
              </View>
              <View
                style={[
                  styles.checkbox,
                  isCompleted && styles.checkboxCompleted,
                ]}
              >
                {isCompleted && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8,
  },
  selectedDate: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 12,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCard: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  dayCardSelected: {
    backgroundColor: '#e3f2fd',
  },
  dayLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 8,
    fontWeight: '600',
  },
  dayLabelSelected: {
    color: '#3498db',
  },
  dayBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#ecf0f1',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  dayBarFill: {
    height: '100%',
    backgroundColor: '#2ecc71',
  },
  dayStats: {
    fontSize: 10,
    color: '#7f8c8d',
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f8f9fa',
  },
  exerciseItemCompleted: {
    backgroundColor: '#e8f5e9',
  },
  exerciseContent: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  exerciseNameCompleted: {
    textDecorationLine: 'line-through',
    color: '#7f8c8d',
  },
  exerciseMuscle: {
    fontSize: 14,
    color: '#7f8c8d',
    textTransform: 'capitalize',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#bdc3c7',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  checkboxCompleted: {
    backgroundColor: '#2ecc71',
    borderColor: '#2ecc71',
  },
  checkmark: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 12,
    padding: 16,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProgressTracking;

