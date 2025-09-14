import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Animated, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const TaskInput = ({ onAddTask, currentTaskCount, maxTasks }) => {
  const [taskText, setTaskText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handleAddTask = async () => {
    if (taskText.trim().length > 0) {
      // アニメーション効果
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      try {
        await onAddTask(taskText);
        setTaskText('');
      } catch (error) {
        // エラーは親コンポーネントで処理
      }
    }
  };

  const isDisabled = currentTaskCount >= maxTasks || taskText.trim().length === 0;
  const remainingTasks = maxTasks - currentTaskCount;

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={[styles.inputWrapper, isFocused && styles.inputFocused]}>
          <TextInput
            style={[styles.input, isDisabled && styles.inputDisabled]}
            placeholder={currentTaskCount >= maxTasks ? "今日のタスクは3つまでです" : "新しいタスクを入力..."}
            placeholderTextColor="#9CA3AF"
            onChangeText={setTaskText}
            value={taskText}
            editable={currentTaskCount < maxTasks}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            multiline
            maxLength={100}
          />
          <View style={styles.counter}>
            <MaterialIcons 
              name="task-alt" 
              size={16} 
              color={remainingTasks > 0 ? "#10B981" : "#EF4444"} 
            />
            <Text style={[styles.counterText, remainingTasks === 0 && styles.counterTextRed]}>
              {remainingTasks}/3
            </Text>
          </View>
        </View>
        
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={[
              styles.addButton,
              isDisabled && styles.addButtonDisabled
            ]}
            onPress={handleAddTask}
            disabled={isDisabled}
            activeOpacity={0.8}
          >
            <MaterialIcons 
              name="add" 
              size={24} 
              color={isDisabled ? "#9CA3AF" : "#FFFFFF"} 
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
      
      {currentTaskCount >= maxTasks && (
        <View style={styles.limitMessage}>
          <MaterialIcons name="info" size={16} color="#F59E0B" />
          <Text style={styles.limitText}>
            今日のタスクは3つまでです。集中して取り組みましょう！
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  inputWrapper: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  inputFocused: {
    borderColor: '#3B82F6',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  input: {
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    minHeight: 52,
    textAlignVertical: 'top',
  },
  inputDisabled: {
    backgroundColor: '#F9FAFB',
    color: '#9CA3AF',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 4,
  },
  counterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  counterTextRed: {
    color: '#EF4444',
  },
  addButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  addButtonDisabled: {
    backgroundColor: '#E5E7EB',
    shadowOpacity: 0,
    elevation: 0,
  },
  limitMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
    gap: 8,
  },
  limitText: {
    flex: 1,
    fontSize: 14,
    color: '#92400E',
    fontWeight: '500',
  },
});

export default TaskInput;