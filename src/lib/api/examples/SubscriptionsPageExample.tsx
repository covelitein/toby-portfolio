'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Plus, Trash2, Edit2, ToggleLeft, ToggleRight } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';
import {
  useSubscriptions,
  useCreateSubscription,
  useUpdateSubscription,
  useDeleteSubscription,
  useToggleSubscription,
} from '@/hooks';

export default function SubscriptionsPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    event_type: '',
    source: '',
    severity: '',
    webhook_url: '',
  });

  const { data: subscriptions = [], isLoading, mutate } = useSubscriptions();
  const createSubscription = useCreateSubscription();
  const updateSubscription = useUpdateSubscription();
  const deleteSubscription = useDeleteSubscription();
  const toggleSubscription = useToggleSubscription();

  const resetForm = () => {
    setFormData({ name: '', event_type: '', source: '', severity: '', webhook_url: '' });
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.event_type) {
      toast.error('Name and event type are required');
      return;
    }

    setIsCreating(true);
    try {
      if (editingId) {
        await updateSubscription(editingId, {
          name: formData.name,
          event_type: formData.event_type,
          source: formData.source || undefined,
          severity: formData.severity || undefined,
          webhook_url: formData.webhook_url || undefined,
        });
        toast.success('Subscription updated');
      } else {
        await createSubscription({
          name: formData.name,
          event_type: formData.event_type,
          source: formData.source || undefined,
          severity: formData.severity || undefined,
          webhook_url: formData.webhook_url || undefined,
          is_active: true,
        });
        toast.success('Subscription created');
      }
      resetForm();
      mutate();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Operation failed');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await deleteSubscription(id);
      toast.success('Subscription deleted');
      mutate();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to delete');
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleSubscription(id);
      toast.success('Subscription toggled');
      mutate();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to toggle');
    }
  };

  const handleEdit = (subscription: any) => {
    setFormData({
      name: subscription.name,
      event_type: subscription.event_type,
      source: subscription.source || '',
      severity: subscription.severity || '',
      webhook_url: subscription.webhook_url || '',
    });
    setEditingId(subscription.id);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
          <p className="text-muted-foreground mt-2">
            Create subscriptions to trigger webhooks when events match your criteria
          </p>
        </div>

        {/* Create Form */}
        <Card className="bg-card/50 backdrop-blur-sm border-border rounded-sm">
          <CardHeader>
            <CardTitle className="font-mono uppercase tracking-wider">
              {editingId ? 'Edit Subscription' : 'Create New Subscription'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-mono text-xs uppercase">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="My Subscription"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-input border-transparent focus:border-primary rounded-sm h-11 font-mono"
                    disabled={isCreating}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event_type" className="font-mono text-xs uppercase">
                    Event Type *
                  </Label>
                  <Input
                    id="event_type"
                    type="text"
                    placeholder="user.created"
                    value={formData.event_type}
                    onChange={(e) => setFormData({ ...formData, event_type: e.target.value })}
                    className="bg-input border-transparent focus:border-primary rounded-sm h-11 font-mono"
                    disabled={isCreating}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="source" className="font-mono text-xs uppercase">
                    Source (Optional)
                  </Label>
                  <Input
                    id="source"
                    type="text"
                    placeholder="api"
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    className="bg-input border-transparent focus:border-primary rounded-sm h-11 font-mono"
                    disabled={isCreating}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="severity" className="font-mono text-xs uppercase">
                    Severity (Optional)
                  </Label>
                  <Select
                    value={formData.severity}
                    onValueChange={(value) =>
                      setFormData({ ...formData, severity: value })
                    }
                  >
                    <SelectTrigger className="bg-input border-transparent rounded-sm h-11 font-mono">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webhook_url" className="font-mono text-xs uppercase">
                    Webhook URL
                  </Label>
                  <Input
                    id="webhook_url"
                    type="url"
                    placeholder="https://example.com/webhook"
                    value={formData.webhook_url}
                    onChange={(e) => setFormData({ ...formData, webhook_url: e.target.value })}
                    className="bg-input border-transparent focus:border-primary rounded-sm h-11 font-mono"
                    disabled={isCreating}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={isCreating}
                  className="rounded-sm font-mono text-xs uppercase bg-[var(--success)] hover:bg-[var(--success)]/80"
                >
                  {isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                  {editingId ? 'Update' : 'Create'}
                </Button>
                {editingId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    className="rounded-sm"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Subscriptions List */}
        <Card className="bg-card/50 backdrop-blur-sm border-border rounded-sm">
          <CardHeader>
            <CardTitle className="font-mono uppercase tracking-wider">Active Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : subscriptions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No subscriptions yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {subscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-4 rounded-sm border border-border bg-background/50 hover:bg-background/80 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="font-mono font-semibold mb-2">{sub.name}</div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-xs rounded-sm">
                            {sub.event_type}
                          </Badge>
                          {sub.source && (
                            <Badge variant="outline" className="text-xs rounded-sm">
                              Source: {sub.source}
                            </Badge>
                          )}
                          {sub.severity && (
                            <Badge variant="outline" className="text-xs rounded-sm">
                              {sub.severity}
                            </Badge>
                          )}
                        </div>
                        {sub.webhook_url && (
                          <div className="text-xs text-muted-foreground mt-2 font-mono truncate">
                            {sub.webhook_url}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggle(sub.id)}
                          className="rounded-sm"
                        >
                          {sub.is_active ? (
                            <ToggleRight className="h-4 w-4" />
                          ) : (
                            <ToggleLeft className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(sub)}
                          className="rounded-sm"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(sub.id)}
                          className="rounded-sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
