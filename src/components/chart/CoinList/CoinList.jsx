import React, { useState, useEffect } from 'react';
import { Card, Table, Badge, Form, InputGroup, Dropdown } from 'react-bootstrap';
import styles from '../../../styles/components/chart/CoinList.module.css';

const CoinList = ({ onCoinSelect, selectedCoin }) => {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('marketCap');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    loadCoins();
  }, []);

  useEffect(() => {
    filterAndSortCoins();
  }, [coins, searchTerm, sortBy, sortOrder]);

  const loadCoins = async () => {
    setLoading(true);
    
    try {
      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockCoins = [
        {
          id: 'bitcoin',
          symbol: 'BTC',
          name: 'Bitcoin',
          image: '/assets/images/coins/btc.png',
          price: 43250.50,
          change24h: 2.45,
          marketCap: 845200000000,
          volume24h: 28500000000,
          rank: 1
        },
        {
          id: 'ethereum',
          symbol: 'ETH',
          name: 'Ethereum',
          image: '/assets/images/coins/eth.png',
          price: 2680.75,
          change24h: 3.12,
          marketCap: 322100000000,
          volume24h: 15200000000,
          rank: 2
        },
        {
          id: 'binancecoin',
          symbol: 'BNB',
          name: 'BNB',
          image: '/assets/images/coins/bnb.png',
          price: 315.42,
          change24h: -1.25,
          marketCap: 47500000000,
          volume24h: 890000000,
          rank: 3
        },
        {
          id: 'solana',
          symbol: 'SOL',
          name: 'Solana',
          image: '/assets/images/coins/sol.png',
          price: 145.68,
          change24h: 5.89,
          marketCap: 33200000000,
          volume24h: 2100000000,
          rank: 4
        },
        {
          id: 'ripple',
          symbol: 'XRP',
          name: 'XRP',
          image: '/assets/images/coins/xrp.png',
          price: 0.5234,
          change24h: -0.78,
          marketCap: 29800000000,
          volume24h: 1250000000,
          rank: 5
        },
        {
          id: 'cardano',
          symbol: 'ADA',
          name: 'Cardano',
          image: '/assets/images/coins/ada.png',
          price: 0.4523,
          change24h: 1.89,
          marketCap: 15900000000,
          volume24h: 520000000,
          rank: 6
        },
        {
          id: 'dogecoin',
          symbol: 'DOGE',
          name: 'Dogecoin',
          image: '/assets/images/coins/doge.png',
          price: 0.0875,
          change24h: 4.23,
          marketCap: 12500000000,
          volume24h: 890000000,
          rank: 7
        },
        {
          id: 'polygon',
          symbol: 'MATIC',
          name: 'Polygon',
          image: '/assets/images/coins/matic.png',
          price: 0.8912,
          change24h: -2.15,
          marketCap: 8200000000,
          volume24h: 340000000,
          rank: 8
        },
        {
          id: 'avalanche',
          symbol: 'AVAX',
          name: 'Avalanche',
          image: '/assets/images/coins/avax.png',
          price: 28.45,
          change24h: 3.67,
          marketCap: 11400000000,
          volume24h: 480000000,
          rank: 9
        },
        {
          id: 'chainlink',
          symbol: 'LINK',
          name: 'Chainlink',
          image: '/assets/images/coins/link.png',
          price: 14.32,
          change24h: -1.45,
          marketCap: 8900000000,
          volume24h: 320000000,
          rank: 10
        }
      ];
      
      setCoins(mockCoins);
    } catch (error) {
      console.error('코인 데이터 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortCoins = () => {
    let filtered = coins.filter(coin => 
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'change24h':
          aValue = a.change24h;
          bValue = b.change24h;
          break;
        case 'marketCap':
          aValue = a.marketCap;
          bValue = b.marketCap;
          break;
        case 'volume24h':
          aValue = a.volume24h;
          bValue = b.volume24h;
          break;
        default:
          aValue = a.rank;
          bValue = b.rank;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredCoins(filtered);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const formatPrice = (price) => {
    if (price >= 1) {
      return `$${price.toLocaleString(undefined, { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })}`;
    } else {
      return `$${price.toFixed(6)}`;
    }
  };

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    } else {
      return `$${marketCap.toLocaleString()}`;
    }
  };

  const formatVolume = (volume) => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(2)}B`;
    } else if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(2)}M`;
    } else {
      return `$${volume.toLocaleString()}`;
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return 'fas fa-sort';
    return sortOrder === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
  };

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
    );
  }

  return (
    <Card className={styles.coinList}>
      <Card.Header className={styles.header}>
        <h5>암호화폐 시세</h5>
        <div className={styles.controls}>
          <InputGroup className={styles.searchGroup}>
            <Form.Control
              type="text"
              placeholder="코인 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <InputGroup.Text>
              <i className="fas fa-search"></i>
            </InputGroup.Text>
          </InputGroup>
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" size="sm">
              <i className="fas fa-filter me-2"></i>
              필터
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSort('rank')}>
                순위순
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort('marketCap')}>
                시가총액순
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort('volume24h')}>
                거래량순
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort('change24h')}>
                변동률순
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Card.Header>
      <Card.Body className="p-0">
        <div className={styles.tableContainer}>
          <Table responsive hover className={styles.table}>
            <thead>
              <tr>
                <th 
                  className={styles.sortableHeader}
                  onClick={() => handleSort('rank')}
                >
                  #
                  <i className={`${getSortIcon('rank')} ms-1`}></i>
                </th>
                <th 
                  className={styles.sortableHeader}
                  onClick={() => handleSort('name')}
                >
                  코인
                  <i className={`${getSortIcon('name')} ms-1`}></i>
                </th>
                <th 
                  className={styles.sortableHeader}
                  onClick={() => handleSort('price')}
                >
                  가격
                  <i className={`${getSortIcon('price')} ms-1`}></i>
                </th>
                <th 
                  className={styles.sortableHeader}
                  onClick={() => handleSort('change24h')}
                >
                  24h 변동
                  <i className={`${getSortIcon('change24h')} ms-1`}></i>
                </th>
                <th 
                  className={styles.sortableHeader}
                  onClick={() => handleSort('marketCap')}
                >
                  시가총액
                  <i className={`${getSortIcon('marketCap')} ms-1`}></i>
                </th>
                <th 
                  className={styles.sortableHeader}
                  onClick={() => handleSort('volume24h')}
                >
                  24h 거래량
                  <i className={`${getSortIcon('volume24h')} ms-1`}></i>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.map(coin => (
                <tr 
                  key={coin.id}
                  className={`${styles.coinRow} ${selectedCoin === coin.id ? styles.selected : ''}`}
                  onClick={() => onCoinSelect(coin)}
                >
                  <td className={styles.rank}>{coin.rank}</td>
                  <td className={styles.coinInfo}>
                    <div className={styles.coinName}>
                      <img 
                        src={coin.image}
                        alt={coin.name}
                        className={styles.coinImage}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/24x24/5E94CA/ffffff?text=' + coin.symbol[0];
                        }}
                      />
                      <div>
                        <div className={styles.name}>{coin.name}</div>
                        <div className={styles.symbol}>{coin.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className={styles.price}>
                    {formatPrice(coin.price)}
                  </td>
                  <td className={styles.change}>
                    <Badge 
                      bg={coin.change24h >= 0 ? 'success' : 'danger'}
                      className={styles.changeBadge}
                    >
                      {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                    </Badge>
                  </td>
                  <td className={styles.marketCap}>
                    {formatMarketCap(coin.marketCap)}
                  </td>
                  <td className={styles.volume}>
                    {formatVolume(coin.volume24h)}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CoinList;
