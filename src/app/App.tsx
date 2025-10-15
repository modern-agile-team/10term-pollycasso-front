import Router from './Router';
import QueryProvider from './queryProvider';

const App = () => {
  return (
    <QueryProvider>
      <Router />
    </QueryProvider>
  );
};

export default App;
