import React, { useEffect, useMemo, useState } from 'react'
import { Card, Row, Col, Image, Button, Badge, Table, Pagination } from 'react-bootstrap'
import styles from '../../styles/pages/User.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getMeThunk, getMyRewardThunk, updateMeThunk, updateMyProfileThunk } from '../../features/userSlice'
import dayjs from 'dayjs'

const InfoTab = () => {
   const [activePage, setActivePage] = useState(1)
   const [changeReady, setChangeReady] = useState(false)
   const [newNickname, setNewNickname] = useState('')
   const [nicknameErr, setNicknameErr] = useState('')
   const dispatch = useDispatch()
   const { user, data, error } = useSelector((state) => state.user)
   const [totalPage, setTotalPage] = useState(1)
   //내정보 가져오기
   useEffect(() => {
      dispatch(getMeThunk())
      dispatch(getMyRewardThunk())
         .unwrap()
         .then((result) => {
            setTotalPage(Math.ceil(result.data.count / 10))
         })
   }, [dispatch, setTotalPage])

   const handlePage = (pageNumber) => {
      return () => {
         if (pageNumber < 1 || pageNumber > totalPage) return
         dispatch(getMyRewardThunk({ limit: 10, page: pageNumber }))
         setActivePage(pageNumber)
      }
   }

   const handleChangeProfile = (e) => {
      const file = e.target.files[0]
      if (!file) return

      const formData = new FormData()
      const newFile = new File([file], encodeURIComponent(file.name), { type: file.type })
      formData.append('file', newFile)
      dispatch(updateMyProfileThunk(formData))
         .unwrap()
         .then(() => {
            dispatch(getMeThunk())
            e.target.value = ''
         })
   }

   const handleChangeNickname = () => {
      if (/\s/.test(newNickname)) {
         setNicknameErr('공백을 포함할 수 없습니다.')
         return
      }
      const trimmedNickname = newNickname.trim()
      if (trimmedNickname.length === 0) {
         setNicknameErr('닉네임을 입력해주세요.')
         return
      }
      if (trimmedNickname.length < 2) {
         setNicknameErr('닉네임은 최소 2자 이상이어야 합니다.')
         return
      }

      dispatch(updateMeThunk({ name: newNickname }))
         .unwrap()
         .then(() => {
            setChangeReady((prev) => !prev)
            dispatch(getMeThunk())
         })
   }

   const pageItems = useMemo(() => {
      const items = []
      items.push(
         <Pagination.Item key={1} active={1 === activePage} onClick={handlePage(1)}>
            1
         </Pagination.Item>
      )
      if (activePage > 4) {
         items.push(<Pagination.Ellipsis key="start-ellipsis" disabled></Pagination.Ellipsis>)
      }

      const start = Math.max(2, activePage - 2)
      const end = Math.min(totalPage - 1, activePage + 2)

      for (let number = start; number <= end; number++) {
         items.push(
            <Pagination.Item key={number} active={number === activePage} onClick={handlePage(number)}>
               {number}
            </Pagination.Item>
         )
      }
      if (activePage < totalPage - 3) {
         items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />)
      }

      if (totalPage > 1) {
         items.push(
            <Pagination.Item key={totalPage} active={totalPage === activePage} onClick={handlePage(totalPage)}>
               {totalPage}
            </Pagination.Item>
         )
      }
      return items
   }, [activePage, totalPage])

   if (!(user && data.reward)) return <p>로딩중</p>

   if (error) return <p>{error}</p>

   if (user && data.reward)
      return (
         <>
            <Card className={styles.contentCard}>
               <Card.Body className={styles.profileSection}>
                  <Row>
                     <Col md={4} className={`text-center ${styles.profileDiv}`}>
                        <div className={styles.profileImageSection}>
                           <Image
                              src={user.profile_img.startsWith('http') ? user.profile_img : `${import.meta.env.VITE_API_URL}${user.profile_img}`}
                              roundedCircle
                              className={styles.profileImage}
                              onError={(e) => {
                                 e.target.src =
                                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSI3NSIgY3k9Ijc1IiByPSI3NSIgZmlsbD0iI2Y4ZjlmYSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UHJvZmlsZTwvdGV4dD4KPC9zdmc+'
                              }}
                           />
                           <div className={styles.profileActions}>
                              <Button as="label" htmlFor="profile_img" variant="outline-primary" size="sm" className={styles.changePhotoBtn}>
                                 사진 변경
                              </Button>

                              <input type="file" name="" id="profile_img" hidden accept="image/*" onChange={handleChangeProfile} />
                           </div>
                        </div>
                     </Col>
                     <Col md={8}>
                        <div className={styles.profileInfo}>
                           <h3 className={styles.nickname}>내정보</h3>
                           <div className={styles.userDetails}>
                              <div className={`${styles.detailItem} ${styles.nameChange}`}>
                                 <span>
                                    <strong>닉네임: </strong>
                                    {!changeReady && user.name}
                                    <input
                                       type="text"
                                       name=""
                                       id="nickname"
                                       value={newNickname}
                                       onChange={(e) => {
                                          setNewNickname(e.target.value)
                                       }}
                                       hidden={!changeReady}
                                       maxLength={8}
                                    />
                                    {nicknameErr && <span style={{ color: 'red' }}>{nicknameErr}</span>}
                                 </span>
                                 <Button
                                    className={styles.nameChange}
                                    hidden={changeReady}
                                    onClick={() => {
                                       setChangeReady((prev) => !prev)
                                       setNewNickname(user.name)
                                    }}
                                 >
                                    변경
                                 </Button>
                                 <div hidden={!changeReady} className={styles.buttonWrap}>
                                    <Button variant="success" className={styles.nameChange} hidden={!changeReady} onClick={handleChangeNickname}>
                                       적용
                                    </Button>
                                    <Button
                                       variant="warning"
                                       className={styles.nameChange}
                                       hidden={!changeReady}
                                       onClick={() => {
                                          setChangeReady((prev) => !prev)
                                          setNicknameErr('')
                                       }}
                                    >
                                       취소
                                    </Button>
                                 </div>
                              </div>
                              <div className={styles.detailItem}>
                                 <span>
                                    <strong>이메일:</strong> {user.email}
                                 </span>
                              </div>
                              <div className={styles.detailItem}>
                                 <span>
                                    <strong>가입일:</strong> {dayjs(user.createdAt).format('YYYY-MM-DD')}
                                 </span>
                              </div>
                              <div className={styles.detailItem}>
                                 <span>
                                    <strong>SLC:</strong>
                                    {data.reward.coin}
                                 </span>
                              </div>
                              <div className={styles.detailItem}>
                                 <span>
                                    <strong>지갑주소:</strong>
                                    {user.wallet}
                                 </span>
                              </div>
                           </div>
                        </div>
                     </Col>
                  </Row>
                  <hr />
                  <Row>
                     <Col md={6}>
                        <Card className={styles.pointCard}>
                           <Card.Body className="text-center">
                              <h5>누적 획득 포인트</h5>
                              <span className={styles.totalPoints}>{data.reward.accumulated_point.toLocaleString()}P</span>
                           </Card.Body>
                        </Card>
                     </Col>
                     <Col md={6}>
                        <Card className={styles.pointCard}>
                           <Card.Body className="text-center">
                              <h5>현재 보유 포인트</h5>
                              <span className={styles.currentPoints}>{data.reward.point.toLocaleString()}P</span>
                           </Card.Body>
                        </Card>
                     </Col>
                  </Row>
                  <hr />
                  <Card className={styles.contentCard}>
                     <Card.Header>
                        <h4>포인트 내역</h4>
                     </Card.Header>
                     <Card.Body className={styles.historyBody}>
                        <Table responsive className={`${styles.historyTable} ${styles.pointHistory}`}>
                           <colgroup>
                              <col />
                              <col />
                              <col />
                              <col />
                           </colgroup>
                           <thead>
                              <tr>
                                 <th>구분</th>
                                 <th>내용</th>
                                 <th>포인트</th>
                                 <th>일시</th>
                              </tr>
                           </thead>
                           <tbody>
                              {data.reward.data.map((history) => (
                                 <tr key={history.id}>
                                    <td>
                                       <Badge bg={history.change > 0 ? 'success' : 'danger'} className={styles.typeBadge}>
                                          {history.change > 0 ? '획득' : '사용'}
                                       </Badge>
                                    </td>
                                    <td className={styles.tdwrap}>{history.reason}</td>
                                    <td className={history.change > 0 ? styles.gainPoints : styles.lossPoints}>{history.change}</td>
                                    <td className={styles.historyDate}>{dayjs(history.createdAt).format('YY.MM.DD H:mm:ss')}</td>
                                 </tr>
                              ))}
                           </tbody>
                        </Table>
                     </Card.Body>

                     <Pagination className="pagination-sm justify-content-center">
                        <Pagination.First onClick={handlePage(1)} />
                        <Pagination.Prev onClick={handlePage(activePage - 1)} className={styles.smallPagenation} />
                        {pageItems}
                        <Pagination.Next onClick={handlePage(activePage + 1)} className={styles.smallPagenation} />
                        <Pagination.Last onClick={handlePage(totalPage)} />
                     </Pagination>
                  </Card>
               </Card.Body>
            </Card>
         </>
      )
}

export default InfoTab
