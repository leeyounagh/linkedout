import React from 'react'
import Header from "./header/Header";

function Preference({
  handleCloseComponent,
}: {
  handleCloseComponent: () => void;
}) {
  return (
    <div><Header title="환경 설정" handleClose={handleCloseComponent}/></div>
  )
}

export default Preference