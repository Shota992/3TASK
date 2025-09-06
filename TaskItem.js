import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TaskItem = ({ task, onToggleComplete, onDeleteTask }) => {
  return (
    <View style={styles.taskItem}>
      <TouchableOpacity 
        style={styles.checkbox}
        onPress={() => onToggleComplete(task.id)}
      >
        <MaterialIcons 
          name={task.completed ? "check-box" : "check-box-outline-blank"} 
          size={24} 
          color={task.completed ? "#28a745" : "#666"} 
        />
      </TouchableOpacity>
      <Text style={[styles.taskText, task.completed && styles.completedText]}>
        {task.text}
      </Text>
      <TouchableOpacity onPress={() => onDeleteTask(task.id)}>
        <MaterialIcons name="delete" size={24} color="#dc3545" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkbox: {
    marginRight: 10,
  },
  taskText: {
    flex: 1,
    fontSize: 18,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
});

export default TaskItem;