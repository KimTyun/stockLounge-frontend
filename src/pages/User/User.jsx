import { useState } from 'react';
import { Container, Row, Col, Card, Nav, Button, Image, Badge, Table } from 'react-bootstrap';
import styles from './User.module.css';

const User = () => {
  const [activeTab, setActiveTab] = useState('info');

  // 임시 사용자 데이터
  const userData = {
    profileImage: '/api/placeholder/150/150',
    nickname: '크립토매니아',
    name: '홍길동',
    email: 'crypto@example.com',
    joinDate: '2024-03-15',
    totalPoints: 15750,
    currentPoints: 8250,
    phoneNumber: '010-1234-5678',
    address: '서울시 강남구 테헤란로 123',
    detailAddress: '456호',
    secondaryPassword: '설정됨',
    connectedAccounts: ['Google', 'Kakao']
  };

  // 포인트 내역 데이터
  const pointHistory = [
    { id: 1, type: '획득', action: '게시글 작성', points: '+10', date: '2025-09-04 14:30' },
    { id: 2, type: '획득', action: '댓글 추천받음', points: '+1', date: '2025-09-04 13:15' },
    { id: 3, type: '사용', action: '스타벅스 기프티콘 교환', points: '-5000', date: '2025-09-03 16:20' },
    { id: 4, type: '획득', action: '게시글 추천받음', points: '+1', date: '2025-09-03 12:45' },
    { id: 5, type: '획득', action: '댓글 작성', points: '+5', date: '2025-09-03 11:30' },
    { id: 6, type: '사용', action: '코인 교환', points: '-1000', date: '2025-09-02 19:15' },
    { id: 7, type: '획득', action: '게시글 작성', points: '+10', date: '2025-09-02 15:20' },
    { id: 8, type: '획득', action: '댓글 추천받음', points: '+1', date: '2025-09-02 10:10' }
  ];

  // 교환 가능한 상품 데이터
  const exchangeItems = [
    {
      id: 1,
      type: 'coin',
      name: 'StockRounge 코인',
      description: '1000포인트 = 1코인',
      requiredPoints: 1000,
      image: '/api/placeholder/100/100',
      category: 'coin'
    },
    {
      id: 2,
      type: 'gift',
      name: '스타벅스 아메리카노',
      description: '스타벅스 아메리카노 기프티콘',
      requiredPoints: 5000,
      image: '/api/placeholder/100/100',
      category: 'gift'
    },
    {
      id: 3,
      type: 'gift',
      name: '치킨 기프티콘',
      description: 'BBQ 황금올리브 기프티콘',
      requiredPoints: 20000,
      image: '/api/placeholder/100/100',
      category: 'gift'
    },
    {
      id: 4,
      type: 'gift',
      name: '문화상품권 1만원',
      description: '온라인 문화상품권',
      requiredPoints: 12000,
      image: '/api/placeholder/100/100',
      category: 'gift'
    },
    {
      id: 5,
      type: 'gift',
      name: 'CGV 영화관람권',
      description: 'CGV 영화관람권',
      requiredPoints: 15000,
      image: '/api/placeholder/100/100',
      category: 'gift'
    },
    {
      id: 6,
      type: 'gift',
      name: '아마존 기프트카드',
      description: '아마존 10달러 기프트카드',
      requiredPoints: 18000,
      image: '/api/placeholder/100/100',
      category: 'gift'
    }
  ];

  const renderInfoTab = () => (
    <Card className={styles.contentCard}>
      <Card.Body className={styles.profileSection}>
        <Row>
          <Col md={4} className="text-center">
            <div className={styles.profileImageSection}>
              <Image 
                src={userData.profileImage} 
                roundedCircle 
                className={styles.profileImage}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSI3NSIgY3k9Ijc1IiByPSI3NSIgZmlsbD0iI2Y4ZjlmYSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UHJvZmlsZTwvdGV4dD4KPC9zdmc+';
                }}
              />
              <div className={styles.profileActions}>
                <Button variant="outline-primary" size="sm" className={styles.changePhotoBtn}>
                  사진 변경
                </Button>
              </div>
            </div>
          </Col>
          <Col md={8}>
            <div className={styles.profileInfo}>
              <h3 className={styles.nickname}>{userData.nickname}</h3>
              <div className={styles.userDetails}>
                <div className={styles.detailItem}>
                  <strong>이름:</strong> {userData.name}
                </div>
                <div className={styles.detailItem}>
                  <strong>이메일:</strong> {userData.email}
                </div>
                <div className={styles.detailItem}>
                  <strong>가입일:</strong> {userData.joinDate}
                </div>
                <div className={styles.detailItem}>
                  <strong>연동된 계정:</strong>
                  {userData.connectedAccounts.map(account => (
                    <Badge key={account} variant="secondary" className={styles.accountBadge}>
                      {account}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Col>
        </Row>
        
        <hr />
        
        <Row>
          <Col md={6}>
            <Card className={styles.pointCard}>
              <Card.Body className="text-center">
                <h5>누적 획득 포인트</h5>
                <h2 className={styles.totalPoints}>{userData.totalPoints.toLocaleString()}P</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className={styles.pointCard}>
              <Card.Body className="text-center">
                <h5>현재 보유 포인트</h5>
                <h2 className={styles.currentPoints}>{userData.currentPoints.toLocaleString()}P</h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );

  const renderEditTab = () => (
    <Card className={styles.contentCard}>
      <Card.Body>
        <h4>개인정보 수정</h4>
        <p className={styles.editNote}>개인정보 수정 기능은 추후 구현 예정입니다.</p>
        <div className={styles.editForm}>
          <div className={styles.formGroup}>
            <label>닉네임:</label>
            <span>{userData.nickname}</span>
          </div>
          <div className={styles.formGroup}>
            <label>전화번호:</label>
            <span>{userData.phoneNumber}</span>
          </div>
          <div className={styles.formGroup}>
            <label>주소:</label>
            <span>{userData.address}</span>
          </div>
          <div className={styles.formGroup}>
            <label>상세주소:</label>
            <span>{userData.detailAddress}</span>
          </div>
          <div className={styles.formGroup}>
            <label>2차 비밀번호:</label>
            <span>{userData.secondaryPassword}</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  const renderExchangeTab = () => (
    <div>
      {/* 코인 교환 배너 */}
      <Card className={styles.coinExchangeBanner}>
        <Card.Body>
          <Row className="align-items-center">
            <Col md={8}>
              <h3>🪙 StockRounge 코인으로 교환하세요!</h3>
              <p>1000포인트 = 1코인으로 교환 가능합니다.</p>
              <p>현재 보유 포인트: <strong>{userData.currentPoints.toLocaleString()}P</strong></p>
            </Col>
            <Col md={4} className="text-end">
              <Button 
                variant="primary" 
                size="lg"
                disabled={userData.currentPoints < 1000}
                className={styles.exchangeBtn}
              >
                코인으로 교환
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* 상품 교환 목록 */}
      <h4 className={styles.sectionTitle}>상품 교환</h4>
      <Row>
        {exchangeItems.filter(item => item.category === 'gift').map(item => (
          <Col md={4} key={item.id} className="mb-4">
            <Card className={styles.exchangeCard}>
              <div className={styles.exchangeImage}>
                <img 
                  src={item.image} 
                  alt={item.name}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y4ZjlmYSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+R2lmdDwvdGV4dD4KPC9zdmc+';
                  }}
                />
              </div>
              <Card.Body>
                <h6 className={styles.itemName}>{item.name}</h6>
                <p className={styles.itemDescription}>{item.description}</p>
                <div className={styles.pointsRequired}>
                  <strong>{item.requiredPoints.toLocaleString()}P 필요</strong>
                </div>
                <Button 
                  variant="primary" 
                  size="sm" 
                  disabled={userData.currentPoints < item.requiredPoints}
                  className={styles.exchangeItemBtn}
                  block
                >
                  교환하기
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );

  const renderHistoryTab = () => (
    <Card className={styles.contentCard}>
      <Card.Header>
        <h4>포인트 내역</h4>
      </Card.Header>
      <Card.Body className={styles.historyBody}>
        <Table responsive className={styles.historyTable}>
          <thead>
            <tr>
              <th>구분</th>
              <th>내용</th>
              <th>포인트</th>
              <th>일시</th>
            </tr>
          </thead>
          <tbody>
            {pointHistory.map(history => (
              <tr key={history.id}>
                <td>
                  <Badge 
                    variant={history.type === '획득' ? 'success' : 'danger'}
                    className={styles.typeBadge}
                  >
                    {history.type}
                  </Badge>
                </td>
                <td>{history.action}</td>
                <td className={history.type === '획득' ? styles.gainPoints : styles.lossPoints}>
                  {history.points}
                </td>
                <td className={styles.historyDate}>{history.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );

  return (
    <div className={styles.user}>
      <Container>
        <Row>
          <Col>
            <div className={styles.userHeader}>
              <h2>내 정보</h2>
              <Nav variant="tabs" className={styles.userTabs}>
                <Nav.Item>
                  <Nav.Link 
                    active={activeTab === 'info'} 
                    onClick={() => setActiveTab('info')}
                    className={styles.tabLink}
                  >
                    내 정보 홈
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    active={activeTab === 'edit'} 
                    onClick={() => setActiveTab('edit')}
                    className={styles.tabLink}
                  >
                    내 정보 수정
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    active={activeTab === 'exchange'} 
                    onClick={() => setActiveTab('exchange')}
                    className={styles.tabLink}
                  >
                    포인트 교환
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    active={activeTab === 'history'} 
                    onClick={() => setActiveTab('history')}
                    className={styles.tabLink}
                  >
                    포인트 내역
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className={styles.userContent}>
              {activeTab === 'info' && renderInfoTab()}
              {activeTab === 'edit' && renderEditTab()}
              {activeTab === 'exchange' && renderExchangeTab()}
              {activeTab === 'history' && renderHistoryTab()}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default User;
