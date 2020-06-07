export const GET_SELECT_DATA = "GET_SELECT_DATA";
export const CHANGE_PROFILE = "CHANGE_PROFILE";

export const getSelectData = () => (dispatch) => {
  // 本当はAPIで通信してデータを持ってくるが、割愛して適当に配列のデータを返す
  const response = {
    data: ["一般社員", "係長", "課長", "部長", "役員", "社長"],
  };
  dispatch({ type: GET_SELECT_DATA, response });
};

export const changeProfile = (values) => (dispatch) => {
  // 本当はAPIで通信して保存するが、割愛して成功を返す
  const response = {
    data: "success",
  };
  dispatch({ type: CHANGE_PROFILE, response });
};
