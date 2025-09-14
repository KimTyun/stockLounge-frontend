import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getBoard,
  writeBoard,
  getBoardById,
  deleteBoard,
  updateBoard,
} from "../api/boardApi";

/**
 * 게시글 리스트 가져오기
 */
export const getBoardThunk = createAsyncThunk(
  "board/list",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBoard();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

/**
 * 게시글 등록
 * boardData는 formData()객체형식으로 가져옴 : {board_img, category, content, createdAt, id, like_count, report_count, title, updatedAt}
 */
export const writeBoardThunk = createAsyncThunk(
  "board/write",
  async (boardData, { rejectWithValue }) => {
    try {
      const response = await writeBoard(boardData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

/**
 * 특정 게시물 가져오기, id값으로 게시글 구분
 */
export const getBoardByIdThunk = createAsyncThunk(
  "board/fetchItemById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getBoardById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

/**
 * 게시글 삭제, id로 특정 게시글 구분
 */
export const deleteBoardThunk = createAsyncThunk(
  "board/deleteBoard",
  async (id, { rejectWithValue }) => {
    try {
      await deleteBoard(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

/**
 * 게시글 수정, id로 특정 게시글 구분,
 * formData()객체형식으로 가져옴
 */
export const updateBoardThunk = createAsyncThunk(
  "board/updateBoard",
  async (data, { rejectWithValue }) => {
    try {
      const { id, boardData } = data;
      await updateBoard(id, boardData);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const boardSlice = createSlice({
  name: "boards",
  initialState: {
    board: null,
    boards: [],
    loading: false,
    // 한 페이지에서 가져오다보니 로딩이 중첩되서 무한 로딩 발생
    // 상세 페이지의 로딩을 따로 두어 관리
    loadingDetail: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoardThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBoardThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action.payload.data;
      })
      .addCase(getBoardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          "서버 문제로 게시글을 가져오지 못했습니다.";
      })
      .addCase(writeBoardThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(writeBoardThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.board = action.payload.data;
      })
      .addCase(writeBoardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          "서버 문제로 게시글을 등록하지 못했습니다.";
      })
      .addCase(getBoardByIdThunk.pending, (state) => {
        state.loadingDetail = true;
        state.error = null;
      })
      .addCase(getBoardByIdThunk.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.board = action.payload.data;
      })
      .addCase(getBoardByIdThunk.rejected, (state, action) => {
        state.loadingDetail = false;
        state.error =
          action.payload?.message ||
          "서버 문제로 게시글을 가져오지 못했습니다.";
      })
      .addCase(deleteBoardThunk.pending, (state) => {
        state.loadingDetail = true;
        state.error = null;
      })
      .addCase(deleteBoardThunk.fulfilled, (state, action) => {
        state.loadingDetail = false;
      })
      .addCase(deleteBoardThunk.rejected, (state, action) => {
        state.loadingDetail = false;
        state.error =
          action.payload?.message ||
          "서버 문제로 게시글을 삭제하지 못했습니다.";
      })
      .addCase(updateBoardThunk.pending, (state) => {
        state.loadingDetail = true;
        state.error = null;
      })
      .addCase(updateBoardThunk.fulfilled, (state, action) => {
        state.loadingDetail = false;
      })
      .addCase(updateBoardThunk.rejected, (state, action) => {
        state.loadingDetail = false;
        state.error =
          action.payload?.message ||
          "서버 문제로 게시글을 수정하지 못했습니다.";
      });
  },
});

export default boardSlice.reducer;
