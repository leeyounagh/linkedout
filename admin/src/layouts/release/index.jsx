/* eslint-disable react-hooks/rules-of-hooks */
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import releaseTableData from "components/Tables/data/releaseTableData";
import Tables from "components/Tables";
import Footer from "examples/Footer";
import { Button, Box, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../api";
import { useEffect, useState } from "react";
import { showToast } from "../../utils/toast";

function index() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState({ columns: [], rows: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    getRelease();
  }, [currentPage]);

  const getRelease = async () => {
    const options = {
      params: {
        page: currentPage,
        limit: rowsPerPage,
      },
    };
    const { data } = await fetchData(
      "/admin/releases",
      "get",
      null,
      options
    );
    const { columns, rows } = releaseTableData(data,deleteRelease);
    setTableData({ columns, rows, totalPages: data.totalPage });
  };

  const deleteRelease = async (id) => {
    try {
      const params ={
        params:{
          releaseId:id
        }
      }
      const { status } = await fetchData(`/admin/releases`,'delete',null,params);
      if (status === 200) {
        showToast.success("notice deleted successfully");

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
      <Tables title="Release Notes" columns={tableData?.columns} rows={tableData?.rows} />
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
        <Button
          variant="contained"
          color="dark"
          onClick={() => {
            navigate("/update?title=release");
          }}
        >
          Update
        </Button>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default index;
