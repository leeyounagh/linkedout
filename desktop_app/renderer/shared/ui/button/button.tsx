"use client";
import React, { useLayoutEffect, useState, MouseEventHandler } from "react";
import * as Styled from "./button.styled";
import { updateBtnStyle } from "@/shared/lib/style";
import { BtnType, styleObjType } from "@/shared/types";

type ButtonProps = BtnType & {
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Button = ({
  text,
  style = "square",
  type = "point",
  scale = "large",
  onClick,
}: ButtonProps) => {
  const [styleObj, setStyleObj] = useState<styleObjType | null>(null);

  useLayoutEffect(() => {
    const savedStyle = localStorage.getItem("buttonStyle");
    if (savedStyle) {
      setStyleObj(JSON.parse(savedStyle));
    }
  }, []);

  useLayoutEffect(() => {
    const returnedStyle = updateBtnStyle(style, type, scale);
    if (returnedStyle) {
      setStyleObj(returnedStyle);
      localStorage.setItem("buttonStyle", JSON.stringify(returnedStyle));
    }
  }, [style, type, scale]);

  if (!styleObj) {
    return null;
  }

  return (
    <Styled.SButton
      $borderradius={styleObj.borderRadius}
      $backgroundcolor={styleObj.backgroundColor}
      $width={styleObj.width}
      $height={styleObj.height}
      onClick={onClick}
    >
      {text}
    </Styled.SButton>
  );
};
