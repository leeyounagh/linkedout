import styled from "styled-components";
import color from "@/shared/styles/color";
import CloseBtn from "@/shared/assets/img/white_close.svg";

const Layout = styled.div`
  border-radius: 65px;
  background: ${color.pointcolor};
  display: inline-flex;
  padding: 2px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 32px;
  width: auto;
  min-width: 78px;
  position: relative;
  svg{
  cursor: pointer;
  }
`;



function Tag({ value, onClose }: { value: string; onClose: () => void }) {
  const coordinatePattern = /^-?\d{1,3}\.\d+˚[NS] -?\d{1,3}\.\d+˚[EW]$/;
  const isCoordinate = (value: string): boolean => {
    return coordinatePattern.test(value);
  };

  return (
    <Layout>
      {value}
      {!isCoordinate(value) && <CloseBtn onClick={onClose} />}
    </Layout>
  );
}

export default Tag;
