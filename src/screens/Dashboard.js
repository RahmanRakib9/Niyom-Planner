import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useApp } from '../context/AppContext';
import ProgressChart from '../components/ProgressChart';

const Dashboard = ({ navigation }) => {
  const { userProfile, plan, progress } = useApp();

  const today = new Date().toISOString().split('T')[0];
  const todayProgress = progress.find(p => p.date === today);
  const scheduledExercises = plan.filter(p => p.scheduled);
  const completedToday = todayProgress?.completedExercises?.length || 0;
  const totalToday = scheduledExercises.length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          {userProfile.name ? `Hello, ${userProfile.name}!` : 'Welcome!'}
        </Text>
        {userProfile.goal && (
          <Text style={styles.goal}>Goal: {userProfile.goal.replace('_', ' ')}</Text>
        )}
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{plan.length}</Text>
          <Text style={styles.statLabel}>Exercises in Plan</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{scheduledExercises.length}</Text>
          <Text style={styles.statLabel}>Scheduled</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {completedToday}/{totalToday}
          </Text>
          <Text style={styles.statLabel}>Today's Progress</Text>
        </View>
      </View>

      {scheduledExercises.length > 0 && (
        <ProgressChart
          progressData={scheduledExercises.map(ex => ({
            ...ex,
            completed: todayProgress?.completedExercises?.includes(ex.id) || false,
          }))}
          title="Today's Plan"
        />
      )}

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('BrowseExercises')}
        >
          <Text style={styles.actionButtonText}>Browse Exercises</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('MyPlan')}
        >
          <Text style={styles.actionButtonText}>My Plan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('ProgressTracking')}
        >
          <Text style={styles.actionButtonText}>Track Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.secondaryButton]}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>
            Profile & Settings
          </Text>
        </TouchableOpacity>
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
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8,
  },
  goal: {
    fontSize: 16,
    color: '#7f8c8d',
    textTransform: 'capitalize',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#3498db',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  actionsContainer: {
    marginTop: 8,
  },
  actionButton: {
    backgroundColor: '#3498db',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#ecf0f1',
  },
  secondaryButtonText: {
    color: '#2c3e50',
  },
});

export default Dashboard;

