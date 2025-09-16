import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { ROUTES } from '../../config/routes'

// 간단한 스타일 객체. 실제 프로젝트에서는 CSS 파일이나 CSS-in-JS 라이브러리를 사용하세요.
const styles = {
   container: {
      maxWidth: '420px',
      margin: '60px auto',
      padding: '30px',
      border: '1px solid var(--border-color)',
      borderRadius: '8px',
      background: 'var(--card-bg)',
   },
   formGroup: {
      marginBottom: '20px',
   },
   label: {
      display: 'block',
      marginBottom: '8px',
      color: 'var(--text-secondary)',
   },
   input: {
      width: '100%',
      padding: '12px',
      background: 'var(--dark-bg)',
      border: '1px solid var(--border-color)',
      borderRadius: '4px',
      color: 'var(--text-primary)',
   },
   button: {
      width: '100%',
      padding: '12px',
      background: 'var(--primary-color)',
      color: '#000',
      border: 'none',
      borderRadius: '4px',
      fontWeight: 'bold',
      cursor: 'pointer',
   },
   error: {
      color: 'var(--danger-color, #e57373)',
      marginBottom: '15px',
      textAlign: 'center',
   },
   link: {
      marginTop: '20px',
      textAlign: 'center',
      color: 'var(--text-secondary)',
   },
}

const LoginPage = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState('')
   const { login } = useAuth()
   const navigate = useNavigate()

   const handleSubmit = async (e) => {
      e.preventDefault()
      setError('')
      try {
         await login(email, password)
         // 로그인 성공 시 홈으로 이동
         navigate(ROUTES.HOME_MAIN)
      } catch (err) {
         // AuthContext에서 전달된 에러 메시지를 상태에 저장하여 사용자에게 보여줍니다.
         setError(err.message || '이메일 또는 비밀번호가 올바르지 않습니다.')
      }
   }

   return (
      <div style={styles.container}>
         <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>로그인</h2>
         <form onSubmit={handleSubmit}>
            {error && <p style={styles.error}>{error}</p>}
            <div style={styles.formGroup}>
               <label htmlFor="email" style={styles.label}>
                  이메일
               </label>
               <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
            </div>
            <div style={styles.formGroup}>
               <label htmlFor="password" style={styles.label}>
                  비밀번호
               </label>
               <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
            </div>
            <button type="submit" style={styles.button}>
               로그인
            </button>
         </form>
         <div style={styles.link}>
            계정이 없으신가요?{' '}
            <Link to={ROUTES.REGISTER} style={{ color: 'var(--primary-color)' }}>
               회원가입
            </Link>
         </div>
      </div>
   )
}

export default LoginPage
