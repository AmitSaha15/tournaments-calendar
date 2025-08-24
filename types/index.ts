export interface Sport {
  id: string;
  name: string;
}

export interface Match {
  id: number;
  stage: string;
  team_a: string;
  team_b: string;
  start_time: string;
  venue: string;
  status: string;
}

export interface Tournament {
  id: number;
  name: string;
  tournament_img_url: string;
  level: string;
  start_date: string;
  matches: Match[];
}

export interface SportData {
  sport_id: number;
  sport_name: string;
  tournaments: Tournament[];
}

export interface ApiResponse {
  status: string;
  msg: string;
  err: null | string;
  data: SportData[];
}

export interface MarkedDates {
  [date: string]: {
    marked: boolean;
    dotColor: string;
    selectedColor?: string;
  };
}