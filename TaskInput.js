import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

const TaskInput = ({ onAddTask, currentTaskCount, maxTasks }) => {
  const [taskText, setTaskText] = useState('');
//taskTextは「今入力欄にどんな文字が入っているか」を教えてくれる。setTaskTextは、「入力欄の文字をこれに変えてね」とお願いするためのボタン

  const handleAddTask = () => {
    //ボタンが押されたときの処理
    if (taskText.trim().length > 0) {
    //入力欄に1文字でも文字が入っていたら以下の処理をお願い。
      onAddTask(taskText);
      //新しく入力されたタスクの文字をタスクリストに追加してねというお願い。
      setTaskText('');
      //入力欄をまた空にしてねというお願い
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={currentTaskCount >= maxTasks ? "今日のタスクは3つまでです" : "新しいタスクを入力..."}
        onChangeText={setTaskText}
        //onChangeTextは、「入力欄の文字が変わったら、setTaskTextを使ってその文字を覚えておいてね」というお願い
        value={taskText}
        //valueは、これは、「今、覚えておいた文字（taskText）を、入力欄に表示してね」という命令です。
        editable={currentTaskCount < maxTasks} // 3つ以上は入力不可
      />
      <Button 
        title="追加" 
        onPress={handleAddTask} 
        color="#007bff"
        disabled={currentTaskCount >= maxTasks}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
});

export default TaskInput;