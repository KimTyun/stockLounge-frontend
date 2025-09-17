import React, { useState } from 'react'
import { Card, Form, Button, Row, Col } from 'react-bootstrap'
import styles from '../../styles/pages/User.module.css'

const EditTab = ({ userData }) => {
   const [form, setForm] = useState({
      nickname: userData.nickname || '',
      phoneNumber: userData.phoneNumber || '',
      email: userData.email || '',
      address: userData.address || '',
      detailAddress: userData.detailAddress || '',
   })

   const handleChange = (e) => {
      const { name, value } = e.target
      setForm((prev) => ({ ...prev, [name]: value }))
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      // TODO: 저장 로직 구현
      alert('개인정보가 저장되었습니다. (실제 저장 기능은 미구현)')
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
