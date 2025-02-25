
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import Welcome from "./pages/Welcome";
import Process from "./pages/Process";
import Auth from "./pages/Auth";

// Initialize the query client outside the component
const queryClient = new QueryClient();

// Get the Clerk publishable key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Define the App component
const App = () => {
  // If there's no Clerk key, show an error message instead of throwing
  if (!clerkPubKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="text-center p-4">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Configuration Error</h1>
          <p className="text-gray-600">Authentication configuration is missing.</p>
        </div>
      </div>
    );
  }

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
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
