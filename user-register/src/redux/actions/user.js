import { POST_USER, CLEAN_USER } from "redux/actions/types";

export const postUser = (body) => (dispatch) => {
  console.log("redux", body);
  let heads = new Headers();
  heads.append("content-type", "application/json");
  fetch("http://localhost:4000/api/users", {
    method: "POST",
    headers: heads,
    body: JSON.stringify(body),
  }).then((response) => {
    if (response.status === 200) {
      response.json().then((res) => {
        dispatch({
          type: POST_USER,
          data: res,
          success: true,
        });
      });
    }
  });
};

export const cleanUser = () => (dispatch) => {
  dispatch({
    type: CLEAN_USER,
  });
};
