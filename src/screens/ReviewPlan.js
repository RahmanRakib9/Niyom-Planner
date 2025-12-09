import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { validatePlan, validateSchedule } from '../utils/validation';
import PlanItem from '../components/PlanItem';

const ReviewPlan = ({ navigation }) => {
  const { plan, confirmPlan, userProfile } = useApp();
  const [schedule, setSchedule] = useState('daily'); // daily, weekly
  const [targetDuration, setTargetDuration] = useState('');
  const [errors, setErrors] = useState({});

  const handleConfirm = () => {
    const planError = validatePlan(plan);
    const scheduleError = validateSchedule(schedule);
    const durationError = targetDuration
      ? null
      : 'Please enter target duration';

    const newErrors = {};
    if (planError) newErrors.plan = planError;
    if (scheduleError) newErrors.schedule = scheduleError;
    if (durationError) newErrors.duration = durationError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Alert.alert('Validation Error', 'Please fix the errors before confirming.');
      return;
    }

    setErrors({});
    confirmPlan();
    Alert.alert(
      'Plan Confirmed!',
      'Your fitness plan has been scheduled. Start tracking your progress!',
      [
        {
          text: 'Track Progress',
          onPress: () => navigation.navigate('ProgressTracking'),
        },
        {
          text: 'OK',
          onPress: () => navigation.navigate('Dashboard'),
        },
      ]
    );
  };

  const totalExercises = plan.length;
  const scheduledCount = plan.filter(p => p.scheduled).length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.summarySection}>
        <Text style={styles.sectionTitle}>Plan Summary</Text>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryText}>
            Total Exercises: {totalExercises}
          </Text>
          <Text style={styles.summaryText}>
            Scheduled: {scheduledCount}
          </Text>
        </View>
        {errors.plan && (
          <Text style={styles.errorText}>{errors.plan}</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Schedule</Text>
        <View style={styles.scheduleOptions}>
          <TouchableOpacity
            style={[
              styles.scheduleOption,
              schedule === 'daily' && styles.scheduleOptionActive,
            ]}
            onPress={() => {
              setSchedule('daily');
              setErrors(prev => ({ ...prev, schedule: null }));
            }}
          >
            <Text
              style={[
                styles.scheduleOptionText,
                schedule === 'daily' && styles.scheduleOptionTextActive,
              ]}
            >
              Daily
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.scheduleOption,
              schedule === 'weekly' && styles.scheduleOptionActive,
            ]}
            onPress={() => {
              setSchedule('weekly');
              setErrors(prev => ({ ...prev, schedule: null }));
            }}
          >
            <Text
              style={[
                styles.scheduleOptionText,
                schedule === 'weekly' && styles.scheduleOptionTextActive,
              ]}
            >
              Weekly
            </Text>
          </TouchableOpacity>
        </View>
        {errors.schedule && (
          <Text style={styles.errorText}>{errors.schedule}</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Target Duration (minutes)</Text>
        <TextInput
          style={[styles.input, errors.duration && styles.inputError]}
          value={targetDuration}
          onChangeText={(text) => {
            setTargetDuration(text);
            setErrors(prev => ({ ...prev, duration: null }));
          }}
          placeholder="e.g., 30"
          keyboardType="numeric"
          placeholderTextColor="#999"
        />
        {errors.duration && (
          <Text style={styles.errorText}>{errors.duration}</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Exercises in Plan</Text>
        {plan.map((item) => (
          <PlanItem key={item.id} item={item} />
        ))}
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirm Plan</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back to Plan</Text>
      </TouchableOpacity>
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
  summarySection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 12,
  },
  summaryCard: {
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    padding: 16,
  },
  summaryText: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 4,
  },
  scheduleOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  scheduleOption: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  scheduleOptionActive: {
    backgroundColor: '#3498db',
  },
  scheduleOptionText: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '600',
  },
  scheduleOptionTextActive: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    minHeight: 48,
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 4,
  },
  confirmButton: {
    backgroundColor: '#2ecc71',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  backButton: {
    backgroundColor: '#ecf0f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#2c3e50',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ReviewPlan;

