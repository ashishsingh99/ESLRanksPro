// Backend POST API ------
export const login_withAPi = () => `https://app.eslrankspro.com/api/user/login/`;
export const regester_withAPi = () => `https://app.eslrankspro.com/api/user/register/`;
export const regester_withOTP = () => `https://app.eslrankspro.com/api/user/otp/`;
export const forgot_withApi = () => `https://app.eslrankspro.com/api/user/send-reset-password-email/`;
export const reset_password_withApi = () => `https://app.eslrankspro.com/api/user/reset-password/`;
export const customer_Subs_Email = (email) => 'https://api.stripe.com/v1/customers?email=' + email;
export const customer_Subscription = () => `https://api.stripe.com/v1/subscriptions`;
export const post_Plans_Details = () => `https://app.eslrankspro.com/api/user/plan/`;
export const get_Plans_Details = () => `https://app.eslrankspro.com/api/user/planget/`;
export const delete_User = (UserId) => 'https://app.eslrankspro.com/api/user/deleteuser/' + UserId + '/';
export const delete_Plan = (PlanId) => 'https://app.eslrankspro.com/api/user/deleteplan/' + PlanId + '/';
export const update_plans_Details = (PlanId) => 'https://app.eslrankspro.com/api/user/planupdate/' + PlanId + '/';
export const delete_Project = (projectId) => 'https://app.eslrankspro.com/api/user/deleteproject/' + projectId + '/';
export const Admin_Keyword_Get = () => 'https://app.eslrankspro.com/api/user/KeywordGet/';

// GET LOCATION FROM SERP API ------
export const Country = () => `https://api.dataforseo.com/v3/serp/google/locations`;

// post data for SERP API
export const KEYWORD_POST = () => `https://app.eslrankspro.com/api/user/Keyword/`;
export const PROJECT_POST = () => `https://app.eslrankspro.com/api/user/project/`;

// Getting Data From THE DATABASE ------
export const profile_withApi = () => `https://app.eslrankspro.com/api/user/profile/`;
export const DB_RANK_DATA = () => `https://app.eslrankspro.com/api/user/Newdata/`;
export const PROJECT_GET = () => `https://app.eslrankspro.com/api/user/projectGet/`;
export const OLD_RANK_DATA = () => `https://app.eslrankspro.com/api/user/Olddata/`;
export const ADMIN_USERS = () => `https://app.eslrankspro.com/api/user/adminuser/`;


// reffral codes get
export const Reffral_Get = () => `https://app.eslrankspro.com/api/user/codesGet/`;
