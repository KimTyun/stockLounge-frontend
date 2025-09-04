import { useState, useEffect } from 'react';
import { Card, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import styles from './CandleChart.module.css';

const CandleChart = () => {
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');

  const coins = [
    { symbol: 'BTC', name: '비트코인' },
    { symbol: 'ETH', name: '이더리움' },
    { symbol: 'XRP', name: '리플' }
  ];

  const timeframes = [
    { value: '1H', label: '1시간' },
    { value: '1D', label: '1일' },
    { value: '1W', label: '1주' },
    { value: '1M', label: '1달' }
  ];

  // 임시 차트 데이터 (실제로는 Upbit API에서 가져올 예정)
  const mockPrice = selectedCoin === 'BTC' ? '₩65,500,000' : 
                   selectedCoin === 'ETH' ? '₩2,850,000' : '₩650';
  const mockChange = selectedCoin === 'BTC' ? '+2.34%' : 
                    selectedCoin === 'ETH' ? '+1.87%' : '+5.21%';

  return (
    <Card className={styles.chartCard}>
      <Card.Header className={styles.chartHeader}>
        <Row className="align-items-center">
          <Col md={6}>
            <ButtonGroup className={styles.coinTabs}>
              {coins.map(coin => (
                <Button
                  key={coin.symbol}
                  variant={selectedCoin === coin.symbol ? 'primary' : 'outline-primary'}
                  onClick={() => setSelectedCoin(coin.symbol)}
                  className={styles.coinTab}
                >
                  {coin.name}
                </Button>
              ))}
            </ButtonGroup>
          </Col>
          <Col md={6} className="text-end">
            <ButtonGroup className={styles.timeframeTabs}>
              {timeframes.map(timeframe => (
                <Button
                  key={timeframe.value}
                  variant={selectedTimeframe === timeframe.value ? 'primary' : 'outline-primary'}
                  size="sm"
                  onClick={() => setSelectedTimeframe(timeframe.value)}
                  className={styles.timeframeTab}
                >
                  {timeframe.label}
                </Button>
              ))}
            </ButtonGroup>
          </Col>
        </Row>
      </Card.Header>
      
      <Card.Body className={styles.chartBody}>
        <div className={styles.priceInfo}>
          <h3 className={styles.coinName}>
            {coins.find(coin => coin.symbol === selectedCoin)?.name} ({selectedCoin})
          </h3>
          <div className={styles.priceData}>
            <span className={styles.currentPrice}>{mockPrice}</span>
            <span className={`${styles.priceChange} ${styles.positive}`}>
              {mockChange}
            </span>
          </div>
        </div>
        
        <div className={styles.chartContainer}>
          {/* 실제 차트는 Chart.js나 TradingView 위젯으로 구현 예정 */}
          <div className={styles.mockChart}>
            <p>차트 영역 (Chart.js 또는 TradingView 위젯 구현 예정)</p>
            <div className={styles.chartPlaceholder}>
              📈 {selectedCoin} {selectedTimeframe} 차트
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CandleChart;
