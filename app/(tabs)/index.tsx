import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import TaskInput from '../../TaskInput';
import TaskList from '../../TaskList';
import { DateHeader } from '../../components/ui/DateHeader';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { StatsCard } from '../../components/ui/StatsCard';
import { useTasks } from '../../hooks/useTasks';

export default function HomeScreen() {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  const [selectedDate, setSelectedDate] = React.useState(today);
  const {
    tasks,
    loading,
    error,
    completedCount,
    completionRate,
    addTask,
    toggleComplete,
    deleteTask,
  } = useTasks(selectedDate);

  const maxTasks = 3;

  const navigateDate = (direction: 'prev' | 'next') => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + (direction === 'next' ? 1 : -1));
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const goToToday = () => {
    setSelectedDate(today);
  };

  const handleAddTask = async (text: string) => {
    try {
      await addTask(text);
    } catch (error) {
      Alert.alert('エラー', 'タスクの追加に失敗しました');
    }
  };

  const handleToggleComplete = async (id: string) => {
    try {
      await toggleComplete(id);
    } catch (error) {
      Alert.alert('エラー', 'タスクの更新に失敗しました');
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
    } catch (error) {
      Alert.alert('エラー', 'タスクの削除に失敗しました');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <ThemedView style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.titleContainer}>
              <ThemedText type="title" style={styles.title}>3TASK</ThemedText>
              <View style={styles.subtitleContainer}>
                <ThemedText type="subtitle" style={styles.subtitle}>
                  シンプル・集中・達成
                </ThemedText>
              </View>
            </View>
            
            {/* Stats Cards */}
            <View style={styles.statsContainer}>
              <StatsCard
                title="完了"
                value={`${completedCount}/${tasks.length}`}
                icon="check-circle"
                color="#10B981"
                backgroundColor="#D1FAE5"
              />
              <StatsCard
                title="進捗"
                value={`${Math.round(completionRate)}%`}
                icon="trending-up"
                color="#3B82F6"
                backgroundColor="#DBEAFE"
              />
              <StatsCard
                title="残り"
                value={maxTasks - tasks.length}
                icon="schedule"
                color="#F59E0B"
                backgroundColor="#FEF3C7"
              />
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <ProgressBar progress={completionRate} height={16} />
            </View>
          </View>
        </ThemedView>

        {/* Date Navigation */}
        <DateHeader
          date={selectedDate}
          onPreviousDay={() => navigateDate('prev')}
          onNextDay={() => navigateDate('next')}
          onToday={goToToday}
          isToday={selectedDate === today}
        />

        <ThemedView style={styles.content}>
          {loading ? (
            <ThemedText type="default">読み込み中...</ThemedText>
          ) : (
            <>
              <TaskInput 
                onAddTask={handleAddTask}
                currentTaskCount={tasks.length}
                maxTasks={maxTasks}
              />
              
              <TaskList
                tasks={tasks}
                onToggleComplete={handleToggleComplete}
                onDeleteTask={handleDeleteTask}
              />
            </>
          )}

          {error && (
            <ThemedView style={styles.errorContainer}>
              <ThemedText type="default" style={styles.errorText}>
                エラー: {error}
              </ThemedText>
            </ThemedView>
          )}

          {tasks.length === 0 && !loading && (
            <ThemedView style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <MaterialIcons name="task-alt" size={64} color="#D1D5DB" />
              </View>
              <ThemedText type="default" style={styles.emptyText}>
                タスクを追加して始めましょう
              </ThemedText>
              <ThemedText type="default" style={styles.emptySubText}>
                1日最大3つのタスクに集中して、{'\n'}
                確実に達成感を味わいましょう
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
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 24,
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitleContainer: {
    backgroundColor: '#EBF8FF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#1E40AF',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  progressContainer: {
    marginTop: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '600',
  },
  emptySubText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  errorText: {
    color: '#DC2626',
    textAlign: 'center',
    fontWeight: '500',
  },
});
