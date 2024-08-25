// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import { timeSince } from "./util/TimeSInce";

import TodayIcon from "@mui/icons-material/Today";
import DrawIcon from "@mui/icons-material/Draw";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupIcon from "@mui/icons-material/Group";
import AddCardIcon from "@mui/icons-material/AddCard";
import ReportIcon from "@mui/icons-material/Report";
import AxiosInstance from "../../api/AxiosInstance";
import { useEffect, useState } from "react";

function Dashboard() {
  const [data, setData] = useState({
    countData: {},
    timeStamp: "",
    monthlyUser: { labels: [], datasets: [] },
    dailySales: { labels: [], datasets: [] },
    monthlyEssay: { labels: [], datasets: [] },
  });

  const detailUrl = (id) => {
    return `/dashboard/${id}`;
  };
  useEffect(() => {
    async function fetchAdmin() {
      try {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const countResponse = await AxiosInstance.get("/admin-dashboard");
        const monthlyUserResponse = await AxiosInstance.get(
          "/admin-dashboard/stats/users/monthly",
          {
            params: {
              year: currentYear,
            },
          }
        );
        const dailyPaymentResponse = await AxiosInstance.get(
          "/admin-dashboard/stats/payments/daily",
          {
            params: {
              year: currentYear,
              month: currentMonth,
            },
          }
        );
        const monthlyEssayResponse = await AxiosInstance.get(
          "/admin-dashboard/stats/essays/monthly",
          {
            params: {
              year: currentYear,
            },
          }
        );

        const data = countResponse.data.data;
        const timeStamp = countResponse.data.timestamp;
        const monthlyUser = Object.values(monthlyUserResponse.data.data);
        const dailyPaymensts = Object.values(dailyPaymentResponse.data.data);
        const monthlyEssays = Object.values(monthlyEssayResponse.data.data);
        const daysArr = Array.from(
          { length: dailyPaymensts.length },
          (_, index) => index + 1
        );
        setData((prev) => ({
          ...prev,
          countData: data,
          timeStamp: timeSince(timeStamp),
          monthlyUser: {
            labels: reportsBarChartData.labels,
            datasets: { label: "users", data: monthlyUser },
          },
          dailySales: {
            labels: daysArr,
            datasets: { label: "sales", data: dailyPaymensts },
          },
          monthlyEssay: {
            labels: reportsBarChartData.labels,
            datasets: { label: "essays", data: monthlyEssays },
          },
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchAdmin();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon={<TodayIcon />}
                title="Today Essay"
                count={data?.countData?.todayEssays}
                percentage={{
                  color: "",
                  amount: "",
                  label: data.timeStamp,
                }}
                url={detailUrl("today-essay")}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon={<DrawIcon />}
                title="Total Essay"
                count={data?.countData?.totalEssays}
                percentage={{
                  color: "",
                  amount: "",
                  label: data.timeStamp,
                }}
                url={detailUrl("total-essay")}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon={<GroupAddIcon />}
                title="Today's Users"
                count={data?.countData?.currentSubscriber}
                percentage={{
                  color: "",
                  amount: "",
                  label: data.timeStamp,
                }}
                url={detailUrl("today-users")}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon={<GroupIcon />}
                title="All Users"
                count={data?.countData?.totalUser}
                percentage={{
                  color: "",
                  amount: "",
                  label: data.timeStamp,
                }}
                url={detailUrl("all-users")}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon={<AddCardIcon />}
                title="Subscribe Users"
                count={data?.countData?.currentSubscriber}
                percentage={{
                  color: "",
                  amount: "",
                  label: data.timeStamp,
                }}
                url={detailUrl("subscribe-users")}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon={<ReportIcon />}
                title="reported Essay"
                count={data?.countData?.unprocessedReports}
                percentage={{
                  color: "",
                  amount: "",
                  label: data.timeStamp,
                }}
                url="/reports"
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Monthly subscribers"
                  description="Monthly Subscriber Trends"
                  date={data?.timeStamp}
                  chart={data?.monthlyUser && data?.monthlyUser}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description="increase daily Sales "
                  date={data?.timeStamp}
                  chart={data?.dailySales && data?.dailySales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Essay Progress Overview"
                  description="Recent Changes in Essay Completion"
                  date={data?.timeStamp}
                  chart={data?.monthlyEssay && data?.monthlyEssay}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
