import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Card, Form, Button, Alert, Table, Spinner } from 'react-bootstrap'
import { getSiteSettingsAsync, updateSiteSettingsAsync, getBanWordsAsync, addBanWordAsync, deleteBanWordAsync, getRewardsAsync, addRewardAsync, deleteRewardAsync } from '../../../features/adminSlice'
import styles from '../../../styles/components/admin/admin-common.module.css'

const SiteManagement = () => {
   const dispatch = useDispatch()
   const { settings: reduxSettings, banWords = [], rewards = [], loading, error } = useSelector((state) => state.admin)

   const [newBanWord, setNewBanWord] = useState('')
   const [newReward, setNewReward] = useState({ name: '', points: 0, stock: 0 })
   const [showAlert, setShowAlert] = useState(false)
   const [alertMessage, setAlertMessage] = useState('')
   const [alertType, setAlertType] = useState('success')
   const [settings, setSettings] = useState(null)

   // 컴포넌트 마운트 시 데이터 조회
   useEffect(() => {
      dispatch(getSiteSettingsAsync())
      dispatch(getBanWordsAsync())
      dispatch(getRewardsAsync())
   }, [dispatch])

   useEffect(() => {
      if (reduxSettings) {
         setSettings(reduxSettings)
      }
   }, [reduxSettings])

   // 설정 변경
   const handleSettingChange = (key, value) => {
      setSettings((prev) => ({
         ...prev,
         [key]: value,
      }))
   }

   // 설정 저장
   const handleSaveSettings = async () => {
      try {
         await dispatch(updateSiteSettingsAsync(settings)).unwrap()
         setAlertMessage('설정이 성공적으로 저장되었습니다.')
         setAlertType('success')
      } catch (error) {
         setAlertMessage(`설정 저장 실패: ${error.message}`)
         setAlertType('danger')
      } finally {
         setShowAlert(true)
         setTimeout(() => setShowAlert(false), 3000)
      }
   }

   // 금칙어 추가
   const handleAddBanWord = async () => {
      if (!newBanWord.trim()) return
      try {
         await dispatch(addBanWordAsync({ word: newBanWord.trim() })).unwrap()
         setNewBanWord('')
         setAlertMessage('금칙어가 추가되었습니다.')
         setAlertType('success')
      } catch (error) {
         setAlertMessage(`금칙어 추가 실패: ${error}`)
         setAlertType('danger')
      } finally {
         setShowAlert(true)
         setTimeout(() => setShowAlert(false), 3000)
      }
   }

   // 금칙어 삭제
   const handleRemoveBanWord = async (wordId) => {
      try {
         await dispatch(deleteBanWordAsync(wordId)).unwrap()
         setAlertMessage('금칙어가 삭제되었습니다.')
         setAlertType('info')
      } catch (error) {
         setAlertMessage(`금칙어 삭제 실패: ${error}`)
         setAlertType('danger')
      } finally {
         setShowAlert(true)
         setTimeout(() => setShowAlert(false), 3000)
      }
   }

   // 교환품 추가
   const handleAddReward = async () => {
      if (!newReward.name || newReward.points <= 0 || newReward.stock < 0) {
         setAlertMessage('상품 정보를 올바르게 입력해주세요.')
         setAlertType('warning')
         setShowAlert(true)
         setTimeout(() => setShowAlert(false), 3000)
         return
      }
      try {
         await dispatch(addRewardAsync(newReward)).unwrap()
         setNewReward({ name: '', points: 0, stock: 0 })
         setAlertMessage('새로운 상품이 추가되었습니다.')
         setAlertType('success')
      } catch (error) {
         setAlertMessage(`상품 추가 실패: ${error}`)
         setAlertType('danger')
      } finally {
         setShowAlert(true)
         setTimeout(() => setShowAlert(false), 3000)
      }
   }

   // 교환품 삭제
   const handleDeleteReward = async (rewardId) => {
      try {
         await dispatch(deleteRewardAsync(rewardId)).unwrap()
         setAlertMessage('상품이 삭제되었습니다.')
         setAlertType('info')
      } catch (error) {
         setAlertMessage(`상품 삭제 실패: ${error}`)
         setAlertType('danger')
      } finally {
         setShowAlert(true)
         setTimeout(() => setShowAlert(false), 3000)
      }
   }

   // 로딩 중에 스피너 표시
   if (loading) {
      return (
         <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
            <Spinner animation="border" role="status">
               <span className="visually-hidden">Loading...</span>
            </Spinner>
         </div>
      )
   }

   return (
      <div>
         {error && (
            <Alert variant="danger" className="mb-4">
               {error}
            </Alert>
         )}
         {showAlert && (
            <Alert variant={alertType} className="mb-4">
               {alertMessage}
            </Alert>
         )}

         {/* 기본 설정 */}
         <Card className={styles.contentCard}>
            <div className={styles.cardHeader}>
               <h4 className={styles.cardTitle}>
                  <i className="fas fa-cog me-2"></i>
                  기본 설정
               </h4>
            </div>
            <Card.Body>
               <Row>
                  <Col md={6}>
                     <Form.Group className="mb-3">
                        <Form.Label>사이트 이름</Form.Label>
                        <Form.Control type="text" value={settings?.siteName || ''} onChange={(e) => handleSettingChange('siteName', e.target.value)} />
                     </Form.Group>
                  </Col>
                  <Col md={6}>
                     <Form.Group className="mb-3">
                        <Form.Label>사이트 설명</Form.Label>
                        <Form.Control type="text" value={settings?.siteDescription || ''} onChange={(e) => handleSettingChange('siteDescription', e.target.value)} />
                     </Form.Group>
                  </Col>
               </Row>
               <Row>
                  <Col md={6}>
                     <Form.Group className="mb-3">
                        <Form.Check type="switch" id="maintenance-mode" label="유지보수 모드" checked={settings?.maintenanceMode || false} onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)} />
                        <Form.Text className="text-muted">활성화 시 사이트에 접근할 수 없습니다.</Form.Text>
                     </Form.Group>
                  </Col>
                  <Col md={6}>
                     <Form.Group className="mb-3">
                        <Form.Check type="switch" id="allow-registration" label="회원가입 허용" checked={settings?.allowRegistration || false} onChange={(e) => handleSettingChange('allowRegistration', e.target.checked)} />
                        <Form.Text className="text-muted">비활성화 시 새로운 회원가입이 불가능합니다.</Form.Text>
                     </Form.Group>
                  </Col>
               </Row>
            </Card.Body>
         </Card>
         <hr />

         {/* 포인트 시스템 설정 */}
         <Card className={styles.contentCard}>
            <div className={styles.cardHeader}>
               <h4 className={styles.cardTitle}>
                  <i className="fas fa-coins me-2"></i>
                  포인트 시스템 설정
               </h4>
            </div>
            <Card.Body>
               <Row>
                  <Col md={3}>
                     <Form.Group className="mb-3">
                        <Form.Label>게시글 작성 포인트</Form.Label>
                        <Form.Control type="number" value={settings?.pointsPerPost || 0} onChange={(e) => handleSettingChange('pointsPerPost', parseInt(e.target.value))} min="0" />
                     </Form.Group>
                  </Col>
                  <Col md={3}>
                     <Form.Group className="mb-3">
                        <Form.Label>댓글 작성 포인트</Form.Label>
                        <Form.Control type="number" value={settings?.pointsPerComment || 0} onChange={(e) => handleSettingChange('pointsPerComment', parseInt(e.target.value))} min="0" />
                     </Form.Group>
                  </Col>
                  <Col md={3}>
                     <Form.Group className="mb-3">
                        <Form.Label>추천 받기 포인트</Form.Label>
                        <Form.Control type="number" value={settings?.pointsPerLike || 0} onChange={(e) => handleSettingChange('pointsPerLike', parseInt(e.target.value))} min="0" />
                     </Form.Group>
                  </Col>
                  <Col md={3}>
                     <Form.Group className="mb-3">
                        <Form.Label>코인 교환 비율</Form.Label>
                        <Form.Control type="number" value={settings?.coinExchangeRate || 0} onChange={(e) => handleSettingChange('coinExchangeRate', parseInt(e.target.value))} min="1" />
                        <Form.Text className="text-muted">{settings?.coinExchangeRate || 0}포인트 = 1코인</Form.Text>
                     </Form.Group>
                  </Col>
               </Row>
            </Card.Body>
         </Card>
         <hr />

         {/* 사용자 제한 설정 */}
         <Card className={styles.contentCard}>
            <div className={styles.cardHeader}>
               <h4 className={styles.cardTitle}>
                  <i className="fas fa-user-shield me-2"></i>
                  사용자 제한 설정
               </h4>
            </div>
            <Card.Body>
               <Row>
                  <Col md={6}>
                     <Form.Group className="mb-3">
                        <Form.Label>일일 게시글 작성 제한</Form.Label>
                        <Form.Control type="number" value={settings?.maxPostsPerDay || 0} onChange={(e) => handleSettingChange('maxPostsPerDay', parseInt(e.target.value))} min="1" />
                        <Form.Text className="text-muted">사용자가 하루에 작성할 수 있는 최대 게시글 수</Form.Text>
                     </Form.Group>
                  </Col>
                  <Col md={6}>
                     <Form.Group className="mb-3">
                        <Form.Label>일일 댓글 작성 제한</Form.Label>
                        <Form.Control type="number" value={settings?.maxCommentsPerDay || 0} onChange={(e) => handleSettingChange('maxCommentsPerDay', parseInt(e.target.value))} min="1" />
                        <Form.Text className="text-muted">사용자가 하루에 작성할 수 있는 최대 댓글 수</Form.Text>
                     </Form.Group>
                  </Col>
               </Row>
               <Row>
                  <Col md={6}>
                     <Form.Group className="mb-3">
                        <Form.Check type="switch" id="email-verification" label="이메일 인증 필수" checked={settings?.requireEmailVerification || false} onChange={(e) => handleSettingChange('requireEmailVerification', e.target.checked)} />
                        <Form.Text className="text-muted">회원가입 시 이메일 인증을 필수로 합니다.</Form.Text>
                     </Form.Group>
                  </Col>
                  <Col md={6}>
                     <Form.Group className="mb-3">
                        <Form.Check type="switch" id="social-login" label="소셜 로그인 허용" checked={settings?.enableSocialLogin || false} onChange={(e) => handleSettingChange('enableSocialLogin', e.target.checked)} />
                        <Form.Text className="text-muted">구글, 카카오 소셜 로그인을 허용합니다.</Form.Text>
                     </Form.Group>
                  </Col>
               </Row>
            </Card.Body>
         </Card>
         <hr />

         {/* 금지어 관리 */}
         <Card className={styles.contentCard}>
            <div className={styles.cardHeader}>
               <h4 className={styles.cardTitle}>
                  <i className="fas fa-ban me-2"></i>
                  금지어 관리
               </h4>
            </div>
            <Card.Body>
               <Row className="mb-4">
                  <Col md={8}>
                     <Form.Control type="text" placeholder="추가할 금지어를 입력하세요" value={newBanWord} onChange={(e) => setNewBanWord(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAddBanWord()} />
                  </Col>
                  <Col md={4}>
                     <Button variant="primary" onClick={handleAddBanWord} className="w-100">
                        금지어 추가
                     </Button>
                  </Col>
               </Row>
               <div className="mb-3">
                  <strong>현재 등록된 금지어 ({banWords.length}개)</strong>
               </div>
               <Table responsive className={styles.adminTable}>
                  <thead>
                     <tr>
                        <th>금지어</th>
                        <th>등록일</th>
                        <th>관리</th>
                     </tr>
                  </thead>
                  <tbody>
                     {banWords.map((item) => (
                        <tr key={item.id}>
                           <td>
                              <strong>{item.word}</strong>
                           </td>
                           <td>{new Date(item.date).toLocaleDateString('ko-KR')}</td>
                           <td>
                              <Button variant="outline-danger" size="sm" onClick={() => handleRemoveBanWord(item.id)}>
                                 <i className="fas fa-trash"></i> 삭제
                              </Button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </Table>
               {banWords.length === 0 && (
                  <div className="text-center py-4">
                     <i className="fas fa-ban fa-3x text-muted mb-3"></i>
                     <p className="text-muted">등록된 금지어가 없습니다.</p>
                  </div>
               )}
            </Card.Body>
         </Card>
         <hr />

         {/* 리워드 관리 */}
         <Card className={styles.contentCard}>
            <div className={styles.cardHeader}>
               <h4 className={styles.cardTitle}>
                  <i className="fas fa-gift me-2"></i>
                  리워드 관리
               </h4>
            </div>
            <Card.Body>
               <Form
                  className="mb-4"
                  onSubmit={(e) => {
                     e.preventDefault()
                     handleAddReward()
                  }}
               >
                  <Row className="align-item-end">
                     <Col md={5} className="mb-2 mb-md-0">
                        <Form.Group className="mb-3">
                           <Form.Label>상품명</Form.Label>
                           <Form.Control type="text" placeholder="상품명 입력" value={newReward.name} onChange={(e) => setNewReward((prev) => ({ ...prev, name: e.target.value }))} />
                        </Form.Group>
                     </Col>
                     <Col md={3} className="mb-2 mb-md-0">
                        <Form.Group className="mb-3">
                           <Form.Label>필요 포인트</Form.Label>
                           <Form.Control type="number" placeholder="포인트" value={newReward.points} onChange={(e) => setNewReward((prev) => ({ ...prev, points: parseInt(e.target.value) }))} min="0" />
                        </Form.Group>
                     </Col>
                     <Col md={3} className="mb-2 mb-md-0">
                        <Form.Group className="mb-3">
                           <Form.Label>재고</Form.Label>
                           <Form.Control type="number" placeholder="재고" value={newReward.stock} onChange={(e) => setNewReward((prev) => ({ ...prev, stock: parseInt(e.target.value) }))} min="0" />
                        </Form.Group>
                     </Col>
                     <Col md={2}>
                        <Button variant="primary" type="submit" className="w-100">
                           상품 추가
                        </Button>
                     </Col>
                  </Row>
               </Form>
               <div className="mb-3">
                  <strong>등록된 교환 상품({rewards.length}개)</strong>
               </div>
               <Table responsive className={styles.adminTable}>
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>상품명</th>
                        <th>필요 포인트</th>
                        <th>재고 수량</th>
                        <th>관리</th>
                     </tr>
                  </thead>
                  <tbody>
                     {rewards.map((item) => (
                        <tr key={item.id}>
                           <td>{item.id}</td>
                           <td>
                              <strong>{item.name}</strong>
                           </td>
                           <td>{item.points}</td>
                           <td>{item.stock}</td>
                           <td>
                              <Button variant="outline-danger" size="sm" onClick={() => handleDeleteReward(item.id)}>
                                 <i className="fas fa-trash"></i>삭제
                              </Button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </Table>
               {rewards.length === 0 && (
                  <div className="text-center py-4">
                     <i className="fas fa-gift fa-3x text-muted mb-3"></i>
                     <p className="text-muted">등록된 상품이 없습니다.</p>
                  </div>
               )}
            </Card.Body>
         </Card>
         <hr />

         {/* 저장 버튼 */}
         <div className="text-center mt-4">
            <Button variant="primary" size="lg" onClick={handleSaveSettings} disabled={loading}>
               {loading ? (
                  <>
                     <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                     저장 중...
                  </>
               ) : (
                  <>
                     <i className="fas fa-save me-2"></i>
                     설정 저장
                  </>
               )}
            </Button>
         </div>
      </div>
   )
}

export default SiteManagement
