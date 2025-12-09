import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressChart = ({ progressData, title }) => {
  if (!progressData || progressData.length === 0) {
    return (
      <View style={styles.container}>
        {title && <Text style={styles.title}>{title}</Text>}
        <Text style={styles.emptyText}>No progress data yet</Text>
      </View>
    );
  }

  const completedCount = progressData.filter(p => p.completed).length;
  const totalCount = progressData.length;
  const percentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.chartContainer}>
        <View style={styles.barContainer}>
          <View style={[styles.bar, { width: `${percentage}%` }]} />
        </View>
        <Text style={styles.statsText}>
          {completedCount} / {totalCount} completed ({Math.round(percentage)}%)
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 12,
  },
  chartContainer: {
    marginTop: 8,
  },
  barContainer: {
    height: 24,
    backgroundColor: '#ecf0f1',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
  bar: {
    height: '100%',
    backgroundColor: '#2ecc71',
    borderRadius: 12,
  },
  statsText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#95a5a6',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default ProgressChart;

