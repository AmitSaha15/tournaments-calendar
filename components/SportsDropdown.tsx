import React from "react";
import { StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Sport } from "../types";

interface SportsDropdownProps {
  sports: Sport[];
  selectedSport: string;
  onSportChange: (sportId: string) => void;
  loading?: boolean;
}

const SportsDropdown: React.FC<SportsDropdownProps> = ({
  sports,
  selectedSport,
  onSportChange,
  loading = false,
}) => {
  const pickerItems = sports.map((sport) => ({
    label:
      sport.name.charAt(0).toUpperCase() + sport.name.slice(1).toLowerCase(),
    value: sport.id,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <RNPickerSelect
          onValueChange={onSportChange}
          items={pickerItems}
          value={selectedSport}
          style={pickerSelectStyles}
          placeholder={{
            label: "Search your sport",
            value: null,
            color: "#9EA0A4",
          }}
          disabled={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  dropdownContainer: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9ECEF",
    paddingHorizontal: 16,
    minHeight: 48,
    justifyContent: "center",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    paddingRight: 30,
    color: "#333",
    backgroundColor: "transparent",
    textAlign: "center",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    paddingRight: 30,
    color: "#333",
    backgroundColor: "transparent",
    textAlign: "center",
  },
  placeholder: {
    color: "#9EA0A4",
    fontSize: 16,
  },
});

export default SportsDropdown;
