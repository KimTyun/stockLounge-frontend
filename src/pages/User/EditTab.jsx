import React, { useState } from 'react'
import { Card, Form, Button, Row, Col } from 'react-bootstrap'
import styles from '../../styles/pages/User.module.css'
import DaumPostcodeEmbed, { useDaumPostcodePopup } from 'react-daum-postcode'

const EditTab = ({ userData }) => {
   const [form, setForm] = useState({
      nickname: userData.nickname || '',
      phoneNumber: userData.phoneNumber || '',
      email: userData.email || '',
      address: userData.address || '',
      detailAddress: userData.detailAddress || '',
      // 2차 비밀번호는 삭제
   })
   const open = useDaumPostcodePopup()

   // 다음 우편번호 서비스 연동이 제한될 경우, address 입력은 일반 input으로 둠
   // 실제 연동 시, 아래 address input 대신 다음 우편번호 팝업을 띄우는 로직을 추가하면 됨

   const handleChange = (e) => {
      const { name, value } = e.target
      setForm((prev) => ({ ...prev, [name]: value }))
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      // TODO: 저장 로직 구현
      alert('개인정보가 저장되었습니다. (실제 저장 기능은 미구현)')
   }

   const handleAddress = () => {
      open({ onComplete: handleComplete })
   }

   const handleComplete = (data) => {
      console.log(data)
      setForm((prev) => ({ ...prev, address: data.roadAddress }))
   }

   return (
      <Card className={styles.contentCard}>
         <Card.Body>
            <h4>개인정보 수정</h4>
            <Form className={styles.editForm} onSubmit={handleSubmit} autoComplete="off">
               <div className={styles.formGroup}>
                  <Form.Label>닉네임</Form.Label>
                  <Form.Control type="text" name="nickname" value={form.nickname} onChange={handleChange} maxLength={20} required />
               </div>
               <div className={styles.formGroup}>
                  <Form.Label>이메일</Form.Label>
                  <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
               </div>
               <div className={styles.formGroup}>
                  <Form.Label>전화번호</Form.Label>
                  <Form.Control type="text" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} maxLength={20} required />
               </div>
               <Row>
                  <Col md={8}>
                     <div className={styles.formGroup}>
                        <Form.Label>주소</Form.Label>
                        <Form.Control
                           type="text"
                           name="address"
                           value={form.address}
                           onChange={handleChange}
                           placeholder="주소 검색 또는 입력"
                           required
                           // 실제 다음 우편번호 연동 시 readOnly로 두고, 버튼 클릭 시 주소 입력
                        />
                     </div>
                  </Col>
                  <Col md={4} className="d-flex align-items-end">
                     {/* 실제 연동 시 아래 버튼에 다음 우편번호 팝업 오픈 이벤트 연결 */}
                     <Button variant="outline-primary" type="button" style={{ width: '100%' }} onClick={handleAddress}>
                        주소 검색
                     </Button>
                  </Col>
               </Row>
               <div className={styles.formGroup}>
                  <Form.Label>상세주소</Form.Label>
                  <Form.Control type="text" name="detailAddress" value={form.detailAddress} onChange={handleChange} maxLength={50} />
               </div>
               <div className="text-end mt-4">
                  <Button type="submit" variant="primary">
                     저장
                  </Button>
               </div>
            </Form>
         </Card.Body>
      </Card>
   )
}

export default EditTab
