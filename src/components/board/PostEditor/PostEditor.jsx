import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Badge } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../../styles/pages/Board_fixed.module.css';

const PostEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 수정 모드일 때 게시글 ID
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'general',
    content: '',
    tags: '',
    isNotice: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);

  // 카테고리 옵션
  const categories = [
    { value: 'general', label: '일반토론' },
    { value: 'bitcoin', label: '비트코인' },
    { value: 'ethereum', label: '이더리움' },
    { value: 'ripple', label: '리플' },
    { value: 'nft', label: 'NFT' },
    { value: 'defi', label: 'DeFi' },
    { value: 'news', label: '뉴스' },
    { value: 'analysis', label: '분석' }
  ];

  // 수정 모드일 때 기존 데이터 로드
  useEffect(() => {
    if (isEditMode) {
      setIsLoading(true);
      // API 호출 시뮬레이션
      setTimeout(() => {
        const mockPost = {
          title: '비트코인 급등, 이번엔 진짜일까? 전문가 분석',
          category: 'bitcoin',
          content: `안녕하세요, 크립토 분석가입니다.

최근 비트코인이 다시 한번 급등세를 보이고 있습니다. 이번 상승의 배경과 지속 가능성에 대해 분석해보겠습니다.

## 📈 현재 상황
비트코인은 지난 주 대비 15% 상승하며 $45,000을 돌파했습니다. 이는 여러 긍정적 요인들이 복합적으로 작용한 결과로 보입니다.

## 🔍 상승 요인 분석
- **기관 투자 증가:** 대형 자산운용사들의 비트코인 ETF 매수세 증가
- **규제 명확화:** 주요국의 암호화폐 규제 프레임워크 정비
- **기술적 개선:** 라이트닝 네트워크 확산으로 실용성 증대
- **거시경제 요인:** 인플레이션 헷지 자산으로서의 재평가

## ⚠️ 주의사항
하지만 과도한 낙관은 금물입니다. 다음과 같은 리스크 요인들도 고려해야 합니다:
- 높은 변동성은 여전히 존재
- 규제 리스크 상존
- 기술적 저항선 $50,000 돌파 여부

## 💡 결론
단기적으로는 긍정적이지만, 장기 투자 관점에서 신중한 접근이 필요합니다. 분할 매수를 통한 리스크 분산을 권장합니다.

※ 본 글은 투자 참고용이며, 투자 책임은 본인에게 있습니다.`,
          tags: '비트코인,BTC,분석,투자',
          isNotice: false
        };
        
        setFormData(mockPost);
        setWordCount(mockPost.content.length);
        setIsLoading(false);
      }, 1000);
    }
  }, [isEditMode]);

  // 폼 데이터 변경 핸들러
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (name === 'content') {
      setWordCount(value.length);
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // 유효성 검사
    if (!formData.title.trim()) {
      setError('제목을 입력해주세요.');
      return;
    }
    
    if (!formData.content.trim()) {
      setError('내용을 입력해주세요.');
      return;
    }
    
    if (formData.content.length < 10) {
      setError('내용은 최소 10자 이상 입력해주세요.');
      return;
    }

    setIsLoading(true);
    
    try {
      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(isEditMode ? '게시글이 수정되었습니다.' : '게시글이 작성되었습니다.');
      
      setTimeout(() => {
        navigate('/board');
      }, 1500);
      
    } catch (error) {
      setError('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  // 임시저장
  const handleSaveDraft = () => {
    localStorage.setItem('postDraft', JSON.stringify(formData));
    setSuccess('임시저장되었습니다.');
    setTimeout(() => setSuccess(''), 3000);
  };

  // 임시저장 불러오기
  const handleLoadDraft = () => {
    const draft = localStorage.getItem('postDraft');
    if (draft) {
      const draftData = JSON.parse(draft);
      setFormData(draftData);
      setWordCount(draftData.content.length);
      setSuccess('임시저장된 글을 불러왔습니다.');
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError('임시저장된 글이 없습니다.');
      setTimeout(() => setError(''), 3000);
    }
  };

  // 미리보기 모드 토글
  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  // 마크다운을 HTML로 변환 (간단한 버전)
  const markdownToHtml = (markdown) => {
    return markdown
      .replace(/^## (.*$)/gm, '<h3>$1</h3>')
      .replace(/^### (.*$)/gm, '<h4>$1</h4>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(?!<[uh]|<\/[pu]|<li|<\/li)(.+)$/gm, '<p>$1</p>')
      .replace(/(<\/p>)?<p><\/p>(<p>)?/g, '');
  };

  return (
    <div className={styles.postEditor}>
      <Container>
        <Row>
          <Col lg={10} xl={8} className="mx-auto">
            <Card className={styles.editorCard}>
              <Card.Header className={styles.editorHeader}>
                <h3>
                  <i className={`fas fa-${isEditMode ? 'edit' : 'pen'} me-2`}></i>
                  {isEditMode ? '게시글 수정' : '새 게시글 작성'}
                </h3>
                <div className={styles.headerActions}>
                  <Button 
                    variant="outline-secondary" 
                    size="sm" 
                    onClick={handleLoadDraft}
                    className="me-2"
                  >
                    임시저장 불러오기
                  </Button>
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    onClick={togglePreview}
                  >
                    {previewMode ? '편집모드' : '미리보기'}
                  </Button>
                </div>
              </Card.Header>
              
              <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                
                <Form onSubmit={handleSubmit}>
                  {/* 제목 및 카테고리 */}
                  <Row className="mb-3">
                    <Col md={8}>
                      <Form.Group>
                        <Form.Label>제목 *</Form.Label>
                        <Form.Control
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="제목을 입력하세요"
                          disabled={isLoading}
                          maxLength={100}
                        />
                        <Form.Text className="text-muted">
                          {formData.title.length}/100
                        </Form.Text>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>카테고리</Form.Label>
                        <Form.Select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          disabled={isLoading}
                        >
                          {categories.map(cat => (
                            <option key={cat.value} value={cat.value}>
                              {cat.label}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* 내용 */}
                  <Form.Group className="mb-3">
                    <Form.Label>
                      내용 *
                      <Badge bg="secondary" className="ms-2">
                        {wordCount.toLocaleString()}자
                      </Badge>
                    </Form.Label>
                    
                    {!previewMode ? (
                      <Form.Control
                        as="textarea"
                        rows={20}
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="내용을 입력하세요. 마크다운 문법을 지원합니다.

예시:
## 제목
### 소제목
**굵은글씨**
*기울임*
- 목록 아이템"
                        disabled={isLoading}
                        className={styles.contentTextarea}
                      />
                    ) : (
                      <div className={styles.previewArea}>
                        <div 
                          className={styles.previewContent}
                          dangerouslySetInnerHTML={{ 
                            __html: markdownToHtml(formData.content) 
                          }}
                        />
                      </div>
                    )}
                    
                    <Form.Text className="text-muted">
                      마크다운 문법을 지원합니다. (## 제목, **굵은글씨**, *기울임*, - 목록)
                    </Form.Text>
                  </Form.Group>

                  {/* 태그 */}
                  <Form.Group className="mb-3">
                    <Form.Label>태그</Form.Label>
                    <Form.Control
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      placeholder="태그를 쉼표로 구분해서 입력하세요 (예: 비트코인,투자,분석)"
                      disabled={isLoading}
                    />
                    <Form.Text className="text-muted">
                      최대 5개까지 입력 가능합니다.
                    </Form.Text>
                  </Form.Group>

                  {/* 공지사항 설정 (관리자만) */}
                  <Form.Group className="mb-4">
                    <Form.Check
                      type="checkbox"
                      name="isNotice"
                      checked={formData.isNotice}
                      onChange={handleChange}
                      label="공지사항으로 설정"
                      disabled={isLoading}
                    />
                  </Form.Group>

                  {/* 버튼 영역 */}
                  <div className={styles.buttonArea}>
                    <div className={styles.leftButtons}>
                      <Button 
                        variant="outline-secondary" 
                        onClick={handleSaveDraft}
                        disabled={isLoading}
                      >
                        <i className="fas fa-save me-2"></i>
                        임시저장
                      </Button>
                    </div>
                    
                    <div className={styles.rightButtons}>
                      <Button 
                        variant="secondary" 
                        onClick={() => navigate('/board')}
                        disabled={isLoading}
                        className="me-2"
                      >
                        취소
                      </Button>
                      <Button 
                        variant="primary" 
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            {isEditMode ? '수정 중...' : '작성 중...'}
                          </>
                        ) : (
                          <>
                            <i className={`fas fa-${isEditMode ? 'check' : 'paper-plane'} me-2`}></i>
                            {isEditMode ? '수정완료' : '게시하기'}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            {/* 작성 가이드 */}
            <Card className={styles.guideCard}>
              <Card.Header>
                <h5><i className="fas fa-info-circle me-2"></i>작성 가이드</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <h6>📝 글쓰기 팁</h6>
                    <ul className="mb-3">
                      <li>명확하고 구체적인 제목을 작성하세요</li>
                      <li>단락을 나누어 읽기 쉽게 구성하세요</li>
                      <li>관련 태그를 적절히 활용하세요</li>
                      <li>개인정보나 부적절한 내용은 피하세요</li>
                    </ul>
                  </Col>
                  <Col md={6}>
                    <h6>📋 마크다운 문법</h6>
                    <ul className="mb-3">
                      <li><code>## 제목</code> - 제목</li>
                      <li><code>**굵은글씨**</code> - <strong>굵은글씨</strong></li>
                      <li><code>*기울임*</code> - <em>기울임</em></li>
                      <li><code>- 목록</code> - 목록 만들기</li>
                    </ul>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PostEditor;
