import Header from 'components/Common/Header';
import { Outlet } from 'react-router-dom';
import './App.css';
// import { auth } from './firebase';
import { AuthContextProvider } from './components/context/AuthContext';

function App() {
  // console.log(auth)
  return (
    <AuthContextProvider>
      <Header />
      <Outlet />
    </AuthContextProvider>
  );
}

export default App;
