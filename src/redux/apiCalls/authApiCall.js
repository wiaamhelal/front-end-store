import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

//login user
export function loginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/login", user);
      dispatch(authActions.login(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

//register user
export function registerUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register", user);
      dispatch(authActions.register(data.message));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
//logout user
export function logoutUser() {
  return (dispatch) => {
    dispatch(authActions.logout());
    localStorage.removeItem("userInfo");
  };
}

//verify email
export function verifyEmailApi(userId, token) {
  return async (dispatch) => {
    try {
      await request.get(`/api/auth/${userId}/verify/${token}`);
      dispatch(authActions.setisEmailVerified());
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
}

export const translatePage = async (targetLang) => {
  const elements = document.querySelectorAll(
    "*:not(script):not(style):not(meta)"
  );

  for (let element of elements) {
    if (element.children.length === 0 && element.innerText.trim() !== "") {
      let originalText =
        element.getAttribute("data-original-text") || element.innerText.trim();
      element.setAttribute("data-original-text", originalText); // حفظ النص الأصلي

      try {
        const response = await fetch("http://localhost:8000/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: originalText, targetLang }),
        });

        const data = await response.json();
        if (data.translatedText) {
          element.innerText = data.translatedText;
        }
      } catch (error) {
        console.error("Translation error:", error);
      }
    }
  }
};
