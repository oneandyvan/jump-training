import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  return (
    <div className="page">
      <Header/>
      <main className="main">
        <h1>Welcome to the Bank!</h1>
        <p>Sign in to view your accounts and transactions</p>
        <button>
          Sign in
        </button>
      </main>
      <Footer/>
    </div>
  )
}

export default App
