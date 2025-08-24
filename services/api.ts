import axios from 'axios';
import { ApiResponse, Sport } from '../types';

const BASE_URL = 'https://stapubox.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const fetchSports = async (): Promise<Sport[]> => {
  try {
    const response = await apiClient.get('/sportslist');
    
    if (!response.data || !response.data.data || !Array.isArray(response.data.data)) {
      throw new Error('Invalid response format');
    }
    
    return [
      { id: 'all', name: 'All Sports' },
      ...response.data.data.map((sport: any) => ({
        id: sport.sport_id.toString(),
        name: sport.sport_name
      }))
    ];
  } catch (error) {
    console.error('Error fetching sports:', error);
    // mock data if API fails
    return [
      { id: 'all', name: 'All Sports' },
      { id: '7020104', name: 'Badminton' },
      { id: '7020105', name: 'Football' },
    ];
  }
};

export const fetchTournaments = async (): Promise<ApiResponse> => {
  try {
    const response = await apiClient.get('/tournament/demo');
    return response.data;
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    // mock data if API fails
    return {
      status: 'success',
      msg: 'Data fetched successfully',
      err: null,
      data: [
        {
          sport_id: 7020104,
          sport_name: 'badminton',
          tournaments: [
            {
              id: 1,
              name: 'Durand Cup 2025',
              tournament_img_url: 'https://via.placeholder.com/100',
              level: 'domestic',
              start_date: '2025-08-17T04:20:47',
              matches: [
                {
                  id: 345,
                  stage: 'Quarter Final',
                  team_a: 'Jamshedpur (M)',
                  team_b: 'Hyderabad',
                  start_time: '2025-08-17T13:40:00',
                  venue: 'Salt Lake Sports Club',
                  status: 'upcoming'
                }
              ]
            },
            {
              id: 2,
              name: 'European Smash Sweden 2025',
              tournament_img_url: 'https://via.placeholder.com/100',
              level: 'International',
              start_date: '2025-08-24T04:20:47',
              matches: []
            },
            {
              id: 3,
              name: 'Indian Badminton Sports',
              tournament_img_url: 'https://via.placeholder.com/100',
              level: 'National',
              start_date: '2025-08-23T04:20:47',
              matches: []
            }
          ]
        }
      ]
    };
  }
};