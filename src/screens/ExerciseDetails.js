import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useApp } from '../context/AppContext';

const ExerciseDetails = ({ route, navigation }) => {
  const { exercise } = route.params;
  const { addToPlan, plan } = useApp();

  const isInPlan = plan.some(item => item.name === exercise.name);

  const handleAddToPlan = () => {
    if (isInPlan) {
      Alert.alert('Already Added', 'This exercise is already in your plan.');
      return;
    }

    addToPlan(exercise);
    Alert.alert('Success', 'Exercise added to your plan!', [
      {
        text: 'View Plan',
        onPress: () => navigation.navigate('MyPlan'),
      },
      {
        text: 'OK',
        style: 'cancel',
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.name}>{exercise.name}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Details</Text>
        {exercise.muscle && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Muscle Group:</Text>
            <Text style={styles.detailValue}>
              {exercise.muscle.replace('_', ' ')}
            </Text>
          </View>
        )}
        {exercise.type && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Type:</Text>
            <Text style={styles.detailValue}>{exercise.type}</Text>
          </View>
        )}
        {exercise.difficulty && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Difficulty:</Text>
            <Text style={styles.detailValue}>{exercise.difficulty}</Text>
          </View>
        )}
        {exercise.equipment && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Equipment:</Text>
            <Text style={styles.detailValue}>{exercise.equipment}</Text>
          </View>
        )}
      </View>

      {exercise.instructions && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.instructions}>{exercise.instructions}</Text>
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.addButton,
          isInPlan && styles.addButtonDisabled,
        ]}
        onPress={handleAddToPlan}
        disabled={isInPlan}
      >
        <Text style={styles.addButtonText}>
          {isInPlan ? 'Already in Plan' : 'Add to Plan'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.viewPlanButton}
        onPress={() => navigation.navigate('MyPlan')}
      >
        <Text style={styles.viewPlanButtonText}>View My Plan</Text>
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
  header: {
    marginBottom: 24,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2c3e50',
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
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '600',
    width: 120,
  },
  detailValue: {
    fontSize: 16,
    color: '#2c3e50',
    flex: 1,
    textTransform: 'capitalize',
  },
  instructions: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 24,
  },
  addButton: {
    backgroundColor: '#3498db',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  addButtonDisabled: {
    backgroundColor: '#95a5a6',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  viewPlanButton: {
    backgroundColor: '#ecf0f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  viewPlanButtonText: {
    color: '#2c3e50',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ExerciseDetails;

