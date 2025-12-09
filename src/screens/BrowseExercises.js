import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { fetchExercises, MUSCLE_GROUPS, EXERCISE_TYPES, DIFFICULTY_LEVELS } from '../services/api';
import ExerciseCard from '../components/ExerciseCard';

const BrowseExercises = ({ navigation }) => {
  const { exercises, cacheExercises, setLoading, loading } = useApp();
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  useEffect(() => {
    loadExercises();
  }, []);

  useEffect(() => {
    filterExercises();
  }, [exercises, searchQuery, selectedMuscle, selectedType, selectedDifficulty]);

  const loadExercises = async () => {
    if (exercises.length > 0) {
      setFilteredExercises(exercises);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchExercises();
      cacheExercises(data);
      setFilteredExercises(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load exercises. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterExercises = () => {
    let filtered = [...exercises];

    if (searchQuery) {
      filtered = filtered.filter(ex =>
        ex.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedMuscle) {
      filtered = filtered.filter(ex => ex.muscle === selectedMuscle);
    }

    if (selectedType) {
      filtered = filtered.filter(ex => ex.type === selectedType);
    }

    if (selectedDifficulty) {
      filtered = filtered.filter(ex => ex.difficulty === selectedDifficulty);
    }

    setFilteredExercises(filtered);
  };

  const handleExercisePress = (exercise) => {
    navigation.navigate('ExerciseDetails', { exercise });
  };

  const handleAddToPlan = (exercise) => {
    navigation.navigate('ExerciseDetails', { exercise });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedMuscle('');
    setSelectedType('');
    setSelectedDifficulty('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search exercises..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      <ScrollView
        horizontal
        style={styles.filtersContainer}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          style={[
            styles.filterChip,
            selectedMuscle === '' && styles.filterChipActive,
          ]}
          onPress={() => setSelectedMuscle('')}
        >
          <Text
            style={[
              styles.filterChipText,
              selectedMuscle === '' && styles.filterChipTextActive,
            ]}
          >
            All Muscles
          </Text>
        </TouchableOpacity>
        {MUSCLE_GROUPS.slice(0, 8).map((muscle) => (
          <TouchableOpacity
            key={muscle}
            style={[
              styles.filterChip,
              selectedMuscle === muscle && styles.filterChipActive,
            ]}
            onPress={() => setSelectedMuscle(muscle)}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedMuscle === muscle && styles.filterChipTextActive,
              ]}
            >
              {muscle.replace('_', ' ')}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {(selectedMuscle || selectedType || selectedDifficulty || searchQuery) && (
        <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
          <Text style={styles.clearButtonText}>Clear Filters</Text>
        </TouchableOpacity>
      )}

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Loading exercises...</Text>
        </View>
      ) : (
        <ScrollView style={styles.exercisesContainer}>
          {filteredExercises.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No exercises found</Text>
            </View>
          ) : (
            filteredExercises.map((exercise, index) => (
              <ExerciseCard
                key={index}
                exercise={exercise}
                onPress={() => handleExercisePress(exercise)}
                showAddButton={true}
                onAdd={() => handleAddToPlan(exercise)}
              />
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  filtersContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ecf0f1',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#3498db',
  },
  filterChipText: {
    fontSize: 14,
    color: '#7f8c8d',
    textTransform: 'capitalize',
  },
  filterChipTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  clearButton: {
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  clearButtonText: {
    color: '#e74c3c',
    fontSize: 14,
    fontWeight: '600',
  },
  exercisesContainer: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 12,
    color: '#7f8c8d',
    fontSize: 16,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#95a5a6',
  },
});

export default BrowseExercises;

