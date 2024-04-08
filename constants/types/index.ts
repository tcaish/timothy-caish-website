export type Skill = {
  alt: string;
  color: string;
  description: string;
  link: string;
  source: string;
  title: string;
};

export interface StatisticType {
  subtitle?: string;
  title?: string;
  value?: number;
}

export type WakaTimeAllTimeStats = {
  data: {
    best_day: {
      date: string;
      text: string;
      total_seconds: number;
    };
    daily_average_including_other_language: number;
    daily_average: number;
    days_including_holidays: number;
    days_minus_holidays: number;
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
    percent_calculated: number;
    range: string;
    start: string;
    status: string;
    timeout: number;
    timezone: string;
    total_seconds_including_other_language: number;
    total_seconds: number;
    writes_only: boolean;
  };
};
