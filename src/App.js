import Header from 'components/Common/Header';
import { Outlet } from 'react-router-dom';
import './App.css';
import { auth } from './firebase';

function App() {
  console.log(auth)
  return (
   <>
    <Header />
    <Outlet />
   </>
  );
}

export default App;
