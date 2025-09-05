import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/common/Layout'
import Home from './pages/Home'
import Board from './pages/Board'
import PostEditor from './components/board/PostEditor/PostEditor'
import PostDetail from './components/board/PostDetail/PostDetail'
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

function App() {
   return (
      <Router>
         <Layout>
            <Routes>
               <Route path={ROUTES.HOME} element={<Home />} />
               <Route path={ROUTES.BOARD} element={<Board />} />
               <Route path={ROUTES.BOARD_WRITE} element={<PostEditor />}></Route>
               <Route path={ROUTES.BOARD_DETAIL} element={<PostDetail />}></Route>
               <Route path={ROUTES.CHART} element={<Chart />} />
               <Route path={ROUTES.NEWS} element={<News />} />
               <Route path={ROUTES.USER_INFO} element={<User />} />
               <Route path={ROUTES.ADMIN} element={<Admin />} />
               {/* 추후 다른 라우트들을 추가할 예정 */}
            </Routes>
         </Layout>
      </Router>
   )
}

export default App
