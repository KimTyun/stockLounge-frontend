import React, { useEffect, useMemo, useState } from 'react'
import { Card, Table, Badge, Pagination } from 'react-bootstrap'
import styles from '../../styles/pages/User.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getMyCommentsThunk, getMyPostsThunk } from '../../features/userSlice'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

const PostTab = () => {
   const [activePostPage, setActivePostPage] = useState(1)
   const [activeCommentPage, setActiveCommentPage] = useState(1)

   const [totalPostPage, setTotalPostPage] = useState(1)
   const [totalCommentsPage, setTotalCommentsPage] = useState(1)

   const dispatch = useDispatch()
   const { data, error } = useSelector((state) => state.user)
   //데이터 가져오기
   useEffect(() => {
      dispatch(getMyCommentsThunk())
         .unwrap()
         .then((result) => {
            const count = result.data.count
            const page = count ? Math.ceil(count / 10) : 1
            setTotalCommentsPage(page)
         })
      dispatch(getMyPostsThunk())
         .unwrap()
         .then((result) => {
            const count = result.data.count
            const page = count ? Math.ceil(count / 10) : 1
            setTotalPostPage(page)
         })
   }, [dispatch])

   const handlePostPage = (pageNumber) => {
      return () => {
         setActivePostPage(pageNumber)
      }
   }
   const handleCommentPage = (pageNumber) => {
      return () => {
         setActiveCommentPage(pageNumber)
      }
   }
   const postPageItems = useMemo(() => {
      const items = []
      items.push(
         <Pagination.Item key={1} active={1 === activePostPage} onClick={handlePostPage(1)}>
            1
         </Pagination.Item>
      )
      if (activePostPage > 4) {
         items.push(<Pagination.Ellipsis key="start-ellipsis" disabled></Pagination.Ellipsis>)
      }
      const start = Math.max(2, activePostPage - 2)
      const end = Math.min(totalPostPage - 1, activePostPage + 2)

      for (let number = start; number <= end; number++) {
         items.push(
            <Pagination.Item key={number} active={number === activePostPage} onClick={handlePostPage(number)}>
               {number}
            </Pagination.Item>
         )
      }
      if (activePostPage < totalPostPage - 3) {
         items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />)
      }
      if (totalPostPage !== 1) {
         items.push(
            <Pagination.Item key={totalPostPage} active={totalPostPage === activePostPage} onClick={handlePostPage(totalPostPage)}>
               {totalPostPage}
            </Pagination.Item>
         )
      }

      return items
   }, [activePostPage, totalPostPage])
   const commentPageItems = useMemo(() => {
      const items = []
      items.push(
         <Pagination.Item key={1} active={1 === activeCommentPage} onClick={handleCommentPage(1)}>
            1
         </Pagination.Item>
      )
      if (activeCommentPage > 4) {
         items.push(<Pagination.Ellipsis key="start-ellipsis" disabled></Pagination.Ellipsis>)
      }
      const start = Math.max(2, activeCommentPage - 2)
      const end = Math.min(totalCommentsPage - 1, activeCommentPage + 2)

      for (let number = start; number <= end; number++) {
         items.push(
            <Pagination.Item key={number} active={number === activeCommentPage} onClick={handleCommentPage(number)}>
               {number}
            </Pagination.Item>
         )
      }
      if (activeCommentPage < totalCommentsPage - 3) {
         items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />)
      }
      if (totalCommentsPage !== 1) {
         items.push(
            <Pagination.Item key={totalCommentsPage} active={totalCommentsPage === activeCommentPage} onClick={handleCommentPage(totalCommentsPage)}>
               {totalCommentsPage}
            </Pagination.Item>
         )
      }

      return items
   }, [activeCommentPage, totalCommentsPage])

   if (error) return <p>{error}</p>

   return (
      <>
         <Card className={`${styles.contentCard} mb-4`}>
            <Card.Header>
               <h4>작성글 목록</h4>
            </Card.Header>
            <Card.Body className={styles.historyBody}>
               {data.posts?.posts.length === 0 ? (
                  <div className={styles.noneTableData}>
                     <p>아직 작성한 게시글이 없습니다.</p>
                  </div>
               ) : (
                  <>
                     <Table responsive className={styles.historyTable}>
                        <colgroup>
                           <col />
                           <col />
                           <col />
                        </colgroup>
                        <thead>
                           <tr>
                              <th>게시판</th>
                              <th>제목</th>
                              <th className="d-none d-md-table-cell">일시</th>
                           </tr>
                        </thead>
                        <tbody>
                           {data.posts?.posts.map((history) => (
                              <tr key={history.id}>
                                 <td>{history.Category.category}</td>
                                 <td className={styles.tdwrap}>
                                    <Link to={`/board/view/${history.id}`}>{history.title}</Link>
                                 </td>
                                 <td className={`${styles.historyDate} d-none d-md-table-cell`}>{dayjs(history.createdAt).format('YY-MM-DD H:mm:ss')}</td>
                              </tr>
                           ))}
                        </tbody>
                     </Table>
                     <Pagination className="pagination-sm justify-content-center">
                        <Pagination.First onClick={handlePostPage(1)} />
                        <Pagination.Prev onClick={handlePostPage(activePostPage - 1)} className={styles.smallPagenation} />
                        {postPageItems}
                        <Pagination.Next onClick={handlePostPage(activePostPage + 1)} className={styles.smallPagenation} />
                        <Pagination.Last onClick={handlePostPage(totalPostPage)} />
                     </Pagination>
                  </>
               )}
            </Card.Body>
         </Card>
         <Card className={styles.contentCard}>
            <Card.Header>
               <h4>작성 댓글 목록</h4>
            </Card.Header>
            <Card.Body className={styles.historyBody}>
               {data.comments?.comments.length === 0 ? (
                  <div className={styles.noneTableData}>
                     <p>아직 작성한 게시글이 없습니다.</p>
                  </div>
               ) : (
                  <>
                     <Table responsive className={styles.historyTable}>
                        <colgroup>
                           <col />
                           <col />
                           <col className="d-none d-md-table-cell" />
                        </colgroup>
                        <thead>
                           <tr>
                              <th>게시판</th>
                              <th>내용</th>
                              <th className="d-none d-md-table-cell">일시</th>
                           </tr>
                        </thead>
                        <tbody>
                           {data.comments?.comments.map((history) => (
                              <tr key={history.id}>
                                 <td>{history.Board.Category.category}</td>
                                 <td className={styles.tdwrap}>
                                    <Link to={`/board/view/${history.Board.id}`}>{history.content}</Link>
                                 </td>

                                 <td className={`${styles.historyDate} d-none d-md-table-cell`}>{dayjs(history.createdAt).format('YY-MM-DD H:mm:ss')}</td>
                              </tr>
                           ))}
                        </tbody>
                     </Table>
                     <Pagination className="pagination-sm justify-content-center">
                        <Pagination.First onClick={handleCommentPage(1)} />
                        <Pagination.Prev onClick={handleCommentPage(activeCommentPage - 1)} className={styles.smallPagenation} />
                        {commentPageItems}
                        <Pagination.Next onClick={handleCommentPage(activeCommentPage + 1)} className={styles.smallPagenation} />
                        <Pagination.Last onClick={handleCommentPage(totalCommentsPage)} />
                     </Pagination>
                  </>
               )}
            </Card.Body>
         </Card>
      </>
   )
}

export default PostTab
