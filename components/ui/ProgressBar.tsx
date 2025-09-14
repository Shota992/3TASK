import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

interface ProgressBarProps {
  progress: number; // 0-100
  height?: number;
  showPercentage?: boolean;
  animated?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 12,
  showPercentage = true,
  animated = true,
}) => {
  const animatedWidth = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (animated) {
      Animated.timing(animatedWidth, {
        toValue: progress,
        duration: 800,
        useNativeDriver: false,
      }).start();
    } else {
      animatedWidth.setValue(progress);
    }
  }, [progress, animated, animatedWidth]);

  const getProgressColor = (progress: number) => {
    if (progress < 33) return '#FF6B6B'; // Red
    if (progress < 66) return '#FFD93D'; // Yellow
    return '#6BCF7F'; // Green
  };

  return (
    <View style={styles.container}>
      {showPercentage && (
        <View style={styles.percentageContainer}>
          <ThemedText type="defaultSemiBold" style={styles.percentage}>
            {Math.round(progress)}%
          </ThemedText>
        </View>
      )}
      <View style={[styles.progressBar, { height }]}>
        <Animated.View
          style={[
            styles.progressFill,
            {
              height,
              width: animatedWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
                extrapolate: 'clamp',
              }),
              backgroundColor: getProgressColor(progress),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  percentageContainer: {
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  percentage: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressBar: {
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    borderRadius: 6,
  },
});
