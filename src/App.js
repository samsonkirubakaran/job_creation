import { QueryClient, QueryClientProvider } from "react-query";
import CreateJob from "./pages/CreateJob";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CreateJob />
    </QueryClientProvider>
  );
}

export default App;
