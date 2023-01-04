import imageCompression from "browser-image-compression";
import { validateRes } from "./authFunctions";
import callApi from "./callApi";
import { checkPresence } from "./cards";
import { alertUser } from "./Modals";
import { IconLoader } from "../assets/images";

export const compressFile = async (image) => {
  const options = {
    maxSizeMB: 2,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(image, options);

    return compressedFile;
  } catch (error) {
    alertUser(error);
  }
};

export const handleFileInput = async (e, setFile) => {
  console.log("entered handleFileInput ", e);
  setFile(IconLoader);
  const file = e.target.files && e.target.files[0];
  const { token } = JSON.parse(localStorage.getItem("userData"));
  if (file?.size > 5e6) {
    return alertUser("Please upload an image smaller than 5mb");
  }

  setFile(await uploadFile(file, token));
};

const uploadFile = async (file, token) => {
  if (!file) return;

  const { response, result } = await callApi(
    "GET",
    `private/all/read-s3-url/${file.name}`,
    token
  );

  const res = validateRes(response, result);

  if (checkPresence(res)) {
    const { url: s3Url, fields } = res.message;

    const compressedFile =
      file.type != "application/pdf" ? await compressFile(file) : file;

    return uploadImage(s3Url, fields, compressedFile);
  }
};

export async function uploadImage(s3Url, fields, file) {
  const endpoint = `${s3Url}`;
  var formdata = new FormData();
  formdata.append("key", `${fields["key"]}`);
  formdata.append("x-amz-algorithm", `${fields["x-amz-algorithm"]}`);
  formdata.append("x-amz-credential", `${fields["x-amz-credential"]}`);
  formdata.append("x-amz-date", `${fields["x-amz-date"]}`);
  formdata.append("policy", `${fields["policy"]}`);
  formdata.append("x-amz-signature", `${fields["x-amz-signature"]}`);
  formdata.append("file", file);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };
  const response = await fetch(endpoint, requestOptions);

  if (response.status === 204) {
    return `${s3Url}${fields["key"]}`;
  } else {
    alert(response.message);
  }
}
