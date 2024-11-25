import React from "react";
import BigLetter from "@/shared/assets/img/linkedout_letter_big.webp";
import ReportedLetter from "@/shared/assets/img/reported_letter.webp";
import Letter from "./Letter";
import styled from "styled-components";
import { Alert } from "@/shared/types";

const Layout = styled.div`
  width: 430px;
  z-index: 10000;
  height: 97vh;
  position: fixed;
  top: 32px;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
`;

const mapper ={
  support:ReportedLetter,
  linkedout: BigLetter,
  public:BigLetter
}

function index({
  type,
  title,
  createdDate,
  handleCloseModal
}: {
  type:"public"|"support" | "linkedout";
  title: string;
  createdDate: string;
  handleCloseModal?: () => void;
}) {
  return (
    <Layout>
      <Letter
        img={mapper[type]}
        width={430}
        height={230}
        type={type}
        title={title}
        createdDate={createdDate}
        handleCloseModal={handleCloseModal}
      />
    </Layout>
  );
}

export default index;
