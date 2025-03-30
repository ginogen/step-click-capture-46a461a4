
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Process from "./pages/Process";
import CoverageSelection from "./pages/CoverageSelection";
import Landing from "./pages/Landing";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/coverage-selection" element={<CoverageSelection />} />
          <Route path="/process" element={<Process />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      {/* Add Sonner Toaster component for small transient notifications */}
      <SonnerToaster 
        position="bottom-center"
        toastOptions={{
          duration: 1500,
          className: "text-sm py-2 px-3 bg-green-500 text-white rounded-md",
        }}
      />
      {/* Keep existing Toaster for important notifications */}
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;
