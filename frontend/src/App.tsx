import './App.css'
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <div className="page">
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  )
}

export default App
