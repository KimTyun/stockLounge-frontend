import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import CandleChart from '../../components/chart/CandleChart';
import PostCard from '../../components/board/PostCard';
import styles from './Home.module.css';

const Home = () => {
  const popularPosts = [
    {
      id: 1,
      title: "비트코인 가격 분석 - 상승 전망",
      category: "분석게시판",
      author: "크립토분석가",
      date: "2025-09-04",
      likes: 42,
      comments: 15,
      views: 328,
      preview: "최근 비트코인의 기술적 분석 결과 상승 모멘텀이 강화되고 있습니다. 주요 저항선 돌파 후..."
    },
    {
      id: 2,
      title: "이더리움 2.0 업데이트 소식",
      category: "자유게시판",
      author: "이더리움팬",
      date: "2025-09-03",
      likes: 28,
      comments: 8,
      views: 195,
      preview: "이더리움 2.0의 최신 업데이트 내용을 정리해보았습니다. 스테이킹 보상률이..."
    },
    {
      id: 3,
      title: "알트코인 시즌 도래할까?",
      category: "토론게시판",
      author: "알트코인러버",
      date: "2025-09-03",
      likes: 35,
      comments: 23,
      views: 267,
      preview: "비트코인 도미넌스가 감소하면서 알트코인들의 상승이 기대됩니다..."
    }
  ];

  const newsData = {
    crypto: [
      "비트코인, 새로운 최고점 경신 임박",
      "이더리움 ETF 승인 소식으로 급등",
      "리플 SEC 소송 최종 합의 소식",
      "솔라나 생태계 급속 성장세",
      "도지코인 일론 머스크 언급으로 상승"
    ],
    economy: [
      "미 연준 기준금리 동결 결정",
      "인플레이션 지표 예상치 하회",
      "달러 강세 지속, 신흥국 통화 약세",
      "국제유가 상승세로 전환",
      "금값 사상 최고치 경신"
    ]
  };

  return (
    <div className={styles.home}>
      {/* 섹션1: 코인 차트 영역 */}
      <section className={styles.chartSection}>
        <Container>
          <CandleChart />
        </Container>
      </section>

      {/* 섹션2: 인기 게시글 영역 */}
      <section className={styles.popularPostsSection}>
        <Container>
          <div className={styles.sectionHeader}>
            <h2>오늘의 인기글</h2>
          </div>
          <Row>
            {popularPosts.map(post => (
              <Col md={4} key={post.id} className="mb-3">
                <PostCard post={post} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* 섹션3: 뉴스 영역 */}
      <section className={styles.newsSection}>
        <Container>
          <Row>
            <Col md={6}>
              <Card className={styles.newsCard}>
                <Card.Header>
                  <h4>코인 뉴스</h4>
                </Card.Header>
                <Card.Body>
                  <ul className={styles.newsList}>
                    {newsData.crypto.map((news, index) => (
                      <li key={index} className={styles.newsItem}>
                        <a href="#" className={styles.newsLink}>
                          {news}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className={styles.newsCard}>
                <Card.Header>
                  <h4>경제 뉴스</h4>
                </Card.Header>
                <Card.Body>
                  <ul className={styles.newsList}>
                    {newsData.economy.map((news, index) => (
                      <li key={index} className={styles.newsItem}>
                        <a href="#" className={styles.newsLink}>
                          {news}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
