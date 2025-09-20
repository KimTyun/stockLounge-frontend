import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/common/Layout'
import LandingPage from './pages/Home/LandingPage'
import Home from './pages/Home'
import LoginPage from './pages/Auth/Login'
import RegisterPage from './pages/Auth/Register'
import Board from './pages/Board'
import PostEditor from './components/board/PostEditor/PostEditor'
import PostDetailPage from './pages/Board/PostDetailPage'
import Chart from './pages/Chart'
import News from './pages/News'
import User from './pages/User'
import Admin from './pages/Admin'
import { ROUTES } from './config/routes'

// 스타일 import
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/bootstrap-custom.css'
import './styles/globals.css'
import './App.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { checkAuthStatusThunk } from './features/authSlice'

function App() {
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])

   return (
      <Router>
         <Layout>
            <Routes>
               <Route path={ROUTES.HOME} element={<LandingPage />} />
               <Route path={ROUTES.MAIN} element={<Home />} />
               <Route path={ROUTES.BOARD} element={<Board />} />
               <Route path={ROUTES.BOARD_WRITE} element={<PostEditor />}></Route>
               <Route path={ROUTES.BOARD_DETAIL} element={<PostDetailPage />}></Route>
               <Route path={ROUTES.CHART} element={<Chart />} />
               <Route path={ROUTES.NEWS} element={<News />} />
               <Route path={ROUTES.LOGIN} element={<LoginPage />} />
               <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
               <Route path={ROUTES.USER_INFO} element={<User />} />
               <Route path={ROUTES.ADMIN} element={<Admin />} />
               {/* 추후 다른 라우트들을 추가할 예정 */}
            </Routes>
         </Layout>
      </Router>
   )
}

export default App
