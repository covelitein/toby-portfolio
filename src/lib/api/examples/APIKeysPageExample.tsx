'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Plus, Trash2, Copy } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';
import {
  useAPIKeys,
  useCreateAPIKey,
  useDeleteAPIKey,
} from '@/hooks';

export default function APIKeysPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [keyName, setKeyName] = useState('');

  const { data: apiKeys = [], isLoading, mutate } = useAPIKeys();
  const createAPIKey = useCreateAPIKey();
  const deleteAPIKey = useDeleteAPIKey();

  const handleCreateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyName.trim()) {
      toast.error('Please enter a key name');
      return;
    }

    setIsCreating(true);
    try {
      const newKey = await createAPIKey({ name: keyName });
      // Show full key to user only once
      toast.success(`API Key created: ${newKey.key}`);
      setKeyName('');
      mutate();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to create API key');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteKey = async (keyId: string) => {
    if (!confirm('Are you sure? This cannot be undone.')) return;

    try {
      await deleteAPIKey(keyId);
      toast.success('API key deleted');
      mutate();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to delete API key');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage API keys for programmatic access to EventMesh
          </p>
        </div>

        {/* Create Key Form */}
        <Card className="bg-card/50 backdrop-blur-sm border-border rounded-sm">
          <CardHeader>
            <CardTitle className="font-mono uppercase tracking-wider">Create New Key</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateKey} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="keyName" className="font-mono text-xs uppercase">
                  Key Name
                </Label>
                <Input
                  id="keyName"
                  type="text"
                  placeholder="e.g., Production Server"
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                  className="bg-input border-transparent focus:border-primary rounded-sm h-11 font-mono"
                  disabled={isCreating}
                />
              </div>
              <Button
                type="submit"
                disabled={isCreating || !keyName.trim()}
                className="rounded-sm font-mono text-xs uppercase bg-[var(--success)] hover:bg-[var(--success)]/80"
              >
                {isCreating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                Create Key
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Keys List */}
        <Card className="bg-card/50 backdrop-blur-sm border-border rounded-sm">
          <CardHeader>
            <CardTitle className="font-mono uppercase tracking-wider">Your API Keys</CardTitle>
            <CardDescription>
              Keep your keys secure. Store them safely and never commit to version control.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : apiKeys.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No API keys created yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {apiKeys.map((key) => (
                  <div
                    key={key.id}
                    className="flex items-center justify-between p-4 rounded-sm border border-border bg-background/50 hover:bg-background/80 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="font-mono font-semibold mb-1">{key.name}</div>
                      <div className="font-mono text-xs text-muted-foreground mb-2">
                        {key.key}
                      </div>
                      <Badge variant="outline" className="text-xs rounded-sm">
                        {key.last_used ? `Last used: ${new Date(key.last_used).toLocaleDateString()}` : 'Never used'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(key.key)}
                        className="rounded-sm"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteKey(key.id)}
                        className="rounded-sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
