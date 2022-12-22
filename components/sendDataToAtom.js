import callApi from "./callApi";
import { checkPresence } from "./cards";
import {
  validateRes,
  setUserDataObject,
  getUserDataObject,
} from "./authFunctions";

export default function sendDataToAtom(stage) {
  if (stage === "app-open") {
    const box_fields = [
      "version",
      "option_report_user",
      "option_account_delete",
      "option_report_post",
      "option_report_comment",
      "interest",
      "designation",
      "country",
      "work_profile",
      "service_type",
      "sector",
      "community",
      "banner_tag",
      "banner_create_post",
    ];

    const column_fields = [
      { type: "user_designation", query: null },
      { type: "post_tag", query: "post_type=workseeker" },
      { type: "post_tag", query: "post_type=workgiver" },
      { type: "post_tag", query: "post_type=service" },
      { type: "post_tag", query: null },
    ];

    const isBoxFieldsPresent = getUserDataObject("box_fields");
    const isColumnFieldsPresent = getUserDataObject("column");

    !isBoxFieldsPresent &&
      box_fields.map(async (field) => {
        const { response, result } = await callApi(
          "GET",
          `public/read-box/1?type=${field}`
        );
        const res = validateRes(response, result);
        setUserDataObject("box_fields", true);
        setUserDataObject(field, res);
      });

    !isColumnFieldsPresent &&
      column_fields.map(async (field) => {
        const { response, result } = await callApi(
          "GET",
          `public/read-column/${field.type}/1${
            checkPresence(field.query) ? `?${field.query}` : ""
          }`
        );
        const res = validateRes(response, result);
        setUserDataObject("column_fields", true);
        setUserDataObject(
          `${
            field.type + (checkPresence(field.query) ? `?${field.query}` : "")
          }`,
          res
        );
      });
  }
}
