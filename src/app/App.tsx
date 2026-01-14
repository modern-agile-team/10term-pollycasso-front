import QueryProvider from './queryProvider';
import Router from './Router';
import { SocketProvider } from './socketProvider';

const App = () => {
  return (
    <QueryProvider>
      <SocketProvider>
        <Router />
      </SocketProvider>
    </QueryProvider>
  );
};

export default App;
