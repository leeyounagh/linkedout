import React, { useState } from "react";
import styled from "styled-components";
import ArrowIcon from "@/shared/assets/img/arrow_icon.svg";

interface Option {
  value: string;
  label: string;
}

interface SelectBoxProps {
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const SelectContainer = styled.div`
  position: relative;
  width: 127px;
  max-width: 300px;
  color: #262626;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
`;

const SelectedOption = styled.div<{ isOpen: boolean }>`
  width: 127px;
  height: 40px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: ${({ isOpen }) => (isOpen ? "10px 10px 0 0" : "10px")};
  background-color: #cfcfcf;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6.83px 14.23px;
`;

const OptionList = styled.div`
  position: absolute;
  top: 40px;
  width: 127px;
  border: 1px solid #ccc;
  border-radius: 0 0 10px 10px;
  background: #cfcfcf;
  overflow-y: auto;
  z-index: 10;
  padding: 6.83px 14.23px;
`;

const OptionItem = styled.div`
  font-size: 16px;
  color: #262626;
  cursor: pointer;
  border-bottom: 1px solid #c5c5c5;
`;

const ArrowIconDiv = styled.div<{ isOpen: boolean }>`
  transform: rotate(${(props) => (props.isOpen ? "180deg" : "0deg")});
  transition: transform 0.3s ease;
  height:30px;
`;

const SelectBox: React.FC<SelectBoxProps> = ({
  options,
  selectedValue,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <SelectContainer>
      <SelectedOption isOpen={isOpen} onClick={toggleDropdown}>
        {selectedValue}
        <ArrowIconDiv isOpen={isOpen}>
          <ArrowIcon />
        </ArrowIconDiv>
      </SelectedOption>
      {isOpen && (
        <OptionList>
          {options
            .filter((option) => option.label !== selectedValue)
            .map((option) => (
              <OptionItem
                key={option.label}
                onClick={() => {
                  onChange(option.label);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </OptionItem>
            ))}
        </OptionList>
      )}
    </SelectContainer>
  );
};

export default SelectBox;
