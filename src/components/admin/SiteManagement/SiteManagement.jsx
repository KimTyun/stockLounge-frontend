import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, Alert, Table } from 'react-bootstrap';
import styles from '../../../styles/components/admin/admin-common.module.css';

const SiteManagement = () => {
   const [settings, setSettings] = useState({
      siteName: 'StockRounge',
      siteDescription: '코인 커뮤니티 플랫폼',
      maintenanceMode: false,
      allowRegistration: true,
      requireEmailVerification: true,
      pointsPerPost: 10,
      pointsPerComment: 5,
      pointsPerLike: 1,
      coinExchangeRate: 1000, // 1000 포인트 = 1 코인
      maxPostsPerDay: 20,
      maxCommentsPerDay: 50,
      enableSocialLogin: true,
      enableNotifications: true,
   })

   const [banWords, setBanWords] = useState(['스캠', '사기', '도박', '불법', '해킹'])

   const [newBanWord, setNewBanWord] = useState('')
   const [showAlert, setShowAlert] = useState(false)
   const [alertMessage, setAlertMessage] = useState('')
   const [alertType, setAlertType] = useState('success')

   const handleSettingChange = (key, value) => {
      setSettings((prev) => ({
         ...prev,
         [key]: value,
      }))
   }

   const handleSaveSettings = () => {
      // 실제로는 API 호출
      setAlertMessage('설정이 성공적으로 저장되었습니다.')
      setAlertType('success')
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
   }

   const handleAddBanWord = () => {
      if (newBanWord.trim() && !banWords.includes(newBanWord.trim())) {
         setBanWords([...banWords, newBanWord.trim()])
         setNewBanWord('')
         setAlertMessage('금지어가 추가되었습니다.')
         setAlertType('success')
         setShowAlert(true)
         setTimeout(() => setShowAlert(false), 3000)
      }
   }

   const handleRemoveBanWord = (word) => {
      setBanWords(banWords.filter((w) => w !== word))
      setAlertMessage('금지어가 삭제되었습니다.')
      setAlertType('info')
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
   }

   return (
      <div>
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
                        <Form.Control type="text" value={settings.siteName} onChange={(e) => handleSettingChange('siteName', e.target.value)} />
                     </Form.Group>
                  </Col>
                  <Col md={6}>
                     <Form.Group className="mb-3">
                        <Form.Label>사이트 설명</Form.Label>
                        <Form.Control type="text" value={settings.siteDescription} onChange={(e) => handleSettingChange('siteDescription', e.target.value)} />
                     </Form.Group>
                  </Col>
               </Row>

               <Row>
                  <Col md={6}>
                     <Form.Group className="mb-3">
                        <Form.Check type="switch" id="maintenance-mode" label="유지보수 모드" checked={settings.maintenanceMode} onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)} />
                        <Form.Text className="text-muted">활성화 시 사이트에 접근할 수 없습니다.</Form.Text>
                     </Form.Group>
                  </Col>
                  <Col md={6}>
                     <Form.Group className="mb-3">
                        <Form.Check type="switch" id="allow-registration" label="회원가입 허용" checked={settings.allowRegistration} onChange={(e) => handleSettingChange('allowRegistration', e.target.checked)} />
                        <Form.Text className="text-muted">비활성화 시 새로운 회원가입이 불가능합니다.</Form.Text>
                     </Form.Group>
                  </Col>
               </Row>
            </Card.Body>
         </Card>

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
                        <Form.Control type="number" value={settings.pointsPerPost} onChange={(e) => handleSettingChange('pointsPerPost', parseInt(e.target.value))} min="0" />
                     </Form.Group>
                  </Col>
                  <Col md={3}>
                     <Form.Group className="mb-3">
                        <Form.Label>댓글 작성 포인트</Form.Label>
                        <Form.Control type="number" value={settings.pointsPerComment} onChange={(e) => handleSettingChange('pointsPerComment', parseInt(e.target.value))} min="0" />
                     </Form.Group>
                  </Col>
                  <Col md={3}>
                     <Form.Group className="mb-3">
                        <Form.Label>추천 받기 포인트</Form.Label>
                        <Form.Control type="number" value={settings.pointsPerLike} onChange={(e) => handleSettingChange('pointsPerLike', parseInt(e.target.value))} min="0" />
                     </Form.Group>
                  </Col>
                  <Col md={3}>
                     <Form.Group className="mb-3">
                        <Form.Label>코인 교환 비율</Form.Label>
                        <Form.Control type="number" value={settings.coinExchangeRate} onChange={(e) => handleSettingChange('coinExchangeRate', parseInt(e.target.value))} min="1" />
                        <Form.Text className="text-muted">{settings.coinExchangeRate}포인트 = 1코인</Form.Text>
                     </Form.Group>
                  </Col>
               </Row>
            </Card.Body>
         </Card>

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
                        <Form.Control type="number" value={settings.maxPostsPerDay} onChange={(e) => handleSettingChange('maxPostsPerDay', parseInt(e.target.value))} min="1" />
                        <Form.Text className="text-muted">사용자가 하루에 작성할 수 있는 최대 게시글 수</Form.Text>
                     </Form.Group>
                  </Col>
                  <Col md={6}>
                     <Form.Group className="mb-3">
                        <Form.Label>일일 댓글 작성 제한</Form.Label>
                        <Form.Control type="number" value={settings.maxCommentsPerDay} onChange={(e) => handleSettingChange('maxCommentsPerDay', parseInt(e.target.value))} min="1" />
                        <Form.Text className="text-muted">사용자가 하루에 작성할 수 있는 최대 댓글 수</Form.Text>
                     </Form.Group>
                  </Col>
               </Row>

               <Row>
                  <Col md={6}>
                     <Form.Group className="mb-3">
                        <Form.Check type="switch" id="email-verification" label="이메일 인증 필수" checked={settings.requireEmailVerification} onChange={(e) => handleSettingChange('requireEmailVerification', e.target.checked)} />
                        <Form.Text className="text-muted">회원가입 시 이메일 인증을 필수로 합니다.</Form.Text>
                     </Form.Group>
                  </Col>
                  <Col md={6}>
                     <Form.Group className="mb-3">
                        <Form.Check type="switch" id="social-login" label="소셜 로그인 허용" checked={settings.enableSocialLogin} onChange={(e) => handleSettingChange('enableSocialLogin', e.target.checked)} />
                        <Form.Text className="text-muted">구글, 카카오 소셜 로그인을 허용합니다.</Form.Text>
                     </Form.Group>
                  </Col>
               </Row>
            </Card.Body>
         </Card>

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
                     {banWords.map((word, index) => (
                        <tr key={index}>
                           <td>
                              <strong>{word}</strong>
                           </td>
                           <td>2025-09-04</td>
                           <td>
                              <Button variant="outline-danger" size="sm" onClick={() => handleRemoveBanWord(word)}>
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

         {/* 알림 설정 */}
         <Card className={styles.contentCard}>
            <div className={styles.cardHeader}>
               <h4 className={styles.cardTitle}>
                  <i className="fas fa-bell me-2"></i>
                  알림 설정
               </h4>
            </div>
            <Card.Body>
               <Form.Group className="mb-3">
                  <Form.Check type="switch" id="enable-notifications" label="시스템 알림 활성화" checked={settings.enableNotifications} onChange={(e) => handleSettingChange('enableNotifications', e.target.checked)} />
                  <Form.Text className="text-muted">시스템 오류, 신고 접수 등의 알림을 받습니다.</Form.Text>
               </Form.Group>
            </Card.Body>
         </Card>

         {/* 저장 버튼 */}
         <div className="text-center">
            <Button variant="primary" size="lg" onClick={handleSaveSettings}>
               <i className="fas fa-save me-2"></i>
               설정 저장
            </Button>
         </div>
      </div>
   )
}

export default SiteManagement
