"use client";
import React, { useState, useEffect } from "react";
import DefaultLayout from "./layout/onboardingLayout";
import FirstStepContent from "./content/firstStepContent";
import GeneralContent from "./content/general/generalContent";
import Swiper from "@/shared/lib/swiper/swiper";
import styled from "styled-components";

type StepType = "step1" | "step2" | "step3" | "step4";
const stepObj: { [key: string]: StepType } = {
  "1": "step1",
  "2": "step2",
  "3": "step3",
  "4": "step4",
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const OnBoarding = () => {
  const [step, setStep] = useState(1);
  const [isGifEnded, setIsGifEnded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const timer = setTimeout(() => {
        setIsGifEnded(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {isGifEnded ? (
        <Swiper step={step} setStep={setStep} maxStep={4}>
          {Array.from({ length: 4 }, (_, index) => (
            <Container key={index}>
              <GeneralContent step={stepObj[`${index + 1}`]} />
            </Container>
          ))}
        </Swiper>
      ) : (
        <DefaultLayout>
          <FirstStepContent />
        </DefaultLayout>
      )}
    </>
  );
};
