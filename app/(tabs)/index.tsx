import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import TaskInput from '../../TaskInput';
import TaskList from '../../TaskList';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const maxTasks = 3;

  const addTask = (text: string) => {
    if (tasks.length < maxTasks) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: text,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }
  };

  const toggleComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const completionRate = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">3TASK</ThemedText>
          <ThemedText type="subtitle">今日のタスク</ThemedText>
          <View style={styles.progressContainer}>
            <ThemedText type="defaultSemiBold">
              {completedCount}/{tasks.length} 完了 ({Math.round(completionRate)}%)
            </ThemedText>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${completionRate}%` }]} />
            </View>
          </View>
        </ThemedView>

        <ThemedView style={styles.content}>
          <TaskInput 
            onAddTask={addTask}
            currentTaskCount={tasks.length}
            maxTasks={maxTasks}
          />
          
          <TaskList
            tasks={tasks}
            onToggleComplete={toggleComplete}
            onDeleteTask={deleteTask}
          />

          {tasks.length === 0 && (
            <ThemedView style={styles.emptyState}>
              <ThemedText type="default" style={styles.emptyText}>
                今日のタスクを追加してください
              </ThemedText>
              <ThemedText type="default" style={styles.emptySubText}>
                1日最大3つのタスクに集中しましょう
              </ThemedText>
            </ThemedView>
          )}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  progressContainer: {
    marginTop: 15,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
