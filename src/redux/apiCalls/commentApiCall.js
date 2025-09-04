import request from "../../utils/request";
import { toast } from "react-toastify";
import { postActions } from "../slices/postSlice";
import { commentActions } from "../slices/commentSlice";

// create a new commetn
export function createNewComment(newComment) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post("/api/comments", newComment, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      dispatch(postActions.setNewComment(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// update the commment
export function updateCommentApi(commentId, newComment) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/comments/${commentId}`,
        newComment,
        {
          headers: {
            Authorization: "bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(postActions.updateComment(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// delete commetnt
export function deleteCommentApi(commentId) {
  return async (dispatch, getState) => {
    try {
      await request.delete(`/api/comments/${commentId}`, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      dispatch(postActions.deleteCommentFromPost(commentId));
      dispatch(commentActions.deleteComment(commentId));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// fetsh all comments
export function fetshAllCommentsApi() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/comments`, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      dispatch(commentActions.setComments(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// create a new commetn
export function createNewClinetComment(newComment) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        "/api/comments/client-comment",
        newComment,
        {
          headers: {
            Authorization: "bearer " + getState().auth.user.token,
          },
        }
      );
      toast.success("thank you for your comment");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// fetsh all comments clienst
export function AllCommentsClintsApi() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/comments/client-comment`, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      dispatch(commentActions.setClinetComment(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// delete all comments client
export function deleteClinetsComment(id) {
  return async (dispatch, getState) => {
    try {
      await request.delete(`/api/comments/client-comment/${id}`, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      // dispatch(commentActions.setClinetComment());
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// delete all comments client
export function deleteAllClinetsComments() {
  return async (dispatch, getState) => {
    try {
      await request.post(
        `/api/comments/client-comment/delete-all`,
        {},
        {
          headers: {
            Authorization: "bearer " + getState().auth.user.token,
          },
        }
      );
      // dispatch(commentActions.setClinetComment());
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
