import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TaskItem = ({ task, onToggleComplete, onDeleteTask }) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const opacityAnim = React.useRef(new Animated.Value(1)).current;

  const handleToggleComplete = () => {
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

    onToggleComplete(task.id);
  };

  const handleDelete = () => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDeleteTask(task.id);
    });
  };

  const getPriorityColor = () => {
    // 簡単な優先度判定（文字数ベース）
    if (task.text.length > 50) return '#EF4444'; // High
    if (task.text.length > 25) return '#F59E0B'; // Medium
    return '#10B981'; // Low
  };

  return (
    <Animated.View 
      style={[
        styles.taskItem, 
        task.completed && styles.taskItemCompleted,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        }
      ]}
    >
      <TouchableOpacity 
        style={[
          styles.checkbox,
          task.completed && styles.checkboxCompleted
        ]}
        onPress={handleToggleComplete}
        activeOpacity={0.7}
      >
        <MaterialIcons 
          name={task.completed ? "check-circle" : "radio-button-unchecked"} 
          size={28} 
          color={task.completed ? "#10B981" : "#D1D5DB"} 
        />
      </TouchableOpacity>
      
      <View style={styles.taskContent}>
        <View style={styles.taskHeader}>
          <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor() }]} />
          <Text style={[styles.taskText, task.completed && styles.completedText]}>
            {task.text}
          </Text>
        </View>
        
        {task.completed && (
          <View style={styles.completedBadge}>
            <MaterialIcons name="done" size={14} color="#10B981" />
            <Text style={styles.completedBadgeText}>完了</Text>
          </View>
        )}
      </View>

      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={handleDelete}
        activeOpacity={0.7}
      >
        <MaterialIcons name="delete-outline" size={22} color="#EF4444" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  taskItemCompleted: {
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
  },
  checkbox: {
    marginRight: 16,
    padding: 4,
  },
  checkboxCompleted: {
    // 完了時の特別なスタイル
  },
  taskContent: {
    flex: 1,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  priorityIndicator: {
    width: 4,
    height: '100%',
    borderRadius: 2,
    marginRight: 12,
    marginTop: 2,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 22,
    fontWeight: '500',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
    opacity: 0.7,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    gap: 4,
  },
  completedBadgeText: {
    fontSize: 12,
    color: '#065F46',
    fontWeight: '600',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: '#FEF2F2',
  },
});

export default TaskItem;