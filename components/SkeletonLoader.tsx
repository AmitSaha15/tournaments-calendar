import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface SkeletonLoaderProps {
  height?: number;
  width?: number | string;
  borderRadius?: number;
  style?: object;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  height = 20,
  width = "100%",
  borderRadius = 4,
  style = {},
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    shimmerAnimation.start();

    return () => shimmerAnimation.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        {
          height,
          width,
          backgroundColor: "#E0E0E0",
          borderRadius,
          opacity,
        },
        style,
      ]}
    />
  );
};

export const TournamentCardSkeleton: React.FC = () => (
  <View style={skeletonStyles.container}>
    <View style={skeletonStyles.outerCard}>
      <View style={skeletonStyles.cardContent}>
        <View style={skeletonStyles.leftSection}>
          <SkeletonLoader width={50} height={50} borderRadius={25} />
          <View style={skeletonStyles.tournamentInfo}>
            <SkeletonLoader
              width="80%"
              height={16}
              style={{ marginBottom: 6 }}
            />
            <SkeletonLoader
              width="60%"
              height={14}
              style={{ marginBottom: 6 }}
            />
            <SkeletonLoader width={60} height={20} borderRadius={6} />
          </View>
        </View>
        <View style={skeletonStyles.rightSection}>
          <SkeletonLoader width={80} height={14} style={{ marginBottom: 8 }} />
          <SkeletonLoader width={24} height={24} borderRadius={12} />
        </View>
      </View>
    </View>
  </View>
);

const skeletonStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 6,
  },
  outerCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 16,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  tournamentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  rightSection: {
    alignItems: "flex-end",
  },
});

export default SkeletonLoader;
