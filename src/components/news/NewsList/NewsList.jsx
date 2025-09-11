import { Button, Card, Col, Row } from 'react-bootstrap'
import styles from '../../../styles/components/news/NewsList.module.css'
import he from 'he'
import DOMPurify from 'dompurify'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'

const NewsList = ({ newsData, type = 'crypto' }) => {
   return (
      <>
         {newsData.items.map((article) => (
            <Card key={article.originallink} className={`${styles.newsCard} mb-3`}>
               <Row className="no-gutters">
                  <Col>
                     <Card.Body className={styles.newsBody}>
                        <Row className={styles.newsBody}>
                           <Col md={9}>
                              <div className={styles.newsHeader}>
                                 <div className={styles.newsMeta}>
                                    <span className={styles.newsTime}>{dayjs(article.pubDate).locale('ko').format('YYYY년 MM월 DD일 HH:mm')}</span>
                                 </div>
                                 <h5
                                    className={styles.newsTitle}
                                    dangerouslySetInnerHTML={{
                                       __html: DOMPurify.sanitize(he.decode(article.title), {
                                          ALLOWED_TAGS: ['b', 'i'],
                                          ALLOWED_ATTR: [],
                                       }),
                                    }}
                                 />
                                 <p
                                    className={styles.newsDescription}
                                    dangerouslySetInnerHTML={{
                                       __html: DOMPurify.sanitize(he.decode(article.description), {
                                          ALLOWED_TAGS: ['b', 'i'],
                                          ALLOWED_ATTR: [],
                                       }),
                                    }}
                                 />
                              </div>
                           </Col>
                           <Col md={3} className={styles.button}>
                              <Button variant="outline-primary" size="sm" className={styles.readMoreBtn}>
                                 원문 보기
                              </Button>
                           </Col>
                        </Row>
                     </Card.Body>
                  </Col>
               </Row>
            </Card>
         ))}
      </>
   )
}

export default NewsList
