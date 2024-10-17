import axios from "axios";

// const baseApi = "http://127.0.0.1:8000/api/admin";
// const imageBaseApi = "http://127.0.0.1:8000";

const baseApi = "http://192.168.100.7:8100/api/admin";
const imageBaseApi = "http://192.168.100.7:8100";
const videoBaseApi = "https://xyz-media.fra1.cdn.digitaloceanspaces.com";

const Auth = {};
let token;
let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "**",
  },
};

const Authentication = {
  resetPassword: async (values) =>
    await axios
      .post(`${baseApi}/forgot-password/reset`, values, axiosConfig)
      .then((res) => {
        return res.data;
      }),
  forgotPassword: async (values) =>
    await axios
      .post(`${baseApi}/forgot-password`, values, axiosConfig)
      .then((res) => {
        return res.data;
      }),
  sendOtp: async (values) =>
    await axios
      .post(`${baseApi}/forgot-password/verify`, values, axiosConfig)
      .then((res) => {
        return res.data;
      }),
  getLogin: async (values) =>
    await axios.post(`${baseApi}/login`, values, axiosConfig).then((res) => {
      return res.data;
    }),
};

// let axiosToken = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//     Accept: "application/json",
//     "Content-Type": "application/json;charset=UTF-8",
//     "Access-Control-Allow-Origin": "*",
//   },
// };localStorage.getItem("token")

axios.interceptors.request.use(function (config) {
  // const token = store.getState().session.token;
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

const User = {
  updateUser: async (values) =>
    await axios({
      method: "post",
      url: `${imageBaseApi}/api/user/settings/update`,
      data: values,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data;
    }),
};

const City = {
  geCities: () => request.get(`/city`),
  storeCity: (values) => request.post(`/city`, values),
  delCity: (id) => request.delete("/genres/" + id),
};

const Archive = {
  geArchiveVideos: () => request.get(`/archive`),
  storeArchiveVideo: async (values, onUploadProgress) =>
    await axios({
      method: "post",
      url: `${baseApi}/archive`,
      data: values,

      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress,
    }).then((res) => {
      return res.data;
    }),
  deleteArchiveVideo: (id) => request.delete("/archive/" + id),
};

const Genre = {
  getGenre: () => request.get(`/genres`),
  storeGenre: (values) => request.post(`/genres`, values),
  delGenre: (id) => request.delete("/genres/" + id),
  getInvestigate: () => request.get(`/investigate`),
};

const GeographicalCriteria = {
  getGeographicalCriteria: () => request.get(`/geographical-criterias`),
};

const HumanInterest = {
  getHumanInterest: () => request.get(`/human-interests`),
};

const Prominence = {
  getProminence: () => request.get(`/prominences`),
};

const VideoType = {
  getVideoType: () => request.get(`/video-types`),
  getAllVideo: () => request.get(`/news`),
};

const Video = {
  updateNews: async (id, values) =>
    await axios({
      method: "post",
      url: `${imageBaseApi}/api/admin/news/${id}`,
      data: values,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data;
    }),
  viewNews: async (id) =>
    await axios({
      method: "get",
      url: `${imageBaseApi}/api/admin/news/${id}`,

      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data;
    }),
  getModifyVideos: async () =>
    await axios({
      method: "get",
      url: `${imageBaseApi}/api/news/modify-videos`,

      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data;
    }),
  viewModifyVideo: async (id) =>
    await axios({
      method: "get",
      url: `${imageBaseApi}/api/news/modify-video/${id}`,

      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data;
    }),
  viewPendingVideo: async (id) =>
    await axios({
      method: "get",
      url: `${imageBaseApi}/api/news/pending-video/${id}`,

      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data;
    }),
  getPendingVideos: async () =>
    await axios({
      method: "get",
      url: `${imageBaseApi}/api/news/pending-videos`,

      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data;
    }),
  evaluateVideo: async (values) =>
    await axios({
      method: "post",
      url: `${baseApi}/evaluation`,
      data: values,

      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data;
    }),
  storeVideo: async (values) =>
    await axios({
      method: "post",
      url: `${baseApi}/news`,
      data: values,

      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data;
    }),
  uploadVideo: async (values, onUploadProgress) =>
    await axios({
      method: "post",
      url: `${baseApi}/news/upload/video`,
      data: values,

      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress,
    }).then((res) => {
      return res.data;
    }),
};
//.....................................

const Chat = {
  getTotalMessageNotification: async () =>
    await axios({
      method: "get",
      url: `${imageBaseApi}/api/news/notification`,

      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data;
    }),
  updateTotalMessageNotification: async (id) =>
    await axios({
      method: "get",
      url: `${imageBaseApi}/api/news/notification/${id}`,

      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data;
    }),
  getChatRoom: async () =>
    await axios({
      method: "get",
      url: `${imageBaseApi}/api/admin/chat-room`,

      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data;
    }),
  viewChatRoom: async (id) =>
    await axios({
      method: "get",
      url: `${imageBaseApi}/api/admin/chat-room/${id}`,

      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data;
    }),

  storeChatRoom: async (values) =>
    await axios({
      method: "post",
      url: `${baseApi}/chat-room`,
      data: values,

      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data;
    }),

  getChatBox: async () =>
    await axios({
      method: "get",
      url: `${imageBaseApi}/api/admin/chat-box`,

      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data;
    }),
  viewChatBox: async (id) =>
    await axios({
      method: "get",
      url: `${imageBaseApi}/api/admin/chat-box/${id}`,

      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data;
    }),

  storeChatBox: (values) => request.post(`/chat-box`, values),
};

const request = {
  get: async (url) =>
    await axios.get(`${baseApi}${url}`).then((res) => {
      return res.data;
    }),
  post: async (url, body) => {
    await axios.post(`${baseApi}${url}`, body).then((res) => {
      return res.data;
    });
  },
  delete: async (url) =>
    await axios.delete(`${baseApi}${url}`).then((res) => {
      return res.data;
    }),
};

export default {
  Authentication,
  Auth,
  Genre,
  GeographicalCriteria,
  HumanInterest,
  Prominence,
  VideoType,
  Video,
  imageBaseApi,
  videoBaseApi,
  Chat,
  City,
  Archive,
  User,
  setToken: (_token) => {
    token = _token;
  },
};
