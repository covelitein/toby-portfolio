# EventMesh Frontend Integration Guide

This guide explains how to use the clean, SWR-based hooks to connect your frontend to the EventMesh backend API.

## Installation

First, make sure you have the required dependencies installed:

```bash
npm install swr axios zustand
```

## Setup

### 1. Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

For production:
```env
NEXT_PUBLIC_BACKEND_URL=https://api.yourdomain.com
```

### 2. API Client Configuration

The API client is automatically configured in `src/lib/api/client.ts`:
- Automatically includes auth tokens from localStorage
- Handles 401 errors by redirecting to login
- Configured for your backend URL

## Core Concepts

### useSWR Hooks

All data fetching uses SWR (Stale-While-Revalidate) for efficient caching and real-time updates:

```typescript
import { useEvents, useEventStats } from '@/hooks';

function MyComponent() {
  const { data: events, isLoading, error, mutate } = useEvents();
  
  // data: event[]
  // isLoading: boolean
  // error: Error | undefined
  // mutate(): Promise<void> - manually revalidate
  
  return <>...</>;
}
```

### Mutation Hooks

For create/update/delete operations, use async functions:

```typescript
import { useCreateEvent, useDeleteEvent } from '@/hooks';

function MyComponent() {
  const createEvent = useCreateEvent();
  const deleteEvent = useDeleteEvent();
  
  const handleCreate = async () => {
    try {
      const newEvent = await createEvent({
        event_type: 'user.login',
        source: 'api',
        severity: 'info',
      });
      console.log('Event created:', newEvent);
    } catch (error) {
      console.error('Failed:', error);
    }
  };
  
  return <button onClick={handleCreate}>Create</button>;
}
```

## Authentication

### Login/Register

```typescript
import { useLogin, useRegister, useAuthStore } from '@/hooks';

function LoginComponent() {
  const login = useLogin();
  const { setUser, setToken } = useAuthStore();
  
  const handleLogin = async (email: string, password: string) => {
    const response = await login(email, password);
    // Token and user are automatically saved to localStorage
    // Also updates auth store
    setToken(response.access_token);
    setUser(response.user);
  };
}
```

### Get Current User

```typescript
import { useCurrentUser } from '@/hooks';

function UserProfile() {
  const { data: user, isLoading } = useCurrentUser();
  
  return <div>{isLoading ? 'Loading...' : user?.name}</div>;
}
```

### Logout

```typescript
import { useLogout, useAuthStore } from '@/hooks';

function Navbar() {
  const logout = useLogout();
  const { logout: storeLogout } = useAuthStore();
  
  const handleLogout = () => {
    logout(); // clears localStorage
    storeLogout(); // clears zustand store
  };
}
```

## API Endpoints

### Events

```typescript
import {
  useCreateEvent,
  useEvents,
  useEvent,
  useDeleteEvent,
  useEventStats,
} from '@/hooks';

// Create event
const createEvent = useCreateEvent();
await createEvent({
  event_type: 'order.created',
  source: 'api',
  severity: 'info',
  payload: { orderId: 123 },
});

// List events with filters
const { data: events } = useEvents({
  event_type: 'order.created',
  source: 'api',
  severity: 'warning',
  limit: 50,
});

// Get single event
const { data: event } = useEvent('event-id-123');

// Delete event
const deleteEvent = useDeleteEvent();
await deleteEvent('event-id-123');

// Get statistics
const { data: stats } = useEventStats();
// stats = {
//   total: 150,
//   by_severity: { info: 100, warning: 40, error: 10 },
//   by_type: { 'user.created': 60, 'order.created': 90 },
//   by_source: { 'api': 100, 'webhook': 50 },
// }
```

### API Keys

```typescript
import {
  useCreateAPIKey,
  useAPIKeys,
  useDeleteAPIKey,
} from '@/hooks';

// Create key
const createAPIKey = useCreateAPIKey();
const newKey = await createAPIKey({ name: 'Production Server' });
// newKey.key contains the full key (shown only once!)

// List keys
const { data: keys } = useAPIKeys();
// Keys are masked except for first 10 and last 4 characters

// Delete key
const deleteAPIKey = useDeleteAPIKey();
await deleteAPIKey('key-id-123');
```

### Subscriptions

```typescript
import {
  useCreateSubscription,
  useSubscriptions,
  useUpdateSubscription,
  useDeleteSubscription,
  useToggleSubscription,
} from '@/hooks';

// Create subscription
const createSubscription = useCreateSubscription();
await createSubscription({
  name: 'Critical Alerts',
  event_type: 'error',
  severity: 'critical',
  webhook_url: 'https://myapp.com/alerts',
  is_active: true,
});

// List subscriptions
const { data: subs } = useSubscriptions();

// Update subscription
const updateSubscription = useUpdateSubscription();
await updateSubscription('sub-id-123', {
  name: 'Updated Name',
  event_type: 'warning',
  webhook_url: 'https://new-url.com',
});

// Toggle active status
const toggleSubscription = useToggleSubscription();
await toggleSubscription('sub-id-123');

// Delete subscription
const deleteSubscription = useDeleteSubscription();
await deleteSubscription('sub-id-123');
```

### Health Check

```typescript
import { useHealth } from '@/hooks';

function HealthStatus() {
  const { data: health } = useHealth();
  // health = {
  //   status: 'healthy',
  //   timestamp: '2024-01-20T...',
  //   queue_size: 42,
  //   connected_clients: 5,
  // }
}
```

## Real-time Updates with WebSocket

```typescript
import { useWebSocketEvents } from '@/hooks';

function EventsMonitor() {
  const [liveEvents, setLiveEvents] = useState([]);
  
  const { isConnected } = useWebSocketEvents((message) => {
    if (message.type === 'new_event') {
      setLiveEvents(prev => [message.event, ...prev]);
    } else if (message.type === 'initial_events') {
      setLiveEvents(message.events);
    }
  });
  
  return (
    <div>
      <div className={isConnected ? 'text-green' : 'text-red'}>
        {isConnected ? 'Connected' : 'Disconnected'}
      </div>
      {/* render liveEvents */}
    </div>
  );
}
```

## State Management

### Auth Store (Zustand)

```typescript
import { useAuthStore } from '@/hooks';

function MyComponent() {
  const { user, token, setUser, setToken, logout, isAuthenticated } = useAuthStore();
  
  // Persist across browser refreshes automatically
  const isAuth = isAuthenticated();
  
  if (!isAuth) return <Redirect to="/login" />;
  
  return <div>Hello {user?.name}</div>;
}
```

## Error Handling

```typescript
import { useEvents } from '@/hooks';

function EventsList() {
  const { data: events, error, isLoading } = useEvents();
  
  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error.response?.data?.detail}</div>;
  if (!events) return <div>No events</div>;
  
  return <>...</>;
}
```

## Manual Revalidation

```typescript
import { useEvents } from '@/hooks';

function EventsList() {
  const { data, mutate } = useEvents();
  
  const handleRefresh = async () => {
    await mutate(); // Revalidates data from server
  };
  
  return <button onClick={handleRefresh}>Refresh</button>;
}
```

## SWR Configuration

All hooks accept optional SWR configuration:

```typescript
import { useEvents } from '@/hooks';

const { data } = useEvents(
  { limit: 50 },
  {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 60000,
    focusThrottleInterval: 300000,
  }
);
```

## Example Page Implementations

See the `src/lib/api/examples/` directory for complete implementations:

- `LoginPageExample.tsx` - Authentication
- `RegisterPageExample.tsx` - User registration
- `DashboardPageExample.tsx` - Real-time events with WebSocket
- `APIKeysPageExample.tsx` - API key management
- `SubscriptionsPageExample.tsx` - Event subscriptions

## Common Patterns

### Form with Submission

```typescript
const [isSubmitting, setIsSubmitting] = useState(false);
const createEvent = useCreateEvent();
const { mutate: mutateEvents } = useEvents();

const handleSubmit = async (formData) => {
  setIsSubmitting(true);
  try {
    await createEvent(formData);
    await mutateEvents(); // Revalidate events list
    toast.success('Created!');
  } catch (error) {
    toast.error(error.response?.data?.detail);
  } finally {
    setIsSubmitting(false);
  }
};
```

### Real-time + Manual Data

```typescript
const [allEvents, setAllEvents] = useState([]);
const { data: initialEvents } = useEvents({ limit: 100 });

useWebSocketEvents((message) => {
  if (message.type === 'new_event') {
    setAllEvents(prev => [message.event, ...prev]);
  }
});

useEffect(() => {
  if (initialEvents) setAllEvents(initialEvents);
}, [initialEvents]);
```

## TypeScript

All hooks are fully typed:

```typescript
import { Event, Subscription, EventStats, User } from '@/lib/api/types';

function Component() {
  const { data: events }: { data?: Event[] } = useEvents();
  const { data: user }: { data?: User } = useCurrentUser();
  
  // Full autocomplete and type checking
}
```

## Troubleshooting

### Token not included in requests
- Check localStorage has `access_token`
- Verify `useAuthStore` is updated after login

### 401 errors keep redirecting
- Clear localStorage and login again
- Check token hasn't expired

### WebSocket not connecting
- Verify `NEXT_PUBLIC_BACKEND_URL` is correct
- Check backend CORS settings
- Ensure token is valid

### SWR caching issues
- Call `mutate()` to force revalidation
- Adjust `dedupingInterval` if needed
- Check network tab for actual requests

## Best Practices

1. **Always handle errors** - wrap in try/catch
2. **Show loading states** - use `isLoading` flag
3. **Revalidate after mutations** - call `mutate()` after create/update/delete
4. **Use WebSocket for real-time** - don't poll when WebSocket available
5. **Store tokens securely** - localStorage is fine for demo, use secure storage in production
6. **Type your components** - use TypeScript types from `@/lib/api/types`
7. **Error toasts** - provide user feedback for failures
8. **Clean up subscriptions** - WebSocket auto-disconnects, but always clean up listeners

## Support

For issues with the backend, see the backend documentation in `backend/server.py`.
