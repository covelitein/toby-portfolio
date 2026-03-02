export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface APIKey {
  id: string;
  name: string;
  key: string;
  created_at: string;
  last_used?: string | null;
}

export interface APIKeyCreate {
  name: string;
}

export interface Event {
  id: string;
  event_type: string;
  source: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  payload: Record<string, any>;
  user_id: string;
  created_at: string;
}

export interface EventCreate {
  event_type: string;
  source: string;
  severity?: 'info' | 'warning' | 'error' | 'critical';
  payload?: Record<string, any>;
}

export interface Subscription {
  id: string;
  name: string;
  event_type: string;
  source?: string | null;
  severity?: string | null;
  webhook_url?: string | null;
  is_active: boolean;
  user_id: string;
  created_at: string;
}

export interface SubscriptionCreate {
  name: string;
  event_type: string;
  source?: string | null;
  severity?: string | null;
  webhook_url?: string | null;
  is_active?: boolean;
}

export interface EventStats {
  total: number;
  by_severity: Record<string, number>;
  by_type: Record<string, number>;
  by_source: Record<string, number>;
}

export interface HealthStatus {
  status: string;
  timestamp: string;
  queue_size: number;
  connected_clients: number;
}
