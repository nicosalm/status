export interface Language {
    name: string;
    decimal: number;
    color: string;
}

export interface Editor {
    name: string;
    percent: number;
    color: string;
}

export interface ActivityItem {
    grand_total: {
        total_seconds: number;
    };
}

export interface Check {
    alias?: string;
    url: string;
    down: boolean;
    uptime: number;
    last_check_at: string;
    domain: {
        remaining_days: number;
    };
}

export interface PageData {
    checks: Check[];
    languages: Language[];
    editors: Editor[];
    activity: ActivityItem[];
}
