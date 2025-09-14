import { useCallback, useEffect, useState } from 'react';
import { Task, getTasksByDate, loadTasks, saveTasks } from '../utils/storage';

export const useTasks = (date: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const dateTasks = await getTasksByDate(date);
      setTasks(dateTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  const addTask = useCallback(async (text: string) => {
    if (tasks.length >= 3) {
      throw new Error('Maximum 3 tasks allowed per day');
    }

    try {
      const newTask: Task = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        date: date,
      };

      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      
      // Load all tasks, update with new task, and save
      const allTasks = await loadTasks();
      const filteredTasks = allTasks.filter(task => task.date !== date);
      const newAllTasks = [...filteredTasks, newTask];
      await saveTasks(newAllTasks);
      
      console.log('Task added successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add task');
      throw err;
    }
  }, [tasks, date]);

  const toggleComplete = useCallback(async (taskId: string) => {
    try {
      const updatedTasks = tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedTasks);

      // Update in storage
      const allTasks = await loadTasks();
      const updatedAllTasks = allTasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      await saveTasks(updatedAllTasks);
      
      console.log('Task completion toggled successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle task completion');
      throw err;
    }
  }, [tasks]);

  const deleteTask = useCallback(async (taskId: string) => {
    try {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);

      // Update in storage
      const allTasks = await loadTasks();
      const filteredTasks = allTasks.filter(task => task.id !== taskId);
      await saveTasks(filteredTasks);
      
      console.log('Task deleted successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
      throw err;
    }
  }, [tasks]);

  const completedCount = tasks.filter(task => task.completed).length;
  const completionRate = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return {
    tasks,
    loading,
    error,
    completedCount,
    completionRate,
    addTask,
    toggleComplete,
    deleteTask,
    refreshTasks,
  };
};
