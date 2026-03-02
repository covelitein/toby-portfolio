'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin, useAuthStore } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Activity, ArrowRight, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();
  const login = useLogin();
  const { setUser, setToken } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(formData.email, formData.password);
      setToken(response.access_token);
      setUser(response.user);
      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (error: any) {
      const message = error.response?.data?.detail || 'Login failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen login-bg flex items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-sm bg-[#00FF94] flex items-center justify-center">
            <Activity className="h-6 w-6 text-black" />
          </div>
          <span className="font-heading font-bold text-2xl tracking-tight">EventMesh</span>
        </div>

        <Card className="bg-card/80 backdrop-blur-xl border-border rounded-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl tracking-tight">Sign in</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your credentials to access the control room
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-mono text-xs uppercase tracking-wider">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="pilot@eventmesh.io"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-input border-transparent focus:border-primary rounded-sm h-11 font-mono"
                  required
                  data-testid="login-email-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="font-mono text-xs uppercase tracking-wider">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-input border-transparent focus:border-primary rounded-sm h-11 font-mono"
                  required
                  data-testid="login-password-input"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-11 rounded-sm font-mono text-sm uppercase tracking-wider bg-[var(--success)] text-primary-foreground hover:bg-[var(--success)]/70"
                disabled={loading}
                data-testid="login-submit-btn"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Access Control Room
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                New to EventMesh?{" "}
                <Link
                  href="/register"
                  className="text-[#00FF94] hover:underline font-medium"
                  data-testid="register-link"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground font-mono">
          Distributed Event & Notification Platform
        </p>
      </div>
    </div>
  );
}
