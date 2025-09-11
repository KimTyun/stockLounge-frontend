import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Row, Col, Card, Form, Button, Alert, Badge } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import styles from '../../../styles/pages/Board_fixed.module.css'
import { writeBoardThunk } from '../../../features/boardSlice'

const PostEditor = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { id } = useParams() // 수정 모드일 때 게시글 ID
   const isEditMode = Boolean(id)

   const [formData, setFormData] = useState({
      title: '',
      category: 'free',
      content: '',
   })

   const [imgUrl, setImgUrl] = useState(null) // 이미지 미리보기 URL
   const [imgFile, setImgFile] = useState(null) // 이미지 파일
   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState('')
   const [success, setSuccess] = useState('')
   const [wordCount, setWordCount] = useState(0)

   // 카테고리 옵션
   const categories = [
      { value: 'free', label: '자유토론' },
      { value: 'bitcoin', label: '비트코인' },
      { value: 'ethereum', label: '이더리움' },
      { value: 'ripple', label: '리플' },
      { value: 'nft', label: 'NFT' },
      { value: 'defi', label: 'DeFi' },
      { value: 'news', label: '뉴스' },
      { value: 'analysis', label: '분석' },
   ]

   // 수정 모드일 때 기존 데이터 로드
   useEffect(() => {
      if (isEditMode) {
         setIsLoading(true)
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
            }

            setFormData(mockPost)
            setWordCount(mockPost.content.length)
            setIsLoading(false)
         }, 1000)
      }
   }, [isEditMode])

   // 폼 데이터 변경 핸들러
   const handleChange = (e) => {
      const { name, value, type, checked } = e.target
      setFormData((prev) => ({
         ...prev,
         [name]: type === 'checkbox' ? checked : value,
      }))

      if (name === 'content') {
         setWordCount(value.length)
      }
   }

   // 이미지 파일 업로드 핸들러
   const handleImageChange = (e) => {
      const file = e.target.files[0] // 단일 파일만 선택

      if (!file) {
         // 파일이 선택되지 않은 경우 초기화
         setImgFile(null)
         setImgUrl(null)
         return
      }

      // 파일 크기 체크 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
         setError('파일 크기는 5MB 이하만 업로드 가능합니다.')
         return
      }

      // 파일 타입 체크
      if (!file.type.startsWith('image/')) {
         setError('이미지 파일만 업로드 가능합니다.')
         return
      }

      setImgFile(file)

      // 미리보기 생성
      const reader = new FileReader()
      reader.onload = (event) => {
         setImgUrl(event.target.result)
      }
      reader.readAsDataURL(file)
      console.log('파일은', file)
   }

   // 폼 제출 핸들러
   const handleSubmit = async (e) => {
      e.preventDefault()
      setError('')
      setSuccess('')

      if (!formData.title.trim()) {
         setError('제목을 입력해주세요.')
         return
      }

      if (!formData.content.trim()) {
         setError('내용을 입력해주세요.')
         return
      }

      setIsLoading(true)

      try {
         const data = new FormData()
         data.append('title', formData.title)
         data.append('category', formData.category)
         data.append('content', formData.content)

         // 이미지 파일이 있을 경우 인코딩하여 추가
         if (imgFile) {
            const encodedFile = new File([imgFile], encodeURIComponent(imgFile.name), { type: imgFile.type })
            data.append('file', encodedFile)
         }

         console.log('전송할 데이터:')
         for (let [key, value] of data.entries()) {
            console.log(key, value)
         }

         await dispatch(writeBoardThunk(data)).unwrap()
         setSuccess('게시글 등록 완료')
         setTimeout(() => {
            navigate('/board')
         }, 1500)
         alert('게시글 등록 완료!')
      } catch (error) {
         setError('게시글 등록 실패')
         console.error('게시글 등록 오류:', error)
      } finally {
         setIsLoading(false)
      }
   }

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
                                    <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} placeholder="제목을 입력하세요" disabled={isLoading} maxLength={100} />
                                    <Form.Text className="text-muted">{formData.title.length}/100</Form.Text>
                                 </Form.Group>
                              </Col>
                              <Col md={4}>
                                 <Form.Group>
                                    <Form.Label>카테고리</Form.Label>
                                    <Form.Select name="category" value={formData.category} onChange={handleChange} disabled={isLoading}>
                                       {categories.map((cat) => (
                                          <option key={cat.value} value={cat.value}>
                                             {cat.label}
                                          </option>
                                       ))}
                                    </Form.Select>
                                 </Form.Group>
                              </Col>
                           </Row>

                           {/* 이미지 업로드 */}
                           <Form.Group className="mb-3">
                              <Form.Label>이미지 첨부</Form.Label>
                              <Form.Control type="file" accept="image/*" onChange={handleImageChange} disabled={isLoading} />
                              <Form.Text className="text-muted">이미지 파일만 업로드 가능합니다. (최대 5MB)</Form.Text>
                           </Form.Group>

                           {/* 이미지 미리보기 */}
                           {imgUrl && (
                              <div className="mb-3">
                                 <h5>미리보기:</h5>
                                 <div
                                    style={{
                                       width: '200px',
                                       height: '200px',
                                       border: '1px solid #ccc',
                                       borderRadius: '8px',
                                       overflow: 'hidden',
                                       display: 'flex',
                                       justifyContent: 'center',
                                       alignItems: 'center',
                                    }}
                                 >
                                    <img
                                       src={imgUrl}
                                       alt="미리보기"
                                       style={{
                                          width: '100%',
                                          height: '100%',
                                          objectFit: 'cover',
                                       }}
                                    />
                                 </div>
                              </div>
                           )}

                           {/* 내용 */}
                           <Form.Group className="mb-3">
                              <Form.Label>
                                 내용 *
                                 <Badge bg="secondary" className="ms-2">
                                    {wordCount.toLocaleString()}자
                                 </Badge>
                              </Form.Label>
                              <Form.Control
                                 as="textarea"
                                 rows={20}
                                 name="content"
                                 value={formData.content}
                                 onChange={handleChange}
                                 placeholder="내용을 입력하세요. 마크다운 문법을 지원합니다. 예시: ## 제목 ### 소제목 **굵은글씨** *기울임* - 목록 아이템"
                                 disabled={isLoading}
                                 className={styles.contentTextarea}
                              />
                              <Form.Text className="text-muted">마크다운 문법을 지원합니다. (## 제목, **굵은글씨**, *기울임*, - 목록)</Form.Text>
                           </Form.Group>

                           {/* 버튼 영역 */}
                           <div className={styles.buttonArea}>
                              <div className={styles.rightButtons}>
                                 <Button variant="secondary" onClick={() => navigate('/board')} disabled={isLoading} className="me-2">
                                    취소
                                 </Button>
                                 <Button variant="primary" type="submit" disabled={isLoading}>
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
               </Col>
            </Row>
         </Container>
      </div>
   )
}

export default PostEditor
