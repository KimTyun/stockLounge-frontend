import { Button } from 'react-bootstrap'
import { FaGoogle, FaComment } from 'react-icons/fa'

const SocialLogin = ({ provider }) => {
   const handleLogin = () => {
      const apiBase = import.meta.env.VITE_API_URL
      let authUrl = ''

      if (!apiBase) {
         console.error('VITE_API_URL 환경 변수가 .env에 설정되지 않았습니다.')
         alert('로그인 설정에 오류가 발생했습니다. 관리자에게 문의하세요.')
         return
      }

      if (provider === 'google') {
         authUrl = `${apiBase}/auth/google`
      } else if (provider === 'kakao') {
         authUrl = `${apiBase}/auth/kakao`
      }

      if (authUrl) {
         // 🔽 팝업 대신 현재 창에서 리다이렉트
         window.location.href = authUrl
      }
   }

   const config = {
      google: {
         text: '구글로 로그인',
         style: { backgroundColor: '#4285F4', color: 'white', border: 'none' },
         icon: <FaGoogle />,
      },
      kakao: {
         text: '카카오로 로그인',
         style: { backgroundColor: '#FEE500', color: '#191919', border: 'none' },
         icon: <FaComment />,
      },
   }

   const { text, style, icon } = config[provider] || {}

   return (
      <Button style={style} onClick={handleLogin} size="lg" className="w-100 d-flex align-items-center justify-content-center">
         <span className="me-2">{icon}</span> {text}
      </Button>
   )
}

export default SocialLogin
