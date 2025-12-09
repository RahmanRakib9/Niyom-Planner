import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ExerciseCard = ({ exercise, onPress, showAddButton = false, onAdd }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.content}>
        <Text style={styles.name}>{exercise.name}</Text>
        <View style={styles.details}>
          {exercise.muscle && (
            <Text style={styles.detailText}>Muscle: {exercise.muscle}</Text>
          )}
          {exercise.type && (
            <Text style={styles.detailText}>Type: {exercise.type}</Text>
          )}
          {exercise.difficulty && (
            <Text style={styles.detailText}>
              Difficulty: {exercise.difficulty}
            </Text>
          )}
          {exercise.equipment && (
            <Text style={styles.detailText}>Equipment: {exercise.equipment}</Text>
          )}
        </View>
        {showAddButton && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={(e) => {
              e.stopPropagation();
              onAdd && onAdd();
            }}
          >
            <Text style={styles.addButtonText}>Add to Plan</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8,
  },
  details: {
    marginTop: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  addButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 10,
    marginTop: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ExerciseCard;

