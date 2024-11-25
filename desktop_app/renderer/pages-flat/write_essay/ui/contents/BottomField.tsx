import styled from "styled-components";
import TagField from "./TagField";

const Layout = styled.div`
  padding: 0px 147px;
  background: #121212;
  width: 100%;
  height: 26.34vh;
  position: fixed;
  bottom: 0px;
  z-index: 10;
`;

interface BottomValue {
  active: "tag" | "location";
  tag: {
    values: string[];
  };
  location: {
    values: string[];
  };
}

interface optionType {
  bottomValue: BottomValue;
  setBottomValue: React.Dispatch<React.SetStateAction<BottomValue>>;
  setIsTagSave: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLocationSave: React.Dispatch<React.SetStateAction<boolean>>;
  isTagSave:boolean;
  isLocationSave:boolean;
}

function BottomField({
  bottomValue,
  setBottomValue,
  setIsTagSave,
  setIsLocationSave,
  isTagSave,
  isLocationSave
}: optionType) {
  return (
    <Layout>
      <TagField
        activeTag={bottomValue.active}
        bottomValue={bottomValue}
        setBottomValue={setBottomValue}
        setIsTagSave={setIsTagSave}
        setIsLocationSave={setIsLocationSave}
        isTagSave={isTagSave}
        isLocationSave={isLocationSave}
      />
    </Layout>
  );
}

export default BottomField;
