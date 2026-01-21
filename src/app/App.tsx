import { OverlayProvider } from 'overlay-kit';
import { ToastContainer } from 'react-toastify';

import { SocketGlobalAlert } from '@/shared/ui/SocketGlobalAlert';
import QueryProvider from './queryProvider';
import Router from './Router';
import { SocketProvider } from './socketProvider';

const App = () => {
  return (
    <QueryProvider>
      <SocketProvider>
        <SocketGlobalAlert />

        <OverlayProvider>
          <Router />
        </OverlayProvider>

        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
          limit={4}
          icon={false}
        />
      </SocketProvider>
    </QueryProvider>
  );
};

export default App;
