import { ThemedText } from '@/components/ThemedText';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface DateHeaderProps {
  date: string;
  onPreviousDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
  isToday: boolean;
}

export const DateHeader: React.FC<DateHeaderProps> = ({
  date,
  onPreviousDay,
  onNextDay,
  onToday,
  isToday,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (dateString === today.toISOString().split('T')[0]) {
      return '今日';
    } else if (dateString === yesterday.toISOString().split('T')[0]) {
      return '昨日';
    } else if (dateString === tomorrow.toISOString().split('T')[0]) {
      return '明日';
    }

    return date.toLocaleDateString('ja-JP', {
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={onPreviousDay}
        activeOpacity={0.7}
      >
        <MaterialIcons name="chevron-left" size={24} color="#6B7280" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.dateContainer, isToday && styles.todayContainer]}
        onPress={onToday}
        activeOpacity={0.7}
      >
        <ThemedText type="subtitle" style={styles.dateText}>
          {formatDate(date)}
        </ThemedText>
        {isToday && (
          <View style={styles.todayBadge}>
            <ThemedText type="default" style={styles.todayText}>
              TODAY
            </ThemedText>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={onNextDay}
        activeOpacity={0.7}
      >
        <MaterialIcons name="chevron-right" size={24} color="#6B7280" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  todayContainer: {
    backgroundColor: '#EBF8FF',
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  todayBadge: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
  },
  todayText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
});
