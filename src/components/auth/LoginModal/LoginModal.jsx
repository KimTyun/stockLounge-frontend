import { Modal, Button } from 'react-bootstrap';
import SocialLogin from '../SocialLogin';
import styles from './LoginModal.module.css';

const LoginModal = ({ show, onHide, onLogin }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body className={styles.modalBody}>
        <div className={styles.loginContainer}>
          <h2 className={styles.title}>StockRounge에 로그인</h2>
          
          <div className={styles.socialButtons}>
            <SocialLogin 
              provider="google" 
              onSuccess={onLogin}
              className={styles.googleBtn}
            />
            <SocialLogin 
              provider="kakao" 
              onSuccess={onLogin}
              className={styles.kakaoBtn}
            />
          </div>
          
          <p className={styles.terms}>
            로그인 시 서비스 약관 및 개인 정보 보호 정책에 동의하는 것으로 간주됩니다.
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
