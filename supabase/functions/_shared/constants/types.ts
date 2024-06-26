export type WakaTimeAllTimeStats = {
  data: {
    best_day: {
      date: string;
      text: string;
      total_seconds: number;
    };
    categories?: Record<string, string>[]; // Marked optional so we can delete it in the function
    created_at?: string; // Marked optional so we can delete it in the function
    daily_average_including_other_language: number;
    daily_average: number;
    days_including_holidays: number;
    days_minus_holidays: number;
    dependencies?: Record<string, string>[]; // Marked optional so we can delete it in the function
    editors: {
      decimal: string;
      digital: string;
      hours: number;
      minutes: number;
      name: string;
      percent: number;
      text: string;
      total_seconds: number;
    }[];
    end: string;
    holidays: number;
    human_readable_daily_average_including_other_language: string;
    human_readable_daily_average: string;
    human_readable_range: string;
    human_readable_total_including_other_language: string;
    human_readable_total: string;
    is_already_updating: boolean;
    is_coding_activity_visible: boolean;
    is_including_today: boolean;
    is_other_usage_visible: boolean;
    is_stuck: boolean;
    is_up_to_date: boolean;
    languages: {
      decimal: string;
      digital: string;
      hours: number;
      minutes: number;
      name: string;
      percent: number;
      text: string;
      total_seconds: number;
    }[];
    machines?: Record<string, string>[]; // Marked optional so we can delete it in the function
    modified_at?: string; // Marked optional so we can delete it in the function
    operating_systems?: Record<string, string>[]; // Marked optional so we can delete it in the function
    percent_calculated: number;
    projects?: Record<string, string>[]; // Marked optional so we can delete it in the function
    range: string;
    start: string;
    status: string;
    timeout: number;
    timezone: string;
    total_seconds_including_other_language: number;
    total_seconds: number;
    user_id?: string; // Marked optional so we can delete it in the function
    username?: string; // Marked optional so we can delete it in the function
    writes_only: boolean;
  };
};
