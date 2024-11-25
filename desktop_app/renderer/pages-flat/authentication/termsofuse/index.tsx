import { useState, useEffect, SetStateAction, MouseEvent } from "react";
import CheckField from "./ui/chekcField";
import DefaultLayout from "../ui/layout/defaultLayout";
import TextField from "../ui/contents/textfield";
import { fetchData } from "@/shared/api/fetchData";
import { Modal } from "@/shared/ui/modal";
import { useRouter } from "next/navigation";
import { GeneralToast } from "@/shared/ui/toast";
import { useStore } from "@/shared/store";
import { getUserInfo } from "@/shared/api";

type TermKey = "service" | "personal" | "location";

function index() {
  const [check, setCheck] = useState({
    allCheck: false,
    service: {
      desc: "(필수) 서비스 이용약관 동의",
      checked: false,
      required: true,
      isOpenDesc: true,
    },
    personal: {
      desc: "(필수) 개인정보 수집 및 이용 동의",
      checked: false,
      required: true,
      isOpenDesc: true,
    },
    age: {
      desc: "(필수) 만 14세 이상입니다",
      checked: false,
      required: true,
      isOpenDesc: false,
    },
    location: {
      desc: "(선택) 위치 기반 서비스 이용 약관 동의",
      checked: false,
      required: false,
      isOpenDesc: true,
    },
    marketing: {
      desc: "(선택) 마케팅 정보 수신 동의",
      checked: false,
      required: false,
      isOpenDesc: false,
    },
    alert: {
      desc: "(선택) 서비스 알림 수신 동의",
      checked: false,
      required: false,
      isOpenDesc: false,
    },
  });
  const [fcmToken, setFcmToken] = useState("");
  const [machineId, setMachineId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowToast, setIsShowToast] = useState(false);
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);
  const [currentTerm, setCurrentTerm] = useState<TermKey>("service");

  useEffect(() => {
    const handleDeviceInfo = (data: string) => {
      setMachineId(data);
    };

    window.Electron?.onDeviceInfo(handleDeviceInfo);
    window.Electron?.requestDeviceInfo();
    window.Electron?.getFCMToken(
      "getFCMToken",
      (_: any, token: SetStateAction<string>) => {
        setFcmToken(token);
      }
    );
  }, []);

  const handelModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };
  const userInfoUpdate = async () => {
    try {
      const isFirstLoginDisabled = {
        isFirst: false,
      };
      await fetchData(`users`, "put", isFirstLoginDisabled);
      const sendAlertList = {
        viewed: check.alert.checked,
        report: check.alert.checked,
        marketing: check.marketing.checked,
      };
      const { status } = await fetchData(
        `support/settings`,
        "post",
        sendAlertList
      );
      if (check.location.checked) {
        await handleAgreeLocation();
      } else if (status === 201) {
        const userData = await getUserInfo();
        if (userData) {
          setUser(userData);
        }
        router.push("/web/complete");
      }
    } catch (err) {
      console.log(err);
      if (err) {
        setIsShowToast(true);
      }
    }
  };

  const handleAgreeLocation = async () => {
    try {
      const body = {
        locationConsent: true,
      };
      const { status } = await fetchData(`users`, "put", body);

      if (status === 200) {
        const userData = await getUserInfo();
        if (userData) {
          setUser(userData);
        }
        router.push("/web/complete");
      }
    } catch (err) {
      console.error("Error updating location consent:", err);
      setIsShowToast(true);
    }
  };

  const handleTerms = (key: TermKey) => {
    setCurrentTerm(key);
  };

  const termsMapper: Record<TermKey, { title: string; url: string }> = {
    service: {
      title: "서비스 이용 약관",
      url: "https://www.linkedoutapp.com/terms",
    },
    personal: {
      title: "개인정보처리 방침",
      url: "https://www.linkedoutapp.com/privacy-policy",
    },
    location: {
      title: "위치기반서비스 이용 약관",
      url: "https://www.linkedoutapp.com/location-terms",
    },
  };

  return (
    <DefaultLayout>
      {isShowToast && (
        <GeneralToast
          title="약관 설정에 실패 했습니다."
          desc="잠시후 다시 시도해 주세요."
          isShowToast={isShowToast}
          setIsShowToast={setIsShowToast}
        />
      )}
      <Modal
        title={termsMapper[`${currentTerm}`].title}
        url={termsMapper[`${currentTerm}`].url}
        isModalOpen={isModalOpen}
        onClick={handelModalOpen}
      />

      <TextField
        title="이용약관 동의"
        desc="회원 서비스 이용을 위해 이용약관을 확인해주세요."
      />
      <CheckField
        check={check}
        setCheck={setCheck}
        handelModalOpen={handelModalOpen}
        onClick={userInfoUpdate}
        handleTerms={handleTerms}
      />
    </DefaultLayout>
  );
}

export default index;
