/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MDEditor from "@uiw/react-md-editor";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import { fetchData } from "../../api";
import { showToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function index() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [value, setValue] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getDetail();
    }
  }, [id]);

  const getDetail = async () => {
    try {
      const { data, status } = await fetchData(`/admin/notices/${id}`, "get");
      if (status === 200) {
        setValue((prev) => ({
          ...prev,
          title: data.title,
          content: data.content,
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
        showToast.error("notice update failed.");
      }
    };
  
    try {
      const body = {
        title: value.title,
        content: value.content,
      };
  
      const endpoint = id ? `/admin/notices/${id}` : "/admin/notices";
      const method = id ? "put" : "post";
      const successMessage = id ? "notice edited successfully" : "notice updated successfully";
  
      const { status } = await fetchData(endpoint, method, body);
      handleResponse(status, successMessage);
    } catch (err) {
      showToast.error("notice update failed.");
    }
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
              <MDEditor.Markdown
                source={value.content}
                style={{ whiteSpace: "pre-wrap" }}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="제목"
              placeholder="제목을 입력하세요..."
              variant="outlined"
              value={value.title}
              onChange={(e) =>
                setValue((prev) => ({ ...prev, title: e.target.value }))
              }
              style={{
                width: "100%",
                marginBottom: "10px",
                backgroundColor: "white",
              }}
              InputLabelProps={{ shrink: true }}
            />
            <Box
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <MDEditor
                  value={value.content}
                  onChange={(newValue) =>
                    setValue((prev) => ({ ...prev, content: newValue }))
                  }
                  height={600}
                  preview="edit"
                  // preview={parameter === "edit" ? "edit" : "live"}
                />
              </Box>
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