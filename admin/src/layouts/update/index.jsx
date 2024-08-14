/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MDEditor from "@uiw/react-md-editor";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import { fetchData } from "../../api";
import { showToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Input from "components/Input";
import PreviewLayout from "./components";

function index() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const title = searchParams.get("title");
  const [value, setValue] = useState({
    title: "",
    content: "",
    isChangeLayout: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getDetail();
    }
  }, [id]);

  const payloads = {
    notice: {
      body: {
        title: value.title,
        content: value.content,
      },
      endpoint: id ? `/admin/notices/${id}` : "/admin/notices",
      successMessage: id
        ? "notice edited successfully"
        : "notice updated successfully",
      method: id ? "put" : "post",
    },
    inquire: {
      body: {
        answer: value.answer,
      },
      endpoint: id ? `/admin/inquiries/${id}` : "/admin/inquiries",
      successMessage: id
        ? "inquire edited successfully"
        : "inquire updated successfully",
      method: "post",
    },
    release: {
      body: {
        content: value.content,
      },
      endpoint: id
        ? `/admin/releases/${id}`
        : "/admin/releases",
      successMessage: id
        ? "release edited successfully"
        : "release updated successfully",
      method: id ? "put" : "post",
    },
  };
  const getDetail = async () => {
    try {
      const { endpoint } = payloads[title];
      const { data, status } = await fetchData(endpoint, "get");
      if (status === 200) {
        setValue((prev) => ({
          ...prev,
          isChangeLayout: title === "inquire" || title === "update",
          title: data.title,
          content: data?.history ? data.history : data.content,
          answer: title === "inquire" ? data.answer : "",
          date: data?.createdDate?.slice(0.1),
          user: title === "inquire" ? data.user : {},
        }));
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const updateData = async () => {
    const handleResponse = (status, successMessage) => {
      if (status === 200 || status === 201) {
        showToast.success(successMessage);
        navigate(-1);
      } else {
        showToast.error("update failed.");
      }
    };

    try {
      const { body, endpoint, successMessage, method } =
        payloads[title] || payloads.notice;
      console.log();
      payloads[title] || payloads.notice;
      const { status } = await fetchData(endpoint, method, body);
      handleResponse(status, successMessage);
    } catch (err) {
      console.log("err", err);
      showToast.error("update failed.");
    }
  };

  const onChange = (e, key) => {
    setValue((prev) => ({ ...prev, [key]: e.target.value }));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" color="white">
                update
              </MDTypography>
            </MDBox>
          </Card>
        </Grid>
      </MDBox>
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          minHeight: "40rem",
          marginTop: "20px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                paddingLeft: "20px",
                backgroundColor: "#ffffff",
                border: "1px solid #ccc",
                padding: "20px",
                boxShadow: 1,
                overflow: "auto",
              }}
            >
              {/* 미리보기 자리 | 문의글 보기 */}
              <PreviewLayout
                isChangeLayout={value?.isChangeLayout}
                data={value}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Input
              value={value?.title}
              onChange={onChange}
              isShowInput={title === "notice"}
              label="제목"
              placeholder="제목을 입력하세요..."
              name="title"
            />
            <Box
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              <MDEditor
                value={value?.isChangeLayout ? value.answer : value.content}
                onChange={(newValue) =>
                  setValue((prev) => ({
                    ...prev,
                    [value?.isChangeLayout ? "answer" : "content"]: newValue,
                  }))
                }
                height={600}
                preview={title === "inquire" ? "live" : "edit"}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button variant="contained" color="dark" onClick={updateData}>
          Update
        </Button>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default index;
