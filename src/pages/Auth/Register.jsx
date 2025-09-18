import { Container, Card } from 'react-bootstrap'
import styles from '../../styles/components/auth/LoginPage.module.css'

const RegisterPage = () => {
   return (
      <Container className={styles.page} style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
         <Card className={styles.card}>
            <Card.Body className={styles.body}>
               <h2 className="mb-3 text-center">회원가입</h2>
               <p className="text-center text-muted">간편 회원가입은 소셜 로그인을 이용하세요.</p>
            </Card.Body>
         </Card>
      </Container>
   )
}

export default RegisterPage
