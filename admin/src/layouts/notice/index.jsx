/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import Tables from "components/Tables";
import noticeTableData from "components/Tables/data/noticeTableData";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Button, Box, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../api";
import { showToast } from "../../utils/toast";

function index() {
  const [tableData, setTableData] = useState({ columns: [], rows: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const navigate = useNavigate();

  const handleUpdateClick = () => {
    navigate("/update?title=notice&type=update");
  };
  useEffect(() => {
    // 데이터 페칭함수 세팅자리
    getNotice();
  }, [currentPage]);
  const getNotice = async () => {
    try {
      const options = {
        params: {
          page: currentPage,
          limit: rowsPerPage,
        },
      };
      const { data } = await fetchData("/admin-support/notices", "get", null, options);
      const { columns, rows } = noticeTableData(data, deleteNotice);
      setTableData({ columns, rows, totalPages: data.totalPage });
    } catch (err) {
      console.log("err", err);
    }
  };

  const deleteNotice = async (id) => {
    try {
      const params ={
        params:{
          noticeId:id
        }
      }
      const { status } = await fetchData(`/admin-support/notices/${id}`,'delete',null,params);
      if (status === 200) {
        showToast.success("notice deleted successfully");
        getNotice();
      }
    } catch (err) {
      showToast.error("delete Failed");
    }
  };

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Tables
        title="Notice"
        columns={tableData.columns}
        rows={tableData.rows}
      />
      <Box display="flex" justifyContent="center" p={2}>
        <Pagination
          count={tableData.totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="secondary"
          sx={{ color: "white" }}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button variant="contained" color="dark" onClick={handleUpdateClick}>
          Update
        </Button>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default index;
