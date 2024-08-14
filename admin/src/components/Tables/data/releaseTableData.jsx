/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function extractYearAndMonth(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return {
    year: year,
    month: month.toString(),
  };
}
export default function data(data,deleteFunc) {
  const Title = ({ title }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography display="block" variant="button">
        {`${extractYearAndMonth(title).year}년${
          extractYearAndMonth(title).month
        }월 업데이트 내역`}
      </MDTypography>
    </MDBox>
  );

  const Date = ({ date }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {date?.slice(0, 10)}
      </MDTypography>
    </MDBox>
  );

  const EditButton = ({id, history}) => {
    return (
      <Link to={`/update?id=${encodeURI(JSON.stringify(id))}&title=release&desc=${history}`}>
        <Button
          variant="contained"
          color="primary"
          sx={{ color: "white !important" }}
        >
          Edit
        </Button>
      </Link>
    );
  };
  const DeleteButton = ({ id }) => {
    return (
      <Button
        variant="contained"
        color="primary"
        sx={{
          backgroundColor: "#ff1744",
          color: "white !important",
          "&:hover": {
            backgroundColor: "#d50000",
          },
        }}
        onClick={() => {
          deleteFunc(id);
        }}
      >
        Delete
      </Button>
    );
  };
  return {
    columns: [
      { Header: "title", accessor: "title", width: "65%", align: "left" },
      { Header: "date", accessor: "date", align: "center" },
      { Header: "delete", accessor: "delete", width: "10%", align: "center" },
      { Header: "edit", accessor: "edit", width: "10%", align: "center" },
    ],

    rows:
      data?.releases?.map((item) => ({
        title: <Title title={item.createdDate} />,
        date: <Date date={item.createdDate} />,
        edit: <EditButton id={item.id} history={item.content} />,
        delete: <DeleteButton id={item.id} />,
      })) || [],
  };
}
