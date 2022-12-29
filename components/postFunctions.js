import callApi from "./callApi";
import { getUserDataObject, validateRes } from "./authFunctions";
import { checkPresence } from "./cards";

export const createPost = async (dataObject, url) => {
  const token = getUserDataObject("token");

  Object.keys(dataObject).forEach(
    (key) => !checkPresence(dataObject[key]) && delete dataObject[key]
  );

  const { response, result } = await callApi(
    "POST",
    `private/all/${url}`,
    token,
    JSON.stringify(dataObject),
    "post created successfully"
  );

  return validateRes(response, result);
};

export const createLead = async (dataObject) => {
  Object.keys(dataObject).forEach(
    (key) => !checkPresence(dataObject[key]) && delete dataObject[key]
  );

  const { response, result } = await callApi(
    "POST",
    `public/create-lead`,
    null,
    JSON.stringify(dataObject),
    "post created successfully"
  );

  return validateRes(response, result);
};

export const verifyLikedPosts = (post_id) => {
  const currLikedPosts = JSON.parse(localStorage.getItem("userData")).postLiked;

  const isLiked = currLikedPosts.includes(post_id) ? true : false;

  return isLiked;
};

export async function likePost(post_id, token = null) {
  const userDataObject = JSON.parse(localStorage.getItem("userData"));

  if (!userDataObject?.postLiked.includes(post_id)) {
    userDataObject.postLiked.push(post_id);
  }

  localStorage.setItem("userData", JSON.stringify(userDataObject));

  const { response, result } = await callApi(
    "POST",
    "private/all/create-like-post",
    token,
    JSON.stringify({ post_id })
  );

  return validateRes(response, result);
}

export async function bookmarkPost(post_id) {
  const { token } = await JSON.parse(localStorage.getItem("userData"));
  const { result } = await callApi(
    "POST",
    "private/all/create-bookmark-post",
    token,
    JSON.stringify({
      post_id,
    }),
    "bookmark created successfully"
  );
  return result;
}

export async function reportPost(post_id, description = null) {
  const { id } = getUserDataObject("userInfo");

  const { response, result } = await callApi(
    "POST",
    "public/create-report-post",
    null,
    JSON.stringify({
      post_id,
      created_by_id: id,
      description,
    }),
    "post reported successfully"
  );

  return validateRes(response, result);
}

export async function reportUser(
  reportingUserid,
  reportCreatedById = 1,
  description = null
) {
  const { result: res } = await callApi(
    "POST",
    "public/create-report-user",
    null,
    JSON.stringify({
      received_by_id: reportingUserid,
      created_by_id: reportCreatedById,
      description,
    }),
    "user reported successfully"
  );

  if (!res?.status) {
    return alert("error while reporting the user.");
  }
}

export async function deleteBookmark(bookmarkId) {
  const token = await JSON.parse(localStorage.getItem("userData"))?.token;
  const { result } = await callApi(
    "DELETE",
    `private/self/delete-bookmark-post/${bookmarkId}`,
    token,
    null,
    "bookmark deleted successfully"
  );
  if (result?.status) {
    window.location.reload();
  }

  return result;
}

export async function rateUser(ratingToId, rating) {
  const token = await JSON.parse(localStorage.getItem("userData"))?.token;

  const { response, result } = await callApi(
    "POST",
    "private/all/create-rating",
    token,
    JSON.stringify({
      received_by_id: ratingToId,
      rating,
    }),
    "user rated successfully"
  );

  return validateRes(response, result);
}

export async function blockUser(received_by_id) {
  const { token } = getUserDataObject();
  await callApi(
    "POST",
    "private/all/create-block-user",
    token,
    JSON.stringify({
      received_by_id,
    }),
    "user blocked successfully"
  );
}

export async function deleteMsgsWithUser(user_id) {
  const { token } = getUserDataObject();

  const { response, result } = await callApi(
    "DELETE",
    `private/self/delete-message-thread/${user_id}`,
    token
  );

  return validateRes(response, result);
}
