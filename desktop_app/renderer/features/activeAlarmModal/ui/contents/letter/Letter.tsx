import React from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";
import styled from "styled-components";
import Envelop from "@/shared/assets/img/envelope.webp";
import { Label } from "@/shared/ui/label";
import color from "@/shared/styles/color";
import LinkedoutTextField from "./LinkedoutTextField";
import UserSupportTextField from "./UserSupportTextField";
import { Alert } from "@/shared/types";

const ImgDiv = styled.div`
  position: absolute;
  bottom: 0;
`;
const Layout = styled.div``;

const EnvelopDiv = styled.div`
  position: absolute;
  top: 20vh;
  left: 0px;
`;
const LabelDiv = styled.div`
  position: absolute;
  top: 130px;
  left: 183px;
`;

function Letter({
  img,
  width,
  height,
  type,
  title,
  createdDate,
  handleCloseModal,
}: {
  img: StaticImageData;
  width: number;
  height: number;
  type: "public" | "support" | "linkedout";
  title: string;
  createdDate: string;
  handleCloseModal?: () => void;
}) {
  return (
    <Layout>
      <EnvelopDiv>
        <LabelDiv>
          <Label text={type} />
        </LabelDiv>
        {type === "support" ? (
          <UserSupportTextField createdDate={createdDate} handleCloseModal={handleCloseModal}/>
        ) : (
          <LinkedoutTextField
            title={title}
            createdDate={createdDate}
            handleCloseModal={handleCloseModal}
          />
        )}

        <Image src={Envelop} width={450} height={438} alt="Envelop_img" />
      </EnvelopDiv>

      <ImgDiv>
        <Image src={img} width={width} height={height} alt="Alarm_img" />
      </ImgDiv>
    </Layout>
  );
}

export default Letter;
