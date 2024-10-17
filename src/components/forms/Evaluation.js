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
  Checkbox,
} from "antd";
// import { useSelector } from "react-redux";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import Navbar from "../Navbar";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Api integration
import { connect } from "react-redux";
import { evaluateVideo, viewPendingVideo } from "../../reducer/Actions";

function EvaluationForm(props) {
  let { id } = useParams();
  let { evaluateVideo, pendingVideo, viewPendingVideo, isLoading } = props;
  const [form] = Form.useForm();

  let navigate = useNavigate();
  const { Option } = Select;
  const { Step } = Steps;
  const { Panel } = Collapse;
  const [boolEvaluate, setBoolEvaluate] = useState(false);
  const [status, setStatus] = useState("");
  const [suggestion, setSuggestion] = useState();
  const [presentation, setPresentation] = useState();
  const [rotateContent, setRotateContent] = useState(false);
  const [rotatePresentation, setRotatePresentation] = useState(false);
  const [newsType, setNewsType] = useState();
  const [reason, setReason] = useState();
  const [value, setValue] = React.useState(1);
  const [loading, setLoading] = useState(false);
  const selectedSuggesion = (e) => {
    setSuggestion(e.target.value);
    setReason(e.target.value);
  };
  console.log(presentation, "asdfasdfsdfasdfasdf");

  // const selectedPresentation = (e) => {
  //   setPresentation(e.target.value);
  // };

  // const selectedContent = (e) => {
  //   console.log("", e.target.value);
  //   setValue(e.target.value);
  // };
  // const selectPresentation = (e) => {
  //   console.log("radio checked", e.target.value);
  //   setValue(e.target.value);
  // };

  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }
  let evaluator = localStorage.getItem("evaluator");
  if (evaluator) {
    evaluator = JSON.parse(evaluator);
  }
  const onFinish = (values) => {
    let formData = new FormData();
    let criteria = {};
    if (status != 0) {
      Object.keys(values).forEach((k) => {
        if (k == "evaluator_id" || k == "news_id" || k == "poster_id") {
          formData.append(k, values[k]);
        } else {
          criteria = { ...criteria, [k]: values[k] };
        }
      });
      criteria = { ...criteria, status: status };
      formData.append("status", status);
      formData.append("duration", pendingVideo.duration);

      formData.append("criteria", JSON.stringify(criteria));
      setLoading(true);
      evaluateVideo(formData)
        .then(() => {
          setLoading(false);
          navigate("/evaluate-video-list", { replace: true });
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      toast.error("Please select status");
      return <ToastContainer icon={false} />;
    }
  };

  let evaluateHandler = (status) => {
    setBoolEvaluate(true);
    form.setFieldsValue({
      status: status,
    });
    setStatus(status);
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    baseApi.setToken(token);
    console.log(id, "kjhg");
    viewPendingVideo(id);
  }, []);

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
              <p className="text-white">Evaluator</p>
            </div>
          </div>

          <div className="site-card-border-less-wrapper px-3">
            {!isLoading ? (
              <>
                {
                  pendingVideo && pendingVideo != null && (
                    <>
                      {loading ? (
                        <Row
                          justify="center"
                          className="!flex-col flex items-center"
                        >
                          <Spin spinning={loading} />
                          <Col span={6} className="text-white">
                            Uploading...
                          </Col>
                        </Row>
                      ) : (
                        <Form
                          form={form}
                          onFinish={onFinish}
                          layout="vertical"
                          initialValues={{
                            poster_id: pendingVideo
                              ? pendingVideo.news.user_id
                              : "",
                            news_id: pendingVideo ? pendingVideo.news.id : "",
                            evaluator_id: user ? user.id : "",
                          }}
                        >
                          <div className="single-video-wrap mb-4">
                            <Iframe
                              src={`${baseApi.videoBaseApi}/${pendingVideo.news.video_path}`}
                              width="100%"
                              height="400"
                              // controls="controls"
                            />
                          </div>
                          <div className="evaluationContent">
                            <h4>
                              Reporter Name{" "}
                              <span>{pendingVideo.news.full_name}</span>
                            </h4>
                            <h4>
                              Genre: <span>{pendingVideo.news.genre_name}</span>
                            </h4>
                            <h4>
                              Geographical Criteria :
                              <span>
                                {pendingVideo.news.geographical_criteria_name}
                              </span>
                            </h4>
                            <h4>
                              Is related to Celebrity (Personality)?:{" "}
                              <span>
                                {pendingVideo.news.is_celebrity == 1
                                  ? "Yes"
                                  : "No"}
                              </span>
                            </h4>
                            <h4>
                              Prominence:{" "}
                              <span>{pendingVideo.news.prominence_name}</span>
                            </h4>
                            <h4>
                              Any Conflicts/Controversy in video?:{" "}
                              <span>
                                {pendingVideo.news.is_controversy == 1
                                  ? "Yes"
                                  : "No"}
                              </span>
                            </h4>
                            <h4>
                              Human Interest:{" "}
                              <span>
                                {pendingVideo.news.human_interest_name}
                              </span>
                            </h4>
                            <h4>
                              Ticker Text:{" "}
                              <span>{pendingVideo.news.ticker_text}</span>
                            </h4>
                            <h4>
                              News Type:{" "}
                              <span>{pendingVideo.news.news_type_name}</span>
                            </h4>
                            {pendingVideo.news.news_type_name == "Report" && (
                              <div>
                                <h4>
                                  Report Type:{" "}
                                  <span>
                                    {pendingVideo.news.report_type_name}
                                  </span>
                                </h4>
                                <h4>
                                  PTC:{" "}
                                  <span>
                                    {pendingVideo.newsHasReport.is_ptc == 1
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                </h4>
                                <h4>
                                  Relevent Footage:{" "}
                                  <span>
                                    {pendingVideo.newsHasReport
                                      .is_relevant_footage == 1
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                </h4>
                                <h4>
                                  On Spot:{" "}
                                  <span>
                                    {pendingVideo.newsHasReport.is_on_spot == 1
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                </h4>
                                <h4>
                                  SOT:{" "}
                                  <span>
                                    {pendingVideo.newsHasReport.is_sot == 1
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                </h4>
                                <h4>
                                  Closing:{" "}
                                  <span>
                                    {pendingVideo.newsHasReport.is_closing == 1
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                </h4>
                                <h4>
                                  Header:{" "}
                                  <span>
                                    {pendingVideo.newsHasReport.is_header == 1
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                </h4>
                                <h4>
                                  Name Strips:{" "}
                                  <span>
                                    {pendingVideo.newsHasReport.is_name_strip ==
                                    1
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                </h4>
                                <h4>
                                  Is duration 60 to 90 seconds?:{" "}
                                  <span>
                                    {pendingVideo.newsHasReport
                                      .is_duration_60_to_90 == 1
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                </h4>
                                <h4>
                                  Tickers:{" "}
                                  <span>
                                    {pendingVideo.newsHasReport.is_ticker == 1
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                </h4>
                              </div>
                            )}
                            {pendingVideo.news.news_type_name == "Package" && (
                              <div>
                                <h4>
                                  Package Type:{" "}
                                  <span>
                                    {pendingVideo.news.package_type_name}
                                  </span>
                                </h4>
                                <h4>
                                  Opening PTC:{" "}
                                  <span>
                                    {pendingVideo.newsHasPackage
                                      .is_opening_ptc == 1
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                </h4>
                                <h4>
                                  Relevant Footage:{" "}
                                  <span>
                                    {pendingVideo.newsHasPackage
                                      .is_relevant_footage == 1
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                </h4>
                                <h4>
                                  AVO:{" "}
                                  <span>
                                    {pendingVideo.newsHasPackage.is_avo == 1
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                </h4>
                                <h4>
                                  Different version of narration:{" "}
                                  <span>
                                    {pendingVideo.newsHasPackage
                                      .is_diff_version_of_narration == 1
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                </h4>
                                <h4>
                                  Reporters own narrative:{" "}
                                  <span>
                                    {pendingVideo.newsHasPackage
                                      .is_reporter_own_narrative == 1
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                </h4>
                                <h4>
                                  On camera bits:{" "}
                                  <span>
                                    {pendingVideo.newsHasPackage
                                      .is_on_camera_bits == 1
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                </h4>
                                <h4>
                                  Music:{" "}
                                  <span>
                                    {pendingVideo.newsHasPackage.is_music == 1
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                </h4>
                                <h4>
                                  Is duration 120 to 180 seconds?:{" "}
                                  <span>
                                    {pendingVideo.newsHasPackage
                                      .is_duration_120_to_180 == 1
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                </h4>
                                <h4>
                                  Header:{" "}
                                  <span>
                                    {pendingVideo.newsHasPackage.is_header == 1
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                </h4>
                                <h4>
                                  Name strips:{" "}
                                  <span>
                                    {pendingVideo.newsHasPackage
                                      .is_name_strip == 1
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                </h4>
                                <h4>
                                  Tickers:{" "}
                                  <span>
                                    {pendingVideo.newsHasPackage.is_ticker == 1
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                </h4>
                              </div>
                            )}
                          </div>
                          <Collapse
                            defaultActiveKey={[
                              12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
                            ]}
                          >
                            <Panel key="13" header="Evaluation">
                              <Button
                                className="m-2"
                                onClick={() => evaluateHandler("approve")}
                              >
                                Approve
                              </Button>
                              <Button
                                className="m-2"
                                onClick={() => evaluateHandler("modify")}
                              >
                                Modify
                              </Button>
                              <Button
                                className="m-2"
                                onClick={() => evaluateHandler("reject")}
                              >
                                Reject
                              </Button>
                              <Button
                                className="m-2"
                                onClick={() =>
                                  evaluateHandler("missing element")
                                }
                              >
                                Missing Element
                              </Button>
                            </Panel>
                          </Collapse>
                          {boolEvaluate && (
                            <>
                              <Collapse
                                defaultActiveKey={[
                                  12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
                                ]}
                                className="d-none"
                              >
                                <Panel key="14" header="Evaluator id">
                                  <Form.Item
                                    className="!mb-0 !mt-4"
                                    name="evaluator_id"
                                  >
                                    <Input type="number" />
                                  </Form.Item>
                                </Panel>
                                <Panel key="13" header="News Id">
                                  <Form.Item
                                    className="!mb-0 !mt-4"
                                    name="news_id"
                                  >
                                    <Input type="number" />
                                  </Form.Item>
                                </Panel>
                                <Panel key="18" header="Poster ID">
                                  <Form.Item
                                    className="!mb-0 !mt-4"
                                    name="poster_id"
                                  >
                                    <Input type="number" />
                                  </Form.Item>
                                </Panel>
                              </Collapse>

                              {status == "reject" ? (
                                <Collapse
                                  defaultActiveKey={[
                                    12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
                                  ]}
                                >
                                  <Panel key="15" header="Resons">
                                    <Form.Item
                                      className="!mb-0 !mt-4"
                                      name="rejected_reason"
                                    >
                                      <Space
                                        direction="vertical"
                                        className="mb-2"
                                      >
                                        <Checkbox value="Anti Army">
                                          Anti Army
                                        </Checkbox>
                                        <Checkbox value="Anti Judiciary">
                                          Anti Judiciary
                                        </Checkbox>
                                        <Checkbox value="Anti Religion">
                                          Anti Religion
                                        </Checkbox>
                                        <Checkbox value="Anti Pakistan">
                                          Anti Pakistan
                                        </Checkbox>
                                      </Space>
                                    </Form.Item>
                                    <Form.Item name="explain_reject">
                                      <Input.TextArea
                                        type="text"
                                        placeholder="Explain"
                                      />
                                    </Form.Item>
                                  </Panel>
                                </Collapse>
                              ) : status == "modify" ? (
                                <Collapse
                                  defaultActiveKey={[
                                    12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
                                  ]}
                                >
                                  <Panel key="16" header="Suggetions">
                                    <Form.Item
                                      className=" mt-3"
                                      name="suggetion"
                                    >
                                      <Space className="">
                                        <Checkbox
                                          value="Content"
                                          onClick={(e) => {
                                            setSuggestion(e.target.value);
                                            setRotateContent(
                                              (prevrotate) => !prevrotate
                                            );
                                          }}
                                          key="15"
                                        >
                                          Content
                                        </Checkbox>
                                        <Checkbox
                                          value="Presentation"
                                          onClick={(e) => {
                                            setPresentation(e.target.value);
                                            setRotatePresentation(
                                              (prevrotate) => !prevrotate
                                            );
                                          }}
                                          // value="Presentati on"
                                          key="16"
                                        >
                                          Presentation
                                        </Checkbox>
                                      </Space>
                                    </Form.Item>
                                    {rotateContent && (
                                      <Form.Item name="suggestion_type">
                                        <strong>Content</strong>
                                        <div className="">
                                          <Space direction="vertical">
                                            <Checkbox value="Spelling Mistakes">
                                              Spelling Mistakes
                                            </Checkbox>
                                            <Checkbox value="Audio Fumbles">
                                              Vocal Fumbles
                                            </Checkbox>
                                            <Checkbox value="Wrong Tickers">
                                              Wrong Tickers
                                            </Checkbox>
                                          </Space>
                                        </div>
                                      </Form.Item>
                                    )}
                                    {rotatePresentation && (
                                      <Form.Item name="presentation">
                                        <strong>Presentation</strong>
                                        <div className="mb-3">
                                          <Space direction="vertical">
                                            <Checkbox value="Wrong Graphics">
                                              Wrong Graphics
                                            </Checkbox>
                                            <Checkbox value="Missing Graphics">
                                              Missing Graphics
                                            </Checkbox>
                                            <Checkbox value="Header Missing">
                                              Header Missing
                                            </Checkbox>
                                            <Checkbox value="Tickers Missing">
                                              Tickers Missing
                                            </Checkbox>
                                            <Checkbox value="Noisy Audio">
                                              Noisy Audio
                                            </Checkbox>
                                            <Checkbox value="Low Quality Video/Footage">
                                              Low Quality Video/Footage
                                            </Checkbox>
                                            <Checkbox
                                              value="Missing Changeover/Transition
                                              Animation"
                                            >
                                              Missing Changeover/Transition
                                              Animation
                                            </Checkbox>
                                            <Checkbox value="Duration">
                                              Duration
                                            </Checkbox>
                                          </Space>
                                        </div>
                                      </Form.Item>
                                    )}
                                    <Form.Item name="explain_suggestion">
                                      <Input.TextArea
                                        type="text"
                                        placeholder="Explain..."
                                      />
                                    </Form.Item>
                                  </Panel>
                                </Collapse>
                              ) : (
                                status == "missing element" && (
                                  <Collapse
                                    defaultActiveKey={[
                                      12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
                                    ]}
                                  >
                                    <Panel key="17" header="Missing elements">
                                      <Form.Item
                                        className="!mb-0 !mt-4"
                                        name="missing_element"
                                      >
                                        <div className="mb-3">
                                          <Space direction="vertical">
                                            <Checkbox value="PTC">PTC</Checkbox>
                                            <Checkbox value="Relevent Footage">
                                              Relevent Footage
                                            </Checkbox>
                                            <Checkbox value="SOT">SOT</Checkbox>
                                            <Checkbox value="Closing">
                                              Closing
                                            </Checkbox>
                                            <Checkbox value="Header">
                                              Header
                                            </Checkbox>
                                            <Checkbox value="Name Strips">
                                              Name Strips
                                            </Checkbox>
                                            <Checkbox value="Is duration 60 to 90 seconds?">
                                              Is duration 60 to 90 seconds?
                                            </Checkbox>
                                            <Checkbox value="Tickers">
                                              Tickers
                                            </Checkbox>
                                          </Space>
                                        </div>
                                      </Form.Item>
                                      <Form.Item name="explain_missing_element">
                                        <Input.TextArea
                                          type="text"
                                          placeholder="Explain..."
                                        />
                                      </Form.Item>
                                    </Panel>
                                  </Collapse>
                                )
                              )}
                            </>
                          )}
                          <Form.Item className="text-center mt-5">
                            <Button
                              type="danger"
                              htmlType="submit"
                              className="mt-3"
                              style={{
                                background: "#B80000",
                                borderColor: "#B80000",
                              }}
                            >
                              Evaluate
                            </Button>
                          </Form.Item>
                        </Form>
                      )}
                    </>
                  )
                  //                            :
                  //                             <div className="main-wrapper">
                  // {console.log(pendingVideo,'dfcvv')}

                  //                                 No Pending Videos
                  //                             </div>
                }
              </>
            ) : (
              <Row justify="center" className="!flex-col flex items-center">
                <Spin spinning={loading} />
                <Col span={6} className="text-white">
                  Loading...
                </Col>
              </Row>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

let mapStateToProps = (state) => {
  console.log(state, "opkfkdmfdmfmdfm");
  if (state)
    return {
      isLoading: state.isLoading,
      pendingVideo: state.pendingVideo,
    };
};

export default connect(mapStateToProps, {
  evaluateVideo,
  viewPendingVideo,
})(EvaluationForm);
