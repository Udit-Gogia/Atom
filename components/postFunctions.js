import callApi from "./callApi";
import {
  getUserDataObject,
  setUserDataObject,
  validateRes,
} from "./authFunctions";
import { checkPresence } from "./cards";
import { IconConsultant, IconFullTime, IconFreelance } from "../assets/images";

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

export const verifyLikedComment = (comment_id) => {
  const currLikedComments = JSON.parse(
    localStorage.getItem("userData")
  ).commentLiked;

  if (
    checkPresence(currLikedComments) &&
    currLikedComments.includes(comment_id)
  ) {
    return true;
  } else {
    return false;
  }
};

export async function likeComment(comment_id) {
  const userDataObject = getUserDataObject();

  if (!userDataObject?.postLiked.includes(comment_id)) {
    userDataObject.postLiked.push(comment_id);
  }
  setUserDataObject({ userDataObject });

  const { response, result } = await callApi(
    "POST",
    "private/all/create-like-comment",
    userDataObject?.token,
    JSON.stringify({ comment_id })
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

export async function workProfileFunction() {
  const { response, result } = await callApi(
    "GET",
    "public/read-box/1?type=work_profile"
  );

  return validateRes(response, result);
}

export async function serviceTypeFunction() {
  const { response, result } = await callApi(
    "GET",
    "public/read-box/1?type=service_type"
  );

  return validateRes(response, result);
}

export const jobRoles = [
  {
    jobName: "full-time",
    jobImage: IconFullTime,
  },
  {
    jobName: "consultant",
    jobImage: IconConsultant,
  },
  {
    jobName: "internship",
    jobImage: IconFreelance,
  },
  {
    jobName: "freelance",
    jobImage: IconFreelance,
  },
];

export const experienceOptions = [
  "0-1 year of experience",
  "1-3 years of experience",
  "3-5 years of experience",
  "5-10 years of experience",
  "10-15 years of experience",
  "15-20 years of experience",
  "20-30 years of experience",
  ">30 years of experience",
];
