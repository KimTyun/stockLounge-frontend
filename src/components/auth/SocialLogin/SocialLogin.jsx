import { Button } from 'react-bootstrap'

const SocialLogin = ({ provider, onSuccess, className }) => {
   const handleLogin = () => {
      const apiBase = import.meta.env.VITE_API_URI
      // VITE_API_URL || ''
      let authUrl = ''

      if (provider === 'google') {
         authUrl = `${apiBase}/api/auth/google`
      } else if (provider === 'kakao') {
         authUrl = `${apiBase}/api/auth/kakao`
      }

      if (!apiBase) {
         console.error('VITE_API_BASE_URI 환경 변수가 설정되지 않았습니다.')
         alert('로그인 설정에 오류가 발생했습니다. 관리자에게 문의하세요.')
         return
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

   const getButtonText = () => {
      switch (provider) {
         case 'google':
            return '구글로 로그인'
         case 'kakao':
            return '카카오로 로그인'
         default:
            return '로그인'
      }
   }

   const getButtonStyle = () => {
      switch (provider) {
         case 'google':
            return {
               backgroundColor: '#4285F4',
               borderColor: '#4285F4',
               color: 'white',
            }
         case 'kakao':
            return {
               backgroundColor: '#FAD900',
               borderColor: '#FAD900',
               color: '#333',
            }
         default:
            return {}
      }
   }

   return (
      <Button className={className} style={getButtonStyle()} onClick={handleLogin} size="lg">
         {getButtonText()}
      </Button>
   )
}

export default SocialLogin
