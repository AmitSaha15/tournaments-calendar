import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { Match, Tournament } from "../types";
import { formatDateToIST, formatTimeToIST } from "../utils/dateUtils";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface TournamentCardProps {
  tournament: Tournament;
  sportName: string;
}

const TournamentCard: React.FC<TournamentCardProps> = ({
  tournament,
  sportName,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "international":
        return "#4FC3F7";
      case "national":
        return "#81C784";
      case "domestic":
        return "#FFB74D";
      default:
        return "#9E9E9E";
    }
  };

  const renderMatch = (match: Match) => (
    <View key={match.id} style={styles.matchCard}>
      <View style={styles.matchHeader}>
        <Text style={styles.matchStage}>{match.stage}</Text>
        <View style={styles.matchInfo}>
          <Ionicons name="time-outline" size={14} color="#666" />
          <Text style={styles.matchTime}>
            {formatTimeToIST(match.start_time)}
          </Text>
        </View>
      </View>

      <View style={styles.teamsContainer}>
        <View style={styles.teamRow}>
          <Text style={styles.teamName}>{match.team_a}</Text>
          <Text style={styles.vsText}>VS</Text>
          <Text style={styles.teamName}>{match.team_b}</Text>
        </View>
      </View>

      <View style={styles.venueContainer}>
        <Ionicons name="location-outline" size={14} color="#666" />
        <Text style={styles.venueText}>{match.venue}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.outerCard}>
        <View style={styles.cardContent}>
          <View style={styles.leftSection}>
            <Image
              // image url form api response is not working
              // source={{ uri: tournament.tournament_img_url }}
              source={require("../assets/images/default_icon.png")}
              style={styles.tournamentImage}
              // defaultSource={require("../assets/images/default_icon.png")}
            />
            <View style={styles.tournamentInfo}>
              <Text style={styles.tournamentName} numberOfLines={1}>
                {tournament.name}
              </Text>
              <Text style={styles.sportName}>{sportName}</Text>
              <View style={styles.levelContainer}>
                <View
                  style={[
                    styles.levelBadge,
                    { backgroundColor: getLevelColor(tournament.level) },
                  ]}
                >
                  <Text style={styles.levelText}>{tournament.level}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.rightSection}>
            <Text style={styles.dateText}>
              {formatDateToIST(tournament.start_date)}
            </Text>
            {tournament.matches.length > 0 && (
              <TouchableOpacity
                style={styles.expandButton}
                onPress={toggleExpanded}
              >
                <Ionicons
                  name={expanded ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#FF6B35"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {expanded && tournament.matches.length > 0 && (
        <View style={styles.innerCard}>
          <Text style={styles.matchesTitle}>Fixtures</Text>
          {tournament.matches.map(renderMatch)}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  tournamentImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  tournamentInfo: {
    flex: 1,
  },
  tournamentName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  sportName: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
    textTransform: "capitalize",
  },
  levelContainer: {
    flexDirection: "row",
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  levelText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  rightSection: {
    alignItems: "flex-end",
  },
  dateText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  expandButton: {
    padding: 4,
  },
  innerCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    marginTop: 8,
    padding: 16,
  },
  matchesTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  matchCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  matchHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  matchStage: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF6B35",
  },
  matchInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  matchTime: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  teamsContainer: {
    marginBottom: 8,
  },
  teamRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  teamName: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    flex: 1,
    textAlign: "center",
  },
  vsText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
    marginHorizontal: 12,
  },
  venueContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  venueText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
});

export default TournamentCard;
