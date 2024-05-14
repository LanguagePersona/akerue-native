import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Svg, { Line, Circle } from "react-native-svg";

const Analytics = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Chats</Text>
      </View>
      <View style={styles.languageButton}>
        <Text style={styles.languageButtonText}>KOREAN</Text>
      </View>
      <View style={styles.chartContainer}>
        <CustomChart
          data={[
            { x: "Sun", y: 9 },
            { x: "Mon", y: 10 },
            { x: "Tue", y: 8 },
            { x: "Wed", y: 12 },
            { x: "Thu", y: 7 },
            { x: "Fri", y: 9 },
            { x: "Sat", y: 6 },
          ]}
        />
        <Text style={styles.chartNote}>9 hr</Text>
      </View>
      <View style={styles.progressContainer}>
        <ProgressItem label="Grammar" progress={0.8} />
        <ProgressItem label="Pronunciation" progress={0.45} />
        <ProgressItem label="Vocabulary" progress={0.75} />
      </View>
    </ScrollView>
  );
};

const ProgressItem = ({ label, progress }) => {
  return (
    <View style={styles.progressItem}>
      <Text style={styles.progressLabel}>{label}</Text>
      <View style={styles.progressBar}>
        <View style={{ ...styles.progressFill, width: `${progress * 100}%` }} />
      </View>
      <Text style={styles.progressPercentage}>{`${Math.round(
        progress * 100
      )}%`}</Text>
    </View>
  );
};

const CustomChart = ({ data }) => {
  const maxDataY = Math.max(...data.map((item) => item.y));
  const chartHeight = 200;
  const chartWidth = 300;
  const chartPadding = 20;
  const points = data.map((point, index) => ({
    x:
      (index / (data.length - 1)) * (chartWidth - 2 * chartPadding) +
      chartPadding,
    y:
      chartHeight -
      ((point.y / maxDataY) * (chartHeight - 2 * chartPadding) + chartPadding),
  }));

  return (
    <Svg width={chartWidth} height={chartHeight} style={styles.chartSvg}>
      {points.map(
        (point, index) =>
          index > 0 && (
            <Line
              key={index}
              x1={points[index - 1].x}
              y1={points[index - 1].y}
              x2={point.x}
              y2={point.y}
              stroke="#FFA500"
              strokeWidth="2"
            />
          )
      )}
      {points.map((point, index) => (
        <Circle key={index} cx={point.x} cy={point.y} r="4" fill="#FFA500" />
      ))}
    </Svg>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F8F8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  languageButton: {
    marginTop: 20,
    alignSelf: "flex-start",
    backgroundColor: "#B0E0E6",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  languageButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  chartContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  chartSvg: {
    alignSelf: "center",
  },
  chartNote: {
    marginTop: 10,
    backgroundColor: "#FFA500",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: "#FFF",
  },
  progressContainer: {
    marginTop: 20,
  },
  progressItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  progressLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  progressBar: {
    flex: 3,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    backgroundColor: "#E0E0E0",
  },
  progressFill: {
    height: "100%",
    borderRadius: 5,
    backgroundColor: "#4CAF50",
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default Analytics;
