/* eslint-disable react/prop-types */


// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import defaultProfile from "assets/images/default.jpg";
import Button from "@mui/material/Button";

import WarningIcon from "@mui/icons-material/Warning";

function ProfilesList({ title, profiles, shadow, makeActive }) {
  const renderProfiles =
    profiles.length > 0 ? (
      profiles.map(({ imageUrl, name, id }) => (
        <MDBox
          key={name}
          component="li"
          display="flex"
          alignItems="center"
          py={1}
          mb={1}
        >
          <MDBox mr={2}>
            <MDAvatar
              src={imageUrl || defaultProfile}
              alt="something here"
              shadow="md"
            />
          </MDBox>
          <MDBox
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="center"
          >
            <MDTypography variant="button" fontWeight="medium">
              {name}
            </MDTypography>
            <MDTypography variant="caption" color="text">
              활성화 되지 않은 어드민
            </MDTypography>
          </MDBox>
          <MDBox ml="auto">
            <Button
              variant="text"
              color="info"
              onClick={() => {
                makeActive(id);
              }}
            >
              Make Active
            </Button>
          </MDBox>
        </MDBox>
      ))
    ) : (
      <MDTypography variant="body1" display="flex" alignItems="center">
        <WarningIcon sx={{ mr: 1 }} />
        <MDTypography variant="caption" color="text">
          Requested admin not found.
        </MDTypography>
      </MDTypography>
    );
  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox pt={2} px={2}>
        <MDTypography
          variant="h6"
          fontWeight="medium"
          textTransform="capitalize"
        >
          {title}
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderProfiles}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default props for the ProfilesList
ProfilesList.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfilesList
ProfilesList.propTypes = {
  title: PropTypes.string.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  shadow: PropTypes.bool,
};

export default ProfilesList;
