import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Card, Form, Button, Alert, Table, Spinner } from 'react-bootstrap'
import { getSiteSettingsThunk, updateSiteSettingsThunk, getBanWordsThunk, addBanWordThunk, deleteBanWordThunk, getProductsThunk, addProductThunk, deleteProductThunk } from '../../../features/adminSlice'
import styles from '../../../styles/components/admin/admin-common.module.css'

const SiteManagement = () => {
   const dispatch = useDispatch()
   const { settings: initialSettings, banWords, products, loading } = useSelector((state) => state.admin)

   useEffect(() => {
      // Redux 스토어에서 설정을 불러와 로컬 상태에 저장
      if (initialSettings) {
         setSettings(initialSettings)
      }
   }, [initialSettings])

   useEffect(() => {
      dispatch(getSiteSettingsThunk())
      dispatch(getBanWordsThunk())
      dispatch(getProductsThunk())
   }, [dispatch])

   const [newBanWord, setNewBanWord] = useState('')
   const [newProduct, setNewProduct] = useState({ name: '', points: 0, stock: 0 })
   const [settings, setSettings] = useState({})
   const [showAlert, setShowAlert] = useState(false)
   const [alertMessage, setAlertMessage] = useState('')
   const [alertType, setAlertType] = useState('success')
   const [productImage, setProductImage] = useState(null)

   const handleSettingChange = (key, value) => {
      setSettings((prev) => ({
         ...prev,
         [key]: value,
      }))
   }

   // 사이트 설정 저장
   const handleSaveSettings = () => {
      // settings 상태 객체를 통째로 Thunk에 전달
      dispatch(updateSiteSettingsThunk(settings))
      setAlertMessage('설정이 성공적으로 저장되었습니다.')
      setAlertType('success')
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
   }

   // 금지어 추가
   const handleAddBanWord = () => {
      if (newBanWord.trim()) {
         // Thunk에 추가할 금지어(문자열)를 전달
         dispatch(addBanWordThunk(newBanWord.trim()))
            .unwrap()
            .then(() => {
               setNewBanWord('')
               setAlertMessage('금지어가 추가되었습니다.')
               setAlertType('success')
               setShowAlert(true)
               setTimeout(() => setShowAlert(false), 3000)
            })
            .catch((error) => {
               setAlertMessage(`금지어 추가 실패: ${error.message}`)
               setAlertType('danger')
               setShowAlert(true)
            })
      }
   }

   // 금지어 삭제
   const handleRemoveBanWord = (wordId) => {
      dispatch(deleteBanWordThunk(wordId))
         .unwrap()
         .then(() => {
            setAlertMessage('금지어가 삭제되었습니다.')
            setAlertType('info')
            setShowAlert(true)
            setTimeout(() => setShowAlert(false), 3000)
         })
         .catch((error) => {
            setAlertMessage(`금지어 삭제 실패: ${error.message}`)
            setAlertType('danger')
            setShowAlert(true)
         })
   }

   // 교환품 추가
   const handleAddProduct = () => {
      if (!newProduct.name || !newProduct.points || !newProduct.stock || !productImage) {
         alert('모든 필드를 입력하고 이미지를 선택하세요.')
         return
      }
      const formData = new FormData()
      formData.append('name', newProduct.name)
      formData.append('points', newProduct.points)
      formData.append('stock', newProduct.stock)
      formData.append('product_img', productImage)

      dispatch(addProductThunk(formData))
         .unwrap()
         .then(() => {
            // 성공 시 입력 필드 초기화
            setNewProduct({ name: '', points: '', stock: '' })
            setProductImage(null)
         })
         .catch((err) => {
            console.error('Failed to add product:', err)
         })
   }

   useEffect(() => {
      dispatch(getProductsThunk())
   }, [dispatch])

   // 교환품 삭제
   const handleDeleteProduct = (idToRemove) => {
      // idToRemove를 Thunk에 전달하여 삭제 요청
      dispatch(deleteProductThunk(idToRemove))
         .unwrap()
         .then(() => {
            setAlertMessage('상품이 삭제되었습니다.')
            setAlertType('info')
            setShowAlert(true)
            setTimeout(() => setShowAlert(false), 3000)
         })
         .catch((error) => {
            setAlertMessage(`상품 삭제 실패: ${error.message}`)
            setAlertType('danger')
            setShowAlert(true)
         })
   }

   if (loading.settings || loading.banWords || loading.products) {
      return (
         <div className="text-center py-5">
            <Spinner animation="border" role="status">
               <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-2">데이터를 불러오는 중입니다...</p>
         </div>
      )
   }

   return (
      <div className={styles.adminContainer}>
         <h1 className={styles.adminTitle}>사이트 관리</h1>
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

         {/* 이용 제한 설정 */}
         <Card className={styles.contentCard}>
            <div className={styles.cardHeader}>
               <h4 className={styles.cardTitle}>
                  <i className="fas fa-user-shield me-2"></i>
                  이용 제한 설정
               </h4>
            </div>
            <Card.Body>
               <Row>
                  <Col md={6}>
                     <Form.Group className="mb-3">
                        <Form.Label>일일 게시글 작성 제한</Form.Label>
                        <Form.Control type="number" value={settings.maxPostsPerDay} onChange={(e) => handleSettingChange('maxPostsPerDay', parseInt(e.target.value))} min="1" />
                        <Form.Text className="text-muted">회원이 하루에 작성할 수 있는 최대 게시글 수</Form.Text>
                     </Form.Group>
                  </Col>
                  <Col md={6}>
                     <Form.Group className="mb-3">
                        <Form.Label>일일 댓글 작성 제한</Form.Label>
                        <Form.Control type="number" value={settings.maxCommentsPerDay} onChange={(e) => handleSettingChange('maxCommentsPerDay', parseInt(e.target.value))} min="1" />
                        <Form.Text className="text-muted">회원이 하루에 작성할 수 있는 최대 댓글 수</Form.Text>
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
                  <strong>현재 등록된 금지어 ({banWords?.length || 0}개)</strong>
               </div>
               <Table responsive className={styles.adminTable}>
                  <thead>
                     <tr>
                        <th>금지어</th>
                        <th>관리</th>
                     </tr>
                  </thead>
                  <tbody>
                     {banWords && banWords.length > 0 ? (
                        banWords.map((item, index) => (
                           <tr key={item.id}>
                              <td>
                                 <strong>{item.pattern}</strong>
                              </td>
                              <td>
                                 <Button variant="outline-danger" size="sm" onClick={() => handleRemoveBanWord(item.id)}>
                                    <i className="fas fa-trash"></i> 삭제
                                 </Button>
                              </td>
                           </tr>
                        ))
                     ) : (
                        <tr>
                           <td colSpan="3" className="text-center">
                              <i className="fas fa-ban fa-2x text-muted mb-2"></i>
                              <p className="text-muted mb-0">등록된 금지어가 없습니다.</p>
                           </td>
                        </tr>
                     )}
                  </tbody>
               </Table>
            </Card.Body>
         </Card>

         {/* 포인트 교환 관리 */}

         <Card className={styles.contentCard}>
            <div className={styles.cardHeader}>
               <h4 className={styles.cardTitle}>
                  <i className="fas fa-gift me-2"></i>
                  교환품 관리
               </h4>
            </div>
            <Card.Body>
               <Form
                  className="mb-4"
                  onSubmit={(e) => {
                     e.preventDefault()
                     handleAddProduct()
                  }}
               >
                  <Row className="align-items-end">
                     <Col md={3}>
                        <Form.Label>상품명</Form.Label>
                        <Form.Control type="text" placeholder="상품명 입력" value={newProduct.name} onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))} />
                     </Col>
                     <Col md={3}>
                        <Form.Label>필요 포인트</Form.Label>
                        <Form.Control type="number" placeholder="포인트" value={newProduct.points} onChange={(e) => setNewProduct((prev) => ({ ...prev, points: parseInt(e.target.value) }))} min="0" />
                     </Col>
                     <Col md={3}>
                        <Form.Label>재고</Form.Label>
                        <Form.Control type="number" placeholder="재고" value={newProduct.stock} onChange={(e) => setNewProduct((prev) => ({ ...prev, stock: parseInt(e.target.value) }))} min="0" />
                     </Col>
                     <Col md={3}>
                        <Form.Label>이미지</Form.Label>
                        <Form.Control type="file" onChange={(e) => setProductImage(e.target.files[0])} accept="image/*" />
                     </Col>
                     <Col md={12} className="mt-3">
                        <Button variant="primary" type="submit" className="w-100">
                           상품 추가
                        </Button>
                     </Col>
                  </Row>
               </Form>
               <div className="mb-3">
                  <strong>등록된 교환 상품({products.length}개)</strong>
               </div>
               <Table responsive className={styles.adminTable}>
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>상품명</th>
                        <th>필요 포인트</th>
                        <th>재고 수량</th>
                        <th>이미지</th>
                        <th>관리</th>
                     </tr>
                  </thead>
                  <tbody>
                     {products.length > 0 ? (
                        products.map((item) => (
                           <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.name}</td>
                              <td>{item.points}</td>
                              <td>{item.stock}</td>
                              <td>{item.product_img && <img src={`${import.meta.env.VITE_API_URL}${item.product_img}`} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />}</td>
                              <td>
                                 <Button variant="danger" onClick={() => handleDeleteProduct(item.id)}>
                                    <i className="fas fa-trash"></i> 삭제
                                 </Button>
                              </td>
                           </tr>
                        ))
                     ) : (
                        <tr>
                           <td colSpan="6" className="text-center">
                              <i className="fas fa-gift fa-3x text-muted mb-3"></i>
                              <p className="text-muted">등록된 상품이 없습니다.</p>
                           </td>
                        </tr>
                     )}
                  </tbody>
               </Table>
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
