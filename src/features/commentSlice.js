import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {
  createComment,
  listComment,
  deleteComment,
  likeComment,
} from "../api/commentApi"

/**
 * 댓글 등록
 */
export const createCommentThunk = createAsyncThunk(
  "comment/write",
  async (commentData, { rejectWithValue }) => {
    try {
      const response = await createComment(commentData)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message })
    }
  }
)

/**
 * 댓글 리스트 가져오기, id로 특정 게시글 구분
 */
export const getCommentByIdThunk = createAsyncThunk(
  "comment/list",
  async (id, { rejectWithValue }) => {
    try {
      const response = await listComment(id)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message })
    }
  }
)

/**
 * 댓글 삭제
 */
export const deleteCommentThunk = createAsyncThunk(
  "comment/deleteComment",
  async ({ boardId, commentId }, { rejectWithValue, dispatch }) => {
    try {
      await deleteComment({ boardId, commentId })
      // 삭제 후 댓글 목록 다시 불러오기
      await dispatch(getCommentByIdThunk(boardId))
      return commentId
    } catch (error) {
      return rejectWithValue(error.response?.data)
    }
  }
)

/**
 * 댓글 좋아요, id로 특정 댓글 구분,
 */
export const likeCommentThunk = createAsyncThunk(
  "comment/likeComment",
  async ({ commentId, userId }, { rejectWithValue }) => {
    try {
      const response = await likeComment(commentId, userId)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data)
    }
  }
)

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    comment: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearComments: (state) => {
      state.comments = []
      state.comment = null
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // 댓글 등록
      .addCase(createCommentThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createCommentThunk.fulfilled, (state, action) => {
        state.loading = false
        state.comment = action.payload.data
      })
      .addCase(createCommentThunk.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.payload?.message || "댓글 등록 중 오류가 발생했습니다."
      })

      // 댓글 리스트 가져오기
      .addCase(getCommentByIdThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getCommentByIdThunk.fulfilled, (state, action) => {
        state.loading = false
        state.comments = action.payload.data || []
      })
      .addCase(getCommentByIdThunk.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.payload?.message || "댓글을 불러오는 중 오류가 발생했습니다."
      })
      // 댓글 삭제
      .addCase(deleteCommentThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteCommentThunk.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(deleteCommentThunk.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.payload?.message || "댓글을 삭제하는 중 오류가 발생했습니다."
      })
      // 댓글 좋아요
      .addCase(likeCommentThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(likeCommentThunk.fulfilled, (state, action) => {
        state.loading = false

        const updated = action.payload.data
        if (!updated) return

        if (state.comment && state.comment.id === updated.commentId) {
          state.comment.like_count = updated.like_count
          state.comment.isLiked = updated.isLiked
        }

        state.comments = state.comments.map((comment) =>
          comment.id === updated.commentId
            ? {
                ...comment,
                like_count: updated.like_count,
                isLiked: updated.isLiked,
              }
            : comment
        )
      })
      .addCase(likeCommentThunk.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.payload?.message || "서버 문제로 댓글을 수정하지 못했습니다."
      })
  },
})

export default commentSlice.reducer
