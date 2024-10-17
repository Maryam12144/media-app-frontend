import React, { useEffect, useState } from "react";
import baseApi from "../../baseApi";
import { ToastContainer, toast } from "react-toastify";
import Iframe from "react-iframe";

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
  Modal,
} from "antd";
// import { useSelector } from "react-redux";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import Navbar from "../Navbar";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Pusher from "pusher-js";

// Api integration
import { connect, useDispatch } from "react-redux";
import {
  getGenre,
  getGeographicalCriteria,
  getHumanInterest,
  getProminence,
  getVideoType,
  updateNews,
  uploadVideo,
  getInvestigate,
  viewNews,
} from "../../reducer/Actions";

function EditNewsForm(props) {
  const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [genreTypeVisible, setGenreTypeVisible] = useState(true);

  const { Step } = Steps;
  const { Panel } = Collapse;
  const [celebrity, setCelebrity] = useState(false);
  const [newsType, setNewsType] = useState();
  const [conflicts, setConflicts] = useState(false);
  const [current, setCurrent] = React.useState(0);

  const [genreType, setGenreType] = useState([]);
  const [value, setValue] = React.useState(1);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const [selectedFile, setSelectedFile] = useState({});
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState();
  const [progress, setProgress] = useState(0);
  let { id } = useParams();

  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }
  const selectedNewsType = (e) => {
    setNewsType(e.target.value);
  };
  const dispatch = useDispatch();

  // const name = useSelector((state) => state);
  useEffect(() => {
    let token = localStorage.getItem("token");
    baseApi.setToken(token);
    getGenre();
    getGeographicalCriteria();
    getHumanInterest();
    getProminence();
    getVideoType();
    viewNews(id);
  }, []);
  let navigate = useNavigate();

  const onFinish = (values) => {
    // values.coordinates = (latitude + ',' + longitude)
    values.news_type[0].id = newsType;

    let formData = new FormData();

    formData.append("coordinates", 31.4910699 + "," + 74.4976118);
    console.log(values, "video");
    if (
      Object.keys(selectedFile).length != 0 ||
      values.video == undefined ||
      values.video == ""
    ) {
      Object.keys(values).forEach((k) => {
        if (
          ["video"].includes(k) &&
          values.video != undefined &&
          values.video != ""
        ) {
          formData.append(k, selectedFile.video);
        }
        if (["news_type"].includes(k)) {
          formData.append(k, JSON.stringify(values[k]));
        }
        if (!["news_type"].includes(k) && !["video"].includes(k))
          formData.append(k, values[k]);
      });

      if (values.video == undefined || values.video == "") {
        formData.append("video", newsDetail.video_path);
      }

      formData.append("poster_id", selectedFile.poster_id);
      formData.append("duration", selectedFile.duration);
      setLoading(true);
      setSelectedFile("");
      updateNews(id, formData)
        .then(() => {
          setLoading(false);
          navigate("/uploaded", { replace: true });
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      toast.error("Please wait untill the video upload completes");
      return <ToastContainer icon={false} />;
    }

    // formData.append('video', selectedFile);

    // setFormValues(values);
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
  const changeHandler = async (e) => {
    setProgress(0);
    setSelectedFile({});
    let formData = new FormData();
    let video = e.target.files[0];

    const duration = await getVideoDuration(e.target.files[0]);
    formData.append("duration", duration);
    formData.append("video", video);
    uploadVideo(formData, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    }).then((res) => {
      setProgress(0);
      setSelectedFile(res);
    });
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
    updateNews,
    uploadVideo,
    getInvestigate,
    newsDetail,
    viewNews,
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
  genre?.forEach((element) => {
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

  useEffect(() => {
    console.log("id is", newsDetail.genre_id);

    changeGenreHandler(newsDetail?.genre_id);
  }, []);

  let changeGenreHandler = (e) => {
    let filterGenreType = [];
    genre
      .filter((data, index) => data.id == e)
      .map((item) =>
        item.name == "Sports"
          ? videotype
              .filter(
                (filterType) =>
                  filterType.name == "Program" ||
                  filterType.name == "Package" ||
                  filterType.name == "Game"
              )
              .map((type) => filterGenreType.push(type))
          : item.name == "Music"
          ? videotype
              .filter(
                (filterType) =>
                  filterType.name == "Music Video" ||
                  filterType.name == "Interview" ||
                  filterType.name == "Package"
              )
              .map((type) => filterGenreType.push(type))
          : item.name == "News"
          ? videotype
              .filter(
                (filterType) =>
                  filterType.name == "Breaking" ||
                  filterType.name == "Follow up" ||
                  filterType.name == "Update"
              )
              .map((type) => filterGenreType.push(type))
          : videotype
              .filter(
                (filterType) =>
                  filterType.name == "Package" ||
                  filterType.name == "Program" ||
                  filterType.name == "Interview"
              )
              .map((type) => filterGenreType.push(type))
      );
    e == "Other" &&
      videotype
        .filter(
          (filterType) =>
            filterType.name == "Package" ||
            filterType.name == "Program" ||
            filterType.name == "Interview"
        )
        .map((type) => filterGenreType.push(type));

    if (filterGenreType.length > 0) {
      setGenreTypeVisible(true);
    } else {
      setGenreTypeVisible(false);
    }
    setGenreType(filterGenreType);
  };

  return (
    <>
      <div className="main-wrapper">
        <div className="wrap">
          <Navbar />
          <div className="profile-wrap flex gap-7 my-9 mx-7">
            <div className="profile-img">
              <img
                className="pf-img"
                src={"../images/avatar.jpg"}
                alt=""
                style={{ borderRadius: "50%" }}
              />
            </div>
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
            ) : newsDetail ? (
              <Form onFinish={onFinish} layout="vertical">
                {/* <div className="steps-content">{steps[current].content}</div> */}
                <video
                  src={`${baseApi.videoBaseApi}/${newsDetail.video_path}`}
                  width="100%"
                  height="300"
                  className="mb-4"
                  controls
                  preload="none"
                />
                <Collapse
                  header
                  defaultActiveKey={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
                >
                  <Panel key="1" header="Upload Video" className="video-wrap">
                    <Form.Item name="video" noStyle>
                      {/* <Upload name="video" listType="picture" >
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                      </Upload> */}
                      <input
                        type="file"
                        name="video"
                        className="mt-3"
                        onChange={changeHandler}
                      />
                    </Form.Item>

                    {progress > 0 ? (
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
                    ) : (
                      Object.keys(selectedFile).length != 0 && (
                        <div className="text-success">
                          <b>Video Uploaded Successfully</b>
                        </div>
                      )
                    )}
                  </Panel>

                  <Panel key="3" header="Genre">
                    <Form.Item
                      name="genre_id"
                      className="!mb-0 !mt-4"
                      rules={[{ required: true, message: "Please select " }]}
                      initialValue={newsDetail.genre_id}
                    >
                      <Select
                        placeholder="Select Genre"
                        allowClear
                        style={{ width: "100%" }}
                        onChange={(event) => changeGenreHandler(event)}
                      >
                        {genreList}

                        {/* <Option value="Other">Other</Option> */}
                      </Select>
                    </Form.Item>
                  </Panel>

                  {genreTypeVisible && (
                    <Panel key="2" header="Type">
                      <Form.Item
                        name="video_type_id"
                        className="!mb-0 !mt-4"
                        rules={[{ required: true, message: "Please select " }]}
                        initialValue={newsDetail.video_type_id}
                      >
                        <Radio.Group value={value}>
                          <Space direction="vertical">{videoTypeList}</Space>
                        </Radio.Group>
                      </Form.Item>
                    </Panel>
                  )}
                  <Panel key="4" header="Geographical Criteria">
                    <Form.Item
                      className="!mb-0 !mt-4"
                      name="geographical_criteria_id"
                      rules={[{ required: true, message: "Please select " }]}
                      initialValue={newsDetail.geographical_criteria_id}
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
                  >
                    <Form.Item
                      className="!mb-0 !mt-4"
                      name="is_celebrity"
                      rules={[{ required: true, message: "Please select " }]}
                      initialValue={newsDetail.is_celebrity}
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
                  <Panel key="6" header="Prominence">
                    <Form.Item
                      className="!mb-0 !mt-4"
                      name="prominence_id"
                      rules={[{ required: true, message: "Please select " }]}
                      initialValue={newsDetail.prominence_id}
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
                  <Panel key="7" header="Any Conflicts/Controversy in video?">
                    <Form.Item
                      className="!mb-0 !mt-4"
                      name="is_controversy"
                      rules={[{ required: true, message: "Please select " }]}
                      initialValue={newsDetail.is_controversy}
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
                      initialValue={newsDetail.human_interest_id}
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
                  <Panel key="10" header="Ticker Text">
                    <Form.Item
                      className="!mb-0 !mt-4"
                      name="ticker_text"
                      rules={[{ required: true, message: "Please write " }]}
                      initialValue={newsDetail.ticker_text}
                    >
                      <Input.TextArea placeholder="Enter Text for ticker" />
                    </Form.Item>
                  </Panel>
                  <Panel key="11" header="News Type">
                    <Form.Item
                      className="!mb-0 !mt-4"
                      name="news_type_id"
                      initialValue={newsDetail.news_type_id}
                    >
                      <Radio.Group onChange={selectedNewsType} value={value}>
                        <Space direction="vertical">
                          <Radio value={1}>Report</Radio>
                          <Radio value={2}>Package</Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                  </Panel>
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
                          <Option value={1}>Investigative Reporting </Option>
                          <Option value={2}>Court Reporting</Option>
                          <Option value={3}>Accidence Reporting</Option>
                          <Option value={4}>Political Reporting</Option>
                          <Option value={5}>Fashion Reporting</Option>
                          <Option value={6}>Business Reporting</Option>
                          <Option value={7}>Sports Reporting</Option>
                          <Option value={8}>Specialized Reporting</Option>
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
                    <Panel key="20" header="Is duration 60 to 90 seconds?">
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

                    <Panel key="21" header="Tickers">
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
                          <Option value={1}>Investigative Reporting </Option>
                          <Option value={2}>Court Reporting</Option>
                          <Option value={3}>Accidence Reporting</Option>
                          <Option value={4}>Political Reporting</Option>
                          <Option value={5}>Fashion Reporting</Option>
                          <Option value={6}>Business Reporting</Option>
                          <Option value={7}>Sports Reporting</Option>
                          <Option value={8}>Specialized Reporting</Option>
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
                    <Panel key="26" header="AVO">
                      <Form.Item
                        className="!mb-0 !mt-4"
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
                    <Panel key="30" header="Music">
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
                    <Panel key="31" header="Is duration 120 to 180 seconds?">
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
                    <Panel key="34" header="Tickers">
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
            ) : (
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
  console.log(state.newsDetail, "dfdfdfdf");
  if (state)
    return {
      genre: state.genre,
      geographicalcriteria: state.geographicalcriteria,
      humaninterest: state.humaninterest,
      prominence: state.prominence,
      videotype: state.videotype,
      video: state.video,
      addVideo: state.addVideo,
      newsDetail: state.newsDetail,
    };
};

export default connect(mapStateToProps, {
  getGenre,
  getGeographicalCriteria,
  getHumanInterest,
  getProminence,
  getVideoType,
  updateNews,
  uploadVideo,
  getInvestigate,
  viewNews,
})(EditNewsForm);
