import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PlanItem = ({ item, onRemove, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.details}>
          {item.muscle && (
            <Text style={styles.detailText}>Muscle: {item.muscle}</Text>
          )}
          {item.type && (
            <Text style={styles.detailText}>Type: {item.type}</Text>
          )}
          {item.difficulty && (
            <Text style={styles.detailText}>Difficulty: {item.difficulty}</Text>
          )}
        </View>
        {item.scheduled && (
          <View style={styles.scheduledBadge}>
            <Text style={styles.scheduledText}>Scheduled</Text>
          </View>
        )}
      </View>
      {onRemove && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
  scheduledBadge: {
    backgroundColor: '#2ecc71',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  scheduledText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    marginLeft: 12,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default PlanItem;

