import React from "react";
import Header from "./header/Header";

function DisplaySettings({
  handleCloseComponent,
}: {
  handleCloseComponent: () => void;
}) {
  return <div><Header title="화면 설정" handleClose={handleCloseComponent}/></div>;
}

export default DisplaySettings;
