const baseUrlStag = "https://stag.atom.wiki";
const baseUrlProd = "https://prod.atom.wiki";
const isStag = true;
export const x = "atom";
export const baseUrl = isStag ? baseUrlStag : baseUrlProd;
export const theme = "#191919";
export const community_type = null;
export const is_active_firebase = false;

export const is_active_app_update_popup = false;
export const is_active_profile_update_popup = false;
export const is_active_suggestion_popup = false;
export const is_active_rating_popup = false;
export const is_active_onboarding = false;
export const is_active_search_tag = false;
export const is_active_hashtag = false;

export const limit_image_upload_size = 2;
export const limit_create_post_tag_length = 30;
export const limit_create_post_description_length = 3000;
export const freq_profile_update_popup = 7;
export const freq_suggestion_popup = 10;
export const freq_rating_popup = 15;
