import React, { useEffect, useState } from "react";
import baseApi from "../../baseApi";
import { ToastContainer, toast } from 'react-toastify';
import {
  Form,
  Button,
  Radio,
  Space,
  Select,
  Steps,
  Collapse,
  Input,
  Upload,
  Spin,
  Row,
  Col,
  Avatar,
  message
} from "antd";
// import { useSelector } from "react-redux";
import { UploadOutlined, InboxOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Pusher from 'pusher-js';

// Api integration
import { connect, useDispatch } from "react-redux";
import {
  getGenre,
  getGeographicalCriteria,
  getHumanInterest,
  getProminence,
  getVideoType,
  addVideo,
  uploadVideo,
  getInvestigate,
  geCities,
  fiterCities
} from "../../reducer/Actions";

let videoTypeCount = 0;
let newsTypeCount = 0;
let videoTypeDefault = '';
let newsTypeDefault = '';

function MainForm(props) {
  const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [genreTypeVisible, setGenreTypeVisible] = useState(false);

  const { Step } = Steps;
  const { Panel } = Collapse;
  const [celebrity, setCelebrity] = useState(false);
  const [newsType, setNewsType] = useState("");
  const [conflicts, setConflicts] = useState(false);
  const [filterCityName, setFilterCityName] = useState("");
  const [current, setCurrent] = React.useState(0);

  const [genreType, setGenreType] = useState([]);
  const [value, setValue] = React.useState(1);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const [selectedFile, setSelectedFile] = useState({});
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState();
  const [progress, setProgress] = useState(0);
  const [ticker, setTicker] = useState(false);
  const [tickerCount, setTickerCount] = useState(0);
  const [tickerAddButton, setTickerAddButton] = useState(true);
  const [boolNewsType, setBoolNewsType] = useState(true);
  const [boolPreloadedValue, setBoolPreloadedValue] = useState(false);
  const [mainType, setMainType] = useState();
  const [videoHeight, setVideoHeight] = useState();
  const [videoWidth, setVideoWidth] = useState();


  let tickerLength = Math.floor(selectedFile?.duration / 10)


  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }
  const selectedNewsType = (e) => {
    if (newsTypeCount <= 0) {
      newsTypeDefault = localStorage.getItem('video_type')
    }
    if (newsTypeDefault) {
      if (newsTypeDefault != e.target.value) {
        newsTypeCount++;
        if (localStorage.getItem('preloaded_video')) {
          toast.error("Video Duration does not match with the requirement please again upload the video");
          setSelectedFile({})
          setTicker(false)
        }
      }
      else {
        if (localStorage.getItem('preloaded_video')) {

          setSelectedFile(JSON.parse(localStorage.getItem('preloaded_video')));
          setTicker(true)
        }
      }
    }
    else {
      setSelectedFile({})
      setTicker(false)
    }

    localStorage.setItem('news_type', e.target.value)

    setNewsType(e.target.value);
  };
  const dispatch = useDispatch()

  let changeCityHandler = () => {
    geCities();
  }
  useEffect(() => {
    let token = localStorage.getItem("token");
    baseApi.setToken(token);

    if (localStorage.getItem('preloaded_video')) {
      setSelectedFile(JSON.parse(localStorage.getItem('preloaded_video')));
      setTicker(true)
    }

    getGenre();
    getGeographicalCriteria();
    getHumanInterest();
    getProminence();
    getVideoType();
  }, []);
  let navigate = useNavigate();

  const onFinish = (values) => {
    // values.coordinates = (latitude + ',' + longitude)
    console.log(selectedFile, 'video', boolNewsType)
    if (boolNewsType != true) {
      values.news_type[0].id = newsType;
    }
    let formData = new FormData();

    if (values.ticker_text != undefined || boolNewsType == true) {
      console.log("ppoopp", values)

      // formData.append("genre_id", 4)
      formData.append("coordinates", 31.4910699 + "," + 74.4976118);
      if (Object.keys(selectedFile).length != 0) {

        Object.keys(values).forEach((k) => {
          if (["video"].includes(k)) {
            formData.append(k, selectedFile.video);
          }
          if (["news_type"].includes(k)) {
            formData.append(k, JSON.stringify(values[k]));
          }
          if (!["news_type"].includes(k) && !["video"].includes(k) && k != 'ticker_text')
            formData.append(k, values[k]);
          if (k == 'ticker_text' && boolNewsType != true) {
            formData.append(k, JSON.stringify(values[k]));
          }
        });

        formData.append('poster_id', selectedFile.poster_id);
        formData.append('duration', selectedFile.duration);
        setLoading(true);
        setSelectedFile("");
        addVideo(formData)
          .then(() => {
            setLoading(false);
            localStorage.removeItem('preloaded_video')
            navigate("/uploaded", { replace: true });
          })
          .catch((err) => {
            setLoading(false);
          });
      }
      else {
        toast.error("Please wait until the video upload completes");
        return <ToastContainer icon={false} />
      }
    }
    else {
      toast.error("Please add ticker");
      return <ToastContainer icon={false} />
    }
  };
  const getVideoDuration = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const media = new Audio(reader.result);
        media.onloadedmetadata = () => resolve(media.duration);
      };
      reader.readAsDataURL(file);
      reader.onerror = (error) => reject(error);
    });

  const getVideoOrientation = (file) =>
    new Promise((resolve, reject) => {
      const video = document.createElement('video')
      const url = URL.createObjectURL(file)
      video.onloadedmetadata = evt => {
        URL.revokeObjectURL(url)
        resolve({ width: video.videoWidth, height: video.videoHeight })
      };
      video.src = url
      video.load()
      // reader.onerror = (error) => reject(error);
    });



  // const url = URL.createObjectURL(file)
  // const video = document.createElement('video')
  // let orientaion = {};
  // video.onloadedmetadata =  evt => {
  //   // Revoke when you don't need the url any more to release any reference
  //   URL.revokeObjectURL(url)
  //   setVideoHeight(video.videoHeight)
  //   setVideoWidth(video.videoWidth)
  //   console.log(video.videoWidth, 'gggggg', video.videoHeight)
  //   orientaion = { width: video.videoWidth, height: video.videoHeig }
  // }
  // video.src = url
  // video.load() 


  const changeHandler = async (e) => {
    setProgress(0)
    setSelectedFile({})
    let formData = new FormData();
    let video = e.target.files[0]

    const duration = await getVideoDuration(e.target.files[0]);
    const orientation = await getVideoOrientation(e.target.files[0])

    if (duration < 10) {
      message.error('Please upload video with duration more than 10 seconds.');
    } else {
      if (orientation.width > orientation.height) {
        if (mainType == 6) {
          if (duration > 420 && duration < 900) {
            formData.append("duration", duration);
            formData.append("video", video);
            uploadVideo(formData, (event) => {
              setProgress(Math.round((100 * event.loaded) / event.total));
            }).then((res) => {
              setProgress(0)
              setSelectedFile(res);
              localStorage.setItem('preloaded_video', JSON.stringify(res));
              setTicker(true)
            })
          } else {
            message.error('Please upload video with duration 7 to 15 minutes');
          }
        } else {
          if (newsType == 1) {
            if (duration > 60 && duration < 90) {
              formData.append("duration", duration);
              formData.append("video", video);
              uploadVideo(formData, (event) => {
                setProgress(Math.round((100 * event.loaded) / event.total));
              }).then((res) => {
                setProgress(0)
                setSelectedFile(res);
                localStorage.setItem('preloaded_video', JSON.stringify(res));
                setTicker(true)
                console.log("looll", res)
              })
            } else {
              message.error('Please upload video with duration 60 to 90 seconds');
            }
          } else if (newsType == 2) {
            if (duration > 180 && duration < 240) {
              formData.append("duration", duration);
              formData.append("video", video);
              uploadVideo(formData, (event) => {
                setProgress(Math.round((100 * event.loaded) / event.total));
              }).then((res) => {
                setProgress(0)
                setSelectedFile(res);
                localStorage.setItem('preloaded_video', JSON.stringify(res));
                setTicker(true)
                console.log("looll", res)
              })
            } else {
              message.error('Please upload video with duration 180 to 240 seconds');
            }
          }
        }
      } else {
        message.error('Please upload video in landscape');
      }
    }

  };

  const getLongLat = () => {
    // navigator.geolocation.getCurrentPosition(function (position) {
    //   setLatitude(position.coords.latitude)
    //   setLongitude(position.coords.longitude)
    //   console.log("Latitude is :", position.coords.latitude);
    //   console.log("Longitude is :", position.coords.longitude);
    // });
  };

  // Api Integration
  let {
    getGenre,
    genre,
    getGeographicalCriteria,
    geographicalcriteria,
    getHumanInterest,
    humaninterest,
    getProminence,
    prominence,
    getVideoType,
    videotype,
    addVideo,
    uploadVideo,
    geCities,
    cities,
    fiterCities,
    getInvestigate,
    video,
  } = props;

  let videoTypeList = [];
  genreType?.forEach((element) => {
    videoTypeList.push(
      <Radio key={element.id} value={element.id}>
        {" "}
        {element.name}{" "}
      </Radio>
    );
  });

  let genreList = [];
  genre?.filter(filterType => (
    filterType.name == "News"
  )).forEach((element) => {
    genreList.push(
      <Option key={element.id} value={element.id}>
        {element.name}
      </Option>
    );
  });

  let geographicalCriteriaList = [];
  geographicalcriteria?.forEach((element) => {
    geographicalCriteriaList.push(
      <Radio key={element.id} value={element.id}>
        {" "}
        {element.name}{" "}
      </Radio>
    );
  });

  let humanInterestList = [];
  humaninterest?.forEach((element) => {
    humanInterestList.push(
      <Radio key={element.id} value={element.id}>
        {" "}
        {element.name}{" "}
      </Radio>
    );
  });

  let prominenceList = [];
  prominence?.forEach((element) => {
    prominenceList.push(
      <Radio key={element.id} value={element.id}>
        {" "}
        {element.name}{" "}
      </Radio>
    );
  });
  const handleOk = () => {
    setIsModalVisible(false);
  };

  let changeGenreHandler = (e) => {
    let filterGenreType = [];
    genre.filter((data, index) => (
      data.id == e
    )).map(item => (
      item.name == "Sports" ?
        videotype.filter(filterType => (
          filterType.name == "Program" || filterType.name == "Package" || filterType.name == "Game"
        )).map(type => (
          filterGenreType.push(type)
        ))
        :
        item.name == "Music" ?
          videotype.filter(filterType => (
            filterType.name == "Music Video" || filterType.name == "Interview" || filterType.name == "Package"
          )).map(type => (
            filterGenreType.push(type)
          ))
          :
          item.name == "News" ?
            videotype.filter(filterType => (
              filterType.name == "Breaking News" || filterType.name == "Update News" || filterType.name == 'Program'
            )).map(type => (
              filterGenreType.push(type)
            ))
            :
            videotype.filter(filterType => (
              filterType.name == "Package" || filterType.name == "Program" || filterType.name == "Interview"
            )).map(type => (
              filterGenreType.push(type)
            ))
    )

    )
    e == "Other" &&
      videotype.filter(filterType => (
        filterType.name == "Package" || filterType.name == "Program" || filterType.name == "Interview"
      )).map(type => (
        filterGenreType.push(type)
      ))

    if (filterGenreType.length > 0) {
      setGenreTypeVisible(true)
    }
    else {
      setGenreTypeVisible(false)
    }
    setGenreType(filterGenreType)
  }

  const citySearchHandler = (event) => {
    // fiterCities(event);
    setFilterCityName(event)
  }

  const changeTypeHandler = (event) => {
    if (videoTypeCount <= 0) {
      videoTypeDefault = localStorage.getItem('video_type')
    }
    console.log(videoTypeDefault, videoTypeCount)
    if (videoTypeDefault) {
      if (videoTypeDefault != event.target.value) {
        videoTypeCount++;
        if (localStorage.getItem('preloaded_video')) {
          toast.error("Video Duration does not match with the requirement please again upload the video");
          setTicker(false)
          setSelectedFile({})
        }

      }
      else {
        if (localStorage.getItem('preloaded_video')) {
          setSelectedFile(JSON.parse(localStorage.getItem('preloaded_video')));
          setTicker(true)
        }
      }
    }
    else {
      setSelectedFile({})
      setTicker(false)
    }
    setMainType(event.target.value)

    localStorage.setItem('video_type', event.target.value)

    if (event.target.value != 6) {
      setBoolNewsType(false)
    }
    else {
      setNewsType('')
      setBoolNewsType(true)
    }
  }
  return (
    <>
      <div className="main-wrapper">
        <div className="wrap">
          <Navbar />
          <div className="profile-wrap flex gap-7 my-9 mx-7">

            <Avatar
              src={`${user.avatar != null ? baseApi.videoBaseApi + '/' + user.avatar : "../images/avatar.jpg"}`}
              size={74}
            />

            <div className="profile-info">
              <Link to="/profile" className="no-underline">
                <h1 className="text-white text-xl mb-0">{user.full_name}</h1>
              </Link>
              <p className="text-white">Reporter</p>
            </div>
          </div>
          <div className="site-card-border-less-wrapper px-5">
            {loading ? (
              <Row justify="center" className="!flex-col flex items-center">
                <Spin spinning={loading} />
                <Col span={6} className="text-white">
                  Uploading...
                </Col>
              </Row>
            ) : (
              genreList.length > 0 ?
                <Form onFinish={onFinish} layout="vertical">
                  {
                    Object.keys(selectedFile).length != 0 &&
                    <video
                      src={`${baseApi.videoBaseApi}/${selectedFile.video}`}
                      width="100%"
                      height="300"
                      className="mb-4"
                      controls
                      preload="none"
                    />
                  }
                  {/* <div className="steps-content">{steps[current].content}</div> */}
                  <Collapse
                    header
                    defaultActiveKey={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 36, 35]}
                  >
                    {Object.keys(selectedFile).length != 0 || mainType == 6 ?
                      <Panel key="1" header="Upload Video" className="video-wrap">
                        <Form.Item
                          name="video"
                          noStyle
                        >
                          {/* <Upload name="video" listType="picture" >
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                      </Upload> */}
                          <input
                            type="file"
                            name="video"
                            className="mt-3"
                            onChange={changeHandler}
                          />
                          <p>Please add ticker after video uploaded Successfully.</p>
                        </Form.Item>

                        {
                          progress > 0 ?
                            <div className="progress mt-1">
                              <div
                                className={`progress-bar progress-bar-success progress-bar-striped`}
                                role="progressbar"
                                aria-valuenow={progress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: progress + "%" }}
                              >
                                {progress}%
                              </div>
                            </div>
                            :
                            Object.keys(selectedFile).length != 0 &&
                            <div className="text-success"><b>Video Uploaded Successfully</b></div>
                        }
                      </Panel>
                      :
                      Object.keys(selectedFile).length != 0 || newsType &&
                      <Panel key="1" header="Upload Video" className="video-wrap">
                        <Form.Item
                          name="video"
                          noStyle
                        >
                          {/* <Upload name="video" listType="picture" >
                      <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload> */}
                          <input
                            type="file"
                            name="video"
                            className="mt-3"
                            onChange={changeHandler}
                          />
                          <p>Please add ticker after video uploaded Successfully.</p>
                        </Form.Item>

                        {
                          progress > 0 ?
                            <div className="progress mt-1">
                              <div
                                className={`progress-bar progress-bar-success progress-bar-striped`}
                                role="progressbar"
                                aria-valuenow={progress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: progress + "%" }}
                              >
                                {progress}%
                              </div>
                            </div>
                            :
                            Object.keys(selectedFile).length != 0 &&
                            <div className="text-success"><b>Video Uploaded Successfully</b></div>
                        }
                      </Panel>
                    }

                    {!boolNewsType && ticker &&
                      <Panel key="10" header="Ticker Text">
                        <Form.List name="ticker_text">
                          {(fields, { add, remove }) => (
                            <>
                              {fields.map(({ key, name, ...restField }, index) => (
                                <div className=" d-flex align-items-center">
                                  <Form.Item
                                    {...restField}
                                    name={[index]}
                                    rules={[{ required: true, message: "Please write " }, { min: 50, message: 'Ticker text must be minimum 50 characters.' }]}
                                    className="!mb-2 !mt-4 flex-1"
                                  >
                                    <Input.TextArea maxLength={60} minLength={50} showCount placeholder="Enter Text for ticker" />
                                  </Form.Item>
                                  <MinusCircleOutlined className=" !mt-4 !ml-2" onClick={() => {
                                    if (fields.length > 1) {
                                      setTickerCount(tickerCount - 1)
                                      remove(name)
                                    }
                                  }} />
                                </div>
                              ))}
                              <Form.Item className={`!mb-0 !mt-4 ${tickerCount >= tickerLength && 'd-none'}`}>
                                <Button type="dashed" onClick={() => {
                                  add(); setTickerCount(prevState => prevState + 1)
                                }} block icon={<PlusOutlined />}>
                                  Add field
                                </Button>
                              </Form.Item>

                            </>
                          )}
                        </Form.List>
                      </Panel>
                    }

                    <Panel key="36" header="Genre" >
                      <Form.Item
                        name="genre_id"
                        className="!mb-0 !mt-4"
                        rules={[{ required: true, message: "Please select " }]}
                      >
                        <Select
                          placeholder="Select Genre"
                          allowClear
                          showSearch
                          optionFilterProp="children"
                          style={{ width: "100%" }}
                          onChange={(event) => changeGenreHandler(event)}
                        >
                          {genreList}


                        </Select>
                      </Form.Item>
                    </Panel>

                    {
                      genreTypeVisible &&
                      <Panel key="2" header="Type">
                        <Form.Item
                          name="video_type_id"
                          className="!mb-0 !mt-4"
                          rules={[{ required: true, message: "Please select " }]}
                          onChange={(event) => changeTypeHandler(event)}
                        >
                          <Radio.Group value={value}>
                            <Space direction="vertical">{videoTypeList}</Space>
                          </Radio.Group>
                        </Form.Item>
                      </Panel>
                    }
                    <Panel key="3" header="Cities">
                      <Form.Item
                        name="city_id"
                        className="!mb-0 !mt-4"
                        rules={[{ required: true, message: "Please select " }]}
                      >
                        <Select
                          showSearch
                          allowClear
                          optionFilterProp="children"
                          placeholder="Select City"
                          style={{ width: "100%" }}
                          onClick={() => changeCityHandler()}

                        >
                          {
                            cities
                              .sort((a, b) => a.name.localeCompare(b.name))
                              .map((city, index) =>
                                <>
                                  <Option key={index} value={city.id}>{city.name}</Option>
                                </>
                              )
                          }

                        </Select>
                      </Form.Item>
                    </Panel>
                    <Panel key="4" header="Geographical Criteria" className="d-none">
                      <Form.Item
                        className="!mb-0 !mt-4"
                        name="geographical_criteria_id"
                        rules={[{ required: true, message: "Please select " }]}
                        initialValue={5}
                      >
                        <Radio.Group value={value}>
                          <Space direction="vertical">
                            {geographicalCriteriaList}
                            {/* <Radio value='International'>International</Radio>
                          <Radio value='National'>National</Radio>
                          <Radio value='Provincial'>Provincial</Radio>
                          <Radio value='City'>City</Radio>
                          <Radio value='Union Council'>Union Council</Radio> */}
                          </Space>
                        </Radio.Group>
                      </Form.Item>
                    </Panel>
                    <Panel
                      key="5"
                      header="Is related to Celebrity (Personality)?"
                      className="d-none"
                    >
                      <Form.Item
                        className="!mb-0 !mt-4"
                        name="is_celebrity"
                        rules={[{ required: true, message: "Please select " }]}
                        initialValue={0}
                      >
                        <Radio.Group value={value}>
                          <Space direction="vertical">
                            <Radio value={1} onClick={() => setCelebrity(true)}>
                              Yes
                            </Radio>
                            <Radio value={0} onClick={() => setCelebrity(false)}>
                              No
                            </Radio>
                          </Space>
                        </Radio.Group>
                      </Form.Item>
                      {celebrity && (
                        <div className="bg-slate-50 p-3">
                          <Form.Item
                            name="celebrity_genre_id"
                            label="Genre"
                            rules={[
                              { required: true, message: "Please select " },
                            ]}
                          >
                            <Select
                              allowClear
                              style={{ width: "100%" }}
                              placeholder="Please select"
                            >
                              {genreList}
                              {/* <Option value='Sports'>Sports</Option>
                            <Option value='Religious'>Religious</Option>
                            <Option value='Political'>Political</Option>
                            <Option value='Showbiz'>Showbiz</Option>
                            <Option value='Fashion'>Fashion</Option>
                            <Option value='Entertainment'>Entertainment</Option>
                            <Option value='Courts'>Courts</Option>
                            <Option value='Top Brands'>Top Brands</Option>
                            <Option value='All Medias'>All Medias</Option>
                            <Option value='Bizzare'>Bizzare</Option>
                            <Option value='All Celebrities'>All Celebrities</Option>
                            <Option value='Crimes'>Crimes</Option>
                            <Option value='Industry'>Industry</Option>
                            <Option value='Trad Market'>Trad Market</Option>
                            <Option value='Property- Real estate'>Property- Real estate</Option>
                            <Option value='Celebrity'>Celebrity</Option>
                            <Option value='Education'>Education</Option> */}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            name="celebrity_name"
                            label="Personality Name"
                            rules={[
                              { required: true, message: "Please select " },
                            ]}
                          >
                            <Select
                              allowClear
                              style={{ width: "100%" }}
                              placeholder="Please select"
                            >
                              <Option value="shahid afridi">Shahid Afridi</Option>
                              <Option value="juanid jamshed">
                                Junaid Jamshed
                              </Option>
                              <Option value="Inzamam-ul-Haq">
                                Inzamam-ul-Haq{" "}
                              </Option>
                              <Option value="Mohammad Yousuf">
                                Mohammad Yousuf{" "}
                              </Option>
                              <Option value="Saeed Anwar">Saeed Anwar </Option>
                            </Select>
                          </Form.Item>
                        </div>
                      )}
                    </Panel>
                    <Panel key="6" header="Prominence"
                      className="d-none"

                    >
                      <Form.Item
                        className="!mb-0 !mt-4"
                        name="prominence_id"
                        rules={[{ required: true, message: "Please select " }]}
                        initialValue={1}
                      >
                        <Radio.Group value={value}>
                          <Space direction="vertical">
                            {prominenceList}
                            {/* <Radio value='place'>Place</Radio>
                          <Radio value='thing'>Thing</Radio>
                          <Radio value='person'>Person</Radio> */}
                          </Space>
                        </Radio.Group>
                      </Form.Item>
                    </Panel>
                    <Panel key="7" header="Any Conflicts/Controversy in video?"
                      className="d-none"

                    >
                      <Form.Item
                        className="!mb-0 !mt-4"
                        name="is_controversy"
                        rules={[{ required: true, message: "Please select " }]}
                        initialValue={1}
                      >
                        <Radio.Group value={value}>
                          <Space direction="vertical">
                            <Radio value={1} onClick={() => setConflicts(true)}>
                              Yes
                            </Radio>
                            <Radio value={0} onClick={() => setConflicts(false)}>
                              No
                            </Radio>
                          </Space>
                        </Radio.Group>
                      </Form.Item>
                    </Panel>
                    <Panel key="8" header="Human Interest">
                      <Form.Item
                        className="!mb-0 !mt-4"
                        name="human_interest_id"
                        rules={[{ required: true, message: "Please select " }]}
                        initialValue={1}
                      >
                        <Radio.Group value={value}>
                          <Space direction="vertical">
                            {humanInterestList}
                            {/* <Radio value='Men'>Men</Radio>
                          <Radio value='Women'>Women</Radio>
                          <Radio value='Both'>Both</Radio>
                          <Radio value='Kids'>Kids</Radio> */}
                          </Space>
                        </Radio.Group>
                      </Form.Item>
                    </Panel>
                    {/* <Panel key="9" header="Proximity" >

                      <Button type="primary" onClick={getLongLat} className="my-2" style={{ background: "#B80000", borderColor: "#B80000" }}>
                        Get Latitude & Longitude
                      </Button>

                      {latitude && <p className="text-black mt-2">
                        {latitude} , {longitude}
                      </p>}
                    </Panel> */}
                    {/* <Panel key="10" header="Ticker Text">
                      <Form.Item
                        className="!mb-0 !mt-4"
                        name="ticker_text"
                        rules={[{ required: true, message: "Please write " }]}
                      >
                        <Input.TextArea placeholder="Enter Text for ticker" />
                      </Form.Item>
                    </Panel> */}
                    {
                      !boolNewsType &&
                      <Panel key="11" header="News Type">
                        <Form.Item className="!mb-0 !mt-4" name="news_type_id">
                          <Radio.Group onChange={selectedNewsType} value={value}>
                            <Space direction="vertical">
                              <Radio value={1}>Report</Radio>
                              <Radio value={2}>Package</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </Panel>
                    }
                  </Collapse>
                  {newsType == 1 && (
                    <Collapse
                      defaultActiveKey={[12, 13, 14, 15, 16, 17, 18, 19, 20, 21]}
                    >
                      <Panel key="12" header="Report Type">
                        <Form.Item
                          className="!mb-0 !mt-4"
                          name={["news_type", 0, "report_type_id"]}
                          initialValue={1}
                        >
                          <Select
                            allowClear
                            style={{ width: "100%" }}
                            placeholder="Please select"
                          >
                            <Option value={1}>Investigative </Option>
                            <Option value={2}>Court</Option>
                            <Option value={3}>Accidence</Option>
                            <Option value={4}>Political</Option>
                            <Option value={5}>Fashion</Option>
                            <Option value={6}>Business</Option>
                            <Option value={7}>Sports</Option>
                            <Option value={8}>Specialized</Option>
                          </Select>
                        </Form.Item>
                      </Panel>
                      <Panel key="13" header="PTC">
                        <Form.Item
                          className="!mb-0 !mt-4"
                          name={["news_type", 0, "is_ptc"]}
                          initialValue={1}
                        >
                          <Radio.Group value={value}>
                            <Space direction="vertical">
                              <Radio value={1}>Yes</Radio>
                              <Radio value={2}>No</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </Panel>
                      <Panel key="14" header="Relevent Footage">
                        <Form.Item
                          className="!mb-0 !mt-4"
                          name={["news_type", 0, "is_relevant_footage"]}
                          initialValue={1}
                        >
                          <Radio.Group value={value}>
                            <Space direction="vertical">
                              <Radio value={1}>Yes</Radio>
                              <Radio value={2}>No</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </Panel>
                      <Panel key="15" header="On Spot">
                        <Form.Item
                          className="!mb-0 !mt-4"
                          name={["news_type", 0, "is_on_spot"]}
                          initialValue={1}
                        >
                          <Radio.Group value={value}>
                            <Space direction="vertical">
                              <Radio value={1}>Yes</Radio>
                              <Radio value={2}>No</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </Panel>
                      <Panel key="16" header="SOT">
                        <Form.Item
                          className="!mb-0 !mt-4"
                          name={["news_type", 0, "is_sot"]}
                          initialValue={1}
                        >
                          <Radio.Group value={value}>
                            <Space direction="vertical">
                              <Radio value={1}>Yes</Radio>
                              <Radio value={2}>No</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </Panel>
                      <Panel key="17" header="Closing">
                        <Form.Item
                          className="!mb-0 !mt-4"
                          name={["news_type", 0, "is_closing"]}
                          initialValue={1}
                        >
                          <Radio.Group value={value}>
                            <Space direction="vertical">
                              <Radio value={1}>Yes</Radio>
                              <Radio value={2}>No</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </Panel>
                      <Panel key="18" header="Header">
                        <Form.Item
                          className="!mb-0 !mt-4"
                          name={["news_type", 0, "is_header"]}
                          initialValue={1}
                        >
                          <Radio.Group value={value}>
                            <Space direction="vertical">
                              <Radio value={1}>Yes</Radio>
                              <Radio value={2}>No</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </Panel>
                      <Panel key="19" header="Name Strips">
                        <Form.Item
                          className="!mb-0 !mt-4"
                          name={["news_type", 0, "is_name_strip"]}
                          initialValue={1}
                        >
                          <Radio.Group value={value}>
                            <Space direction="vertical">
                              <Radio value={1}>Yes</Radio>
                              <Radio value={2}>No</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </Panel>
                      <Panel key="20" header="Is duration 60 to 90 seconds?" className="d-none">
                        <Form.Item
                          className="!mb-0 !mt-4"
                          name={["news_type", 0, "is_duration_60_to_90"]}
                          initialValue={1}
                        >
                          <Radio.Group value={value}>
                            <Space direction="vertical">
                              <Radio value={1}>Yes</Radio>
                              <Radio value={2}>No</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </Panel>

                      <Panel key="21" header="Tickers" className="d-none">
                        <Form.Item
                          className="!mb-0 !mt-4"
                          name={["news_type", 0, "is_ticker"]}
                          initialValue={1}
                        >
                          <Radio.Group value={value}>
                            <Space direction="vertical">
                              <Radio value={1}>Yes</Radio>
                              <Radio value={2}>No</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </Panel>
                    </Collapse>
                  )}
                  {newsType == 2 && (
                    <Collapse
                      defaultActiveKey={[
                        22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
                      ]}
                    >
                      <Panel key="22" header="Package Type">
                        <Form.Item
                          className="!mb-0 !mt-4"
                          name={["news_type", 0, "package_type_id"]}
                          initialValue={1}
                        >
                          <Select
                            allowClear
                            style={{ width: "100%" }}
                            placeholder="Please select"
                          >
                            <Option value={1}>Investigative </Option>
                            <Option value={2}>Court</Option>
                            <Option value={3}>Accidence</Option>
                            <Option value={4}>Political</Option>
                            <Option value={5}>Fashion</Option>
                            <Option value={6}>Business</Option>
                            <Option value={7}>Sports</Option>
                            <Option value={8}>Specialized</Option>
                          </Select>
                        </Form.Item>
                      </Panel>
                      <Panel key="23" header="Bumper">
                        <Form.Item
                          className="!mb-0 !mt-4"
                          name={["news_type", 0, "is_bumper"]}
                          initialValue={1}
                        >
                          <Radio.Group value={value}>
                            <Space direction="vertical">
                              <Radio value={1}>Yes</Radio>
                              <Radio value={2}>No</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </Panel>
                      <Panel key="24" header="Opening PTC">
                        <Form.Item
                          className="!mb-0 !mt-4"
                          name={["news_type", 0, "is_opening_ptc"]}
                          initialValue={1}
                        >
                          <Radio.Group value={value}>
                            <Space direction="vertical">
                              <Radio value={1}>Yes</Radio>
                              <Radio value={2}>No</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </Panel>
                      <Panel key="25" header="Relevant Footage">
                        <Form.Item
                          className="!mb-0 !mt-4"
                          name={["news_type", 0, "is_relevant_footage"]}
                          initialValue={1}
                        >
                          <Radio.Group value={value}>
                            <Space direction="vertical">
                              <Radio value={1}>Yes</Radio>
                              <Radio value={2}>No</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </Panel>
                      <Panel key="26" header="AVO" className="d-none">
                        <Form.Item
                          className="!mb-0 !mt-4 "
                          name={["news_type", 0, "is_avo"]}
                          initialValue={1}
                        >
                          <Radio.Group value={value}>
                            <Space direction="vertical">
                              <Radio value={1}>Yes</Radio>
                              <Radio value={2}>No</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </Panel>
                      <Panel key="27" header="Different  version of narration">
                        <Form.Item
                          className="!mb-0 !mt-4"
                          name={["news_type", 0, "is_diff_version_of_narration"]}
                          initialValue={1}
                        >
                          <Radio.Group value={value}>
                            <Space direction="vertical">
                              <Radio value={1}>Yes</Radio>
                              <Radio value={2}>No</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </Panel>
                      <Panel key="28" header="Reporters own narrative">
                        <Form.Item
                          className="!mb-0 !mt-4"
                          name={["news_type", 0, "is_reporter_own_narrative"]}
                          initialValue={1}
                        >
                          <Radio.Group value={value}>
                            <Space direction="vertical">
                              <Radio value={1}>Yes</Radio>
                              <Radio value={2}>No</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </Panel>
                      <Panel key="29" header="On camera bits">
                        <Form.Item
                          className="!mb-0 !mt-4"
                          name={["news_type", 0, "is_on_camera_bits"]}
                          initialValue={1}
                        >
                          <Radio.Group value={value}>
                            <Space direction="vertical">
                              <Radio value={1}>Yes</Radio>
                              <Radio value={2}>No</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </Panel>
                      <Panel key="30" header="Music" className="d-none">
                        <Form.Item
                          className="!mb-0 !mt-4"
                          name={["news_type", 0, "is_music"]}
                          initialValue={1}
                        >
                          <Radio.Group value={value}>
                            <Space direction="vertical">
                              <Radio value={1}>Yes</Radio>
                              <Radio value={2}>No</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </Panel>
                      <Panel key="31" header="Is duration 120 to 180 seconds?" className="d-none">
                        <Form.Item
                          className="!mb-0 !mt-4"
                          name={["news_type", 0, "is_duration_120_to_180"]}
                          initialValue={1}
                        >
                          <Radio.Group value={value}>
                            <Space direction="vertical">
                              <Radio value={1}>Yes</Radio>
                              <Radio value={2}>No</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </Panel>
                      <Panel key="32" header="Header">
                        <Form.Item
                          className="!mb-0 !mt-4"
                          name={["news_type", 0, "is_header"]}
                          initialValue={1}
                        >
                          <Radio.Group value={value}>
                            <Space direction="vertical">
                              <Radio value={1}>Yes</Radio>
                              <Radio value={2}>No</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </Panel>
                      <Panel key="33" header="Name strips">
                        <Form.Item
                          className="!mb-0 !mt-4"
                          name={["news_type", 0, "is_name_strip"]}
                          initialValue={1}
                        >
                          <Radio.Group value={value}>
                            <Space direction="vertical">
                              <Radio value={1}>Yes</Radio>
                              <Radio value={2}>No</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </Panel>
                      <Panel key="34" header="Tickers" className="d-none">
                        <Form.Item
                          className="!mb-0 !mt-4"
                          name={["news_type", 0, "is_ticker"]}
                          initialValue={1}
                        >
                          <Radio.Group value={value}>
                            <Space direction="vertical">
                              <Radio value={1}>Yes</Radio>
                              <Radio value={2}>No</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </Panel>
                    </Collapse>
                  )}

                  <Form.Item className="text-center mt-5">
                    <Button
                      type="danger"
                      htmlType="submit"
                      className="mt-3"
                      style={{ background: "#B80000", borderColor: "#B80000" }}
                    >
                      Upload
                    </Button>
                  </Form.Item>
                </Form>
                :
                <Row justify="center" className="!flex-col flex items-center">
                  <Spin />
                </Row>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

let mapStateToProps = (state) => {
  if (state)
    return {
      genre: state.genre,
      geographicalcriteria: state.geographicalcriteria,
      humaninterest: state.humaninterest,
      prominence: state.prominence,
      videotype: state.videotype,
      video: state.video,
      addVideo: state.addVideo,
      cities: state.cities,

    };
};

export default connect(mapStateToProps, {
  getGenre,
  getGeographicalCriteria,
  getHumanInterest,
  getProminence,
  getVideoType,
  addVideo,
  uploadVideo,
  getInvestigate,
  geCities,
  fiterCities
})(MainForm);
