import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  date: string; // YYYY-MM-DD format
}

const TASKS_KEY = '3task_tasks';

export const saveTasks = async (tasks: Task[]): Promise<void> => {
  try {
    const tasksJson = JSON.stringify(tasks);
    await AsyncStorage.setItem(TASKS_KEY, tasksJson);
    console.log('Tasks saved successfully');
  } catch (error) {
    console.error('Failed to save tasks:', error);
    throw error;
  }
};

export const loadTasks = async (): Promise<Task[]> => {
  try {
    const tasksJson = await AsyncStorage.getItem(TASKS_KEY);
    if (tasksJson) {
      const tasks = JSON.parse(tasksJson) as Task[];
      console.log('Tasks loaded successfully:', tasks.length);
      return tasks;
    }
    return [];
  } catch (error) {
    console.error('Failed to load tasks:', error);
    return [];
  }
};

export const getTasksByDate = async (date: string): Promise<Task[]> => {
  try {
    const allTasks = await loadTasks();
    return allTasks.filter(task => task.date === date);
  } catch (error) {
    console.error('Failed to get tasks by date:', error);
    return [];
  }
};

export const deleteTaskById = async (taskId: string): Promise<void> => {
  try {
    const allTasks = await loadTasks();
    const updatedTasks = allTasks.filter(task => task.id !== taskId);
    await saveTasks(updatedTasks);
    console.log('Task deleted successfully');
  } catch (error) {
    console.error('Failed to delete task:', error);
    throw error;
  }
};

export const updateTask = async (updatedTask: Task): Promise<void> => {
  try {
    const allTasks = await loadTasks();
    const taskIndex = allTasks.findIndex(task => task.id === updatedTask.id);
    
    if (taskIndex !== -1) {
      allTasks[taskIndex] = updatedTask;
      await saveTasks(allTasks);
      console.log('Task updated successfully');
    } else {
      throw new Error('Task not found');
    }
  } catch (error) {
    console.error('Failed to update task:', error);
    throw error;
  }
};
