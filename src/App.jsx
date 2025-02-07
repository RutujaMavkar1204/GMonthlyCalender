import Header from './components/Header'
import './App.css'
import UserContextProvider from './context/userContextProvider';

function App() {

  return (
    <>
     <UserContextProvider>
     <Header/>
     </UserContextProvider>
   
    </>
  );
}

export default App
