import { useContext } from 'react'
import { AuthContext } from '../components/common/Header/AuthContext'

// 다른 컴포넌트에서 쉽게 AuthContext를 사용할 수 있도록 커스텀 훅을 만듭니다.
export const useAuth = () => {
   return useContext(AuthContext)
}

