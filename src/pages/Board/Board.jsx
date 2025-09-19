<<<<<<<<< Temporary merge branch 1
import React, { useEffect, useState } from 'react'
import CandleChart from '../../components/chart/CandleChart'
import { Container, Row, Col, Nav, Tab, Dropdown, ButtonGroup } from 'react-bootstrap'
import PostList from '../../components/board/PostList'
import styles from '../../styles/pages/Board_fixed.module.css'

import { useDispatch, useSelector } from 'react-redux'
import { getMarketAllThunk, getTickerAllThunk } from '../../features/coinSlice'

const Board = () => {
   const dispatch = useDispatch()
   const { coins, coinList } = useSelector((s) => s.coin)

   const [selectedCoin, setSelectedCoin] = useState(null)
   const [period, setPeriod] = useState('days')
   const [coinCategories, setCoinCategories] = useState([])
   const [activeCategory, setActiveCategory] = useState('free')

   useEffect(() => {
      const fetchData = async () => {
         if (coins.length === 0 || coinList.length === 0) {
            const conlist = await dispatch(getMarketAllThunk()).unwrap()
            const result = await dispatch(getTickerAllThunk(30)).unwrap()

            const mapped = result.map((coin, index) => ({
               id: coin.market,
               symbol: coin.market.split('-')[1],
               name: conlist.find((e) => e.market === coin.market)?.korean_name ?? '',
               price: coin.trade_price,
               change24h: coin.signed_change_rate,
               volume24h: coin.acc_trade_volume_24h,
               rank: index + 1,
            }))

            setSelectedCoin(mapped[0])

            const dynamicCategories = mapped.map((coin, index) => ({
               key: (index + 1).toString(),
               label: coin.name,
               coinData: coin,
            }))
            setCoinCategories(dynamicCategories)
         }
      }

      fetchData()
   }, [coins, coinList, dispatch])

   if (!selectedCoin) return <div>Loading...</div>

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
         <section>
            <Row>
               <Col>
                  <div className={styles.userHeader}>
                     <h3>{selectedCoin.name}</h3>
                     <Nav variant="tabs">
                        <Nav.Item>
                           <Nav.Link active={period === 'days'} onClick={() => setPeriod('days')}>
                              일간
                           </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                           <Nav.Link active={period === 'weeks'} onClick={() => setPeriod('weeks')}>
                              주간
                           </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                           <Nav.Link active={period === 'months'} onClick={() => setPeriod('months')}>
                              월간
                           </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                           <Nav.Link active={period === 'years'} onClick={() => setPeriod('years')}>
                              연간
                           </Nav.Link>
                        </Nav.Item>
                     </Nav>
                  </div>
               </Col>
               {selectedCoin && <CandleChart coin={selectedCoin} period={period} />}
            </Row>
            {/* 드롭다운으로 코인 선택 */}
            <Dropdown className="ms-2">
               <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                  코인 선택
               </Dropdown.Toggle>

               <Dropdown.Menu>
                  {coinCategories.map((category) => (
                     <Dropdown.Item key={category.key} onClick={() => setSelectedCoin(category.coinData)}>
                        {category.label}
                     </Dropdown.Item>
                  ))}
               </Dropdown.Menu>
            </Dropdown>
         </section>

         <section className={styles.boardSection}>
            <Container>
               <div className={styles.boardHeader}>
                  <h1 className={styles.boardTitle}>커뮤니티</h1>
                  <p className={styles.boardDescription}>다양한 투자 정보와 의견을 나누는 공간입니다.</p>
               </div>

               <Tab.Container activeKey={activeCategory} onSelect={(k) => setActiveCategory(k)}>
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

=========
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
