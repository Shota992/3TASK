import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import TaskInput from './TaskInput';
import TaskList from './TaskList';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const MAX_TASKS = 3;

  // タスクを追加する関数
  const addTask = (taskText) => {
    if (tasks.length >= MAX_TASKS) {
      alert('1日に設定できるタスクは3つまでです！');
      return;
    }
    setTasks([...tasks, { id: Date.now().toString(), text: taskText, completed: false }]);
  };

  // タスクの完了状態を切り替える関数
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // タスクを削除する関数
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>3 TASK</Text>
      <TaskInput onAddTask={addTask} currentTaskCount={tasks.length} maxTasks={MAX_TASKS} />
      <TaskList 
        tasks={tasks} 
        onToggleComplete={toggleComplete} 
        onDeleteTask={deleteTask} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});