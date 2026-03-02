'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Activity, AlertTriangle, Info, AlertCircle, Zap, Clock, Plus, Loader2 } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';
import {
  useEventStats,
  useEvents,
  useCreateEvent,
  useWebSocketEvents,
  useAuthStore,
} from '@/hooks';

const severityConfig = {
  info: {
    icon: Info,
    color: 'text-[#00B8FF]',
    bg: 'bg-[#00B8FF]/10',
    border: 'border-[#00B8FF]/30',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-[#FFD600]',
    bg: 'bg-[#FFD600]/10',
    border: 'border-[#FFD600]/30',
  },
  error: {
    icon: AlertCircle,
    color: 'text-[#FF0080]',
    bg: 'bg-[#FF0080]/10',
    border: 'border-[#FF0080]/30',
  },
  critical: {
    icon: Zap,
    color: 'text-[#FF0040]',
    bg: 'bg-[#FF0040]/10',
    border: 'border-[#FF0040]/30',
  },
};

export default function DashboardPage() {
  const [liveEvents, setLiveEvents] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const { user } = useAuthStore();
  const { data: stats, isLoading: statsLoading, mutate: mutateStat } = useEventStats();
  const { data: events = [], isLoading: eventsLoading, mutate: mutateEvents } = useEvents({
    limit: 20,
  });
  const createEvent = useCreateEvent();

  // WebSocket for real-time events
  const { isConnected } = useWebSocketEvents((message) => {
    if (message.type === 'new_event' && message.event) {
      setLiveEvents((prev) => [message.event, ...prev].slice(0, 20));
      // Revalidate events and stats
      mutateEvents();
      mutateStat();
    } else if (message.type === 'initial_events' && message.events) {
      setLiveEvents(message.events.slice(0, 20));
    }
  });

  const handleCreateTestEvent = useCallback(async () => {
    setIsCreating(true);
    try {
      await createEvent({
        event_type: 'test.event',
        source: 'dashboard',
        severity: 'info',
        payload: {
          test: true,
          timestamp: new Date().toISOString(),
        },
      });
      toast.success('Test event created successfully!');
      mutateEvents();
      mutateStat();
    } catch (error) {
      toast.error('Failed to create test event');
    } finally {
      setIsCreating(false);
    }
  }, [createEvent, mutateEvents, mutateStat]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const displayEvents = liveEvents.length > 0 ? liveEvents : events;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Control Room</h1>
            <p className="text-muted-foreground mt-2">
              Welcome back, <span className="font-semibold">{user?.name}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-sm ${isConnected ? 'bg-[#00FF94]/10 border border-[#00FF94]/30' : 'bg-red-500/10 border border-red-500/30'}`}>
              <div
                className={`w-2 h-2 rounded-full ${isConnected ? 'bg-[#00FF94] animate-pulse' : 'bg-red-500'}`}
              ></div>
              <span className="text-xs font-mono">
                {isConnected ? 'Live' : 'Offline'}
              </span>
            </div>
            <Button
              onClick={handleCreateTestEvent}
              disabled={isCreating}
              className="rounded-sm font-mono text-xs uppercase bg-[var(--success)] hover:bg-[var(--success)]/80"
            >
              {isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Create Test Event
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card/50 backdrop-blur-sm border-border rounded-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-mono uppercase tracking-wider">Total Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{statsLoading ? '-' : stats?.total || 0}</div>
            </CardContent>
          </Card>

          {stats?.by_severity &&
            Object.entries(stats.by_severity).map(([severity, count]) => {
              const config = severityConfig[severity as keyof typeof severityConfig];
              const Icon = config?.icon || Activity;
              return (
                <Card key={severity} className="bg-card/50 backdrop-blur-sm border-border rounded-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-mono uppercase tracking-wider capitalize">
                      {severity}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${config?.color}`} />
                      <div className="text-2xl font-bold">{count}</div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>

        {/* Live Events */}
        <Card className="bg-card/50 backdrop-blur-sm border-border rounded-sm">
          <CardHeader>
            <CardTitle className="text-lg font-mono uppercase tracking-wider">Live Events</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96 w-full pr-4">
              {eventsLoading ? (
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : displayEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                  <Activity className="h-8 w-8 mb-2 opacity-50" />
                  <p className="text-sm">No events yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {displayEvents.map((event) => {
                    const config =
                      severityConfig[event.severity as keyof typeof severityConfig] ||
                      severityConfig.info;
                    const Icon = config.icon;

                    return (
                      <div
                        key={event.id}
                        className={`flex items-start gap-3 p-3 rounded-sm border ${config.bg} ${config.border} transition-all hover:border-opacity-100`}
                      >
                        <Icon className={`h-4 w-4 ${config.color} mt-1 flex-shrink-0`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <code className="text-xs font-mono font-bold truncate">
                              {event.event_type}
                            </code>
                            <Badge variant="outline" className="text-xs capitalize rounded-sm">
                              {event.source}
                            </Badge>
                            <Badge variant="outline" className="text-xs capitalize rounded-sm">
                              {event.severity}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span className="font-mono">{formatTime(event.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
