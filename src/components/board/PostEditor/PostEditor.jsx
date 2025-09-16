import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Badge,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../../styles/components/board/ReactQuill.css";
import styles from "../../../styles/pages/Board_fixed.module.css";
import {
  writeBoardThunk,
  updateBoardThunk,
  getBoardByIdThunk,
} from "../../../features/boardSlice";

const PostEditor = React.forwardRef(({ onSuccess, editPostId }, ref) => {
  const localQuillRef = React.useRef(null);
  const quillRef = ref || localQuillRef;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, board } = useSelector((state) => state.board);
  const { id } = useParams();

  const postId = editPostId || id;
  const isEditMode = Boolean(postId);

  const [formData, setFormData] = useState({
    title: "",
    category: "free",
    content: "",
  });

  const [imgUrl, setImgUrl] = useState(null); // 이미지 미리보기 URL
  const [imgFile, setImgFile] = useState(null); // 이미지 파일

  // Quill 에디터 설정
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "color",
    "background",
    "align",
    "link",
    "image",
  ];

  // 카테고리 옵션
  const categories = [
    { value: "free", label: "자유토론" },
    { value: "bitcoin", label: "비트코인" },
    { value: "ethereum", label: "이더리움" },
    { value: "ripple", label: "리플" },
    { value: "nft", label: "NFT" },
    { value: "defi", label: "DeFi" },
    { value: "news", label: "뉴스" },
    { value: "analysis", label: "분석" },
  ];

  // 수정 모드일 때 기존 데이터 로드
  useEffect(() => {
    if (isEditMode && postId) {
      // 게시글 데이터 가져오기
      dispatch(getBoardByIdThunk(postId));
    }
  }, [isEditMode, postId, dispatch]);

  // 게시글 데이터가 로드되면 폼 데이터 설정
  useEffect(() => {
    if (isEditMode && board) {
      setFormData({
        title: board.title || "",
        category: board.category || "free",
        content: board.content || "",
      });

      // 기존 이미지가 있다면 미리보기 설정
      if (board.board_img) {
        setImgUrl(`${import.meta.env.VITE_API_URI}/uploads/${board.board_img}`);
      }
    }
  }, [isEditMode, board]);

  // 폼 데이터 변경 핸들러
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 이미지 파일 업로드 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setImgFile(null);
      setImgUrl(null);
      return;
    }

    // 파일 크기 체크 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    // 파일 타입 체크
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    setImgFile(file);

    // 미리보기 생성
    const reader = new FileReader();
    reader.onload = (event) => {
      setImgUrl(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    // React-Quill의 빈 내용 체크
    if (
      !formData.content ||
      formData.content.trim() === "" ||
      formData.content === "<p><br></p>"
    ) {
      alert("내용을 입력해주세요.");
      return;
    }

    try {
      const data = new FormData();
      data.append("title", formData.title.trim());
      data.append("category", formData.category);
      data.append("content", formData.content);

      // 이미지 파일이 있을 경우 추가
      if (imgFile) {
        // 이미지 파일 크기 체크 (5MB)
        if (imgFile.size > 5 * 1024 * 1024) {
          alert("이미지 파일 크기는 5MB를 초과할 수 없습니다.");
          return;
        }
        data.append("file", imgFile);
      }

      if (isEditMode) {
        // 수정 모드
        await dispatch(updateBoardThunk({ id: postId, data })).unwrap();
        alert("게시글 수정 완료!");
      } else {
        // 새 글 작성 모드
        await dispatch(writeBoardThunk(data)).unwrap();
        alert("게시글 등록 완료!");
      }

      if (onSuccess) {
        onSuccess();
      }

      if (!editPostId) {
        navigate("/board");
      }
    } catch (error) {
      console.error("게시글 처리 오류:", error);
      alert(`게시글 ${isEditMode ? "수정" : "등록"} 중 오류가 발생했습니다.`);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">
          {isEditMode ? "게시글 정보를 불러오는 중..." : "처리 중..."}
        </p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className={styles.postEditor}>
      <Container>
        <Row>
          <Col lg={10} xl={8} className="mx-auto">
            <Card className={styles.editorCard}>
              <Card.Header className={styles.editorHeader}>
                <h3>
                  <i
                    className={`fas fa-${isEditMode ? "edit" : "pen"} me-2`}
                  ></i>
                  {isEditMode ? "게시글 수정" : "새 게시글 작성"}
                </h3>
              </Card.Header>

              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  {/* 제목 및 카테고리 */}
                  <Row className="mb-3">
                    <Col md={8}>
                      <Form.Group>
                        <Form.Label>제목 *</Form.Label>
                        <Form.Control
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="제목을 입력하세요"
                          maxLength={100}
                        />
                        <Form.Text className="text-muted">
                          {formData.title.length}/100
                        </Form.Text>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>카테고리</Form.Label>
                        <Form.Select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                        >
                          {categories.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                              {cat.label}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* 이미지 업로드 */}
                  <Form.Group className="mb-3">
                    <Form.Label>이미지 첨부</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <Form.Text className="text-muted">
                      이미지 파일만 업로드 가능합니다. (최대 5MB)
                    </Form.Text>
                  </Form.Group>
                  {/* 이미지 미리보기 */}
                  {imgUrl && (
                    <div className={styles.imagePreview}>
                      <h5>미리보기:</h5>
                      <div className={styles.previewContainer}>
                        <img
                          src={imgUrl}
                          alt="미리보기"
                          className={styles.previewImage}
                        />
                      </div>
                    </div>
                  )}{" "}
                  {/* 내용 */}
                  <Form.Group className="mb-3">
                    <Form.Label>내용 *</Form.Label>
                    <div className={styles.editorContainer}>
                      <ReactQuill
                        ref={quillRef}
                        theme="snow"
                        value={formData.content}
                        onChange={(content) =>
                          setFormData((prev) => ({ ...prev, content }))
                        }
                        modules={modules}
                        formats={formats}
                        placeholder="내용을 입력하세요"
                      />
                    </div>
                    <Form.Text className="text-muted">
                      마크다운 문법을 지원합니다. (## 제목, **굵은글씨**,
                      *기울임*, - 목록)
                    </Form.Text>
                  </Form.Group>
                  {/* 버튼 영역 */}
                  <div className={styles.buttonArea}>
                    <div className={styles.rightButtons}>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          if (editPostId && onSuccess) {
                            onSuccess();
                          } else {
                            navigate("/board");
                          }
                        }}
                        className="me-2"
                      >
                        취소
                      </Button>
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <div
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                            처리 중...
                          </>
                        ) : (
                          <>
                            <i
                              className={`fas fa-${
                                isEditMode ? "check" : "paper-plane"
                              } me-2`}
                            ></i>
                            {isEditMode ? "수정완료" : "게시하기"}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
});

export default PostEditor;
