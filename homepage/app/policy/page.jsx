import Image from "next/image"
import Link from "next/link"

// TODO: text - gray - 500 변경

const Policies = () => {
    return (
        <main className="p-4 sm:p-8 bg-white ">
            <article className="space-y-8">
                <section className="border-b-2 py-6 sm:py-10">
                    <h2 className="text-xl sm:text-2xl font-black mb-4">1. 링크드아웃 개인정보 처리방침</h2>
                    <p className="mb-2">
                        &ldquo;개인정보 처리방침&rdquo;이란 이용자가 안심하고 서비스를 이용할 수 있도록 회사가 준수해야
                        할 지침을 의미하며, 링크드아웃은 개인정보처리자가 준수하여야 하는 대한민국의 관계 법령 및
                        개인정보보호 규정, 가이드라인을 준수하여 개인정보 처리방침을 제공합니다.
                    </p>
                    <p className="my-4">
                        링크드아웃은 이용자의 동의를 기반으로 개인정보를 수집&middot;이용 및 제공하고 있습니다. 이용자의
                        권리(개인정보 자기결정권)를 적극적으로 보장하기 위해 개인정보 처리방침을 알기 쉽게 제공할 수
                        있도록 다양한 노력을 기울이고 있으며, 이러한 노력의 일환으로 링크드아웃의 주요 개인정보 처리
                        관련 정보를 라벨링으로 제공합니다.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 justify-center items-center">
                        <div className="p-2 sm:p-4 flex flex-col items-center">
                            <Image src="/images/개인정보.png" alt="개인정보" width={100} height={100} />
                            <p className="mt-6 text-center font-bold">개인정보</p>
                        </div>
                        <div className="p-2 sm:p-4 flex flex-col items-center">
                            <Image src="/images/처리목적.png" alt="처리목적" width={100} height={100} />
                            <p className="mt-2 text-center font-bold">처리목적</p>
                        </div>
                        <div className="p-2 sm:p-4 flex flex-col items-center">
                            <Image src="/images/제3자제공.png" alt="제3자 제공" width={100} height={100} />
                            <p className="mt-2 text-center font-bold">제3자 제공</p>
                        </div>
                        <div className="p-2 sm:p-4 flex flex-col items-center">
                            <Image src="/images/처리위탁.png" alt="처리위탁" width={100} height={100} />
                            <p className="mt-6 text-center font-bold">처리위탁</p>
                        </div>
                        <div className="p-2 sm:p-4 flex flex-col items-center">
                            <Image
                                src="/images/정보주체의권리의무.png"
                                alt="정보주체의 권리의무"
                                width={100}
                                height={100}
                            />
                            <p className="mt-2 text-center font-bold">정보주체의 권리의무</p>
                        </div>
                        <div className="info-card p-2 sm:p-4 flex flex-col items-center">
                            <Image src="/images/고충처리부서.png" alt="고충처리 부서" width={100} height={100} />
                            <p className="mt-2 text-center font-bold">고충처리 부서</p>
                        </div>
                    </div>
                </section>
                <section className="border-b-2 py-6 sm:py-10">
                    <h2 className="text-xl sm:text-2xl font-black mb-4">2. 개인정보 수집</h2>
                    <h3 className="text-l font-bold mb-2">서비스 제공을 위한 필요 최소한의 개인정보를 수집합니다.</h3>
                    <p className="mb-4">
                        회원 가입 시 또는 서비스 이용 과정에서 홈페이지 또는 개별 어플리케이션이나 프로그램 등을 통해
                        서비스 제공을 위해 필요 최소한의 개인정보를 수집하고 있습니다. 서비스 제공을 위해 반드시 필요한
                        최소한의 정보를 필수항목으로, 그 외 특화된 서비스를 제공하기 위해 추가 수집하는 정보는
                        선택항목으로 동의를 받고 있으며, 선택항목에 동의하지 않은 경우에도 서비스 이용 제한은 없습니다.
                    </p>
                    <div className="p-4">
                        <p className="mb-2 font-semibold">[링크드아웃 계정 가입 시]</p>
                        <p className="mb-2">
                            [필수] 이메일, 비밀번호, 이름(닉네임), 프로필사진, 친구목록, 서비스 이용내역, 서비스 내 구매
                            및 결제 내역
                        </p>
                        <p>[선택] 생년월일, 성별, 배송지정보(수령인명, 배송지주소, 전화번호)</p>
                    </div>
                    <div className="p-4">
                        <p className="mb-4 font-semibold">[고객상담 시]</p>
                        <p>고객센터로 문의 및 상담 시 상담 처리를 위한 추가적인 정보를 수집할 수 있습니다.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border rounded-lg mt-8">
                        <figure className="p-4 flex flex-col justify-center items-center relative">
                            <Image src="/images/개인정보.png" alt="개인정보" width={100} height={100} />
                            <figcaption className="font-bold my-4">개인정보</figcaption>
                            <figcaption className="text-center">
                                링크드아웃 계정 가입 시 서비스 제공을 위해 필요한 최소한의 개인 정보를 수집하고
                                있습니다. 서비스 이용 시 특화된 기능 이용을 위해 이용자의 동의를 받고 추가적인
                                개인정보를 수집할 수 있습니다.
                            </figcaption>
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-52 w-px bg-gray-300"></div>
                        </figure>
                        <figure className="p-4 flex flex-col justify-center items-center">
                            <Image src="/images/자동화수집.png" alt="자동화 수집" width={100} height={100} />
                            <figcaption className="font-bold my-4">자동화 수집</figcaption>
                            <figcaption className="text-center">
                                링크드아웃 서비스 이용 과정에서 단말기정보, IP주소, 쿠키, 방문일 시, 부정이용기록,
                                서비스 이용 기록 등의 정보가 자동으로 생성되어 수집될 수 있습니다.
                            </figcaption>
                        </figure>
                    </div>
                </section>
                <section className="border-b-2 py-6 sm:py-10">
                    <h2 className="text-xl sm:text-2xl font-black mb-4">3. 개인정보 이용</h2>
                    <p className="mb-4 font-black">
                        회원관리, 서비스 제공&middot;개선, 신규 서비스 개발 등을 위해 이용합니다.
                    </p>
                    <ul className="list-disc pl-4 sm:pl-10 mb-4">
                        <li className="my-4">회원 식별/가입의사 확인, 본인/연령 확인</li>
                        <li className="my-4">
                            14세 미만 아동의 개인정보 수집 시 법정 대리인 동의여부 확인, 법정 대리인 권리행사 시 본인
                            확인
                        </li>
                        <li className="my-4">이용자간 팔로우 및 추천 기능의 제공</li>
                        <li className="my-4">팔로워에게 활동내역을 알리거나 이용자 검색, 등록 등의 기능 제공</li>
                        <li className="my-4">문의사항 또는 불만처리, 공지사항 전달</li>
                        <li className="my-4">유료서비스 이용 시 콘텐츠 등의 전송이나 배송&middot;요금 정산</li>
                        <li className="my-4">
                            서비스의 원할한 운영에 지장을 주는 행위(계정 도용 및 부정 이용 행위 등 포함)에 대한 방지 및
                            제재
                        </li>
                        <li className="my-4">
                            인구통계학적 특성과 이용자의 관심, 기호, 성향의 추정을 통한 맞춤형 콘텐츠 추천 및 이벤트,
                            광고 등 마케팅에 활용
                        </li>
                        <li className="my-4">
                            신규 서비스 개발 및 서비스 기능 개선, 개인화된 서비스 제공, 프라이버시 보호를 위한 서비스
                            환경 구축
                        </li>
                        <li className="my-4">서비스 이용 기록, 접속 빈도 및 서비스 이용에 대한 통계</li>
                    </ul>
                    <p className="mb-8 mt-12 font-black">개인정보의 추가적인 이용・제공을 하는 경우가 있습니다.</p>
                    <p className="mb-6">
                        수집 목적과 합리적으로 관련된 범위에서는 법령에 따라 이용자의 동의 없이 개인정보를 이용하거나
                        제3자에게 제공할 수 있습니다. 이 때 &apos;당초 수집 목적과 관련성이 있는지, 수집한 정황 또는
                        처리 관행에 비추어 볼 때 개인정보의 추가적인 이용 또는 제공에 대한 예측 가능성이 있는지,
                        이용자의 이익을 부당하게 침해하는지, 가명처리 또는 암호화 등 안전성 확보에 필요한 조치를
                        하였는지&apos;를 종합적으로 고려합니다.
                    </p>
                    <p className="mb-16">
                        링크드아웃은 수집한 개인정보를 특정 개인을 알아볼 수 없도록 가명처리하여 통계작성, 과학적 연구,
                        공익적 기록보존 등을 위하여 처리할 수 있습니다. 이 때 가명정보는 재식별되지 않도록 추가정보와
                        분리하여 별도 저장・관리하고 필요한 기술적・관리적 보호조치를 취합니다.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border rounded-l text-center">
                        <figure className="p-4 flex flex-col justify-center items-center relative">
                            <div className="flex my-2">
                                <Image
                                    src="/images/처리항목.png"
                                    alt="처리항목"
                                    width={100}
                                    height={100}
                                    className="mx-4"
                                />
                                <Image
                                    src="/images/처리목적.png"
                                    alt="처리목적"
                                    width={100}
                                    height={100}
                                    className="mx-4"
                                />
                            </div>
                            <figcaption className="font-bold">처리항목 및 처리목적</figcaption>
                            <figcaption className="mt-2">
                                이용자의 동의를 받아 수집한 개인정보 항목은 회원 관리 등 서비스 제공을 위해 필요한
                                목적으로 처리합니다. 링크드아웃에서 처리하는 개인정보 항목 및 이용 목적은 개인정보
                                처리방침을 통해 상시 공개하고 있습니다.
                            </figcaption>
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-52 w-px bg-gray-300"></div>
                        </figure>
                        <figure className="p-4 flex flex-col items-center relative">
                            <Image
                                src="/images/추가적이용.png"
                                alt="추가적 이용"
                                width={100}
                                height={100}
                                className="my-2"
                            />
                            <figcaption className="font-bold">추가적 이용</figcaption>
                            <figcaption className="mt-2">
                                당초 수집 목적과 관련성, 수집한 정황 또는 처리 관행 등을 종합적으로 고려하여 수집 목적과
                                합리적으로 관련된 범위에서 추가적으로 개인정보를 이용 및 제공할 수 있습니다.
                            </figcaption>
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-52 w-px bg-gray-300"></div>
                        </figure>
                        <figure className="p-4 flex flex-col items-center">
                            <Image
                                src="/images/가명정보처리.png"
                                alt="가명정보 처리"
                                width={100}
                                height={100}
                                className="my-2"
                            />
                            <figcaption className="font-bold">가명정보 처리</figcaption>
                            <figcaption className="mt-2">
                                수집한 개인정보를 특정 개인을 알아볼 수 없도록 가명처리하여 통계작성, 과학적 연구,
                                공익적 기록보존 등을 위해 처리할 수 있습니다.
                            </figcaption>
                        </figure>
                    </div>
                </section>
                <section className="border-b-2 py-6 sm:py-10">
                    <h2 className="text-xl sm:text-2xl font-black mb-4">4. 개인정보 제공</h2>
                    <p className="mb-4 font-bold">
                        링크드아웃은 이용자의 별도 동의가 있거나 법령에 규정된 경우를 제외하고는 이용자의 개인정보를
                        제3자에게 제공하지 않습니다.
                    </p>
                    <p className="mb-4">
                        링크드아웃은 이용자의 사전 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 다만, 이용자가
                        링크드아웃계정 로그인 서비스를 이용하거나 외부 제휴사 등의 서비스를 이용하는 경우 필요한 범위
                        내에서 이용자의 동의를 얻은 후에 개인정보를 제3자에게 제공하고 있습니다.
                    </p>
                    <p className="mb-4">
                        또한 해외 서비스 이용을 위해 이용자의 동의를 받아 국외로 개인정보가 제공될 수 있으며, 국외 이전
                        시 제공받는 자 및 이전국가 등에 대해 고지하여 별도 동의를 받고 있습니다.
                    </p>
                    <p className="mb-4">
                        링크드아웃은 재난, 감염병, 급박한 생명・신체 위험을 초래하는 사건사고, 급박한 재산 손실 등의
                        긴급상황이 발생하는 경우 정보주체의 동의 없이 관계기관에 개인정보를 제공할 수 있습니다.
                    </p>
                    <p className="mt-16 mb-8 font-bold">서비스 제공을 위해 아래와 같은 업무를 위탁합니다.</p>
                    <p className="mb-8">
                        서비스 제공을 위해 필요한 경우 개인정보 처리 업무 중 일부를 외부에 위탁할 수 있습니다. 위탁받은
                        업체가 위탁받은 업무 목적 외로 개인정보를 처리하는 것을 제한하고, 기술적・관리적 보호조치 적용
                        및 재위탁 제한 등 위탁받은 업체의 개인정보 보호 관련 법령 준수 여부를 관리&middot;감독하고
                        있습니다. 이용자는 고객센터를 통해 개인정보의 국외 이전을 거부할 수 있습니다. 이용자가
                        개인정보의 국외 이전을 거부하는 경우, 개인정보 국외이전이 필수적으로 수반되는 서비스의 이용이
                        제한될 수 있습니다.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border rounded-l text-center p-4">
                        <div className="p-4 relative">
                            <figure className="flex flex-col items-center">
                                <Image src="/images/제3자제공.png" alt="제3자 제공" width={100} height={100} />
                                <figcaption className="my-2 text-center font-bold">제3자 제공</figcaption>
                            </figure>
                            <p className="mt-2">
                                외부 제휴사 등의 서비스 이용 시 이용자에게 제3자 제공 동의를 받은 후 개인정보를 제공하고
                                있습니다. 개인정보가 제공될 수 있는 제3자 업체 목록은 링크드아웃 개인정보 처리방침을
                                통해 확인하실 수 있습니다.
                            </p>
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-72 w-px bg-gray-300"></div>
                        </div>
                        <div className="p-4 my-4 relative">
                            <figure className="flex flex-col items-center">
                                <Image src="/images/처리위탁.png" alt="처리위탁" width={100} height={100} />
                                <figcaption className="my-2 text-center font-bold">처리위탁</figcaption>
                            </figure>
                            <p className="mt-2">
                                링크드아웃 서비스 제공에 있어 반드시 필요한 업무 중 일부를 외부 업체에서 수행할 수
                                있도록 개인정보를 위탁하고 있습니다. 위탁 시 위탁받은 업체가 개인정보보호 관련 법령을
                                준수할 수 있도록 정기적으로 관리・감독하고 있습니다.
                            </p>
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-72 w-px bg-gray-300"></div>
                        </div>
                        <div className="p-4">
                            <figure className="flex flex-col items-center">
                                <Image src="/images/국외이전.png" alt="국외이전" width={100} height={100} />
                                <figcaption className="my-2 text-center font-bold">국외이전</figcaption>
                            </figure>
                            <p className="mt-2">
                                국외 제휴 업체의 서비스를 이용 시 사전 동의를 받아 이용자의 개인정보가 국외로 제공될 수
                                있습니다. 또한 해외 SMS 발송 업무 등을 목적으로 국외 업체에 특정 개인정보 처리를
                                위탁하고 있습니다.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="border-b-2 py-6 sm:py-10">
                    <h2 className="text-xl sm:text-2xl font-black mb-4">5. 개인정보 파기</h2>
                    <p className="mb-4 font-bold">
                        수집 및 이용목적이 달성된 경우 수집한 개인정보는 지체없이 파기합니다.
                    </p>
                    <p className="mb-4">
                        수집 및 이용 목적의 달성 또는 회원 탈퇴 등 파기 사유가 발생한 경우 개인정보의 형태를 고려하여
                        파기방법을 정합니다. 전자적 파일 형태인 경우 복구 및 재생되지 않도록 안전하게 삭제하고, 그 밖에
                        기록물, 인쇄물, 서면 등의 경우 분쇄하거나 소각하여 파기합니다.
                    </p>
                    <p className="mb-4">내부 방침에 따라 일정 기간 보관 후 파기하는 정보는 아래와 같습니다.</p>
                    <ul className="pl-4 sm:pl-6 mb-4">
                        <li>
                            1. 아래 정보는 탈퇴일로부터 최대 1년간 보관 후 파기합니다.
                            <ul className="list-disc ml-6 sm:pl-6">
                                <li className="my-4">
                                    안내메일 발송 및 CS문의 대응을 위해 링크드아웃계정과 탈퇴안내 이메일 주소를
                                    암호화하여 보관
                                </li>
                                <li className="my-4">서비스 부정이용 기록</li>
                            </ul>
                        </li>
                        <li className="my-4">2. 권리침해 신고 및 유해정보 신고 이력은 5년간 보관 후 파기합니다.</li>
                    </ul>
                    <p className="mb-4">이 외에 법령에 따라 개인정보를 처리합니다.</p>
                    <div className="p-8 border text-center flex flex-col items-center">
                        <figure>
                            <div className="flex items-center justify-cener">
                                <Image
                                    src="/images/보유기간.png"
                                    alt="보유기간"
                                    width={100}
                                    height={100}
                                    className="mx-2"
                                />
                                <Image src="/images/파기.png" alt="파기" width={100} height={100} className="mx-2" />
                            </div>
                            <figcaption className="my-4 text-center font-bold">보유기간 및 파기</figcaption>
                        </figure>
                        <p>
                            수집 및 이용 목적의 달성 또는 회원 탈퇴 등 파기사유가 발생한 개인정보는 안전하게 파기합니다.
                            수집된 개인정보는 사전에 안내된 보유기간 동안만 보관 후 파기하며, 관계법령에 따라 일정보관이
                            필요한 정보는 별도로 보관합니다.
                        </p>
                    </div>
                </section>
                <section className="border-b-2 py-6 sm:py-10">
                    <h2 className="text-xl sm:text-2xl font-black mb-4">6. 개인위치정보의 처리</h2>
                    <p className="mb-4 font-bold">
                        링크드아웃은 위치정보의 보호 및 이용 등에 관한 법률에 따라 아래와 같이 개인위치정보를
                        처리합니다.
                    </p>
                    <p className="mb-4 font-bold">
                        <Link
                            href="/위치기반서비스_이용약관.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-800"
                        >
                            링크드아웃 위치정보 이용약관 제4조
                        </Link>
                        에 따른 서비스의 제공을 위해 개인위치정보를 보유할 수 있습니다.
                    </p>
                    <ul className="list-disc pl-4 ml-4 sm:pl-6 mb-4">
                        <li className="mb-4">
                            위치기반서비스 이용 및 제공 목적 달성한 때에는 지체없이 개인위치정보를 파기합니다.
                        </li>
                        <li className="mb-4">
                            이용자가 작성한 게시물 또는 콘텐츠와 함께 위치정보가 저장되는 서비스의 경우 해당 게시물 또는
                            콘텐츠의 보관기간 동안 개인위치정보가 보관됩니다.
                        </li>
                        <li>
                            그 외 위치기반서비스 제공을 위해 필요한 경우 이용목적 달성을 위해 필요한 최소한의 기간 동안
                            개인위치정보를 보유할 수 있습니다.
                        </li>
                    </ul>
                    <p className="mb-4 font-bold">개인위치정보의 수집 및 이용목적이 달성되면 지체없이 파기합니다.</p>
                    <div>
                        <p className="mb-4">
                            수집 및 이용 목적의 달성 또는 회원 탈퇴 등 개인위치정보 처리목적이 달성된 경우,
                            개인위치정보를 복구 및 재생되지 않도록 안전하게 삭제합니다. 다만, 다른 법령에 따라 보관해야
                            하는 등 정당한 사유가 있는 경우에는 그에 따릅니다.
                        </p>
                        <p className="mb-4">
                            또한, 위치정보법 제16조2항에 따라 이용자의 위치정보의 이용・제공사실 확인자료를
                            위치정보시스템에 6개월간 보관합니다.
                        </p>
                    </div>
                    <p className="my-8 font-bold">
                        이용자의 사전 동의 없이 개인위치정보를 제3자에게 제공하지 않습니다.
                    </p>
                    <div>
                        <p className="mb-4">
                            링크드아웃은 이용자의 동의 없이 개인위치정보를 제3자에게 제공하지 않으며, 제3자에게 제공하는
                            경우에는 제공받는 자 및 제공목적을 사전에 이용자에게 고지하고 동의를 받습니다.
                        </p>
                        <p className="mb-4">
                            이용자의 동의를 거쳐 개인위치정보를 제3자에게 제공하는 경우, 이용자에게 매회 이용자에게
                            제공받는 자, 제공일시 및 제공목적을 즉시 통지합니다.
                        </p>
                    </div>
                    <p className="my-8 font-bold">
                        8세 이하의 아동 등의 보호를 위해 필요한 경우 보호의무자의 권리는 아래와 같습니다.
                    </p>
                    <div>
                        <p className="mb-4">
                            위치정보법 제26조제1항에 따라 &lsquo;8세 이하의 아동&rsquo;, &lsquo;피성년후견인&rsquo;,
                            &lsquo;장애인복지법에 따른 장애인에 해당하는 이용자&rsquo;의 생명 또는 신체 보호를 위하여
                            보호의무자가 개인위치정보의 이용 또는 제공에 동의하는 경우에는 본인의 동의가 있는 것으로
                            봅니다.
                        </p>
                        <p className="mb-4">
                            위 권리를 행사하고자 하는 보호의무자는 서면동의서에 보호의무자임을 증명하는 서면을 첨부하여
                            회사에 제출하여야 하며, 이 경우 보호의무자는 위치정보 이용약관에 따른 이용자의 권리를 모두
                            가집니다.
                        </p>
                        <p className="mb-4">
                            그 외 개인위치정보 처리와 관련된 자세한 내용은{" "}
                            <Link
                                href="/위치기반서비스_이용약관.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-800 font-bold"
                            >
                                링크드아웃 위치정보 이용약관
                            </Link>
                            을 참고하시기 바랍니다.
                        </p>
                    </div>
                    <div className="p-8 border text-center flex flex-col items-center">
                        <figure>
                            <div className="flex items-center justify-cener">
                                <Image src="/images/보유기간.png" alt="보유기간" width={100} height={100} />
                                <Image src="/images/파기.png" alt="파기" width={100} height={100} />
                            </div>
                            <figcaption className="my-4 text-center font-bold">보유기간 및 파기</figcaption>
                        </figure>
                        <p>
                            수집 및 이용 목적의 달성 또는 회원 탈퇴 등 파기사유가 발생한 개인정보는 안전하게 파기합니다.
                            수집된 개인정보는 사전에 안내된 보유기간 동안만 보관 후 파기하며, 관계법령에 따라 일정보관이
                            필요한 정보는 별도로 보관합니다.
                        </p>
                    </div>
                </section>
                <section className="border-b-2 py-6 sm:py-10">
                    <h2 className="text-xl sm:text-2xl font-black mb-4">7. 이용자 및 법정대리인의 권리와 행사 방법</h2>

                    <p className="mb-4 font-bold">
                        이용자는 자신의 개인정보 처리에 관하여 아래와 같은 권리를 가질 수 있습니다.
                    </p>
                    <ul className="list-disc pl-4 ml-4 sm:pl-6 mb-4">
                        <li className="mb-4">개인정보 열람(조회)을 요구할 권리</li>
                        <li className="mb-4">개인정보 정정을 요구할 권리</li>
                        <li className="mb-4">개인정보 처리정지를 요구할 권리</li>
                        <li className="mb-4">개인정보 삭제요구 및 동의철회/탈퇴를 요구할 권리</li>
                    </ul>
                    <div>
                        <p className="mb-4 font-bold mt-16">
                            이용자는 서비스 내 다음과 같은 기능을 통해 언제든지 개인정보 열람(조회) 등의 권리를 직접
                            행사하거나 또는 고객센터를 통해 요청할 수 있습니다.
                        </p>
                        <ul className="list-disc pl-4 ml-4 sm:pl-6 mb-4">
                            <li className="mb-4">링크드아웃계정 정보 열람 및 수정</li>
                            <li className="mb-4">링크드아웃계정과 연결된 서비스 관리</li>
                            <li className="mb-4">
                                링크드아웃 서비스 이용을 위한 개인정보 수집, 이용, 제3자 제공 현황 확인
                            </li>
                        </ul>
                        <p>
                            링크드아웃은 이용자의 요청을 받은 경우 이를 지체없이 처리하며, 이용자가 개인정보의 오류에
                            대한 정정을 요청한 경우 정정을 완료하기 전까지 해당 개인정보를 이용 또는 제공하지 않습니다.
                        </p>
                    </div>
                    <div>
                        <p className="mb-4 font-bold mt-16">
                            14세 미만 아동의 개인정보를 처리할 경우에는 법정대리인의 동의를 받아야 합니다. 법정대리인은
                            아동의 개인정보를 조회하거나 수정 및 삭제, 처리정지 및 동의 철회 등의 권리를 행사할 수
                            있습니다.
                        </p>
                        <p className="mb-4">
                            법정대리인 동의를 받기 위하여 아동에게 법정대리인의 성명, 연락처와 같이 최소한의 정보를
                            요구할 수 있으며, 아래 방법으로 법정대리인의 동의를 확인합니다.
                        </p>
                        <ul className="list-disc pl-4 ml-4 sm:pl-6 mb-4">
                            <li className="mb-4">법정대리인의 휴대전화 본인인증을 통해 본인여부를 확인하는 방법</li>
                            <li className="mb-4">
                                법정대리인에게 동의내용이 적힌 서면을 제공하여 서명날인 후 제출하게 하는 방법
                            </li>
                            <li className="mb-4">
                                그 밖에 위와 준하는 방법으로 법정대리인에게 동의내용을 알리고 동의의 의사표시를 확인하는
                                방법
                            </li>
                        </ul>
                    </div>
                    <div className="p-8 border text-center flex flex-col items-center">
                        <figure>
                            <div className="flex items-center justify-cener">
                                <Image
                                    src="/images/정보주체의권리의무.png"
                                    alt="정보주체의권리의무"
                                    width={100}
                                    height={100}
                                />
                                <Image src="/images/열람청구.png" alt="열람청구" width={100} height={100} />
                            </div>
                            <figcaption className="my-4 text-center font-bold">정보주체의 권리의무</figcaption>
                        </figure>
                        <p>
                            링크드아웃 이용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며, 동의한 개인정보
                            처리에 대해 동의 철회를 요구할 수 있습니다.
                        </p>
                    </div>
                </section>
                <section className="border-b-2 py-6 sm:py-10">
                    <h2 className="text-xl sm:text-2xl font-black mb-4">8. 개인정보 자동 수집 장치에 관한 사항</h2>
                    <p className="mb-4 font-bold">웹기반 서비스 제공을 위하여 쿠키를 설치・운영할 수 있습니다.</p>
                    <p className="mb-4">
                        빠르고 편리한 웹사이트 사용을 지원하고 맞춤형 서비스를 제공하기 위해 쿠키를 사용합니다.
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="my-8">
                            <h3 className="font-bold mb-6">쿠키란?</h3>
                            <p>
                                이용자가 웹사이트를 접속할 때 해당 웹사이트에서 이용자의 브라우저에 보내는 저용량 텍스트
                                파일로 이용자 PC에 저장됩니다.
                            </p>
                        </div>
                        <div className="my-4">
                            <h3 className="font-bold mb-6">사용목적</h3>
                            <p>
                                개인화되고 맞춤화된 서비스를 제공하기 위해서 이용자의 정보를 저장하고 수시로 불러오는
                                쿠키를 사용합니다. 이용자가 웹사이트에 방문할 경우 웹 사이트 서버는 이용자의 디바이스에
                                저장되어 있는 쿠키를 읽어 이용자의 환경설정을 유지하고 맞춤화된 서비스를 제공 하게
                                됩니다. 쿠키는 이용자가 웹 사이트를 방문할 때, 웹 사이트 사용을 설정한대로 접속하고
                                편리하게 사용할 수 있도록 돕습니다.
                            </p>
                        </div>
                        <div className="my-8">
                            <h3 className="font-bold mb-6">쿠키 수집 거부</h3>
                            <p>
                                이용자는 쿠키 설치에 대한 선택권을 가지고 있으며, 웹브라우저 상단의 &lsquo;설정 &gt;
                                개인정보보호 &gt; 쿠키 및 기타 사이트 데이터&rsquo; 경로에서 쿠키 설정을 통해 쿠키 허용
                                및 거부를 할 수 있습니다. 다만, 쿠키 설치를 거부할 경우 웹 사용이 불편해지며, 로그인이
                                필요한 일부 서비스 이용이 어려울 수 있습니다.
                            </p>
                            <div className="my-6">
                                <p className="mb-6">웹브라우저에서 쿠키 허용/차단</p>
                                <ul className="list-disc pl-4 sm:pl-6 mb-2">
                                    <li className="my-4">
                                        크롬(Chrome): 웹 브라우저 설정 &gt; 개인정보 보호 및 보안 &gt; 인터넷 사용 기록
                                        삭제
                                    </li>
                                    <li>
                                        엣지(Edge): 웹 브라우저 설정 &gt; 쿠키 및 사이트 권한 &gt; 쿠키 및 사이트 데이터
                                        관리 및 삭제
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-4">
                                <p className="mb-6">모바일브라우저에서 쿠키 허용/차단</p>
                                <ul className="list-disc pl-4 sm:pl-6">
                                    <li className="my-4">
                                        크롬(Chrome): 모바일 브라우저 설정 &gt; 개인정보 보호 및 보안 &gt; 인터넷 사용
                                        기록 삭제
                                    </li>
                                    <li className="mb-4">
                                        사파리(Safari): 모바일 기기 설정 &gt; 사파리(Safari) &gt; 고급 &gt; 모든 쿠키
                                        차단
                                    </li>
                                    <li>
                                        삼성 인터넷: 모바일 브라우저 설정 &gt; 인터넷 사용 기록 &gt; 인터넷 사용 기록
                                        삭제
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="border-b-2 py-6 sm:py-10">
                    <h2 className="text-xl sm:text-2xl font-black mb-4">9. 개인정보의 안전성 확보 조치에 관한 사항</h2>
                    <p className="mb-4 font-bold">링크드아웃은 이용자의 개인정보 보호를 위해 아래의 노력을 합니다.</p>
                    <ul className="list-disc pl-4 ml-4 sm:pl-6 mb-4">
                        <li className="mb-4">
                            이용자의 개인정보를 암호화된 통신구간을 이용하여 전송하고, 비밀번호 등 중요정보는 암호화하여
                            보관하고 있습니다.
                        </li>
                        <li className="mb-4">
                            해킹이나 컴퓨터 바이러스 등에 의해 이용자의 개인정보가 유출되거나 훼손되는 것을 막기 위해
                            외부로부터 접근이 통제된 구역에 시스템을 설치하고 있습니다. 또한 새로운 해킹/보안 기술에
                            대해 지속적으로 연구하여 서비스에 적용하고 있습니다.
                        </li>
                        <li className="mb-12">
                            개인정보를 처리하는 임직원을 최소한으로 제한하고 있습니다. 또한 개인정보처리 시스템에 대한
                            비밀번호의 생성과 변경, 그리고 접근할 수 있는 권한에 대한 체계적인 기준을 마련하고 지속적인
                            감사를 실시하고 있습니다.
                        </li>
                    </ul>
                    <div className="info-card p-4 border rounded-lg text-center">
                        <figure className="flex flex-col items-center">
                            <Image src="/images/안정성확보조치.png" alt="안정성 확보조치" width={100} height={100} />
                            <figcaption className="mb-2 mt-4 text-center font-bold">안전성 확보조치</figcaption>
                        </figure>
                        <p className="mt-2">
                            이용자의 개인정보를 안전하게 관리하기 위해 개인정보보호법에 따른 법적 요구사항을 모두
                            준수하고 있으며, 보호조치 수준에 대해서는 내부 점검 및 외부 검증을 통해 정기적으로 확인하고
                            있습니다.
                        </p>
                    </div>
                    <p className="my-4 font-bold">
                        링크드아웃은 유럽연합 일반 개인정보보호법(General Data Protection Regulation) 및 EU 회원국의
                        법률(이하 &lsquo;GDPR등&rsquo;)을 준수합니다.
                    </p>
                    <p className="mb-4">
                        유럽연합 내 이용자를 대상으로 서비스를 제공하는 경우, 아래 내용이 적용될 수 있습니다.
                    </p>
                    <div>
                        <h3 className="font-semibold mb-4 mt-12">[개인정보 처리의 목적 및 처리근거]</h3>
                        <p className="mb-4">
                            링크드아웃은 수집한 개인정보를 &ldquo;3. 개인정보의 이용&rdquo;에 기재된 목적으로만
                            이용하며, 사전에 이용자에게 해당 사실을 알리고 동의를 구하고 있습니다. 그리고 GDPR등에 따라
                            링크드아웃은 아래 하나에 해당하는 경우에 이용자의 개인정보를 처리할 수 있습니다.
                        </p>
                        <ul className="list-disc pl-4 ml-4 sm:pl-6 mb-4">
                            <li className="mb-4">정보주체의 동의</li>
                            <li className="mb-4">정보주체와의 계약의 체결 및 이행을 위한 경우</li>
                            <li className="mb-4">법적 의무사항 준수를 위한 경우</li>
                            <li className="mb-4">정보주체의 중대한 이익을 위해 처리가 필요한 경우</li>
                            <li>
                                회사의 적법한 이익 추구를 위한 경우(정보주체의 이익과 권리 또는 자유가 그 이익보다
                                중요한 경우는 제외)
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4 mt-12">[유럽연합 내 이용자의 권리 보장]</h3>
                        <p className="mb-4">
                            GDPR 등에 따라 이용자는 자신의 개인정보를 다른 관리자에게 이전해 달라고 요청할 수 있고,
                            자신의 정보 처리 거부를 요청할 수 있습니다. 그리고 이용자는 개인정보보호 권한 당국에 불만을
                            제기할 권리가 있습니다. 또한, 링크드아웃은 이벤트 및 광고 등 마케팅을 제공하기 위해
                            개인정보를 활용할 수 있으며, 사전에 이용자의 동의를 구하고 있습니다. 이용자는 원하지 않는
                            경우 언제든지 동의를 철회할 수 있습니다.
                        </p>
                        <p className="mb-4">
                            위와 관련한 요청사항은 고객센터를 통해 서면, 전화 또는 이메일로 연락하시면 지체 없이
                            조치하겠습니다.
                        </p>
                        <p>
                            개인정보의 오류에 대한 정정을 요청하신 경우 정정을 완료하기 전까지 해당 개인정보를 이용 또는
                            제공하지 않습니다.
                        </p>
                    </div>
                </section>
                <section className="border-b-2 py-6 sm:py-10">
                    <h2 className="text-xl sm:text-2xl font-black mb-4">10. 개인정보 보호책임자 및 고충처리 부서</h2>
                    <p className="mb-4 font-bold">
                        링크드아웃은 이용자의 개인정보 관련 문의사항 및 불만 처리 등을 위하여 개인정보 보호책임자를
                        지정하고 있습니다.
                    </p>
                    <div>
                        <p className="mb-4 font-bold">개인정보 보호 책임자</p>
                        <ul className="list-disc pl-4 ml-4 sm:pl-6 mb-4">
                            <li className="mb-4">책임자: 조대찬 (대표)</li>
                            <li className="mb-4">문의</li>
                            <li className="list-none">
                                <ul className="pl-4 sm:pl-6">
                                    <li className="mb-4">- 서비스 내 고객센터</li>
                                    <li>- Email : linkedoutapp@gmail.com</li>
                                </ul>
                            </li>
                        </ul>
                        <p className="mb-4">
                            개인정보보호 관련 문의, 불만 등 의견이 있는 경우 위 연락처로 접수해 주시면 신속하게 검토하여
                            답변 드리겠습니다.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border rounded-lg text-center p-4">
                        <div className="p-4 relative">
                            <figure className="flex flex-col items-center">
                                <div className="flex justify-center">
                                    <Image
                                        src="/images/개인정보보호책임자.png"
                                        alt="개인정보보호책임자"
                                        width={100}
                                        height={100}
                                    />
                                    <Image src="/images/고충처리부서.png" alt="고충처리부서" width={100} height={100} />
                                </div>
                                <figcaption className="my-2 text-center font-bold">
                                    개인정보보호책임자 & 고충처리 부서
                                </figcaption>
                            </figure>
                            <p className="mt-2">
                                링크드아웃 서비스 이용 시 발생하는 모든 개인정보보호 관련 문의 및 불만사항은
                                개인정보보호책임자 고충처리 부서(링크드아웃 고객 센터)로 문의해주시면 됩니다.
                            </p>
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-60 w-px bg-gray-300"></div>
                        </div>
                        <div className="p-2">
                            <figure className="flex flex-col items-center">
                                <Image src="/images/권익침해구제.png" alt="권익침해 구제" width={100} height={100} />
                                <figcaption className="my-2 text-center font-bold">권익침해 구제</figcaption>
                            </figure>
                            <p className="mt-2">
                                개인정보가 침해되어서 이에 대한 신고나 상담이 필요하신 경우 국가기관에 문의하여 도움을
                                받으실 수 있습니다.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="border-b-2 py-6 sm:py-10">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4">11. 개정 전 고지의무 등 안내</h2>
                    <p className="mb-4">
                        법령이나 서비스의 변경사항을 반영하기 위한 목적 등으로 개인정보 처리방침을 수정할 수 있습니다.
                        개인정보 처리방침이 변경되는 경우 최소 7일 전 변경 사항을 사전에 안내 하겠습니다. 다만, 이용자
                        권리의 중대한 변경이 발생할 때에는 최소 30일 전에 미리 알려드리겠습니다.
                    </p>
                    <p className="mb-4">
                        링크드아웃은 이용자 여러분의 정보를 소중히 생각하며, 이용자가 더욱 안심하고 서비스를 이용할 수
                        있도록 최선의 노력을 다할 것을 약속드립니다.
                    </p>
                    <ul className="list-disc pl-4 ml-4 sm:pl-6 mb-4">
                        <li className="mb-4">공고일자: 2024년 00월 00일</li>
                        <li>시행일자: 2024년 00월 00일</li>
                    </ul>
                    <div className="info-card p-4 border rounded-lg text-center">
                        <figure className="flex flex-col items-center">
                            <Image
                                src="/images/개인정보처리방침변경.png"
                                alt="개인정보처리방침변경"
                                width={100}
                                height={100}
                            />
                            <figcaption className="mt-2 font-bold">개인정보처리방침변경</figcaption>
                        </figure>
                        <p className="mt-2">
                            법령이나 서비스 변경으로 인해 개인정보 처리방침이 개정될 수 있으며, 개인정보 처리방침 변경
                            시 공지사항을 통해 이용자 여러분들께 사전에 변경사항을 공지합니다.
                        </p>
                    </div>
                </section>
            </article>
        </main>
    )
}

export default Policies
