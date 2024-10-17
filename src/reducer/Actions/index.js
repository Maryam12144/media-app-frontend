import baseApi from "../../baseApi";
import { toast } from "react-toastify";


export const updateUser = (values) => (dispatch) => {
  return baseApi.User.updateUser(values).then(
    (res) => {
      Promise.resolve(dispatch({ type: "UPDATE_PROFILE", payload: res }));
      localStorage.setItem('user',JSON.stringify(res) )
    },
    (error) => {
      error.response.data &&
        toast.error(
          error.response.data.message != ""
            ? error.response.data.message
            : error.response.data.exception
        );

      error.response == undefined && toast.error("Server not responding");
      return Promise.reject();
    }
  );
};

export const geCities = () => (dispatch) => {
  return baseApi.City.geCities().then(
    (res) => {
      Promise.resolve(dispatch({ type: "GET_CITES", payload: res }));
    },
    (error) => {
      error.response &&
        error.response.data.reason &&
        error.response.data.reason == "authentication" &&
        dispatch({ type: "LOG_OUT" });
      return Promise.reject();
    }
  );
};
export const fiterCities = (value) => (dispatch) => {
  dispatch({ type: "FILTER_CITIES", payload: value })
}

export const geArchiveVideos = () => (dispatch) => {
  return baseApi.Archive.geArchiveVideos().then(
    (res) => {
      Promise.resolve(dispatch({ type: "GET_ARCHIVE_VIDEOS", payload: res }));
    },
    (error) => {
      error.response &&
        error.response.data.reason &&
        error.response.data.reason == "authentication" &&
        dispatch({ type: "LOG_OUT" });
      return Promise.reject();
    }
  );
};

export const storeArchiveVideo = (values, onUploadProgress) => (dispatch) => {
  return baseApi.Archive.storeArchiveVideo(values, onUploadProgress).then(
    (res) => {
      Promise.resolve(dispatch({ type: "STORE_ARCHIVE_VIDEO", payload: res }));
    },
    (error) => {
      error.response.data &&
        toast.error(
          error.response.data.message != ""
            ? error.response.data.message
            : error.response.data.exception
        );

      error.response == undefined && toast.error("Server not responding");
      return Promise.reject();
    }
  );
};


export const getGenre = () => (dispatch) => {
  return baseApi.Genre.getGenre().then(
    (res) => {
      Promise.resolve(dispatch({ type: "GET_GENRE", payload: res.data }));
    },
    (error) => {
      error.response &&
        error.response.data.reason &&
        error.response.data.reason == "authentication" &&
        dispatch({ type: "LOG_OUT" });
      return Promise.reject();
    }
  );
};

export const getGeographicalCriteria = () => (dispatch) => {
  return baseApi.GeographicalCriteria.getGeographicalCriteria().then((res) => {
    Promise.resolve(
      dispatch({ type: "GET_GEOGRAPHICAL_CRITERIA", payload: res.data })
    );
  });
};

export const getHumanInterest = () => (dispatch) => {
  return baseApi.HumanInterest.getHumanInterest().then(
    (res) => {
      Promise.resolve(
        dispatch({ type: "GET_HUMAN_INTEREST", payload: res.data })
      );
    },
    (error) => {
      error.response &&
        error.response.data.reason &&
        error.response.data.reason == "authentication" &&
        dispatch({ type: "LOG_OUT" });
      return Promise.reject();
    }
  );
};

export const getProminence = () => (dispatch) => {
  return baseApi.Prominence.getProminence().then(
    (res) => {
      Promise.resolve(dispatch({ type: "GET_PROMINENCE", payload: res.data }));
    },
    (error) => {
      error.response &&
        error.response.data.reason &&
        error.response.data.reason == "authentication" &&
        dispatch({ type: "LOG_OUT" });
      return Promise.reject();
    }
  );
};

export const getVideoType = () => (dispatch) => {
  return baseApi.VideoType.getVideoType().then(
    (res) => {
      Promise.resolve(dispatch({ type: "GET_VIDEOTYPE", payload: res.data }));
    },
    (error) => {
      error.response &&
        error.response.data.reason &&
        error.response.data.reason == "authentication" &&
        dispatch({ type: "LOG_OUT" });
      return Promise.reject();
    }
  );
};

export const addVideo = (values) => (dispatch) => {
  return baseApi.Video.storeVideo(values).then(
    (res) => {
      Promise.resolve(dispatch({ type: "STORE_VIDEO", payload: res }));
    },
    (error) => {
      error.response.data &&
        toast.error(
          error.response.data.message != ""
            ? error.response.data.message
            : error.response.data.exception
        );

      error.response == undefined && toast.error("Server not responding");
      return Promise.reject();
    }
  );
};

export const evaluateVideo = (values) => (dispatch) => {
  return baseApi.Video.evaluateVideo(values).then(
    (res) => {
      dispatch({ type: "REMOVE_NOTIFICATION" });
      toast.success("Video status has been Succefully Updated");
    },
    (error) => {
      error.response.data && toast.error(error.response.data.message);
      return Promise.reject();
    }
  );
};

export const getModifyVideos = () => (dispatch) => {
  dispatch({ type: "LOADINGSTART" });
  return baseApi.Video.getModifyVideos().then((res) => {
    // dispatch({ type: "REMOVE_PENDING_VIDEO" })

    Promise.resolve(dispatch({ type: "MODIFY_VIDEOS", payload: res.data })).then(
      () =>  dispatch({ type: "LOADINGSTOP" })
    );
  });
};

export const updateNews = (id, values) => (dispatch) => {
  return baseApi.Video.updateNews(id, values).then((res) => {
    dispatch({ type: "MODIFY_NOTIFICATION_DECREMENT" });
  });
};
export const getLatestModifyVideo = (data, msg, channel_name) => (dispatch) => {
  console.log(channel_name,'tttttttt')
    toast.success(msg);
  // if(channel_name == ""){
  // }
  // else{
  //   toast.success(`Your video is uploaded to ${channel_name}`);
  // }
  if (data) dispatch({ type: "LATEST_MODIFY_VIDEO", payload: data });
};

export const viewNews = (id) => (dispatch) => {
  dispatch({ type: "LOADINGSTART" });

  return baseApi.Video.viewNews(id).then(
    (res) => {
      Promise.resolve(dispatch({ type: "VIEW_NEWS", payload: res.data })).then(
        () => dispatch({ type: "LOADINGSTOP" })
      );
    },
    (error) => {
      dispatch({ type: "LOADINGSTOP" });
      error.response.data && toast.error(error.response.data.message);
      return Promise.reject();
    }
  );
};

export const viewModifyVideo = (id) => (dispatch) => {
  dispatch({ type: "LOADINGSTART" });

  return baseApi.Video.viewModifyVideo(id).then(
    (res) => {
      Promise.resolve(
        dispatch({ type: "VIEW_MODIFY_VIDEO", payload: res })
      ).then(() => dispatch({ type: "LOADINGSTOP" }));
    },
    (error) => {
      dispatch({ type: "LOADINGSTOP" });
      error.response.data && toast.error(error.response.data.message);
      return Promise.reject();
    }
  );
};

export const getPendingVideos = () => (dispatch) => {
  dispatch({ type: "LOADINGSTART" });
  return baseApi.Video.getPendingVideos().then((res) => {
    // dispatch({ type: "REMOVE_PENDING_VIDEO" })
    Promise.resolve(dispatch({ type: "PENDING_VIDEOS", payload: res.data }));
  });
};

export const viewPendingVideo = (id) => (dispatch) => {
  dispatch({ type: "LOADINGSTART" });

  return baseApi.Video.viewPendingVideo(id).then(
    (res) => {
      Promise.resolve(
        dispatch({ type: "VIEW_PENDING_VIDEO", payload: res })
      ).then(() => dispatch({ type: "LOADINGSTOP" }));
    },
    (error) => {
      dispatch({ type: "LOADINGSTOP" });
      error.response.data && toast.error(error.response.data.message);
      return Promise.reject();
    }
  );
};

export const evaluateTotalNotification = (data) => (dispatch) => {
  toast.success("You have new Pending Video");
  dispatch({ type: "TOTAL_NOTIFICATION", payload: data });
  return Promise.resolve();
};

export const uploadVideo = (values, onUploadProgress) => (dispatch) => {
  return baseApi.Video.uploadVideo(values, onUploadProgress).then(
    (res) => {
      // Promise.resolve(dispatch({ type: "VIDEO_UPLOADED", payload: res }));
      return res;
    },
    (error) => {
      error.response.data &&
        toast.error(
          error.response.data.message != ""
            ? error.response.data.message
            : error.response.data.exception
        );
      error.response == undefined && toast.error("Server not responding");
      return Promise.reject();
    }
  );
};

export const getInvestigate = () => (dispatch) => {
  console.log("dfdfdf");
  return baseApi.Genre.getInvestigate().then(
    (res) => {
      // Promise.resolve(dispatch({ type: "VIDEO_UPLOADED", payload: res }));
      return res;
    },
    (error) => {
      error.response.data &&
        toast.error(
          error.response.data.message != ""
            ? error.response.data.message
            : error.response.data.exception
        );
      error.response == undefined && toast.error("Server not responding");
      return Promise.reject();
    }
  );
};

export const getAllVideo = () => (dispatch) => {
  return baseApi.VideoType.getAllVideo().then(
    (res) => {
      Promise.resolve(dispatch({ type: "GET_ALL_VIDEOS", payload: res }));
    },
    (error) => {
      error.response.data && toast.error(error.response.data.message);
      error.response == undefined && toast.error("Server not responding");
      return Promise.reject();
    }
  );
};

export const addGenre = (values) => (dispatch) => {
  return baseApi.Genre.storeGenre(values).then(
    (res) => {
      Promise.resolve(dispatch({ type: "STORE_GENRE", payload: res }));
    },
    (error) => {
      return Promise.reject();
    }
  );
};

export const delGenre = (id) => (dispatch) => {
  return baseApi.Genre.delGenre(id).then((res) => {
    Promise.resolve(dispatch({ type: "DEL_GENRE", payload: id }));
  });
};

export const logoutHandler = () => (dispatch) => {
  toast.success("successfully Logout");
  baseApi.setToken("");
  return dispatch({ type: "LOG_OUT" });
};

export const resetPassword = (values) => (dispatch) => {
  return baseApi.Authentication.resetPassword(values).then(
    (res) => {
      toast.success("Your Password has been successfully changed");
    },
    (error) => {
      error.response.data && toast.error(error.response.data.message);
      return Promise.reject();
    }
  );
};
export const forgotPassword = (values) => (dispatch) => {
  return baseApi.Authentication.forgotPassword(values).then(
    (res) => {
      toast.success("Please Check your email");
      Promise.resolve(dispatch({ type: "OTP", payload: values }));
    },
    (error) => {
      error.response.data && toast.error(error.response.data.message);
      return Promise.reject();
    }
  );
};

export const sendOtp = (values) => (dispatch) => {
  return baseApi.Authentication.sendOtp(values).then(
    (res) => {
      dispatch({ type: "OTP", payload: values });
    },
    (error) => {
      error.response.data
        ? toast.error(error.response.data.message)
        : toast.error("Invalid OTP");
      return Promise.reject();
    }
  );
};

export const getTotalMessageNotification = () => (dispatch) => {
  return baseApi.Chat.getTotalMessageNotification().then(
    (res) => {
      Promise.resolve(dispatch({ type: "MESSAGE_TOTAL_NOTIFICATION", payload: res }));
    },
    (error) => {
      error.response.data && toast.error(error.response.data.message);
      return Promise.reject();
    }
  );
};

export const updateTotalMessageNotification = (id) => (dispatch) => {
  return baseApi.Chat.updateTotalMessageNotification(id).then(
    (res) => {
      Promise.resolve(dispatch({ type: "UPDATE_MESSAGE_NOTIFICATION", payload: res }));
    },
    (error) => {
      error.response.data && toast.error(error.response.data.message);
      return Promise.reject();
    }
  );
}

export const viewChatRoom = (id) => (dispatch) => {
  return baseApi.Chat.viewChatRoom(id).then(
    (res) => {
      Promise.resolve(dispatch({ type: "VIEW_CHAT_ROOM", payload: res }));
    },
    (error) => {
      error.response.data && toast.error(error.response.data.message);
      return Promise.reject();
    }
  );
};
export const storeChatRoom = (values) => (dispatch) => {
  return baseApi.Chat.storeChatRoom(values).then(
    (res) => {
      console.log(res);
      Promise.resolve(dispatch({ type: "CREATE_CHAT", payload: res }));
    },
    (error) => {
      error.response.data && toast.error(error.response.data.message);
      return Promise.reject();
    }
  );
};

export const getLatestMessage = (data) => (dispatch) => {
  toast.success(`You Have a new message: ${data.message.message}`);
  if (data) dispatch({ type: "LATEST_MESSAGE", payload: data });

}

export const getChatRoom = () => (dispatch) => {
  return baseApi.Chat.getChatRoom().then(
    (res) => {
      Promise.resolve(dispatch({ type: "CHAT_ROOM", payload: res }));
    },
    (error) => {
      error.response.data && toast.error(error.response.data.message);
      return Promise.reject();
    }
  );
};
export const viewChatBox = (id) => (dispatch) => {
  return baseApi.Chat.viewChatBox(id).then(
    (res) => {
      Promise.resolve(dispatch({ type: "GET_MESSAGES", payload: res }));
    },
    (error) => {
      error.response.data && toast.error(error.response.data.message);
      return Promise.reject();
    }
  );
};

export const getLogin = (values) => (dispatch) => {
  return baseApi.Authentication.getLogin(values).then(
    (res) => {
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      toast.success("Successfully Loged In");
      Promise.resolve(dispatch({ type: "GET_LOGIN", payload: res.user }));
    },
    (error) => {
      error.response.data && toast.error(error.response.data.message);
      return Promise.reject();
    }
  );
};
