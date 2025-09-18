import React, { useEffect, useState } from "react"
import CandleChart from "../../components/chart/CandleChart"
import {
  Container,
  Row,
  Col,
  Nav,
  Tab,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap"
import PostList from "../../components/board/PostList"
import styles from "../../styles/pages/Board_fixed.module.css"

import { useDispatch, useSelector } from "react-redux"
import { getMarketAllThunk, getTickerAllThunk } from "../../features/coinSlice"

const Board = () => {
  const [activeCategory, setActiveCategory] = useState("free")
  const dispatch = useDispatch()
  const { coins, coinList } = useSelector((s) => s.coin)
  
  const [selectedCoin, setSelectedCoin] = useState({
    id: 'KRW-BTC',
    symbol: 'BTC',
    name: '비트코인',
    price: 0,
    change24h: 0,
    volume24h: 0,
    rank: 1,
  })

  const categories = [
    { key: "free", label: "자유토론" },
    { key: "bitcoin", label: "비트코인" },
    { key: "ethereum", label: "이더리움" },
    { key: "ripple", label: "리플" },
    { key: "nft", label: "NFT" },
    { key: "defi", label: "DeFi" },
    { key: "news", label: "뉴스" },
    { key: "analysis", label: "분석" },
  ]

  useEffect(() => {
    const fetchData = async () => {
      if (coins.length > 0 && coinList.length > 0) {
        return
      }

      let conlist = coinList
      let result = coins

      if (coinList.length === 0) {
        conlist = await dispatch(getMarketAllThunk()).unwrap()
      }
      if (coins.length === 0) {
        result = await dispatch(getTickerAllThunk(10)).unwrap()
      }

      if (result.length > 0 && conlist.length > 0) {
        const mapped = result.map((coin, index) => {
          const marketInfo = conlist.find((e) => e.market === coin.market)
          return {
            id: coin.market,
            symbol: coin.market.split('-')[1],
            name: marketInfo?.korean_name || coin.market.split('-')[1],
            price: coin.trade_price,
            change24h: coin.signed_change_rate,
            volume24h: coin.acc_trade_volume_24h,
            rank: index + 1,
          }
        })

        setSelectedCoin(mapped[0])
      }
    }

    fetchData().catch(() => {})
  }, [coins, coinList, dispatch])

  return (
    <div>
      {/* 섹션1: 코인 차트 영역 */}
      <section className={styles.chartSection}>
        <Container>
          <CandleChart coin={selectedCoin} />
        </Container>
      </section>
      <section className={styles.boardSection}>
        <Container>
          <div className={styles.boardHeader}>
            <h1 className={styles.boardTitle}>커뮤니티</h1>
            <p className={styles.boardDescription}>
              다양한 투자 정보와 의견을 나누는 공간입니다.
            </p>
          </div>

          <Tab.Container
            id='board-categories'
            activeKey={activeCategory}
            onSelect={(k) => setActiveCategory(k)}
          >
            <Nav variant='pills' className={styles.categoryTabs}>
              {categories.map((category) => (
                <Nav.Item key={category.key}>
                  <Nav.Link
                    eventKey={category.key}
                    className={styles.categoryTab}
                  >
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
