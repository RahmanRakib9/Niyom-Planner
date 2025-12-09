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
import PlanItem from '../components/PlanItem';

const MyPlan = ({ navigation }) => {
  const { plan, removeFromPlan } = useApp();

  const handleRemove = (item) => {
    Alert.alert(
      'Remove Exercise',
      `Remove ${item.name} from your plan?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeFromPlan(item.id),
        },
      ]
    );
  };

  const handleItemPress = (item) => {
    navigation.navigate('ExerciseDetails', { exercise: item });
  };

  if (plan.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your plan is empty</Text>
          <Text style={styles.emptySubtext}>
            Browse exercises and add them to your plan
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate('BrowseExercises')}
          >
            <Text style={styles.browseButtonText}>Browse Exercises</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {plan.length} {plan.length === 1 ? 'Exercise' : 'Exercises'} in Plan
        </Text>
        {plan.filter(p => !p.scheduled).length > 0 && (
          <TouchableOpacity
            style={styles.reviewButton}
            onPress={() => navigation.navigate('ReviewPlan')}
          >
            <Text style={styles.reviewButtonText}>Review & Schedule</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.listContainer}>
        {plan.map((item) => (
          <PlanItem
            key={item.id}
            item={item}
            onRemove={() => handleRemove(item)}
            onPress={() => handleItemPress(item)}
          />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('ReviewPlan')}
        >
          <Text style={styles.footerButtonText}>Review Plan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
  },
  reviewButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  reviewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
    padding: 16,
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
  browseButton: {
    backgroundColor: '#3498db',
    borderRadius: 12,
    padding: 16,
    paddingHorizontal: 32,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  footerButton: {
    backgroundColor: '#3498db',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  footerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MyPlan;

