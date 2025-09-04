import { useState } from 'react';
import { ListGroup, Badge } from 'react-bootstrap';
import styles from './NewsList.module.css';

const NewsList = ({ newsData, type = 'crypto' }) => {
  const [selectedNews, setSelectedNews] = useState(null);

  const handleNewsClick = (news) => {
    // 실제로는 뉴스 상세 페이지로 이동하거나 모달을 열 예정
    window.open(news.link, '_blank');
  };

  return (
    <div className={styles.newsList}>
      <ListGroup variant="flush">
        {newsData.map(news => (
          <ListGroup.Item 
            key={news.id}
            className={styles.newsItem}
            onClick={() => handleNewsClick(news)}
          >
            <div className={styles.newsContent}>
              <h6 className={styles.newsTitle}>{news.title}</h6>
              <div className={styles.newsMeta}>
                <Badge 
                  variant={type === 'crypto' ? 'primary' : 'success'} 
                  className={styles.sourceBadge}
                >
                  {news.source}
                </Badge>
                <span className={styles.newsTime}>{news.time}</span>
              </div>
              {news.summary && (
                <p className={styles.newsSummary}>{news.summary}</p>
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default NewsList;
