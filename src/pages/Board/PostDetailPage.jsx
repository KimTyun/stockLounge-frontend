import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Nav, Dropdown } from 'react-bootstrap'
import CandleChart from '../../components/chart/CandleChart'
import PostDetail from '../../components/board/PostDetail/PostDetail'
import styles from '../../styles/pages/Board_fixed.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getMarketAllThunk, getTickerAllThunk } from '../../features/coinSlice'

const PostDetailPage = () => {
   const { id } = useParams()
   const navigate = useNavigate()
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
   const [period, setPeriod] = useState('days')
   const [coinCategories, setCoinCategories] = useState([])

   useEffect(() => {
      const fetchData = async () => {
         // 이미 데이터가 있고 카테고리도 설정되어 있으면 건너뛰기
         if (coins.length > 0 && coinList.length > 0 && coinCategories.length > 0) {
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

            const dynamicCategories = mapped.map((coin, index) => ({
               key: (index + 1).toString(),
               label: coin.name,
               coinData: coin,
            }))
            setCoinCategories(dynamicCategories)
         }
      }

      fetchData()
   }, [coins, coinList, dispatch, coinCategories.length])

   const handleBackToBoard = () => {
      navigate('/board')
   }

   const handleEdit = (postId) => {
      navigate(`/board/${postId}/edit`)
   }

   return (
      <div>
         {/* 차트 섹션 */}
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
                        {category.label || category.coinData?.symbol || '코인'}
                     </Dropdown.Item>
                  ))}
               </Dropdown.Menu>
            </Dropdown>
         </section>

         {/* 게시글 상세 섹션 */}
         <section className={styles.boardSection}>
            <Container>
               <PostDetail boardId={parseInt(id)} onBackToList={handleBackToBoard} onEdit={handleEdit} />
            </Container>
         </section>
      </div>
   )
}

export default PostDetailPage
