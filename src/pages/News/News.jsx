import { useEffect, useMemo, useState } from 'react'
import { Container, Row, Col, Card, Nav, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../../styles/pages/News.module.css'
import { getNewsThunk } from '../../features/newsSlice'
import NewsList from '../../components/news/NewsList/NewsList'

const News = () => {
   const dispatch = useDispatch()
   const { news, loading, error } = useSelector((s) => s.news)
   const [activeTab, setActiveTab] = useState('crypto')
   const [page, setPage] = useState({ crypto: 11, economy: 11 })

   const query = useMemo(
      () => ({
         crypto: '암호화폐',
         economy: '경제',
      }),
      []
   )

   useEffect(() => {
      dispatch(getNewsThunk({ length: 10, query: query[activeTab], start: 1, lastLink: news?.query?.[activeTab]?.lastLink }))
   }, [dispatch, activeTab, query])

   const handlePage = () => {
      dispatch(getNewsThunk({ length: 10, query: query[activeTab], start: page[activeTab], lastLink: news?.query?.[activeTab]?.lastLink }))
      setPage((prev) => ({ ...prev, [activeTab]: prev[activeTab] + 10 }))
   }

   return (
      <div className={styles.news}>
         <Container>
            <Row>
               <Col>
                  <div className={styles.newsHeader}>
                     <h2>뉴스</h2>
                     <Nav variant="tabs" className={styles.newsTabs}>
                        <Nav.Item>
                           <Nav.Link active={activeTab === 'crypto'} onClick={() => setActiveTab('crypto')} className={styles.tabLink}>
                              코인 뉴스
                           </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                           <Nav.Link active={activeTab === 'economy'} onClick={() => setActiveTab('economy')} className={styles.tabLink}>
                              경제 뉴스
                           </Nav.Link>
                        </Nav.Item>
                     </Nav>
                  </div>
               </Col>
            </Row>

            {error ? (
               <p>{error}</p>
            ) : (
               <Row>
                  <Col>
                     <div className={styles.newsContent}>{loading ? <p>뉴스 데이터를 불러오는 중입니다.</p> : news[query[activeTab]] && <NewsList newsData={news[query[activeTab]]}></NewsList>}</div>
                  </Col>
               </Row>
            )}
            <div className={styles.bottomButtons}>
               <Button variant="primary" size="lg" className={styles.loadMoreBtn} onClick={handlePage}>
                  더보기
               </Button>
               <Button variant="secondary" size="sm" className={styles.scrollTopBtn} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  맨 위로
               </Button>
            </div>
         </Container>
      </div>
   )
}

export default News
