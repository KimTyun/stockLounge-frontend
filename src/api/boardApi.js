import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000'

// Board API 서비스 클래스
class BoardApiService {
   // 게시글 목록 조회
   async getPosts() {
      try {
         const response = await axios.get(`${API_BASE_URL}/board`)
         return response.data
      } catch (error) {
         console.error('Error fetching posts:', error)
         throw error
      }
   }

   // 특정 게시글 조회
   async getPost(id) {
      try {
         const response = await axios.get(`${API_BASE_URL}/board/${id}`)
         return response.data
      } catch (error) {
         console.error('Error fetching post:', error)
         throw error
      }
   }

   // 게시글 작성
   async createPost(postData) {
      try {
         const formData = new FormData()
         formData.append('title', postData.title)
         formData.append('content', postData.content)
         formData.append('category', postData.category || 'general')

         if (postData.file) {
            formData.append('file', postData.file)
         }

         const response = await axios.post(`${API_BASE_URL}/board/write`, formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         })
         return response.data
      } catch (error) {
         console.error('Error creating post:', error)
         throw error
      }
   }

   // 게시글 수정
   async updatePost(id, postData) {
      try {
         const response = await axios.put(`${API_BASE_URL}/board/${id}`, postData)
         return response.data
      } catch (error) {
         console.error('Error updating post:', error)
         throw error
      }
   }

   // 게시글 삭제
   async deletePost(id) {
      try {
         const response = await axios.delete(`${API_BASE_URL}/board/${id}`)
         return response.data
      } catch (error) {
         console.error('Error deleting post:', error)
         throw error
      }
   }
}

export default new BoardApiService()
