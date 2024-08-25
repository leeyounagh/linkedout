/* eslint-disable react-hooks/rules-of-hooks */
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import BackgroudCard from "components/BackgroundCard";
import DefaultContent from "components/BackgroundCard/content/DefaultContent";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchData } from "../../../api";

function index() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const detailObj = decodeURI(searchParams.get("id"));
  const id = JSON.parse(detailObj).id;
  const [data, setData] = useState({});

  useEffect(() => {
    getDetail();
  }, [id]);

  const getDetail = async () => {
    try {
      const { data } = await fetchData(`/admin-support/notices/${id}`, "get");
      setData(data);
    } catch (err) {
      console.log("err", err);
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
                notice Detail
              </MDTypography>
            </MDBox>
          </Card>
        </Grid>
      </MDBox>
      <BackgroudCard btnTitle="edit" link={`/update?id=${id}&title=notice`}>
        <DefaultContent
          title={data.title}
          date={data?.createdDate?.substring(0, 10)}
          writer={data?.processor?.name}
          content={data.content}
        />
      </BackgroudCard>
      <Footer />
    </DashboardLayout>
  );
}

export default index;
