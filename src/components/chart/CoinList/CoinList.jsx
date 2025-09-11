import React, { useState, useEffect } from 'react'
import { Card, Table, Badge, Form, InputGroup, Dropdown } from 'react-bootstrap'
import styles from '../../../styles/components/chart/CoinList.module.css'
import { useSelector } from 'react-redux'

const CoinList = ({ onCoinSelect, selectedCoin }) => {
   const { coinList, coins, loading, error } = useSelector((s) => s.coin)
   const [filteredCoins, setFilteredCoins] = useState([])
   const [sortBy, setSortBy] = useState('marketCap')
   const [sortOrder, setSortOrder] = useState('desc')

   useEffect(() => {
      const filterAndSortCoins = () => {
         if (coinList.length === 0) return

         let filtered = coins
            .map((coin, index) => {
               const coinInfo = coinList.find((e) => e.pair === coin.market)
               return {
                  id: coin.market,
                  symbol: coin.market.split('-')[1],
                  name: coinInfo ? coinInfo.name : 'Unknown',
                  price: coin.trade_price,
                  change24h: coin.signed_change_rate,
                  volume24h: coin.acc_trade_volume_24h,
                  rank: index + 1,
               }
            })
            .reverse()

         filtered.sort((a, b) => {
            let aValue, bValue

            switch (sortBy) {
               case 'name':
                  aValue = a.name.toLowerCase()
                  bValue = b.name.toLowerCase()
                  break
               case 'price':
                  aValue = a.price
                  bValue = b.price
                  break
               case 'change24h':
                  aValue = a.change24h
                  bValue = b.change24h
                  break
               case 'marketCap':
                  aValue = a.marketCap
                  bValue = b.marketCap
                  break
               case 'volume24h':
                  aValue = a.volume24h
                  bValue = b.volume24h
                  break
               default:
                  aValue = a.rank
                  bValue = b.rank
            }

            if (sortOrder === 'asc') {
               return aValue > bValue ? 1 : -1
            } else {
               return aValue < bValue ? 1 : -1
            }
         })

         setFilteredCoins(filtered)
      }
      filterAndSortCoins()
   }, [coins, sortBy, sortOrder, coinList])

   const handleSort = (field) => {
      if (sortBy === field) {
         setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
      } else {
         setSortBy(field)
         setSortOrder('desc')
      }
   }

   const formatVolume = (volume, price) => {
      const volumePrice = Number(volume) * Number(price)
      if (volumePrice >= 1e9) {
         return `${(volumePrice / 1e9).toFixed(2)}B`
      } else if (volumePrice >= 1e6) {
         return `${(volumePrice / 1e6).toFixed(2)}M`
      } else {
         return `${volumePrice.toLocaleString()}`
      }
   }

   const getSortIcon = (field) => {
      if (sortBy !== field) return 'fas fa-sort'
      return sortOrder === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down'
   }

   if (loading) {
      return (
         <Card className={styles.coinList}>
            <Card.Body>
               <div className={styles.loading}>
                  <div className="spinner-border text-primary" role="status">
                     <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">코인 데이터를 불러오는 중...</p>
               </div>
            </Card.Body>
         </Card>
      )
   }

   if (error) {
      return (
         <Card className={styles.coinList}>
            <Card.Body>
               <div className={styles.loading}>
                  <div className="spinner-border text-primary" role="status">
                     <span className="visually-hidden">fail</span>
                  </div>
                  <p className="mt-2">코인 데이터를 불러오지 못하였습니다.</p>
               </div>
            </Card.Body>
         </Card>
      )
   }

   return (
      <Card className={styles.coinList}>
         <Card.Header className={styles.header}>
            <h5>디지털 자산</h5>
            <div className={styles.controls}>
               <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" size="sm">
                     <i className="fas fa-filter me-2"></i>
                     필터
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                     <Dropdown.Item onClick={() => handleSort('rank')}>순위순</Dropdown.Item>
                     <Dropdown.Item onClick={() => handleSort('marketCap')}>시가총액순</Dropdown.Item>
                     <Dropdown.Item onClick={() => handleSort('volume24h')}>거래량순</Dropdown.Item>
                     <Dropdown.Item onClick={() => handleSort('change24h')}>변동률순</Dropdown.Item>
                  </Dropdown.Menu>
               </Dropdown>
            </div>
         </Card.Header>
         <Card.Body className="p-0">
            <div className={styles.tableContainer}>
               <Table responsive hover className={styles.table}>
                  <thead>
                     <tr>
                        <th className={styles.sortableHeader} onClick={() => handleSort('rank')}>
                           #<i className={`${getSortIcon('rank')} ms-1`}></i>
                        </th>
                        <th className={styles.sortableHeader} onClick={() => handleSort('name')}>
                           코인
                           <i className={`${getSortIcon('name')} ms-1`}></i>
                        </th>
                        <th className={styles.sortableHeader} onClick={() => handleSort('price')}>
                           호가
                           <i className={`${getSortIcon('price')} ms-1`}></i>
                        </th>
                        <th className={styles.sortableHeader} onClick={() => handleSort('change24h')}>
                           24h 변동
                           <i className={`${getSortIcon('change24h')} ms-1`}></i>
                        </th>

                        <th className={styles.sortableHeader} onClick={() => handleSort('volume24h')}>
                           24h 거래량
                           <i className={`${getSortIcon('volume24h')} ms-1`}></i>
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {filteredCoins.map((coin) => (
                        <tr key={coin.id} className={`${styles.coinRow} ${selectedCoin === coin.id ? styles.selected : ''}`} onClick={() => onCoinSelect(coin)}>
                           <td className={styles.rank}>{coin.rank}</td>
                           <td className={styles.coinInfo}>
                              <div className={styles.coinName}>
                                 <div>
                                    <div className={styles.name}>
                                       <span>{`${coin.name} (${coin.symbol})`}</span>
                                    </div>
                                 </div>
                              </div>
                           </td>
                           <td className={styles.price}>{coin.price.toLocaleString()}원</td>
                           <td className={styles.change}>
                              <Badge bg={coin.change24h >= 0 ? 'success' : 'danger'} className={styles.changeBadge}>
                                 {coin.change24h >= 0 ? '+' : ''}
                                 {(coin.change24h * 100).toFixed(2)}%
                              </Badge>
                           </td>

                           <td className={styles.volume}>{formatVolume(coin.volume24h, coin.price)}</td>
                        </tr>
                     ))}
                  </tbody>
               </Table>
            </div>
         </Card.Body>
      </Card>
   )
}

export default CoinList
