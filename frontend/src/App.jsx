import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header';
import Create from './pages/Create';
import Postspage from './pages/Postspage';
import LikedPosts from './pages/LikedPosts';

function App() {
  return (
    <>
      <Router>
        <Header></Header>
        <div className="container">
          <Routes>
            <Route path='/' element={<Postspage />} />
            <Route path='/liked' element={<LikedPosts/>} />
            <Route path='/users/:username' element={<Postspage/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/create' element={<Create />} />
            <Route path='/edit/:postId' element={<Create />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
