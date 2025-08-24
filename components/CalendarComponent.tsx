import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { MarkedDates } from "../types";
import { getCalendarMonth } from "../utils/dateUtils";

interface CalendarComponentProps {
  markedDates: MarkedDates;
  onDatePress: (date: DateData) => void;
  selectedDate?: string;
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  markedDates,
  onDatePress,
  selectedDate,
  currentMonth,
  onMonthChange,
}) => {
  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(
      direction === "prev"
        ? currentMonth.getMonth() - 1
        : currentMonth.getMonth() + 1
    );
    onMonthChange(newDate);
  };

  const handleCalendarMonthChange = (month: DateData) => {
    onMonthChange(new Date(month.timestamp));
  };

  const enhancedMarkedDates = React.useMemo(() => {
    const enhanced = { ...markedDates };
    if (selectedDate) {
      enhanced[selectedDate] = {
        ...enhanced[selectedDate],
        selected: true,
        selectedColor: "#FF6B35",
        selectedTextColor: "#ffffff",
        customStyles: {
          text: {
            fontWeight: "bold",
            color: "#ffffff",
          },
        },
      };
    }
    return enhanced;
  }, [markedDates, selectedDate]);

  const currentMonthString = getCalendarMonth(currentMonth);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigateMonth("prev")}
        >
          <Ionicons name="chevron-back" size={20} color="#FF6B35" />
        </TouchableOpacity>
        <Text style={styles.monthText}>{currentMonthString}</Text>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigateMonth("next")}
        >
          <Ionicons name="chevron-forward" size={20} color="#FF6B35" />
        </TouchableOpacity>
      </View>

      <Calendar
        current={currentMonth.toISOString().split("T")[0]}
        markedDates={enhancedMarkedDates}
        onDayPress={onDatePress}
        onMonthChange={handleCalendarMonthChange}
        hideArrows={true}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: "#FF6B35",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#FF6B35",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e1e8",
          dotColor: "#FF6B35",
          selectedDotColor: "#ffffff",
          arrowColor: "transparent",
          monthTextColor: "transparent",
          indicatorColor: "transparent",
        }}
        style={styles.calendar}
        markingType={"custom"}
        firstDay={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  navButton: {
    padding: 8,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  calendar: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});

export default CalendarComponent;
