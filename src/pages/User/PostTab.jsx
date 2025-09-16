import React, { useMemo, useState } from 'react'
import { Card, Table, Badge, Pagination } from 'react-bootstrap'
import styles from '../../styles/pages/User.module.css'

const PostTab = ({ postPage, commentPage, posts, comments }) => {
   const [activePostPage, setActivePostPage] = useState(1)
   const [activeCommentPage, setActiveCommentPage] = useState(1)

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
      const end = Math.min(postPage - 1, activePostPage + 2)

      for (let number = start; number <= end; number++) {
         items.push(
            <Pagination.Item key={number} active={number === activePostPage} onClick={handlePostPage(number)}>
               {number}
            </Pagination.Item>
         )
      }
      if (activePostPage < postPage - 3) {
         items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />)
      }
      items.push(
         <Pagination.Item key={postPage} active={postPage === activePostPage} onClick={handlePostPage(postPage)}>
            {postPage}
         </Pagination.Item>
      )

      return items
   }, [activePostPage, postPage])

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
      const end = Math.min(commentPage - 1, activeCommentPage + 2)

      for (let number = start; number <= end; number++) {
         items.push(
            <Pagination.Item key={number} active={number === activeCommentPage} onClick={handleCommentPage(number)}>
               {number}
            </Pagination.Item>
         )
      }
      if (activeCommentPage < commentPage - 3) {
         items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />)
      }
      items.push(
         <Pagination.Item key={commentPage} active={commentPage === activeCommentPage} onClick={handleCommentPage(commentPage)}>
            {commentPage}
         </Pagination.Item>
      )

      return items
   }, [activeCommentPage, commentPage])

   return (
      <>
         <Card className={`${styles.contentCard} mb-4`}>
            <Card.Header>
               <h4>작성글 목록</h4>
            </Card.Header>
            <Card.Body className={styles.historyBody}>
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
                     {posts.map((history) => (
                        <tr key={history.id}>
                           <td>
                              <Badge variant={history.type === '획득' ? 'success' : 'danger'} className={styles.typeBadge}>
                                 {history.type}
                              </Badge>
                           </td>
                           <td className={styles.tdwrap}>{history.action}</td>

                           <td className={`${styles.historyDate} d-none d-md-table-cell`}>{history.date}</td>
                        </tr>
                     ))}
                  </tbody>
               </Table>
               <Pagination className="pagination-sm justify-content-center">
                  <Pagination.First onClick={handlePostPage(1)} />
                  <Pagination.Prev onClick={handlePostPage(activePostPage - 1)} className={styles.smallPagenation} />
                  {postPageItems}
                  <Pagination.Next onClick={handlePostPage(activePostPage + 1)} className={styles.smallPagenation} />
                  <Pagination.Last onClick={handlePostPage(postPage)} />
               </Pagination>
            </Card.Body>
         </Card>
         <Card className={styles.contentCard}>
            <Card.Header>
               <h4>작성 댓글 목록</h4>
            </Card.Header>
            <Card.Body className={styles.historyBody}>
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
                     {comments.map((history) => (
                        <tr key={history.id}>
                           <td>
                              <Badge variant={history.type === '획득' ? 'success' : 'danger'} className={styles.typeBadge}>
                                 {history.type}
                              </Badge>
                           </td>
                           <td className={styles.tdwrap}>{history.action}</td>

                           <td className={`${styles.historyDate} d-none d-md-table-cell`}>{history.date}</td>
                        </tr>
                     ))}
                  </tbody>
               </Table>
               <Pagination className="pagination-sm justify-content-center">
                  <Pagination.First onClick={handleCommentPage(1)} />
                  <Pagination.Prev onClick={handleCommentPage(activeCommentPage - 1)} className={styles.smallPagenation} />
                  {commentPageItems}
                  <Pagination.Next onClick={handleCommentPage(activeCommentPage + 1)} className={styles.smallPagenation} />
                  <Pagination.Last onClick={handleCommentPage(commentPage)} />
               </Pagination>
            </Card.Body>
         </Card>
      </>
   )
}

export default PostTab
