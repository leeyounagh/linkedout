import { useState, useEffect, MouseEvent } from "react";
import Check from "@/shared/ui/check/check";
import styled from "styled-components";
import color from "@/shared/styles/color";
import ConfirmIcon from "@/shared/assets/img/confirm_icon.svg";
import { Button } from "@/shared/ui/button";
import { PrevButton } from "@/shared/ui/button";

interface CheckItem {
  desc: string;
  checked: boolean;
  required: boolean;
  isOpenDesc: boolean;
}

interface CheckState {
  allCheck: boolean;
  service: CheckItem;
  personal: CheckItem;
  age: CheckItem;
  marketing: CheckItem;
  location: CheckItem;
  alert: CheckItem;
}
type TermKey = "service" | "personal" | "location";
interface CheckFieldProps {
  check: CheckState;
  setCheck: React.Dispatch<React.SetStateAction<CheckState>>;
  handelModalOpen: () => void;
  onClick: () => void;
  handleTerms: (key: TermKey) => void;
}

const Layout = styled.section`
  width: 100%;
  position: absolute;
  top: 321px;
`;

const AllCheckDiv = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 10px;
`;

const P = styled.p``;

const CheckDiv = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
  height: 34px;
  margin-bottom: 12px;
  position: relative;
  p {
    color: ${color.gray};
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 170%;
  }
`;

const ConfirmDiv = styled.div`
  position: absolute;
  right: 29px;
  cursor: pointer;
`;

function CheckField({
  check,
  setCheck,
  handelModalOpen,
  onClick,
  handleTerms,
}: CheckFieldProps) {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  // 필수 체크사항 판별 로직
  useEffect(() => {
    const requiredItems = ["service", "personal", "age"];
    const allRequiredChecked = requiredItems.every(
      (item) => (check[item as keyof CheckState] as CheckItem).checked
    );
    setIsButtonEnabled(allRequiredChecked);
  }, [check]);

  const handleAllCheck = () => {
    const newAllCheck = !check.allCheck;

    const updatedCheck = {
      allCheck: newAllCheck,
      service: { ...check.service, checked: newAllCheck },
      personal: { ...check.personal, checked: newAllCheck },
      age: { ...check.age, checked: newAllCheck },
      marketing: { ...check.marketing, checked: newAllCheck },
      alert: { ...check.alert, checked: newAllCheck },
      location: { ...check.location, checked: newAllCheck },
    };

    setCheck(updatedCheck);
  };

  const handleIndividualCheck = (key: keyof CheckState) => {
    setCheck((prevCheck) => ({
      ...prevCheck,
      [key]: {
        ...prevCheck[key as keyof Omit<CheckState, "allCheck">],
        checked: !prevCheck[key as keyof Omit<CheckState, "allCheck">].checked,
      },
    }));
  };

  const checkItems = [
    { key: "service", item: check.service },
    { key: "personal", item: check.personal },
    { key: "age", item: check.age },
    { key: "location", item: check.location },
    { key: "marketing", item: check.marketing },
    { key: "alert", item: check.alert },
  ];

  return (
    <Layout>
      <PrevButton />
      <AllCheckDiv onClick={handleAllCheck}>
        <Check check={isButtonEnabled} setCheck={() => {}} type="circle" />
        <P>전체 동의</P>
      </AllCheckDiv>
      {checkItems.map(({ key, item }) => (
        <CheckDiv key={key}>
          <Check
            check={item.checked}
            setCheck={() => handleIndividualCheck(key as keyof CheckState)}
            type="general"
          />
          <P>{item.desc}</P>
          {item.isOpenDesc && (
            <ConfirmDiv
              onClick={() => {
                handelModalOpen();
                if (["service", "personal", "location"].includes(key)) {
                  handleTerms(key as TermKey);
                }
              }}
            >
              <ConfirmIcon />
            </ConfirmDiv>
          )}
        </CheckDiv>
      ))}
      <Button
        text="확인"
        style="square"
        scale="large"
        type={isButtonEnabled ? "point" : "disable"}
        onClick={onClick}
      />
    </Layout>
  );
}

export default CheckField;
