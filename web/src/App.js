import { QueryClient, QueryClientProvider } from 'react-query'
import { CssBaseline } from '@material-ui/core'
import Content from './components/Content'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Content />
    </QueryClientProvider>
  );
}

export default App;
