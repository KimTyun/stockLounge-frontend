import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CandleChart from '../../components/chart/CandleChart';
import CoinList from '../../components/chart/CoinList';
import ChartTabs from '../../components/chart/ChartTabs';
import styles from '../../styles/pages/Chart.module.css';

const Chart = () => {
  const [selectedCoinData, setSelectedCoinData] = useState({
    name: 'Bitcoin',
    symbol: 'BTC',
    price: '₩63,250,000',
    change: '+2.5%',
    changeAmount: '+1,580,000',
    volume: '₩2.5조',
    isPositive: true
  });

  const handleCoinSelect = (coin) => {
    setSelectedCoinData(coin);
  };

  return (
    <Container fluid className={styles.chartContainer}>
      <Row className="h-100">
        <Col lg={3} className={styles.coinListColumn}>
          <CoinList onCoinSelect={handleCoinSelect} />
        </Col>
        <Col lg={9} className={styles.chartColumn}>
          <Row className="mb-3">
            <Col>
              <div className={styles.coinHeader}>
                <h2 className={styles.coinName}>
                  {selectedCoinData.name} ({selectedCoinData.symbol})
                </h2>
                <div className={styles.coinPrice}>
                  <span className={styles.price}>{selectedCoinData.price}</span>
                  <span className={`${styles.change} ${selectedCoinData.isPositive ? styles.positive : styles.negative}`}>
                    {selectedCoinData.change} ({selectedCoinData.changeAmount})
                  </span>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <ChartTabs />
            </Col>
          </Row>
          <Row className="flex-grow-1">
            <Col>
              <CandleChart coinData={selectedCoinData} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Chart;