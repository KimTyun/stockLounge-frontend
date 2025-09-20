import { Button } from 'react-bootstrap'
// 아이콘 라이브러리는 Font Awesome을 사용하도록 수정합니다. (lucide-react 대체)
import { FaGoogle, FaComment } from 'react-icons/fa'

const SocialLogin = ({ provider, onSuccess, className }) => {
   const handleLogin = () => {
      // 1. .env 파일에 정의한 VITE_API_URL을 가져옵니다. (http://localhost:8000)
      const apiBase = import.meta.env.VITE_API_URL
      let authUrl = ''

      if (!apiBase) {
         console.error('VITE_API_URL 환경 변수가 설정되지 않았습니다.')
         alert('로그인 설정에 오류가 발생했습니다. 관리자에게 문의하세요.')
         return
      }

      if (provider === 'google') {

         // 2. '/api' 없이 '/auth/google' 경로를 바로 붙입니다.
         authUrl = `${apiBase}/auth/google`

      } else if (provider === 'kakao') {
         authUrl = `${apiBase}/auth/kakao`
      }

      if (authUrl) {
         const popup = window.open(authUrl, 'oauth_popup', 'width=600,height=700')
         const timer = setInterval(() => {
            if (popup.closed) {
               clearInterval(timer)
               if (onSuccess) onSuccess()
            }
         }, 500)
      }
   }

   // 버튼 텍스트, 스타일, 아이콘을 provider에 따라 동적으로 설정합니다.
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
