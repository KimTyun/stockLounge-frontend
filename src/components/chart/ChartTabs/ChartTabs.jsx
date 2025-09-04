import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Card, Badge, Row, Col } from 'react-bootstrap';
import styles from './ChartTabs.module.css';

const ChartTabs = ({ selectedCoin, onCoinSelect }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCoinData();
  }, [selectedCoin]);

  const loadCoinData = async () => {
    setLoading(true);
    
    try {
      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockData = {
        overview: {
          price: '$43,250.50',
          change24h: '+2.45%',
          changeValue: '+$1,035.20',
          marketCap: '$845.2B',
          volume24h: '$28.5B',
          high24h: '$43,890.30',
          low24h: '$42,150.80',
          supply: '19.8M BTC',
          dominance: '42.5%',
          isPositive: true
        },
        technical: {
          rsi: 65.8,
          macd: 'Bullish',
          sma50: '$41,230.45',
          sma200: '$38,950.12',
          resistance: '$44,500',
          support: '$41,800',
          trend: 'Uptrend',
          signals: [
            { indicator: 'RSI', signal: 'Neutral', color: 'warning' },
            { indicator: 'MACD', signal: 'Buy', color: 'success' },
            { indicator: 'SMA', signal: 'Buy', color: 'success' },
            { indicator: 'Volume', signal: 'Strong', color: 'primary' }
          ]
        },
        news: [
          {
            id: 1,
            title: 'Major Institution Adds $500M Bitcoin to Portfolio',
            summary: 'Leading investment firm announces significant Bitcoin allocation...',
            source: 'CoinDesk',
            time: '2 hours ago',
            sentiment: 'positive'
          },
          {
            id: 2,
            title: 'Bitcoin ETF Sees Record Inflows This Week',
            summary: 'Spot Bitcoin ETFs recorded their highest weekly inflows...',
            source: 'Bloomberg',
            time: '4 hours ago',
            sentiment: 'positive'
          },
          {
            id: 3,
            title: 'Regulatory Clarity Expected in Q4 2024',
            summary: 'Industry experts predict clearer crypto regulations...',
            source: 'Reuters',
            time: '6 hours ago',
            sentiment: 'neutral'
          }
        ],
        analysis: {
          shortTerm: {
            outlook: 'Bullish',
            confidence: 75,
            targets: ['$45,000', '$47,500', '$50,000'],
            timeframe: '1-2 weeks'
          },
          mediumTerm: {
            outlook: 'Bullish',
            confidence: 68,
            targets: ['$50,000', '$55,000', '$60,000'],
            timeframe: '1-3 months'
          },
          longTerm: {
            outlook: 'Very Bullish',
            confidence: 82,
            targets: ['$75,000', '$100,000', '$150,000'],
            timeframe: '6-12 months'
          }
        }
      };
      
      setCoinData(mockData);
    } catch (error) {
      console.error('코인 데이터 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSentimentBadge = (sentiment) => {
    const variants = {
      positive: 'success',
      negative: 'danger',
      neutral: 'secondary'
    };
    return <Badge bg={variants[sentiment]}>{sentiment}</Badge>;
  };

  const getOutlookColor = (outlook) => {
    const colors = {
      'Very Bullish': 'success',
      'Bullish': 'success',
      'Neutral': 'warning',
      'Bearish': 'danger',
      'Very Bearish': 'danger'
    };
    return colors[outlook] || 'secondary';
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.chartTabs}>
      <Tabs
        activeKey={activeTab}
        onSelect={(tab) => setActiveTab(tab)}
        className={styles.tabs}
      >
        <Tab eventKey="overview" title="개요">
          <Card className={styles.tabContent}>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <div className={styles.priceSection}>
                    <h3 className={styles.price}>
                      {coinData.overview.price}
                      <span className={`${styles.change} ${coinData.overview.isPositive ? styles.positive : styles.negative}`}>
                        {coinData.overview.change24h}
                      </span>
                    </h3>
                    <p className={`${styles.changeValue} ${coinData.overview.isPositive ? styles.positive : styles.negative}`}>
                      {coinData.overview.changeValue}
                    </p>
                  </div>
                </Col>
                <Col md={6}>
                  <div className={styles.statsGrid}>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>시가총액</span>
                      <span className={styles.statValue}>{coinData.overview.marketCap}</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>24시간 거래량</span>
                      <span className={styles.statValue}>{coinData.overview.volume24h}</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>24시간 최고</span>
                      <span className={styles.statValue}>{coinData.overview.high24h}</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>24시간 최저</span>
                      <span className={styles.statValue}>{coinData.overview.low24h}</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>유통 공급량</span>
                      <span className={styles.statValue}>{coinData.overview.supply}</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>도미넌스</span>
                      <span className={styles.statValue}>{coinData.overview.dominance}</span>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="technical" title="기술적 분석">
          <Card className={styles.tabContent}>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h5>주요 지표</h5>
                  <div className={styles.indicatorList}>
                    <div className={styles.indicator}>
                      <span>RSI (14)</span>
                      <span className={styles.indicatorValue}>{coinData.technical.rsi}</span>
                    </div>
                    <div className={styles.indicator}>
                      <span>MACD</span>
                      <span className={styles.indicatorValue}>{coinData.technical.macd}</span>
                    </div>
                    <div className={styles.indicator}>
                      <span>SMA 50</span>
                      <span className={styles.indicatorValue}>{coinData.technical.sma50}</span>
                    </div>
                    <div className={styles.indicator}>
                      <span>SMA 200</span>
                      <span className={styles.indicatorValue}>{coinData.technical.sma200}</span>
                    </div>
                    <div className={styles.indicator}>
                      <span>저항선</span>
                      <span className={styles.indicatorValue}>{coinData.technical.resistance}</span>
                    </div>
                    <div className={styles.indicator}>
                      <span>지지선</span>
                      <span className={styles.indicatorValue}>{coinData.technical.support}</span>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <h5>매매 신호</h5>
                  <div className={styles.signalList}>
                    {coinData.technical.signals.map((signal, index) => (
                      <div key={index} className={styles.signal}>
                        <span>{signal.indicator}</span>
                        <Badge bg={signal.color}>{signal.signal}</Badge>
                      </div>
                    ))}
                  </div>
                  <div className={styles.trendIndicator}>
                    <h6>전체 트렌드</h6>
                    <Badge bg="success" className={styles.trendBadge}>
                      {coinData.technical.trend}
                    </Badge>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="news" title="뉴스">
          <Card className={styles.tabContent}>
            <Card.Body>
              <div className={styles.newsList}>
                {coinData.news.map(news => (
                  <div key={news.id} className={styles.newsItem}>
                    <div className={styles.newsHeader}>
                      <h6>{news.title}</h6>
                      {getSentimentBadge(news.sentiment)}
                    </div>
                    <p className={styles.newsSummary}>{news.summary}</p>
                    <div className={styles.newsFooter}>
                      <span className={styles.newsSource}>{news.source}</span>
                      <span className={styles.newsTime}>{news.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="analysis" title="전망">
          <Card className={styles.tabContent}>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <div className={styles.analysisCard}>
                    <h6>단기 전망</h6>
                    <Badge bg={getOutlookColor(coinData.analysis.shortTerm.outlook)} className="mb-2">
                      {coinData.analysis.shortTerm.outlook}
                    </Badge>
                    <div className={styles.confidence}>
                      신뢰도: {coinData.analysis.shortTerm.confidence}%
                    </div>
                    <div className={styles.timeframe}>
                      기간: {coinData.analysis.shortTerm.timeframe}
                    </div>
                    <div className={styles.targets}>
                      <strong>목표가:</strong>
                      {coinData.analysis.shortTerm.targets.map((target, index) => (
                        <span key={index} className={styles.target}>{target}</span>
                      ))}
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={styles.analysisCard}>
                    <h6>중기 전망</h6>
                    <Badge bg={getOutlookColor(coinData.analysis.mediumTerm.outlook)} className="mb-2">
                      {coinData.analysis.mediumTerm.outlook}
                    </Badge>
                    <div className={styles.confidence}>
                      신뢰도: {coinData.analysis.mediumTerm.confidence}%
                    </div>
                    <div className={styles.timeframe}>
                      기간: {coinData.analysis.mediumTerm.timeframe}
                    </div>
                    <div className={styles.targets}>
                      <strong>목표가:</strong>
                      {coinData.analysis.mediumTerm.targets.map((target, index) => (
                        <span key={index} className={styles.target}>{target}</span>
                      ))}
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={styles.analysisCard}>
                    <h6>장기 전망</h6>
                    <Badge bg={getOutlookColor(coinData.analysis.longTerm.outlook)} className="mb-2">
                      {coinData.analysis.longTerm.outlook}
                    </Badge>
                    <div className={styles.confidence}>
                      신뢰도: {coinData.analysis.longTerm.confidence}%
                    </div>
                    <div className={styles.timeframe}>
                      기간: {coinData.analysis.longTerm.timeframe}
                    </div>
                    <div className={styles.targets}>
                      <strong>목표가:</strong>
                      {coinData.analysis.longTerm.targets.map((target, index) => (
                        <span key={index} className={styles.target}>{target}</span>
                      ))}
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ChartTabs;
