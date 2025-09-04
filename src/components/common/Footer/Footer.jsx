import { Container, Row, Col } from 'react-bootstrap';
import styles from '../../../styles/components/common/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row>
          <Col md={6}>
            <div className={styles.brand}>
              <h5>StockRounge</h5>
              <p>코인 커뮤니티 플랫폼</p>
            </div>
          </Col>
          <Col md={6} className="text-end">
            <div className={styles.links}>
              <a href="/terms">이용약관</a>
              <a href="/privacy">개인정보처리방침</a>
              <a href="/contact">문의하기</a>
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className="text-center">
            <p className={styles.copyright}>
              &copy; 2025 StockRounge. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
