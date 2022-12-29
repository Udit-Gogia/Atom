import callApi from "./callApi";
import { checkPresence } from "./cards";

import { alertUser } from "./Modals";

export function validateRes(response, result) {
  const { status } = response;
  if (status === 200) {
    return result;
  } else if (status === 400) {
    if (result.message === undefined) alertUser(result.detail);
    else return alertUser(result.message);
  } else if (status === 422) {
    alertUser(result.detail[0].msg);
    return;
  }
}

export function getUserDataObject(attr = null) {
  const userDataObject = JSON.parse(localStorage.getItem("userData"));
  return checkPresence(attr) ? userDataObject?.[attr] : userDataObject;
}

export async function setUserDataObject(key, value) {
  const userDataObject = JSON.parse(localStorage.getItem("userData"));

  userDataObject[key] = value;

  localStorage.setItem("userData", JSON.stringify(userDataObject));
}

export async function updateUserDataObject(dataObj) {
  const userDataObject = JSON.parse(localStorage.getItem("userData"));
  const newUserDataObject = { ...userDataObject, ...dataObj };
  localStorage.setItem("userData", JSON.stringify(newUserDataObject));
}

export async function loginUser(username, password) {
  const { response, result } = await callApi(
    "POST",
    "public/create-token",
    null,
    JSON.stringify({ username, password })
  );

  if (response.status === 200) {
    await setUserDataObject("token", result?.message);
    await setUserDataObject("isAuth", true);
    await setUserId();

    const userInfo = await getUserDataFromApi();
    await setUserDataObject("userInfo", userInfo);

    if (
      checkPresence(userInfo?.designation) &&
      checkPresence(userInfo?.country) &&
      checkPresence(userInfo?.tag) &&
      checkPresence(userInfo?.profile_pic_url)
    ) {
      console.log("data is missing");
      setUserDataObject({ mandatory_check: true });
    } else {
      console.log("data is not missing");
      setUserDataObject({ mandatory_check: false });
    }
  }

  return validateRes(response, result);
}

export async function signupUser(username, password) {
  const { response, result } = await callApi(
    "POST",
    "public/create-user",
    null,
    JSON.stringify({ username, password })
  );

  const { status } = response;

  if (status === 200) {
    return loginUser(username, password);
  } else validateRes(response, result);
}

export async function setUserId() {
  const { id: userId } = await getUserDataFromApi();
  setUserDataObject("userId", userId);
}

export async function deleteUser() {
  const { token } = JSON.parse(localStorage.getItem("userData"));

  const { response, result } = await callApi(
    "DELETE",
    "private/self/delete-user",
    token
  );
  updateUserDataObject({ mandatory_check: false, userInfo: undefined });
  return validateRes(response, result);
}

export async function getUserDataFromApi() {
  const token = getUserDataObject("token");
  const { response, result } = await callApi(
    "GET",
    "private/self/read-user",
    token
  );

  return validateRes(response, result);
}

export async function updateUserDataFromApi(dataObject) {
  const token = getUserDataObject("token");

  const { response, result } = await callApi(
    "PUT",
    "private/self/update-user",
    token,
    JSON.stringify(dataObject),
    "user data updates successfully"
  );

  return validateRes(response, result);
}

export async function updatePassword(dataObject) {
  const token = getUserDataObject("token");

  const { response, result } = await callApi(
    "PUT",
    "private/self/update-user-password",
    token,
    JSON.stringify(dataObject),
    "password update successfully"
  );

  return validateRes(response, result);
}
