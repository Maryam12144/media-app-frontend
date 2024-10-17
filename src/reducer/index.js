let token;
token = localStorage.getItem("token");

const initialState = {
  login: {},

  genre: [],
  geographicalcriteria: [],
  humaninterest: [],
  prominence: [],
  videotype: [],
  video: [],
  welcome: [],
  addgenre: [],
  videos: [],
  modifyVideos: [],
  modifyNotification: "",
  modifyVideo: "",
  pendingVideos: [],
  pendingVideo: "",
  otpResponse: {},
  notification: 0,
  isLoading: false,
  newsDetail: "",
  isLogin: token ? true : false,
  messages: [],
  chatRoomList: [],
  chatRoom: "",
  message_notification: 0,
  cities: [],
  archiveVideos: [],
  user: {}
};

export const Reducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case 'UPDATE_PROFILE': 
      return { ...state, user: payload };
    case 'GET_ARCHIVE_VIDEOS':
      return { ...state, archiveVideos: payload };
    case "GET_CITES":
      return { ...state, cities: payload };
    case "FILTER_CITIES":
     console.log(payload.toUpperCase(),'check')
     let cities = state.cities.filter((item => item.name.toUpperCase().includes(payload.toUpperCase()) ))
     console.log(cities,'include')
      return { ...state, cities };
    case "GET_GENRE":
      return { ...state, genre: payload };
    case "GET_ALL_VIDEOS":
      return { ...state, videos: payload };
    case "GET_GEOGRAPHICAL_CRITERIA":
      return { ...state, geographicalcriteria: payload };
    case "GET_HUMAN_INTEREST":
      return { ...state, humaninterest: payload };
    case "GET_PROMINENCE":
      return { ...state, prominence: payload };
    case "LOADINGSTART":
      return { ...state, isLoading: true };
    case "LOADINGSTOP":
      return { ...state, isLoading: false };
    case "GET_VIDEOTYPE":
      return { ...state, videotype: payload };
    case "VIEW_NEWS":
      return { ...state, newsDetail: payload };
    case "MODIFY_VIDEOS":
      return {
        ...state,
        modifyVideos: payload,
        modifyNotification: payload.length,
      };
    case "VIEW_MODIFY_VIDEO":
      return { ...state, modifyVideo: payload };
    case "LATEST_MODIFY_VIDEO":
      return {
        ...state,
        modifyNotification: state.modifyNotification + 1,
        modifyVideos: [payload, ...state.modifyVideos],
      };
    case "MODIFY_NOTIFICATION_DECREMENT":
      return {
        ...state,
        modifyNotification: state.modifyNotification - 1,
      };
    case "PENDING_VIDEOS":
      return { ...state, pendingVideos: payload, notification: payload.length };
    case "VIEW_PENDING_VIDEO":
      return { ...state, pendingVideo: payload };
    case "REMOVE_PENDING_VIDEO":
      return { ...state, pendingVideo: "" };
    case "STORE_VIDEO":
      const video = state.video;
      return { ...state, video };
    case "TOTAL_NOTIFICATION":
      return {
        ...state,
        notification: state.notification + 1,
        pendingVideos: [JSON.parse(payload.news), ...state.pendingVideos],
      };
    case "REMOVE_NOTIFICATION":
      let notification = 0;
      if (state.notification > 0) {
        notification = state.notification - 1;
      }
      return { ...state, notification };
    case "STORE_GENRE":
      const addgenre = state.addgenre;
      return { ...state, addgenre };
    case "DEL_GENRE":
      const genre = state.genre;
      return {
        ...state,
        genre: state.genre.filter((item, index) => item.id !== action.payload),
      };
    case "GET_LOGIN":
      return { ...state, isLogin: true, login: payload };

    case "OTP":
      return { ...state, otpResponse: action.payload };
    case "LOG_OUT":
      localStorage.clear();
      localStorage.removeItem("token");
      return { ...state, isLogin: false };
    case "UPDATE_MESSAGE_NOTIFICATION":
      return { ...state, message_notification: state.message_notification -1};

    case "MESSAGE_TOTAL_NOTIFICATION":
      return { ...state, message_notification: payload };

    case "VIEW_CHAT_ROOM":
      return { ...state, chatRoom: payload };
    case "CHAT_ROOM":
      return { ...state, chatRoomList: payload };
    case "CREATE_CHAT":
      return { ...state, messages: [...state.messages, payload] };
    case "GET_MESSAGES":
      return { ...state, messages: payload };
    case "LATEST_MESSAGE":
      return { ...state, messages: [...state.messages, payload.message], message_notification: state.message_notification + 1 };

    default:
      return state;
  }
};

export default Reducer;
