import React, { useEffect } from 'react';

const Terms: React.FC = () => {
  useEffect(() => {
    document.title = '이용약관 - 하이퍼세일즈';
  }, []);
  return (
      <div className="bg-gray-50 py-10 font-sans">
          <div className="max-w-4xl mx-auto p-8 md:p-12 bg-white border border-gray-200 rounded-lg shadow-sm">
              <header className="text-center border-b border-gray-200 pb-6 mb-10">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">하이퍼세일즈-네트워크 이용약관</h1>
                  <p className="text-sm text-gray-500">시행일: 2025년 O월 O일</p>
              </header>

              <main className="text-gray-700 space-y-8">
                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">제1조 (목적)</h2>
                      <p className="leading-relaxed">본 약관은 주식회사 도비스튜디오(이하 "회사"라 함)가 제공하는 하이퍼세일즈-네트워크 서비스(이하 "서비스"라 함)의 이용과 관련하여, 회사와 회원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">제2조 (용어의 정의)</h2>
                      <p className="leading-relaxed mb-4">① 이 약관에서 사용하는 용어의 정의는 아래와 같습니다.</p>
                      <ol className="list-decimal pl-5 space-y-3 leading-relaxed">
                          <li><strong className="font-semibold text-gray-800">"서비스"</strong>라 함은 회원이 자신의 비즈니스 인맥 정보를 회사를 통해 익명화된 형태로 등록하고, 이를 기반으로 다른 회원에게 비즈니스 인맥 소개를 요청하거나, 자신의 인맥을 다른 회원에게 소개하거나, 지인을 통해 소개를 받는 등 인맥 연결을 중개하는 과정 전반에 걸친 하이퍼세일즈-네트워크 관련 제반 서비스를 의미합니다. 본 서비스의 핵심은 소개의 성공을 조건으로 하는 유료 매칭 서비스입니다.</li>
                          <li><strong className="font-semibold text-gray-800">"회원"</strong>이라 함은 “회사”의 "서비스"에 접속하여 이 약관에 따라 "회사"와 이용계약을 체결하고 "회사"가 제공하는 "서비스"를 이용하는 고객을 말하며, 서비스 내 역할에 따라 "소개 요청자", "소개자"로 구분될 수 있습니다.</li>
                          <li><strong className="font-semibold text-gray-800">"소개 요청자"</strong>라 함은 다른 회원이 등록한 익명화된 인맥 정보를 검색하여 특정 인물에 대한 소개를 요청하고, 소개 성사를 위해 "서비스 이용료"를 지불할 의사가 있는 회원을 말합니다.</li>
                          <li><strong className="font-semibold text-gray-800">"소개자"</strong>라 함은 자신의 이메일 정보 연동 등을 통해 비즈니스 인맥 정보를 "회사"에 제공하여 익명화된 인맥 풀을 구성하는 데 기여하며, "소개 요청자"의 요청을 "소개 당사자"에게 전달하는 중개 역할을 수행하는 회원을 말합니다.</li>
                          <li><strong className="font-semibold text-gray-800">"소개 당사자"</strong>라 함은 "소개자"의 인맥으로, "소개 요청자"가 소개받기를 원하는 대상이 되는 개인을 말합니다. "소개 당사자"는 서비스의 회원이 아닐 수 있으며, 소개 요청에 대해 수락 또는 거절할 최종 결정권을 가집니다.</li>
                          <li><strong className="font-semibold text-gray-800">"인맥 정보"</strong>라 함은 "소개자"인 회원의 이메일 서명 등에서 수집된 정보(이름, 회사명, 부서, 직책, 연락처, 이메일 주소 등) 또는 회원이 직접 입력한 정보 중, 회사가 개인을 식별할 수 없도록 익명화 처리하여 "서비스"에 '회사명'과 '직책' 등의 형태로 등록하는 정보를 말합니다.</li>
                          <li><strong className="font-semibold text-gray-800">"서비스 이용료"</strong>라 함은 "소개 요청자"가 소개 성사를 목적으로 "회사"에 지불하는 비용을 의미합니다.</li>
                          <li><strong className="font-semibold text-gray-800">"성공 사례금"</strong>이라 함은 소개가 성공적으로 완료되었을 경우, "서비스 이용료"의 일부를 "회사"가 정한 정책에 따라 "소개자"와 "소개 당사자"에게 지급하는 보상을 의미합니다.</li>
                          <li><strong className="font-semibold text-gray-800">"회원ID"</strong>라 함은 “회원”의 식별과 “서비스” 이용을 위하여 “회원”이 등록한 이메일 주소를 말합니다.</li>
                          <li><strong className="font-semibold text-gray-800">"비밀번호"</strong>라 함은 “회원”이 “회원ID”를 부여받은 자와 동일인임을 확인하고 “회원”의 권익을 보호하기 위하여 “회원”이 선정한 문자 또는 문자와 숫자의 조합을 말합니다.</li>
                          <li><strong className="font-semibold text-gray-800">"게시물"</strong>이라 함은 “회원”이 “서비스”를 이용함에 있어 “서비스”상에 게시한 소개 요청 메시지 등 정보형태의 글, 파일과 링크 등을 의미합니다.</li>
                      </ol>
                      <p className="leading-relaxed mt-4">② 이 약관에서 사용하는 용어의 정의는 제1항에서 정하는 것을 제외하고는 관련 법령에서 정하는 바에 따르며, 관련 법령에서 정하지 않는 것은 일반적인 상관례에 따릅니다.</p>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">제3조 (약관의 명시와 개정)</h2>
                      <p className="leading-relaxed">① “회사”는 이 약관의 내용과 상호, 영업소재지, 대표자의 성명, 사업자등록번호, 연락처 등을 ”회원”이 알 수 있도록 “서비스” 초기화면에 게시하거나 기타의 방법으로 ”회원”에게 공지합니다.</p>
                      <p className="leading-relaxed">② “회사”는 「약관의 규제에 관한 법률」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</p>
                      <p className="leading-relaxed">③ “회사”가 약관을 개정할 경우에는 시행일자 및 개정사유를 명시하여 현행약관과 함께 개정약관의 시행일자 7일전부터 시행일자 전일까지 공지합니다. 단 “회원”의 권리, 의무에 중대한 영향을 주는 변경의 경우에는 시행일자 30일 전부터 공지하도록 합니다.</p>
                      <p className="leading-relaxed">④ “회원”은 변경된 약관에 대해 거부할 권리가 있습니다. “회원”이 변경된 약관이 공지된 지 15일 이내에 거부의사를 표시하지 않거나, 시행일자 이후에 "서비스"를 이용하는 경우에는 개정약관에 동의한 것으로 간주합니다.</p>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">제4조 (약관의 해석)</h2>
                      <p className="leading-relaxed">① “회사”는 개별 서비스에 대한 별도의 운영정책을 둘 수 있으며, 해당 내용이 본 약관과 상충되는 경우 개별 서비스에 대한 운영정책이 우선합니다.</p>
                      <p className="leading-relaxed">② 이 약관에서 규정하지 않은 사항에 관해서는 관련 법령 또는 상관례에 따릅니다.</p>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">제5조 (이용계약의 성립)</h2>
                      <p className="leading-relaxed">① “서비스” 이용계약은 서비스를 이용하고자 하는 자(이하 "가입신청자"라 함)가 본 약관과 개인정보처리방침의 내용에 대한 동의를 한 다음 회원가입 신청을 하고, 그에 대해 "회사"가 이용 승낙을 함으로써 체결됩니다.</p>
                      <p className="leading-relaxed">② “회사”는 “가입신청자”의 신청에 대하여 서비스 이용을 승낙함을 원칙으로 합니다. 다만, “회사”는 다음 각 호에 해당하는 이용신청에 대하여는 승낙을 거절하거나 사후에 “이용계약”을 해지할 수 있습니다.</p>
                      <ol className="list-decimal pl-5 space-y-2 leading-relaxed">
                          <li>“가입신청자”가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우</li>
                          <li>실명이 아니거나 타인의 명의를 이용한 경우</li>
                          <li>허위의 정보를 기재하거나, “회사”가 제시하는 내용을 기재하지 않은 경우</li>
                          <li>만 14세 미만인 경우</li>
                          <li>“가입신청자”의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하며 신청하는 경우</li>
                      </ol>
                      <p className="leading-relaxed">③ “회사”는 기술상 또는 업무상 문제가 있는 경우에는 승낙을 유보할 수 있습니다.</p>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">제6조 (개인정보의 보호 및 관리)</h2>
                      <p className="leading-relaxed">“회사”는 관계 법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위하여 노력합니다. “회원”의 개인정보 보호 및 사용에 대해서는 “회사”가 별도로 고지하는 개인정보처리방침에 따릅니다.</p>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">제7조 (회원ID 및 비밀번호)</h2>
                      <p className="leading-relaxed">① “회원”은 자신의 “회원ID”와 “비밀번호”를 선량한 관리자의 주의의무를 다하여 관리하여야 합니다. 이를 위반함으로써 발생하는 손해에 대하여는 “회원”에게 책임이 있습니다.</p>
                      <p className="leading-relaxed">② “회원”은 자신의 “회원ID” 및 “비밀번호”가 도용되거나 제3자가 사용하고 있음을 인지한 경우에는 이를 즉시 “회사”에 통지하고 “회사”의 안내에 따라야 합니다.</p>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">제8조 (회원에 대한 통지)</h2>
                      <p className="leading-relaxed">① “회사”가 “회원”에 대한 통지를 하는 경우 본 약관에 별도 규정이 없는 한 “회원”이 지정한 이메일, “서비스” 내 알림 등으로 할 수 있습니다.</p>
                      <p className="leading-relaxed">② “회사”는 “회원” 전체에 대한 통지의 경우 7일 이상 “서비스” 공지사항에 게시함으로써 제1항의 통지에 갈음할 수 있습니다.</p>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">제9조 (서비스 이용료 및 성공 사례금)</h2>
                      <p className="leading-relaxed">① "소개 요청자"는 "소개 당사자"가 소개를 수락하여 소개가 성사된 경우 "회사"가 정한 "서비스 이용료"를 결제해야 합니다. "회사"는 서비스 화면에 이용료, 결제 방법 및 환불 정책을 명확히 고지합니다.</p>
                      <p className="leading-relaxed">② "회사"는 서비스 운영 정책에 따라 "소개 요청자"에게 보증금 형태의 선결제를 요청할 수 있으며, 이 경우 소개 실패 시 전액 환불합니다.</p>
                      <p className="leading-relaxed">③ 소개가 성공적으로 완료된 경우, "회사"는 사전에 고지된 분배 정책에 따라 "소개자"와 "소개 당사자"에게 "성공 사례금"을 지급합니다.</p>
                      <p className="leading-relaxed">④ "성공 사례금" 지급을 위해 "회사"는 "소개자"와 "소개 당사자"에게 정산에 필요한 최소한의 정보(계좌 정보 등)를 요청할 수 있으며, 관련 법령에 따른 제세공과금이 발생할 경우 이를 공제하고 지급할 수 있습니다.</p>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">제10조 (회사의 의무)</h2>
                      <p className="leading-relaxed">① “회사”는 관련 법령과 본 약관이 금지하는 행위 및 미풍양속에 반하는 행위를 하지 않으며, 계속적이고 안정적인 “서비스” 제공을 위하여 최선을 다하여 노력합니다.</p>
                      <p className="leading-relaxed">② “회사”는 “회원”이 안전하게 “서비스”를 이용할 수 있도록 개인정보 보호를 위한 보안시스템을 갖추어야 하며 개인정보처리방침을 공시하고 준수합니다.</p>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">제11조 (회원의 의무)</h2>
                      <p className="leading-relaxed">① “회원”은 다음 각 호에 해당하는 행위를 해서는 안됩니다.</p>
                      <ol className="list-decimal pl-5 space-y-2 leading-relaxed">
                          <li>가입신청 또는 정보 변경 시 허위 사실을 기재하는 행위</li>
                          <li>타인의 정보를 도용하는 행위</li>
                          <li>“회사”가 게시한 정보를 변경하는 행위</li>
                          <li>“회사”의 사전 승낙없이 영리 목적으로 “서비스”를 사용하는 행위</li>
                          <li>“회사” 및 제3자의 저작권 등 지적재산권을 침해하는 행위</li>
                          <li>“회사” 및 제3자의 명예를 훼손하거나 업무를 방해하는 행위</li>
                          <li>"서비스"를 통해 취득한 "소개 당사자"의 연락처 정보를 소개 요청 시 명시한 목적 외의 용도로 사용하거나 제3자에게 유출하는 행위</li>
                          <li>"소개자"로서 "소개 요청자"의 메시지를 "소개 당사자"에게 전달함에 있어 내용을 임의로 왜곡하거나 허위 사실을 추가하는 행위</li>
                          <li>기타 불법적이거나 부당한 행위</li>
                      </ol>
                      <p className="leading-relaxed">② “회원”은 관계 법령, 본 약관, 이용안내 및 “서비스”와 관련하여 공지한 주의사항, “회사”가 통지하는 사항 등을 준수하여야 하며, 기타 “회사”의 업무에 방해되는 행위를 하여서는 안 됩니다.</p>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">제12조 (서비스의 제공 및 변경)</h2>
                      <p className="leading-relaxed">① “회사”는 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴 1일 24시간 “서비스”를 제공합니다. 단, 시스템 정기점검 등의 경우 “서비스”를 일시 중지할 수 있습니다.</p>
                      <p className="leading-relaxed">② “회사”는 상당한 이유가 있는 경우 운영상, 기술상의 필요에 따라 제공하고 있는 “서비스”의 전부 또는 일부를 변경할 수 있으며, 이 경우 변경 7일 전에 공지합니다.</p>
                      <p className="leading-relaxed">③ “회사”는 무료로 제공되는 “서비스”의 일부 또는 전부를 회사의 정책 및 운영의 필요상 수정, 중단, 변경할 수 있으며, 이에 대하여 관련법상 특별한 규정이 없는 한 “회원”에게 별도의 보상을 하지 않습니다.</p>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">제13조 (게시물의 저작권 및 관리)</h2>
                      <p className="leading-relaxed">① “회원”이 “서비스” 내에 게시한 게시물의 저작권은 해당 게시물의 저작자에게 귀속됩니다.</p>
                      <p className="leading-relaxed">② “회원”의 게시물이 관련 법령에 위반되는 내용을 포함하는 경우, 권리자는 게시중단 및 삭제 등을 요청할 수 있으며, “회사”는 관련 법령에 따라 조치를 취하여야 합니다.</p>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">제14조 (권리의 귀속)</h2>
                      <p className="leading-relaxed">① “서비스”에 대한 저작권 및 지적재산권은 “회사”에 귀속됩니다.</p>
                      <p className="leading-relaxed">② “회사”는 “회원”에게 계정, ID, 콘텐츠 등을 이용할 수 있는 이용권만을 부여하며, “회원”은 이를 양도, 판매, 담보 제공 등의 처분행위를 할 수 없습니다.</p>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">제15조 (계약해제·해지 등)</h2>
                      <p className="leading-relaxed">① “회원”은 언제든지 '설정' 메뉴를 통하여 이용계약 해지(회원 탈퇴)를 신청할 수 있으며, “회사”는 이를 즉시 처리하여야 합니다.</p>
                      <p className="leading-relaxed">② 회원이 탈퇴할 경우, 진행 중이던 모든 소개 요청 건은 자동으로 취소되며, "서비스 이용료"의 환불은 "회사"의 환불 정책에 따릅니다.</p>
                      <p className="leading-relaxed">③ 회원이 탈퇴하더라도, 탈퇴 이전에 "소개자"로서 제공하여 익명화 처리된 "인맥 정보"는 다른 회원의 서비스 이용을 위해 비식별화된 상태로 남을 수 있습니다.</p>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">제16조 (청약철회 및 환불)</h2>
                      <p className="leading-relaxed">① "소개 요청자"는 "소개 당사자"의 연락처 정보를 제공받기 전까지 청약철회를 할 수 있습니다.</p>
                      <p className="leading-relaxed">② "소개 당사자"가 소개를 수락하여 "소개 요청자"에게 연락처 정보가 제공된 경우, 이는 「전자상거래 등에서의 소비자보호에 관한 법률」에 따라 서비스 또는 디지털 콘텐츠의 공급이 개시된 경우에 해당하여 청약철회가 제한될 수 있습니다.</p>
                      <p className="leading-relaxed">③ "회사"의 귀책사유로 "소개 요청자"가 서비스를 이용하지 못하는 경우, "회사"는 이용료 전액을 환불합니다.</p>
                      <p className="leading-relaxed">④ 기타 환불에 관한 사항은 "회사"의 환불 정책 및 관련 법령에 따릅니다.</p>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">제17조 (이용제한 등)</h2>
                      <p className="leading-relaxed">① “회사”는 “회원”이 본 약관의 의무를 위반하거나 “서비스”의 정상적인 운영을 방해한 경우, 경고, 일시정지, 영구이용정지 등으로 “서비스” 이용을 단계적으로 제한할 수 있습니다.</p>
                      <p className="leading-relaxed">② “회사”는 제1항에도 불구하고, 명의도용, 결제도용, 저작권법 위반 등 관련 법령을 위반한 경우에는 즉시 영구이용정지를 할 수 있습니다.</p>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">제18조 (책임의 한계)</h2>
                      <p className="leading-relaxed">① “회사”는 천재지변 또는 이에 준하는 불가항력으로 인하여 “서비스”를 제공할 수 없는 경우에는 “서비스” 제공에 관한 책임이 면제됩니다.</p>
                      <p className="leading-relaxed">② “회사”는 “회원”의 귀책사유로 인한 “서비스” 이용의 장애에 대하여는 책임을 지지 않습니다.</p>
                      <p className="leading-relaxed">③ “회사”는 “회원”이 “서비스”와 관련하여 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여는 책임을 지지 않습니다.</p>
                      <p className="leading-relaxed">④ “회사”는 “회원” 간 또는 “회원”과 제3자(소개 당사자 포함) 상호간에 “서비스”를 매개로 하여 발생한 분쟁에 대해 개입할 의무가 없으며, 이로 인한 손해를 배상할 책임이 없습니다.</p>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">제19조 (준거법 및 재판관할)</h2>
                      <p className="leading-relaxed">① “회사”와 “회원” 간 제기된 소송은 대한민국법을 준거법으로 합니다.</p>
                      <p className="leading-relaxed">② “회사”와 “회원” 간 발생한 분쟁에 관한 소송은 민사소송법상의 관할법원에 제소합니다.</p>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">제20조 (회사의 연락처)</h2>
                      <ul className="list-none space-y-1 leading-relaxed">
                          <li><strong className="font-semibold text-gray-800">상호:</strong> 주식회사 도비스튜디오</li>
                          <li><strong className="font-semibold text-gray-800">대표자:</strong> OOO</li>
                          <li><strong className="font-semibold text-gray-800">주소:</strong> OOO</li>
                          <li><strong className="font-semibold text-gray-800">이메일 주소:</strong> OOO</li>
                      </ul>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">부칙</h2>
                      <p className="leading-relaxed">제1조 (시행일) 이 약관은 2025년 O월 O일부터 시행합니다.</p>
                  </section>
              </main>
          </div>
      </div>
  );
};

export default Terms;
