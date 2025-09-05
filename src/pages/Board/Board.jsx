import React, { useState } from 'react'
import CandleChart from '../../components/chart/CandleChart'
import { Container, Nav, Tab } from 'react-bootstrap'
import PostList from '../../components/board/PostList'
import styles from '../../styles/pages/Board_fixed.module.css'

const Board = () => {
   const [activeCategory, setActiveCategory] = useState('all')

   const categories = [
      { key: 'all', label: '전체' },
      { key: 'free', label: '자유게시판' },
      { key: 'crypto', label: '코인분석' },
      { key: 'news', label: '뉴스' },
      { key: 'qna', label: '질문답변' },
   ]

   return (
      <div>
         {/* 섹션1: 코인 차트 영역 */}
         <section className={styles.chartSection}>
            <Container>
               <CandleChart coin={{ name: 'BTC' }} />
            </Container>
         </section>
         <section className={styles.boardSection}>
            <Container>
               <div className={styles.boardHeader}>
                  <h1 className={styles.boardTitle}>커뮤니티</h1>
                  <p className={styles.boardDescription}>다양한 투자 정보와 의견을 나누는 공간입니다.</p>
               </div>

               <Tab.Container id="board-categories" activeKey={activeCategory} onSelect={(k) => setActiveCategory(k)}>
                  <Nav variant="pills" className={styles.categoryTabs}>
                     {categories.map((category) => (
                        <Nav.Item key={category.key}>
                           <Nav.Link eventKey={category.key} className={styles.categoryTab}>
                              {category.label}
                           </Nav.Link>
                        </Nav.Item>
                     ))}
                  </Nav>

                  <Tab.Content className={styles.tabContent}>
                     {categories.map((category) => (
                        <Tab.Pane key={category.key} eventKey={category.key}>
                           <PostList category={category.key} />
                        </Tab.Pane>
                     ))}
                  </Tab.Content>
               </Tab.Container>
            </Container>
         </section>
      </div>
   )
}

export default Board
