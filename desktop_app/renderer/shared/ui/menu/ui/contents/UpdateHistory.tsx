import React from 'react'
import Header from "./header/Header";

function UpdateHistory({
  handleCloseComponent,
}: {
  handleCloseComponent: () => void;
}) {
  return (
    <div><Header title="업데이트 기록" handleClose={handleCloseComponent}/></div>
  )
}

export default UpdateHistory