import { Button } from 'react-bootstrap'

const SocialLogin = ({ provider, onSuccess, className }) => {
   const handleLogin = () => {
      const apiBase = import.meta.env.VITE_API_URL || ''
      let authUrl = ''

      if (provider === 'google') {
         authUrl = `${apiBase}/auth/google/login`
      } else if (provider === 'kakao') {
         authUrl = `${apiBase}/auth/kakao`
      }

      if (authUrl && apiBase) {
         // Open OAuth in a popup and notify parent when done
         const w = 600
         const h = 700
         const left = window.screenX + (window.outerWidth - w) / 2
         const top = window.screenY + (window.outerHeight - h) / 2
         const popup = window.open(authUrl, 'oauth_popup', `width=${w},height=${h},left=${left},top=${top}`)

         if (!popup) {
            // fallback to full redirect
            window.location.href = authUrl
            return
         }

         const timer = setInterval(() => {
            if (popup.closed) {
               clearInterval(timer)
               // notify caller to re-check auth status
               if (onSuccess) onSuccess()
            }
         }, 500)

         return
      }

      // Fallback: simulate success
      console.log(`${provider} 로그인 시도 (로컬 시뮬레이트)`)
      if (onSuccess) onSuccess()
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
