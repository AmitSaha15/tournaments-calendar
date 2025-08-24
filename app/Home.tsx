import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { DateData } from "react-native-calendars";
import CalendarComponent from "../components/CalendarComponent";
import { TournamentCardSkeleton } from "../components/SkeletonLoader";
import SportsDropdown from "../components/SportsDropdown";
import TournamentCard from "../components/TournamentCard";
import { fetchSports, fetchTournaments } from "../services/api";
import { MarkedDates, Sport, SportData, Tournament } from "../types";
import { formatDateForCalendar } from "../utils/dateUtils";

const STORAGE_KEYS = {
  SPORTS: "cached_sports",
  TOURNAMENTS: "cached_tournaments",
  SELECTED_SPORT: "selected_sport",
};

const HomeScreen: React.FC = () => {
  const [sports, setSports] = useState<Sport[]>([]);
  const [selectedSport, setSelectedSport] = useState<string>("all");
  const [sportsData, setSportsData] = useState<SportData[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [sportsLoading, setSportsLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    initializeData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEYS.SELECTED_SPORT, selectedSport);
  }, [selectedSport]);

  const initializeData = async () => {
    try {
      setLoading(true);
      await loadCachedData();
      await Promise.all([loadSports(), loadTournaments()]);
    } catch (error) {
      console.error("Error initializing data:", error);
      Alert.alert(
        "Error",
        "Failed to load data. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadCachedData = async () => {
    try {
      const [cachedSports, cachedTournaments] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.SPORTS),
        AsyncStorage.getItem(STORAGE_KEYS.TOURNAMENTS),
      ]);
      if (cachedSports) setSports(JSON.parse(cachedSports));
      if (cachedTournaments) setSportsData(JSON.parse(cachedTournaments));
    } catch (error) {
      console.error("Error loading cached data:", error);
    }
  };

  const loadSports = async () => {
    try {
      setSportsLoading(true);
      const sportsData = await fetchSports();
      setSports(sportsData);
      await AsyncStorage.setItem(
        STORAGE_KEYS.SPORTS,
        JSON.stringify(sportsData)
      );
    } catch (error) {
      console.error("Error loading sports:", error);
    } finally {
      setSportsLoading(false);
    }
  };

  const loadTournaments = async () => {
    try {
      const response = await fetchTournaments();
      if (response.status === "success") {
        const transformedData = response.data.map((sport) => ({
          ...sport,
          sport_name:
            sport.sport_name.charAt(0).toUpperCase() +
            sport.sport_name.slice(1).toLowerCase(),
        }));
        setSportsData(transformedData);
        await AsyncStorage.setItem(
          STORAGE_KEYS.TOURNAMENTS,
          JSON.stringify(transformedData)
        );
      }
    } catch (error) {
      console.error("Error loading tournaments:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([loadSports(), loadTournaments()]);
    setRefreshing(false);
  };

  const handleSportChange = (sportId: string) => {
    setSelectedSport(sportId);
    setSelectedDate("");
  };

  const handleDatePress = (date: DateData) => {
    setSelectedDate(date.dateString);
  };

  const handleMonthChange = (newMonthDate: Date) => {
    setCurrentMonth(newMonthDate);
  };

  const filteredTournaments = useMemo(() => {
    let tournaments: { tournament: Tournament; sportName: string }[] = [];
    const relevantSportsData =
      selectedSport === "all"
        ? sportsData
        : sportsData.filter(
            (sport) => sport.sport_id.toString() === selectedSport
          );
    relevantSportsData.forEach((sport) => {
      sport.tournaments.forEach((tournament) => {
        tournaments.push({
          tournament,
          sportName:
            sport.sport_name.charAt(0).toUpperCase() +
            sport.sport_name.slice(1).toLowerCase(),
        });
      });
    });
    if (selectedDate) {
      tournaments = tournaments.filter((item) => {
        const tournamentDate = formatDateForCalendar(
          item.tournament.start_date
        );
        return tournamentDate === selectedDate;
      });
    }
    return tournaments.sort(
      (a, b) =>
        new Date(a.tournament.start_date).getTime() -
        new Date(b.tournament.start_date).getTime()
    );
  }, [sportsData, selectedSport, selectedDate]);

  const markedDates = useMemo<MarkedDates>(() => {
    const marked: MarkedDates = {};
    const relevantSportsData =
      selectedSport === "all"
        ? sportsData
        : sportsData.filter(
            (sport) => sport.sport_id.toString() === selectedSport
          );
    relevantSportsData.forEach((sport) => {
      sport.tournaments.forEach((tournament) => {
        const dateString = formatDateForCalendar(tournament.start_date);
        marked[dateString] = {
          marked: true,
          dotColor: "#FF6B35",
          selectedColor: selectedDate === dateString ? "#FF6B35" : undefined,
        };
      });
    });
    return marked;
  }, [sportsData, selectedSport, selectedDate]);

  const renderTournamentCard = ({
    item,
  }: {
    item: { tournament: Tournament; sportName: string };
  }) => (
    <TournamentCard tournament={item.tournament} sportName={item.sportName} />
  );

  const renderSkeletonCards = () => (
    <View>
      {[1, 2, 3].map((key) => (
        <TournamentCardSkeleton key={key} />
      ))}
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateTitle}>No tournaments found</Text>
      <Text style={styles.emptyStateText}>
        {selectedDate
          ? "No tournaments starting on this date"
          : "No tournaments available for the selected sport"}
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View>
      <SportsDropdown
        sports={sports}
        selectedSport={selectedSport}
        onSportChange={handleSportChange}
        loading={sportsLoading}
      />

      <CalendarComponent
        markedDates={markedDates}
        onDatePress={handleDatePress}
        selectedDate={selectedDate}
        currentMonth={currentMonth}
        onMonthChange={handleMonthChange}
      />

      {selectedDate && (
        <View style={styles.selectedDateContainer}>
          <Text style={styles.selectedDateText}>
            Tournaments on {selectedDate}
          </Text>
        </View>
      )}
    </View>
  );

  if (loading && sports.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Loading tournaments...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredTournaments}
        renderItem={renderTournamentCard}
        keyExtractor={(item) => `${item.tournament.id}-${item.sportName}`}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={loading ? renderSkeletonCards : renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#FF6B35"]}
            tintColor="#FF6B35"
          />
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  listContainer: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  selectedDateContainer: {
    backgroundColor: "#FF6B35",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
  },
  selectedDateText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  emptyState: {
    padding: 40,
    alignItems: "center",
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default HomeScreen;
