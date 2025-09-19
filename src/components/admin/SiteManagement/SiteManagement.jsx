import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Form, Button, Alert, Table, Spinner, Modal } from 'react-bootstrap'
import { getSiteSettingsThunk, updateSiteSettingsThunk, getBanWordsThunk, addBanWordThunk, deleteBanWordThunk, getProductsThunk, addProductThunk, deleteProductThunk, getProductListsThunk, addProductListThunk, updateProductListThunk, deleteProductListThunk } from '../../../features/adminSlice'
import styles from '../../../styles/components/admin/admin-common.module.css'

const SiteManagement = () => {
   const dispatch = useDispatch()
   const { settings, banWords, products, productLists = [], loading = {}, error = {} } = useSelector((state) => state.admin)

   const [newBanWord, setNewBanWord] = useState('')
   const [siteSettings, setSiteSettings] = useState(settings || {})
   const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' })
   const [productImage, setProductImage] = useState(null)
   const [productListId, setProductListId] = useState(null)
   const [newProductList, setNewProductList] = useState({ name: '', description: '' })
   const [editingProductListId, setEditingProductListId] = useState(null)
   const [editedProductList, setEditedProductList] = useState({ name: '', description: '' })
   const [showAlert, setShowAlert] = useState(false)
   const [alertMessage, setAlertMessage] = useState('')
   const [alertType, setAlertType] = useState('success')

   // 모-달
   const [showConfirmModal, setShowConfirmModal] = useState(false)
   const [confirmModalMessage, setConfirmModalMessage] = useState('')
   const [confirmAction, setConfirmAction] = useState(null)

   // 데이터 로드
   useEffect(() => {
      dispatch(getSiteSettingsThunk())
      dispatch(getBanWordsThunk())
      dispatch(getProductsThunk())
      dispatch(getProductListsThunk())
   }, [])

   useEffect(() => {
      if (settings) {
         setSiteSettings(settings)
      }
   }, [settings])

   useEffect(() => {
      // productLists가 로딩되지 않았고, 비어있을 때만 실행
      if (productLists.length === 0 && !loading.productLists) {
         const defaultLists = [{ name: '상품권' }, { name: '기프티콘' }, { name: '기타' }]

         defaultLists.forEach((list) => {
            dispatch(addProductListThunk(list))
               .unwrap()
               .then(() => {})
               .catch((error) => {
                  console.error(`기본 상품 분류 '${list.name}' 추가 실패: ${error.message}`)
               })
         })
      }
   }, [dispatch, productLists, loading.productLists])

   const showTimedAlert = (message, type) => {
      setAlertMessage(message)
      setAlertType(type)
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
   }

   // 모달 출력
   const handleShowConfirm = (message, action) => {
      setConfirmModalMessage(message)
      setConfirmAction(() => action)
      setShowConfirmModal(true)
   }

   // 사이트 설정 저장
   const handleSaveSettings = (e) => {
      e.preventDefault()
      dispatch(updateSiteSettingsThunk(siteSettings))
         .unwrap()
         .then(() => {
            showTimedAlert('설정이 성공적으로 저장되었습니다.', 'success')
         })
         .catch((error) => {
            showTimedAlert(`설정 저장 실패: ${error.message}`, 'danger')
         })
   }
   const handleSettingChange = (e) => {
      const { name, value, type, checked } = e.target
      // 숫자 입력 필드의 경우 문자열을 숫자로 변환합니다.
      const finalValue = type === 'number' ? parseInt(value, 10) || 0 : value
      setSiteSettings((prev) => ({
         ...prev,
         [name]: finalValue,
      }))
   }

   // 금지어 추가
   const handleAddBanWord = async () => {
      if (!newBanWord.trim()) {
         showTimedAlert('금지어를 입력해주세요.', 'warning')
         return
      }
      // 중복 확인
      if (banWords.some((item) => item.pattern === newBanWord.trim())) {
         showTimedAlert('이미 등록된 금지어입니다.', 'warning')
         return
      }
      try {
         const banWordData = { pattern: newBanWord.trim() }
         await dispatch(addBanWordThunk(banWordData)).unwrap()
         setNewBanWord('')
         showTimedAlert('금지어가 추가되었습니다.', 'success')
      } catch (error) {
         showTimedAlert(error.message || '금지어 추가에 실패했습니다.', 'danger')
      }
   }

   // 금지어 삭제
   const handleRemoveBanWord = async (banWordId) => {
      if (!window.confirm('정말로 이 금지어를 삭제하시겠습니까?')) {
         return
      }
      try {
         await dispatch(deleteBanWordThunk(banWordId)).unwrap()
         showTimedAlert('금지어가 삭제되었습니다.', 'info')
      } catch (error) {
         showTimedAlert(error.message || '금지어 삭제에 실패했습니다.', 'danger')
      }
   }

   // 상품 추가
   const handleAddProduct = () => {
      if (!newProduct.name || !newProduct.price || !newProduct.stock || !productImage || !productListId) {
         showTimedAlert('모든 필드를 입력하고 이미지를 선택하세요.', 'warning')
         return
      }
      const formData = new FormData()
      formData.append('name', newProduct.name)
      formData.append('price', newProduct.price)
      formData.append('stock', newProduct.stock)
      formData.append('product_img', productImage)
      formData.append('product_list_id', productListId)

      dispatch(addProductThunk(formData))
         .unwrap()
         .then(() => {
            setNewProduct({ name: '', price: '', stock: '' })
            setProductImage(null)
            showTimedAlert('상품이 추가되었습니다.', 'success')
         })
         .catch((err) => {
            showTimedAlert(`상품 추가 실패: ${err.message}`, 'danger')
         })
   }

   // 상품 삭제
   const handleDeleteProduct = (idToRemove) => {
      dispatch(deleteProductThunk(idToRemove))
         .unwrap()
         .then(() => {
            showTimedAlert('상품이 삭제되었습니다.', 'info')
         })
         .catch((error) => {
            showTimedAlert(`상품 삭제 실패: ${error.message}`, 'danger')
         })
   }

   // 상품 분류 관리
   const handleAddProductList = async (e) => {
      e.preventDefault()
      if (!newProductList.name) {
         setAlertMessage('상품 분류 이름을 입력해야 합니다.')
         setAlertType('danger')
         setShowAlert(true)
         return
      }

      try {
         // Redux Thunk를 디스패치하여 상품 분류을 추가합니다.
         await dispatch(addProductListThunk(newProductList)).unwrap()
         setAlertMessage('상품 분류이 성공적으로 추가되었습니다!')
         setAlertType('success')
         setShowAlert(true)
         // 폼 초기화
         setNewProductList({ name: '', description: '' })
         // 최신 목록을 다시 불러옵니다.
         dispatch(getProductListsThunk())
      } catch (error) {
         setAlertMessage(`상품 분류 추가 실패: ${error.message}`)
         setAlertType('danger')
         setShowAlert(true)
      }
   }

   // 상품 분류 수정 시작
   const handleEditProductList = (item) => {
      setEditingProductListId(item.id)
      setEditedProductList({ name: item.name, description: item.description })
   }

   // 상품 분류 수정 완료
   const handleUpdateProductList = async (e) => {
      e.preventDefault()
      try {
         await dispatch(
            updateProductListThunk({
               listId: editingProductListId,
               listData: editedProductList,
            })
         ).unwrap()

         setEditingProductListId(null)
         setEditedProductList({ name: '', description: '' })

         // 성공 알림
         setAlertMessage('상품 분류이 성공적으로 수정되었습니다.')
         setAlertType('success')
         setShowAlert(true)
         setTimeout(() => setShowAlert(false), 3000)
      } catch (error) {
         setAlertMessage(error.message || '상품 분류 수정에 실패했습니다.')
         setAlertType('danger')
         setShowAlert(true)
         setTimeout(() => setShowAlert(false), 3000)
      }
   }

   // 상품 분류 삭제
   const handleDeleteProductList = async (listId) => {
      if (!window.confirm('정말로 이 상품 분류을 삭제하시겠습니까?')) return

      try {
         await dispatch(deleteProductListThunk(listId)).unwrap()
         // 성공 알림
         setAlertMessage('상품 분류이 성공적으로 삭제되었습니다.')
         setAlertType('info')
         setShowAlert(true)
         setTimeout(() => setShowAlert(false), 3000)
      } catch (error) {
         setAlertMessage(error.message || '상품 분류 삭제에 실패했습니다.')
         setAlertType('danger')
         setShowAlert(true)
         setTimeout(() => setShowAlert(false), 3000)
      }
   }

   const isLoading = loading.settings || loading.banWords || loading.products || loading.productLists

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

         {/* 커스텀 확인 모달 */}

         <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
            <Modal.Header closeButton>
               <Modal.Title>확인</Modal.Title>
            </Modal.Header>
            <Modal.Body>{confirmModalMessage}</Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                  취소
               </Button>
               <Button
                  variant="danger"
                  onClick={() => {
                     confirmAction && confirmAction()
                     setShowConfirmModal(false)
                  }}
               >
                  확인
               </Button>
            </Modal.Footer>
         </Modal>

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
                        <Form.Label>일일 로그인 포인트</Form.Label>
                        <Form.Control type="number" name="pointsPerLogin" value={siteSettings?.pointsPerLogin || 0} onChange={handleSettingChange} min="0" />
                        <Form.Text className="text-muted">회원이 하루에 로그인할 때마다 받는 포인트</Form.Text>
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
               <div className="d-grid mt-3">
                  <Button variant="success" type="submit" disabled={loading.settings}>
                     {loading.settings ? <Spinner animation="border" size="sm" /> : '포인트 설정 저장'}
                  </Button>
               </div>
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
                     <Button variant="primary" onClick={handleAddBanWord} className="w-100" disabled={loading.banWords}>
                        {loading.banWords ? <Spinner size="sm" animation="border" /> : '금지어 추가'}
                     </Button>
                  </Col>
               </Row>

               <div className="mb-3">
                  <strong>현재 등록된 금지어 ({banWords?.length || 0}개)</strong>
               </div>

               {loading.banWords ? (
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
                                 <Button variant="outline-danger" size="sm" onClick={() => handleRemoveBanWord(item.id)} disabled={loading.banWords}>
                                    <i className="fas fa-trash"></i> 삭제
                                 </Button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </Table>
               )}

               {!loading && banWords.length === 0 && (
                  <div className="text-center py-4">
                     <i className="fas fa-ban fa-3x text-muted mb-3"></i>
                     <p className="text-muted">등록된 금지어가 없습니다.</p>
                  </div>
               )}
            </Card.Body>
         </Card>

         {/* 포인트 교환 상품 관리 */}

         <Card className={styles.contentCard}>
            <div className={styles.cardHeader}>
               <h4 className={styles.cardTitle}>
                  <i className="fas fa-gift me-2"></i>
                  상품 관리
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
                     <Col md={6} className="mt-3">
                        <Form.Label>상품 분류</Form.Label>
                        <Form.Control as="select" onChange={(e) => setProductListId(e.target.value)} value={productListId || ''}>
                           <option value="">상품 목록을 선택하세요</option>
                           {productLists?.map((list) => (
                              <option key={list.id} value={list.id}>
                                 {list.name}
                              </option>
                           ))}
                        </Form.Control>
                     </Col>
                     <Col md={12} className="mt-3">
                        <Button variant="primary" type="submit" className="w-100" disabled={loading.products || loading.productLists}>
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
         <br />
         <br />

         {/* 상품 분류 관리 */}

         <Card className={styles.contentCard}>
            <div className={styles.cardHeader}>
               <h4 className={styles.cardTitle}>
                  <i className="fas fa-list me-2"></i>
                  상품 분류 관리
               </h4>
            </div>
            <Card.Body>
               {/* 상품 분류 추가 폼 */}
               <Form className="mb-4" onSubmit={handleAddProductList}>
                  <Row className="align-items-end">
                     <Col md={6}>
                        <Form.Label>분류명</Form.Label>
                        <Form.Control type="text" placeholder="분류명 입력" value={newProductList.name} onChange={(e) => setNewProductList({ ...newProductList, name: e.target.value })} />
                     </Col>
                     <Col md={6} className="mt-3">
                        <Button variant="success" type="submit" className="w-100">
                           유형 추가
                        </Button>
                     </Col>
                  </Row>
               </Form>

               {/* 상품 분류 테이블 */}
               <div className="mb-3">
                  <strong>상품 분류({productLists?.length || 0}개)</strong>
               </div>

               {loading.productLists ? (
                  <div className="d-flex justify-content-center my-3">
                     <Spinner animation="border" variant="primary" />
                  </div>
               ) : (
                  <Table responsive className={styles.adminTable}>
                     <thead>
                        <tr>
                           <th>ID</th>
                           <th>분류명</th>
                           <th>관리</th>
                        </tr>
                     </thead>
                     <tbody>
                        {productLists?.length > 0 ? (
                           productLists.map((item) => (
                              <tr key={item.id}>
                                 <td>{item.id}</td>
                                 <td>{editingProductListId === item.id ? <Form.Control type="text" value={editedProductList.name} onChange={(e) => setEditedProductList({ ...editedProductList, name: e.target.value })} autoFocus /> : item.name}</td>
                                 <td>
                                    {editingProductListId === item.id ? (
                                       <>
                                          <Button variant="success" size="sm" className="me-2" onClick={handleUpdateProductList}>
                                             <i className="fas fa-check"></i> 완료
                                          </Button>
                                          <Button variant="secondary" size="sm" onClick={() => setEditingProductListId(null)}>
                                             <i className="fas fa-times"></i> 취소
                                          </Button>
                                       </>
                                    ) : (
                                       <>
                                          <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditProductList(item)} disabled={loading.productLists}>
                                             <i className="fas fa-edit"></i> 수정
                                          </Button>
                                          <Button variant="danger" size="sm" onClick={() => handleDeleteProductList(item.id)} disabled={loading.productLists}>
                                             <i className="fas fa-trash"></i> 삭제
                                          </Button>
                                       </>
                                    )}
                                 </td>
                              </tr>
                           ))
                        ) : (
                           <tr>
                              <td colSpan="3" className="text-center">
                                 <i className="fas fa-list fa-3x text-muted mb-3"></i>
                                 <p className="text-muted">등록된 상품 분류이 없습니다.</p>
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
