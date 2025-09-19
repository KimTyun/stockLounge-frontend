import { Container, Card, Button } from 'react-bootstrap'
import SocialLogin from '../../components/auth/SocialLogin/SocialLogin'
import styles from '../../styles/components/auth/LoginPage.module.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthStatusThunk } from '../../features/authSlice'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
   const dispatch = useDispatch()
   const auth = useSelector((s) => s.auth)
   const navigate = useNavigate()

   useEffect(() => {
      // Re-check auth status (useful after OAuth redirect back to frontend)
      dispatch(checkAuthStatusThunk())

      // Poll a few times to pick up auth status quickly after OAuth redirect
      let attempts = 0
      const timer = setInterval(() => {
         attempts += 1
         dispatch(checkAuthStatusThunk())
         if (attempts >= 10) clearInterval(timer)
      }, 1000)
      return () => clearInterval(timer)
   }, [dispatch])

   useEffect(() => {
      if (auth?.isLoggedIn) {
         navigate('/')
      }
   }, [auth?.isLoggedIn, navigate])
   return (
      <Container className={styles.page} style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
         <Card className={styles.card}>
            <Card.Body className={styles.body}>
               <h2 className="mb-3 text-center">STOCKLOUNGE에 로그인</h2>
               <p className="text-center text-muted">소셜 계정으로 간편하게 로그인하세요.</p>

               <div className="d-grid gap-2 mt-4">
                  <SocialLogin provider="google" onSuccess={() => dispatch(checkAuthStatusThunk())} />
                  <SocialLogin provider="kakao" onSuccess={() => dispatch(checkAuthStatusThunk())} />
               </div>

               <hr className="my-4" />
               <div className="text-center">
                  <small className="text-muted">
                     처음이신가요? <a href="/register">회원가입</a>
                  </small>
               </div>
            </Card.Body>
         </Card>
      </Container>
   )
}

export default LoginPage
