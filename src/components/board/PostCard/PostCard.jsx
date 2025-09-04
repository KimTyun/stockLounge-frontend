import { Card, Badge } from 'react-bootstrap';
import styles from './PostCard.module.css';

const PostCard = ({ post }) => {
  return (
    <Card className={styles.postCard}>
      <Card.Body>
        <div className={styles.cardHeader}>
          <Badge variant="primary" className={styles.categoryBadge}>
            {post.category}
          </Badge>
          <div className={styles.stats}>
            <span className={styles.stat}>👁 {post.views}</span>
            <span className={styles.stat}>👍 {post.likes}</span>
            <span className={styles.stat}>💬 {post.comments}</span>
          </div>
        </div>
        
        <Card.Title className={styles.title}>
          {post.title}
        </Card.Title>
        
        <Card.Text className={styles.preview}>
          {post.preview}
        </Card.Text>
        
        <div className={styles.cardFooter}>
          <div className={styles.author}>
            <strong>{post.author}</strong>
          </div>
          <div className={styles.date}>
            {post.date}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PostCard;
