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
import InputField from '../components/InputField';
import {
  validateProfile,
  validateName,
  validateAge,
  validateWeight,
  validateHeight,
} from '../utils/validation';

const Profile = ({ navigation }) => {
  const { userProfile, updateProfile } = useApp();
  const [formData, setFormData] = useState({
    name: userProfile.name || '',
    age: userProfile.age || '',
    weight: userProfile.weight || '',
    height: userProfile.height || '',
    goal: userProfile.goal || 'weight_loss',
  });
  const [errors, setErrors] = useState({});

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleGoalChange = (goal) => {
    setFormData(prev => ({ ...prev, goal }));
    if (errors.goal) {
      setErrors(prev => ({ ...prev, goal: null }));
    }
  };

  const handleSave = () => {
    const validation = validateProfile(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      Alert.alert('Validation Error', 'Please fix the errors before saving.');
      return;
    }

    updateProfile(formData);
    Alert.alert('Success', 'Profile updated successfully!', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Dashboard'),
      },
    ]);
  };

  const goals = [
    { value: 'weight_loss', label: 'Weight Loss' },
    { value: 'muscle_gain', label: 'Muscle Gain' },
    { value: 'maintenance', label: 'Maintenance' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile & Settings</Text>
        <Text style={styles.headerSubtitle}>
          Update your information to personalize your fitness plan
        </Text>
      </View>

      <View style={styles.section}>
        <InputField
          label="Name"
          value={formData.name}
          onChangeText={(value) => handleFieldChange('name', value)}
          placeholder="Enter your name"
          error={errors.name}
        />

        <InputField
          label="Age"
          value={formData.age}
          onChangeText={(value) => handleFieldChange('age', value)}
          placeholder="Enter your age"
          keyboardType="numeric"
          error={errors.age}
        />

        <InputField
          label="Weight (kg)"
          value={formData.weight}
          onChangeText={(value) => handleFieldChange('weight', value)}
          placeholder="Enter your weight"
          keyboardType="decimal-pad"
          error={errors.weight}
        />

        <InputField
          label="Height (cm)"
          value={formData.height}
          onChangeText={(value) => handleFieldChange('height', value)}
          placeholder="Enter your height"
          keyboardType="decimal-pad"
          error={errors.height}
        />

        <View style={styles.goalSection}>
          <Text style={styles.label}>Fitness Goal</Text>
          {goals.map((goal) => (
            <TouchableOpacity
              key={goal.value}
              style={[
                styles.goalOption,
                formData.goal === goal.value && styles.goalOptionActive,
              ]}
              onPress={() => handleGoalChange(goal.value)}
            >
              <Text
                style={[
                  styles.goalOptionText,
                  formData.goal === goal.value && styles.goalOptionTextActive,
                ]}
              >
                {goal.label}
              </Text>
            </TouchableOpacity>
          ))}
          {errors.goal && (
            <Text style={styles.errorText}>{errors.goal}</Text>
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8,
  },
  headerSubtitle: {
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
  goalSection: {
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  goalOption: {
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  goalOptionActive: {
    backgroundColor: '#3498db',
  },
  goalOptionText: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '600',
  },
  goalOptionTextActive: {
    color: '#fff',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  cancelButton: {
    backgroundColor: '#ecf0f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#2c3e50',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Profile;

