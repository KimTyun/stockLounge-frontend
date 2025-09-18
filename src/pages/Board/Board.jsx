import React, { useState } from 'react'
import CandleChart from '../../components/chart/CandleChart'
import { Container, Nav, Tab } from 'react-bootstrap'
import PostList from '../../components/board/PostList'
import styles from '../../styles/pages/Board_fixed.module.css'

const Board = () => {
   const [activeCategory, setActiveCategory] = useState('free')

   const categories = [
      { key: 'free', label: '자유토론' },
      { key: 'bitcoin', label: '비트코인' },
      { key: 'ethereum', label: '이더리움' },
      { key: 'ripple', label: '리플' },
      { key: 'nft', label: 'NFT' },
      { key: 'defi', label: 'DeFi' },
      { key: 'news', label: '뉴스' },
      { key: 'analysis', label: '분석' },
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
                     <Tab.Pane eventKey={activeCategory}>
                        <PostList category={activeCategory} />
                     </Tab.Pane>
                  </Tab.Content>
               </Tab.Container>
            </Container>
         </section>
      </div>
   )
}

export default Board
