import React from 'react'
import Header from "./header/Header";

function UserSurpport({
  handleCloseComponent,
}: {
  handleCloseComponent: () => void;
}) {
  return (
    <div><Header title="고객지원" handleClose={handleCloseComponent}/></div>
  )
}

export default UserSurpport