// components/theme-provider.tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Créez une instance de QueryClient
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider {...props}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </NextThemesProvider>
    </QueryClientProvider>
  );
}