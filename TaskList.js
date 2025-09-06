import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleComplete, onDeleteTask }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggleComplete={onToggleComplete}
            onDeleteTask={onDeleteTask}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TaskList;