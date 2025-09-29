import { Container, Card } from 'react-bootstrap'
import SocialLogin from '../../components/auth/SocialLogin/SocialLogin'
import styles from '../../styles/components/auth/LoginPage.module.css'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../config/routes'

const LoginPage = () => {
   const { isLoggedIn } = useSelector((state) => state.auth)
   const navigate = useNavigate()

   useEffect(() => {
      if (isLoggedIn) {
         navigate(ROUTES.MAIN)
      }
   }, [isLoggedIn, navigate])

   return (
      <Container className={styles.page} style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
         <Card className={styles.card}>
            <Card.Body className={styles.body}>
               <h2 className="mb-3 text-center">STOCKLOUNGE에 로그인</h2>
               <p className="text-center text-muted">소셜 계정으로 간편하게 로그인하세요.</p>

               <div className="d-grid gap-3 mt-4">
                  <SocialLogin provider="google" />
                  <SocialLogin provider="kakao" />
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
