import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from 'components/Common/Header';
import { Outlet } from 'react-router-dom';
import './App.css';
// import { auth } from './firebase';
import { AuthContextProvider } from './components/context/AuthContext';

const queryClient = new QueryClient();

function App() {
  // console.log(auth)
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Header />
        <Outlet />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
