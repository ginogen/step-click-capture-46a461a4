
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import Welcome from "./pages/Welcome";
import Process from "./pages/Process";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

// Asegurarnos de usar la clave correcta y configuración apropiada
const clerkPubKey = "pk_test_bGFyZ2UtbWVlcmthdC0yNC5jbGVyay5hY2NvdW50cy5kZXYk";

const App = () => {
  return (
    <ClerkProvider 
      publishableKey={clerkPubKey}
      appearance={{
        baseTheme: undefined,
        variables: { colorPrimary: '#0F172A' },
        layout: {
          socialButtonsPlacement: 'bottom'
        }
      }}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <SignedOut>
                  <Welcome />
                </SignedOut>
              }
            />
            <Route
              path="/auth"
              element={
                <SignedOut>
                  <Auth />
                </SignedOut>
              }
            />
            <Route
              path="/process"
              element={
                <SignedIn>
                  <Process />
                </SignedIn>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default App;
