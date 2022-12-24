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
  console.log(dataObject);
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
  const token = await JSON.parse(localStorage.getItem("userData"))?.token;
  await callApi(
    "POST",
    "private/all/create-bookmark-post",
    JSON.stringify({
      post_id,
    }),
    token,
    "bookmark created successfully"
  );
}

export async function reportPost(post_id, reportCreatedById) {
  await apiBase(
    "POST",
    "public/create-report-post",
    JSON.stringify({
      post_id,
      created_by_id: reportCreatedById,
    }),
    null,
    "post reported successfully"
  );
}

export async function reportUser(reportingUserid, reportCreatedById = 1) {
  const res = await callApi(
    "POST",
    JSON.stringify({
      received_by_id: reportingUserid,
      created_by_id: reportCreatedById,
    }),
    null,
    "public/create-report-user",
    "user reported successfully"
  );

  if (!res?.status) {
    return alert("error while reporting the user.");
  }
}

export async function deleteBookmark(bookmarkId) {
  const token = await JSON.parse(localStorage.getItem("userData"))?.token;
  const res = await callApi(
    "DELETE",
    `private/self/delete-bookmark-post/${id}`,
    token,
    null,
    "bookmark deleted successfully"
  );
  if (res?.status) {
    window.location.reload();
  }
}

async function rateUser(ratingToId, rating) {
  const token = await JSON.parse(localStorage.getItem("userData"))?.token;

  const res = await callApi(
    "POST",
    JSON.stringify({
      received_by_id: ratingToId,
      rating,
    }),
    token,
    "private/all/create-rating",
    "user rated successfully"
  );
}

export async function blockUser(received_by_id, token) {
  await callApi(
    "POST",
    "private/all/create-block-user",
    JSON.stringify({
      received_by_id,
    }),
    token,
    "user blocked successfully"
  );
}
