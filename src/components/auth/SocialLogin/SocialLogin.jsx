import { Button } from 'react-bootstrap';

const SocialLogin = ({ provider, onSuccess, className }) => {
  const handleLogin = () => {
    // 소셜 로그인 로직 구현 예정
    console.log(`${provider} 로그인 시도`);
    
    // 임시로 성공 처리
    if (onSuccess) {
      onSuccess();
    }
  };

  const getButtonText = () => {
    switch (provider) {
      case 'google':
        return '구글로 로그인';
      case 'kakao':
        return '카카오로 로그인';
      default:
        return '로그인';
    }
  };

  const getButtonStyle = () => {
    switch (provider) {
      case 'google':
        return {
          backgroundColor: '#4285F4',
          borderColor: '#4285F4',
          color: 'white'
        };
      case 'kakao':
        return {
          backgroundColor: '#FAD900',
          borderColor: '#FAD900',
          color: '#333'
        };
      default:
        return {};
    }
  };

  return (
    <Button
      className={className}
      style={getButtonStyle()}
      onClick={handleLogin}
      size="lg"
      block
    >
      {getButtonText()}
    </Button>
  );
};

export default SocialLogin;
