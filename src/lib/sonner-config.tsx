import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      expand
      richColors
      closeButton
      theme="dark"
      style={{
        "--sonner-color-text": "hsl(var(--foreground) / 0.95)",
        "--sonner-color-success": "hsl(var(--success) / 1)",
        "--sonner-color-error": "hsl(var(--error) / 1)",
        "--sonner-color-warning": "hsl(var(--warning) / 1)",
        "--sonner-color-info": "hsl(var(--info) / 1)",
        "--sonner-color-success-text": "hsl(0 0% 100%)",
        "--sonner-color-error-text": "hsl(0 0% 100%)",
        "--sonner-color-warning-text": "hsl(0 0% 100%)",
        "--sonner-color-info-text": "hsl(0 0% 100%)",
        "--sonner-border-radius": "0.375rem",
      } as React.CSSProperties}
      toastOptions={{
        className: "sonner-toast font-mono text-sm font-medium shadow-lg border",
      }}
    />
  );
}
