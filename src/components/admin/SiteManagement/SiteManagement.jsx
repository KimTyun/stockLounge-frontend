import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Form, Button, Alert, Table, Spinner } from 'react-bootstrap'
import { getSiteSettingsThunk, updateSiteSettingsThunk, getBanWordsThunk, addBanWordThunk, deleteBanWordThunk, getProductsThunk, addProductThunk, deleteProductThunk } from '../../../features/adminSlice'
import styles from '../../../styles/components/admin/admin-common.module.css'

const SiteManagement = () => {
   const dispatch = useDispatch()
   const { settings, products, loading } = useSelector((state) => state.admin)
   const { banWords, banWordsLoading, banWordsError } = useSelector((state) => state.admin)

   const [newBanWord, setNewBanWord] = useState('')
   const [siteSettings, setSiteSettings] = useState(settings || {})
   const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' })
   const [productImage, setProductImage] = useState(null)
   const [showAlert, setShowAlert] = useState(false)
   const [alertMessage, setAlertMessage] = useState('')
   const [alertType, setAlertType] = useState('success')

   useEffect(() => {
      dispatch(getSiteSettingsThunk())
      dispatch(getBanWordsThunk())
      dispatch(getProductsThunk())
   }, [dispatch])

   useEffect(() => {
      if (banWordsError) {
         setAlertMessage(banWordsError.message || '오류가 발생했습니다.')
         setAlertType('danger')
         setShowAlert(true)
         setTimeout(() => setShowAlert(false), 3000)
      }
   }, [banWordsError])

   const showAlertMessage = (message, type) => {
      setAlertMessage(message)
      setAlertType(type)
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
   }

   // 사이트 설정 저장
   const handleSaveSettings = () => {
      dispatch(updateSiteSettingsThunk(settings))
         .unwrap()
         .then(() => {
            showAlertMessage('설정이 성공적으로 저장되었습니다.', 'success')
         })
         .catch((error) => {
            showAlertMessage(`설정 저장 실패: ${error.message}`, 'danger')
         })
   }
   const handleSettingChange = (e) => {
      const { name, value, type, checked } = e.target
      const finalValue = type === 'checkbox' ? checked : value
      setSiteSettings((prev) => ({
         ...prev,
         [name]: finalValue,
      }))
   }

   // 금지어 추가
   const handleAddBanWord = async () => {
      if (!newBanWord.trim()) {
         setAlertMessage('금지어를 입력해주세요.')
         setAlertType('warning')
         setShowAlert(true)
         setTimeout(() => setShowAlert(false), 3000)
         return
      }

      // 금지어 중복 체크
      if (banWords.some((item) => item.pattern === newBanWord.trim())) {
         setAlertMessage('이미 등록된 금지어입니다.')
         setAlertType('warning')
         setShowAlert(true)
         setTimeout(() => setShowAlert(false), 3000)
         return
      }
      try {
         const banWordData = {
            pattern: newBanWord.trim(),
         }
         console.log('전송될 금지어 데이터:', banWordData)
         await dispatch(addBanWordThunk(banWordData)).unwrap()

         setNewBanWord('')
         setAlertMessage('금지어가 추가되었습니다.')
         setAlertType('success')
         setShowAlert(true)
         setTimeout(() => setShowAlert(false), 3000)
      } catch (error) {
         setAlertMessage(error.message || '금지어 추가에 실패했습니다.')
         setAlertType('danger')
         setShowAlert(true)
         setTimeout(() => setShowAlert(false), 3000)
      }
   }

   // 금지어 삭제
   const handleRemoveBanWord = async (banWordId) => {
      if (!window.confirm('정말로 이 금지어를 삭제하시겠습니까?')) {
         return
      }

      try {
         await dispatch(deleteBanWordThunk(banWordId)).unwrap()

         setAlertMessage('금지어가 삭제되었습니다.')
         setAlertType('info')
         setShowAlert(true)
         setTimeout(() => setShowAlert(false), 3000)
      } catch (error) {
         setAlertMessage(error.message || '금지어 삭제에 실패했습니다.')
         setAlertType('danger')
         setShowAlert(true)
         setTimeout(() => setShowAlert(false), 3000)
      }
   }

   // 교환품 추가
   const handleAddProduct = () => {
      if (!newProduct.name || !newProduct.price || !newProduct.stock || !productImage) {
         showAlertMessage('모든 필드를 입력하고 이미지를 선택하세요.', 'warning')
         return
      }
      const formData = new FormData()
      formData.append('name', newProduct.name)
      formData.append('price', newProduct.price)
      formData.append('stock', newProduct.stock)
      formData.append('product_img', productImage)

      dispatch(addProductThunk(formData))
         .unwrap()
         .then(() => {
            setNewProduct({ name: '', price: '', stock: '' })
            setProductImage(null)
            showAlertMessage('상품이 추가되었습니다.', 'success')
         })
         .catch((err) => {
            console.error('   :', err)
            showAlertMessage(`상품 추가 실패: ${err.message}`, 'danger')
         })
   }

   // 교환품 삭제
   const handleDeleteProduct = (idToRemove) => {
      dispatch(deleteProductThunk(idToRemove))
         .unwrap()
         .then(() => {
            showAlertMessage('상품이 삭제되었습니다.', 'info')
         })
         .catch((error) => {
            showAlertMessage(`상품 삭제 실패: ${error.message}`, 'danger')
         })
   }

   const isLoading = loading.settings || loading.banWords || loading.products

   if (isLoading) {
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
                        <Form.Control type="text" name="siteName" value={siteSettings?.siteName || ''} onChange={handleSettingChange} />
                     </Form.Group>
                  </Col>
                  <Col md={6}>
                     <Form.Group className="mb-3">
                        <Form.Label>사이트 설명</Form.Label>
                        <Form.Control type="text" name="siteDescription" value={siteSettings?.siteDescription || ''} onChange={handleSettingChange} />
                     </Form.Group>
                  </Col>
               </Row>
               <Row>
                  <Col md={6}>
                     <Form.Group className="mb-3">
                        <Form.Check type="switch" id="maintenance-mode" name="maintenanceMode" label="유지보수 모드" checked={!!siteSettings?.maintenanceMode} onChange={handleSettingChange} />
                        <Form.Text className="text-muted">활성화 시 사이트에 접근할 수 없습니다.</Form.Text>
                     </Form.Group>
                  </Col>
                  <Col md={6}>
                     <Form.Group className="mb-3">
                        <Form.Check type="switch" id="allow-registration" name="allowRegistration" label="회원가입 허용" checked={!!siteSettings?.allowRegistration} onChange={handleSettingChange} />
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
                        <Form.Control type="number" name="pointsPerPost" value={siteSettings?.pointsPerPost || 0} onChange={handleSettingChange} min="0" />
                     </Form.Group>
                  </Col>
                  <Col md={3}>
                     <Form.Group className="mb-3">
                        <Form.Label>댓글 작성 포인트</Form.Label>
                        <Form.Control type="number" name="pointsPerComment" value={siteSettings?.pointsPerComment || 0} onChange={handleSettingChange} min="0" />
                     </Form.Group>
                  </Col>
                  <Col md={3}>
                     <Form.Group className="mb-3">
                        <Form.Label>추천 받기 포인트</Form.Label>
                        <Form.Control type="number" name="pointsPerLike" value={siteSettings?.pointsPerLike || 0} onChange={handleSettingChange} min="0" />
                     </Form.Group>
                  </Col>
                  <Col md={3}>
                     <Form.Group className="mb-3">
                        <Form.Label>코인 교환 비율</Form.Label>
                        <Form.Control type="number" name="coinExchangeRate" value={siteSettings?.coinExchangeRate || 1} onChange={handleSettingChange} min="1" />
                        <Form.Text className="text-muted">{siteSettings?.coinExchangeRate || 1}포인트 = 1코인</Form.Text>
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
                        <Form.Control type="number" name="maxPostsPerDay" value={siteSettings?.maxPostsPerDay || 0} onChange={handleSettingChange} min="1" />
                        <Form.Text className="text-muted">회원이 하루에 작성할 수 있는 최대 게시글 수</Form.Text>
                     </Form.Group>
                  </Col>
                  <Col md={6}>
                     <Form.Group className="mb-3">
                        <Form.Label>일일 댓글 작성 제한</Form.Label>
                        <Form.Control type="number" name="maxCommentsPerDay" value={siteSettings?.maxCommentsPerDay || 0} onChange={handleSettingChange} min="1" />
                        <Form.Text className="text-muted">회원이 하루에 작성할 수 있는 최대 댓글 수</Form.Text>
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
                  <Col md={9}>
                     <Form.Control type="text" placeholder="추가할 금지어를 입력하세요" value={newBanWord} onChange={(e) => setNewBanWord(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAddBanWord()} />
                  </Col>
                  <Col md={3}>
                     <Button variant="primary" onClick={handleAddBanWord} className="w-100" disabled={banWordsLoading}>
                        {banWordsLoading ? <Spinner size="sm" /> : '금지어 추가'}
                     </Button>
                  </Col>
               </Row>

               <div className="mb-3">
                  <strong>현재 등록된 금지어 ({banWords?.length || 0}개)</strong>
               </div>

               {banWordsLoading ? (
                  <div className="text-center py-4">
                     <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                     </Spinner>
                  </div>
               ) : (
                  <Table responsive className={styles.adminTable}>
                     <thead>
                        <tr>
                           <th>번호</th>
                           <th>금지어</th>
                           <th>관리</th>
                        </tr>
                     </thead>
                     <tbody>
                        {banWords.map((item, index) => (
                           <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td>
                                 <strong>{item.pattern}</strong>
                              </td>
                              <td>
                                 <Button variant="outline-danger" size="sm" onClick={() => handleRemoveBanWord(item.id)} disabled={banWordsLoading}>
                                    <i className="fas fa-trash"></i> 삭제
                                 </Button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </Table>
               )}

               {!banWordsLoading && banWords.length === 0 && (
                  <div className="text-center py-4">
                     <i className="fas fa-ban fa-3x text-muted mb-3"></i>
                     <p className="text-muted">등록된 금지어가 없습니다.</p>
                  </div>
               )}
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
                        <Form.Control type="number" placeholder="포인트" value={newProduct.price} onChange={(e) => setNewProduct((prev) => ({ ...prev, price: parseInt(e.target.value) }))} min="0" />
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
                        <Button variant="primary" type="submit" className="w-100" disabled={loading.products}>
                           상품 추가
                        </Button>
                     </Col>
                  </Row>
               </Form>
               <div className="mb-3">
                  <strong>등록된 교환 상품({products?.length || 0}개)</strong>
               </div>
               {loading.products ? (
                  <div className="d-flex justify-content-center my-3">
                     <Spinner animation="border" variant="primary" />
                  </div>
               ) : (
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
                                 <td>{item.price}</td>
                                 <td>{item.stock}</td>
                                 <td>{item.product_img && <img src={`${import.meta.env.VITE_API_URL}${item.product_img}`} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />}</td>
                                 <td>
                                    <Button variant="danger" onClick={() => handleDeleteProduct(item.id)} disabled={loading.products}>
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
               )}
            </Card.Body>
         </Card>

         {/* 저장 버튼 */}
         <div className="text-center">
            <Button variant="primary" size="lg" onClick={handleSaveSettings} disabled={loading.settings}>
               <i className="fas fa-save me-2"></i>
               설정 저장
            </Button>
         </div>
      </div>
   )
}

export default SiteManagement
