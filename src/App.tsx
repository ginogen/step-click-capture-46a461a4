
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import Welcome from "./pages/Welcome";
import Process from "./pages/Process";
import Auth from "./pages/Auth";

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

const queryClient = new QueryClient();

const App = () => (
  <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
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

export default App;
