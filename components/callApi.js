// import { alertUser } from "./Modals";
import { baseUrl, x } from "./config";

export default async function callApi(
  method,
  url,
  token = null,
  data = null,
  successfullMsg = null
) {
  const endpoint = `${baseUrl}/${x}/${url}`;

  let options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  data && (options["body"] = `${data}`);
  token && (options.headers["token"] = `${token}`);

  try {
    const response = await fetch(endpoint, options);
    const result = await response.json();

    if (result.status === "true" && successfullMsg) {
      // alertUser(successfullMsg);
      alert(successfullMsg);
    }

    return { response, result };
  } catch (e) {
    console.log(e);
  }
}
