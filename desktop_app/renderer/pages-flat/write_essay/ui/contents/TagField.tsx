import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TagIcon from "@/shared/assets/img/tag_icon.svg";
import LocationIcon from "@/shared/assets/img/point_location_icon.webp";
import Image from "next/image";
import BaseInput from "@/shared/ui/input/BaseInput";
import { BaseButton } from "@/shared/ui/button";
import { Tag } from "@/shared/ui/tag";
import TagChip from "./TagChip";
import { formatLatitudeLongitude } from "@/shared/lib/location";
import { useStore } from "@/shared/store";

const Layout = styled.div`
  width: 80%;
  height: 60px;
  border-top: 1px rgba(104, 104, 104, 0.1);
  background: #121212;
  display: flex;
  position: relative;
`;
const ImageDiv = styled.div`
  width: 31.278px;
  height: 100%;
`;
const InputDiv = styled.div`
  width: 180px;
  height: 24px;
  margin-top: 3px;
  margin-left: 11px;
`;
const BtnDiv = styled.div`
  width: 121px;
  height: 100%;
  position: absolute;
  right: 0;
`;
const TagDiv = styled.div`
  width: 100%;
  height: 60px;
  overflow-x: auto;
  position: absolute;
  top: -70px;
  display: flex;
  gap: 4px;
  background: #121212;
  padding-top: 10px;
`;

interface MapperValue {
  img: React.ReactNode;
  placeholder: string;
  btnText: string;
}
interface CompleteStatus {
  tag: boolean;
  location: boolean;
  [key: string]: boolean;
}
interface BottomValue {
  active: "tag" | "location";
  tag: {
    values: string[];
  };
  location: {
    values: string[];
  };
}

interface OptionType {
  bottomValue: BottomValue;
  setBottomValue: React.Dispatch<React.SetStateAction<BottomValue>>;
  activeTag: "tag" | "location";
}
function TagField({ activeTag, bottomValue, setBottomValue }: OptionType) {
  const [inputValue, setInputValue] = useState<string>("");
  const [isComplete, setComplete] = useState<CompleteStatus>({
    tag: false,
    location: false,
  });
  const user = useStore((state) => state.user);


  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const locationData = await window.Electron.getLocation();
        if (locationData && user?.locationConsent) {
          const { formattedLat, formattedLng } = formatLatitudeLongitude(
            locationData.latitude,
            locationData.longitude
          );
          const parseLocation = `${formattedLat} ${formattedLng}`;

          setBottomValue((prev) => ({
            ...prev,
            location: {
              ...prev.location,
              values: [parseLocation, ...prev.location.values.slice(1)],
            },
          }));
        }
      } catch (err) {
        console.error("Error fetching location:", err);
      }
    };

    fetchLocation();
  }, [user]);

  const mapper: Record<string, MapperValue> = {
    tag: {
      img: <TagIcon></TagIcon>,
      placeholder: "감정 해시태그를 입력하세요.",
      btnText: "해시태그 저장",
    },
    location: {
      img: <Image src={LocationIcon} alt="place_tag" width={30} height={30} />,
      placeholder: "장소 이름을 입력해주세요.",
      btnText: "장소 저장",
    },
  };

  const activeValue =
    activeTag && mapper[activeTag] ? mapper[activeTag] : undefined;

  // 버튼 클릭하면 tag인지 location 인지 판단한다
  // 태그일경우 모든 인덱스의 앞에 #을 붙여서 반환
  // 장소일경우 좌표가 있을경우 좌표라는 키값으로 따로 변수에 담아야됨

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();

      if (inputValue.trim() !== "") {
        if (activeTag === "tag") {
          setBottomValue((prev) => {
            if (prev.tag.values.length < 5) {
              return {
                ...prev,
                tag: {
                  ...prev.tag,
                  values: [...prev.tag.values, `# ${inputValue.trim()}`],
                },
              };
            }
            return prev;
          });
        } else if (activeTag === "location") {
          setBottomValue((prev) => ({
            ...prev,
            location: {
              ...prev.location,
              values:
                prev.location.values.length === 2
                  ? [prev.location.values[0], inputValue.trim()]
                  : [prev.location.values[0], inputValue.trim()],
            },
          }));
        }
        setInputValue("");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const removeTag = (index: number) => {
    if (activeTag === "tag") {
      setBottomValue((prev) => ({
        ...prev,
        tag: {
          ...prev.tag,
          values: prev.tag.values.filter((_, i) => i !== index),
        },
      }));
    } else if (activeTag === "location") {
      setBottomValue((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          values: prev.location.values.filter((_, i) => i !== index),
        },
      }));
    }
  };

  const handleComplete = (tag: string) => {
    setComplete((prevStatus) => ({
      ...prevStatus,
      [tag]: !prevStatus[tag],
    }));
  };

  return (
    <Layout>
      {!isComplete[activeTag as keyof CompleteStatus] && (
        <TagDiv>
          {(activeTag === "tag"
            ? bottomValue?.tag?.values
            : activeTag === "location"
            ? bottomValue?.location?.values
            : []
          ).map((value, index) => (
            <React.Fragment key={`${activeTag}-${index}`}>
              <Tag value={value} onClose={() => removeTag(index)} />
            </React.Fragment>
          ))}
        </TagDiv>
      )}
      {isComplete[activeTag as keyof CompleteStatus] && (
        <TagChip
          activeTag={activeTag}
          tagValues={bottomValue?.tag?.values}
          locationValues={bottomValue?.location?.values}
          handleComplete={handleComplete}
        />
      )}

      {activeValue && !isComplete[activeTag as keyof CompleteStatus] ? (
        <>
          <ImageDiv>{activeValue.img}</ImageDiv>
          <InputDiv>
            <BaseInput
              value={inputValue}
              placeholder={activeValue.placeholder}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
          </InputDiv>
          <BtnDiv>
            <BaseButton onClick={() => handleComplete(activeTag)}>
              {activeValue.btnText}
            </BaseButton>
          </BtnDiv>
        </>
      ) : null}
    </Layout>
  );
}

export default TagField;
