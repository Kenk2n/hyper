import React, { useEffect } from 'react';

const Privacy: React.FC = () => {
  useEffect(() => {
    document.title = '개인정보 처리방침 - 하이퍼세일즈';
  }, []);
  return (
      <div className="bg-gray-50 py-10 font-sans">
          <div className="max-w-4xl mx-auto p-8 md:p-12 bg-white border border-gray-200 rounded-lg shadow-sm">
              <header className="text-center border-b border-gray-200 pb-6 mb-10">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">하이퍼세일즈-네트워크 개인정보처리방침</h1>
                  <p className="text-sm text-gray-500">시행일자: 2025년 O월 O일</p>
              </header>

              <main className="text-gray-700 space-y-8">
                  <p className="leading-relaxed">주식회사 도비스튜디오(이하 '회사'라 함)는 「개인정보 보호법」 등 관련 법령을 준수하며, 이용자의 개인정보 및 권익을 보호하기 위해 다음과 같이 개인정보처리방침을 수립·공개합니다.</p>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">1. 개인정보의 수집 및 이용 목적</h2>
                      <p className="leading-relaxed mb-4">회사는 서비스 제공을 위해 아래와 같이 필요한 최소한의 개인정보를 수집 및 이용합니다.</p>
                      <div className="overflow-x-auto">
                          <table className="w-full border-collapse text-sm">
                              <thead className="bg-gray-100">
                              <tr>
                                  <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700">구분</th>
                                  <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700">수집 항목</th>
                                  <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700">수집 및 이용 목적</th>
                              </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                              <tr>
                                  <td className="border border-gray-300 p-3 align-top font-medium">회원가입 시 (공통)</td>
                                  <td className="border border-gray-300 p-3 align-top"><strong className="font-semibold text-gray-800">[필수]</strong> 이메일 주소, 비밀번호, 이름, 휴대전화 번호</td>
                                  <td className="border border-gray-300 p-3 align-top">- 회원 식별 및 가입 의사 확인<br/>- 서비스 이용 계약의 체결 및 유지<br/>- 공지사항 전달, 민원 처리</td>
                              </tr>
                              <tr>
                                  <td className="border border-gray-300 p-3 align-top font-medium">'소개자' 역할 수행 시</td>
                                  <td className="border border-gray-300 p-3 align-top"><strong className="font-semibold text-gray-800">[필수]</strong> 이메일 내 서명 정보 (이름, 회사명, 부서, 직책, 연락처 등) 또는 직접 입력한 인맥 정보</td>
                                  <td className="border border-gray-300 p-3 align-top">- <strong className="font-semibold text-gray-800">익명화 처리 후 인맥 풀 생성 및 관리</strong><br/>- 소개 요청 중개 및 전달</td>
                              </tr>
                              <tr>
                                  <td className="border border-gray-300 p-3 align-top font-medium">'소개 요청자' 역할 수행 시</td>
                                  <td className="border border-gray-300 p-3 align-top"><strong className="font-semibold text-gray-800">[필수]</strong> 프로필 정보(소속 회사, 직책), 소개 요청 메시지<br/><strong className="font-semibold text-gray-800">[결제 시]</strong> 신용카드 정보, 계좌 정보 등 결제 관련 정보</td>
                                  <td className="border border-gray-300 p-3 align-top">- 소개 요청의 신뢰도 확보 및 소개자/당사자에게 전달<br/>- 서비스 이용료 결제, 청약철회 및 환불 처리</td>
                              </tr>
                              <tr>
                                  <td className="border border-gray-300 p-3 align-top font-medium">사례금 정산 신청 시 ('소개자' 및 '소개 당사자')</td>
                                  <td className="border border-gray-300 p-3 align-top"><strong className="font-semibold text-gray-800">[필수]</strong> 이름, 연락처, 은행명, 계좌번호, 예금주<br/>(법령에 따라) 주민등록번호</td>
                                  <td className="border border-gray-300 p-3 align-top">- 성공 사례금 지급 및 정산<br/>- 소득세법에 따른 원천징수 및 소득 신고</td>
                              </tr>
                              <tr>
                                  <td className="border border-gray-300 p-3 align-top font-medium">'소개 당사자'가 소개 수락 시</td>
                                  <td className="border border-gray-300 p-3 align-top"><strong className="font-semibold text-gray-800">[필수]</strong> 공개에 동의한 본인의 연락처(이메일, 휴대전화 번호 등)</td>
                                  <td className="border border-gray-300 p-3 align-top">- <strong className="font-semibold text-gray-800">'소개 요청자'에게 연락처 정보를 제공하기 위함 (핵심 목적)</strong></td>
                              </tr>
                              <tr>
                                  <td className="border border-gray-300 p-3 align-top font-medium">고객 문의 시</td>
                                  <td className="border border-gray-300 p-3 align-top"><strong className="font-semibold text-gray-800">[필수]</strong> 이메일 주소, 휴대전화 번호, 문의 내용</td>
                                  <td className="border border-gray-300 p-3 align-top">- 원활한 상담 및 요청사항 처리</td>
                              </tr>
                              <tr>
                                  <td className="border border-gray-300 p-3 align-top font-medium">서비스 이용 과정 자동 수집</td>
                                  <td className="border border-gray-300 p-3 align-top">IP주소, 쿠키, 서비스 이용 기록, 기기 정보</td>
                                  <td className="border border-gray-300 p-3 align-top">- 부정 이용 방지, 서비스 품질 개선 및 통계 분석<br/>- 맞춤형 서비스 제공 및 광고 게재</td>
                              </tr>
                              </tbody>
                          </table>
                      </div>

                      {/* Google 표준 표(사용자가 제공한 HTML) */}
                      <div className="overflow-x-auto">
                        <div className="mt-6 text-sm text-gray-600">아래 표는 Google 표준 양식을 참고하여 병행 표기한 예시입니다.</div>
                        <div className="mt-3" dangerouslySetInnerHTML={{ __html: `<table style="border-collapse: collapse; width: 100%; text-align: left; margin-top: 20px; margin-bottom: 20px; border: 1px solid rgb(221, 221, 221);"><thead><tr><th style="border-bottom: 2px solid rgb(221, 221, 221); padding: 8px; background-color: rgb(249, 249, 249);">수집출처</th><th style="border-bottom: 2px solid rgb(221, 221, 221); padding: 8px; background-color: rgb(249, 249, 249);">예시</th><th style="border-bottom: 2px solid rgb(221, 221, 221); padding: 8px; background-color: rgb(249, 249, 249);">수집항목</th></tr></thead><tbody><tr><td style="border-bottom: 1px solid rgb(238, 238, 238); padding: 8px;">귀하가 제공하는 정보</td><td style="border-bottom: 1px solid rgb(238, 238, 238); padding: 8px;">당사는 귀하가 개인정보를 제공할 때 해당 정보를 획득할 수 있습니다 (예: 이메일이나 전화로 당사에 연락하는 경우)</td><td style="border-bottom: 1px solid rgb(238, 238, 238); padding: 8px;">이름, 성별, 생년월일, 기업명, 직무, 이메일 주소, 전화번호, 아이디, 패스워드</td></tr><tr><td style="border-bottom: 1px solid rgb(238, 238, 238); padding: 8px;">가입 세부정보</td><td style="border-bottom: 1px solid rgb(238, 238, 238); padding: 8px;">당사는 귀하가 당사 사이트 또는 서비스를 이용하거나, 이용을 위해 가입할 때 귀하의 개인정보를 수집 또는 획득할 수 있습니다.</td><td style="border-bottom: 1px solid rgb(238, 238, 238); padding: 8px;">동의한 기록, 동의 일시, 동의 방법 및 관련 정보</td></tr><tr><td style="border-bottom: 1px solid rgb(238, 238, 238); padding: 8px;">지불 정보</td><td style="border-bottom: 1px solid rgb(238, 238, 238); padding: 8px;">당사는 귀하가 당사 사이트 또는 서비스를 이용하거나, 이용을 위해 가입할 때 귀하의 개인정보를 수집 또는 획득할 수 있습니다.</td><td style="border-bottom: 1px solid rgb(238, 238, 238); padding: 8px;">송장 기록, 지불 기록, 청구지 주소, 지불 방법, 은행 계좌번호, 카드 또는 계정 보안 세부정보, 지불 금액, 지불 날짜</td></tr><tr><td style="border-bottom: 1px solid rgb(238, 238, 238); padding: 8px;">의견 및 사후평가</td><td style="border-bottom: 1px solid rgb(238, 238, 238); padding: 8px;">귀하가 당사에 보내기로 선택한 관점 및 의견을 수집 또는 획득 할 수 있습니다.</td><td style="border-bottom: 1px solid rgb(238, 238, 238); padding: 8px;">당사에 보낸 의견 및 관점, 소셜 미디어 플랫폼에 공개적으로 올린 당사에 대한 게시물</td></tr><tr><td style="border-bottom: 1px solid rgb(238, 238, 238); padding: 8px;">Google API</td><td style="border-bottom: 1px solid rgb(238, 238, 238); padding: 8px;">기본적으로 귀하의 구글 로그인 인증 과정에서 Google OAuth2.0 프로토콜을 사용합니다. 귀하가 메일 발송 기능을 사용하고자 할때, 제3자인 Nylas 기반의 Gmail 통합 인증을 진행합니다. 당사는 이를 바탕으로 인증된 사용자에 대한 정보를 획득하고, 사용자가 특정 리드에게 발송하고 이를 바탕으로 답장/반송 여부를 추적할 수 있도록 발송 권한 및 읽기 권한을 부여할 수 있습니다.</td><td style="border-bottom: 1px solid rgb(238, 238, 238); padding: 8px;">Google 계정 정보(이메일 주소 등), 이메일 발송/회신 내용, 이메일 발송/회신 날짜, 이메일 회신/반송 여부</td></tr></tbody></table>` }} />
                      </div>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">2. 개인정보의 제3자 제공</h2>
                      <p className="leading-relaxed mb-4">회사는 정보주체의 별도 동의가 있거나 법령에 규정된 경우를 제외하고는 개인정보를 제3자에게 제공하지 않습니다. 단, 본 서비스의 핵심인 소개 연결을 위해 아래와 같이 개인정보를 제공합니다.</p>
                      <div className="overflow-x-auto">
                          <table className="w-full border-collapse text-sm">
                              <thead className="bg-gray-100">
                              <tr>
                                  <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700">제공받는 자</th>
                                  <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700">제공 목적</th>
                                  <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700">제공하는 개인정보 항목</th>
                                  <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700">보유 및 이용 기간</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                  <td className="border border-gray-300 p-3 align-top font-medium">소개 요청자</td>
                                  <td className="border border-gray-300 p-3 align-top font-medium">비즈니스 인맥 소개 연결</td>
                                  <td className="border border-gray-300 p-3 align-top"><strong className="font-semibold text-gray-800">소개 당사자가 공개에 동의한</strong> 이름, 연락처 등</td>
                                  <td className="border border-gray-300 p-3 align-top"><strong className="font-semibold text-gray-800">소개 목적 달성 시까지</strong></td>
                              </tr>
                              <tr>
                                  <td className="border border-gray-300 p-3 align-top font-medium">소개자, 소개 당사자</td>
                                  <td className="border border-gray-300 p-3 align-top">소개 요청 전달 및 신뢰도 확보</td>
                                  <td className="border border-gray-300 p-3 align-top">소개 요청자의 프로필 정보(이름, 회사, 직책), 요청 메시지</td>
                                  <td className="border border-gray-300 p-3 align-top">소개 절차 종료 시까지</td>
                              </tr>
                              </tbody>
                          </table>
                      </div>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">3. 개인정보의 처리 위탁</h2>
                      <p className="leading-relaxed mb-4">회사는 원활한 서비스 제공을 위해 아래와 같이 개인정보 처리업무를 외부에 위탁하고 있습니다.</p>
                      <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                          <li>클라우드 서버 운영: Amazon Web Services, Inc. (데이터 보관)</li>
                          <li>결제 처리: OOO PG사 (서비스 이용료 결제 대행)</li>
                          <li>본인 인증 및 문자 발송: OOO (인증번호, 알림 메시지 발송)</li>
                      </ul>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">4. 개인정보의 익명 처리에 관한 사항</h2>
                      <p className="leading-relaxed">① 회사는 "소개자"로부터 수집한 인맥 정보에서 이름, 이메일, 직접 연락처 등 개인을 식별할 수 있는 정보를 제거하거나 대체하는 <strong className="font-semibold text-gray-800">비식별화(익명화) 조치</strong>를 거쳐 '회사명'과 '직책' 중심의 인맥 풀을 생성합니다.</p>
                      <p className="leading-relaxed">② 익명 처리된 정보는 특정 개인을 알아볼 수 없으므로 통계작성, 과학적 연구, 서비스 개선 등을 위해 활용될 수 있습니다.</p>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">5. 개인정보의 보유 및 이용기간</h2>
                      <p className="leading-relaxed">① 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
                      <p className="leading-relaxed">② 원칙적으로 회원 탈퇴 시 지체없이 파기하나, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.</p>
                      <ol className="list-decimal pl-5 space-y-4">
                          <li>
                              <strong className="font-semibold text-gray-800">전자상거래 등에서의 소비자보호에 관한 법률</strong>
                              <ul className="list-disc pl-5 mt-2 space-y-1">
                                  <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                                  <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                                  <li>소비자 불만 또는 분쟁처리에 관한 기록: 3년</li>
                              </ul>
                          </li>
                          <li>
                              <strong className="font-semibold text-gray-800">통신비밀보호법</strong>
                              <ul className="list-disc pl-5 mt-2 space-y-1">
                                  <li>서비스 방문 기록: 3개월</li>
                              </ul>
                          </li>
                          <li>
                              <strong className="font-semibold text-gray-800">국세기본법, 소득세법</strong>
                              <ul className="list-disc pl-5 mt-2 space-y-1">
                                  <li>성공 사례금 정산 및 원천징수 관련 정보: 관련 법령에서 정한 기간</li>
                              </ul>
                          </li>
                      </ol>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">6. 개인정보의 파기</h2>
                      <p className="leading-relaxed">① 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</p>
                      <p className="leading-relaxed">② 파기 절차 및 방법은 다음과 같습니다.</p>
                      <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                          <li><strong className="font-semibold text-gray-800">전자적 파일 형태:</strong> 복구 및 재생이 불가능한 기술적 방법을 이용하여 안전하게 삭제</li>
                          <li><strong className="font-semibold text-gray-800">종이 문서:</strong> 분쇄기로 분쇄하거나 소각하여 파기</li>
                      </ul>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">7. 정보주체와 법정대리인의 권리·의무 및 행사방법</h2>
                      <p className="leading-relaxed">① 정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.</p>
                      <p className="leading-relaxed">② 권리 행사는 '설정' 메뉴 또는 서면, 이메일 등을 통하여 하실 수 있으며, 회사는 이에 대해 지체없이 조치하겠습니다.</p>
                      <p className="leading-relaxed">③ 정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.</p>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">8. 개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항</h2>
                      <p className="leading-relaxed">회사는 이용자에게 개별적인 맞춤 서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다. 이용자는 웹브라우저 옵션 설정을 통해 쿠키 허용, 거부 등의 선택권을 가질 수 있으나, 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.</p>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">9. 개인정보의 안전성 확보 조치</h2>
                      <p className="leading-relaxed">회사는 개인정보의 안전성 확보를 위해 다음과 같은 관리적, 기술적, 물리적 조치를 하고 있습니다.</p>
                      <ol className="list-decimal pl-5 space-y-2 leading-relaxed">
                          <li><strong className="font-semibold text-gray-800">관리적 조치:</strong> 내부관리계획 수립·시행, 정기적 직원 교육 등</li>
                          <li><strong className="font-semibold text-gray-800">기술적 조치:</strong> 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치</li>
                          <li><strong className="font-semibold text-gray-800">물리적 조치:</strong> 전산실, 자료보관실 등의 접근통제</li>
                      </ol>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">10. Google API 서비스 사용자 데이터 정책</h2>
                      <div className="space-y-6">
                          <div>
                              <h3 className="text-xl font-semibold text-gray-800 mb-3">(KOR)</h3>
                              <p className="leading-relaxed mb-4">HyperSales는 구글 API로부터 받은 정보를 사용하고 이전하며, 제한된 사용 요건을 포함한 Google API 서비스 사용자 데이터 정책을 준수합니다.</p>
                              <h4 className="font-semibold text-gray-800 mb-2">제한된 사용</h4>
                              <p className="leading-relaxed mb-4">HyperSales는 Google의 제한된 사용 정책에 명시된 모든 조건을 엄격히 준수합니다.</p>
                              <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                                  <li>사용자로부터 특정 메시지, 파일 또는 기타 데이터를 보는 데 대한 명확한 동의를 얻지 않은 경우, 사람이 사용자의 데이터를 읽지 않도록 합니다. 이는 Google이 추가 약관을 제공한 예외 사항을 포함합니다.</li>
                                  <li>광고 제공, 재타겟팅, 개인화된 또는 관심 기반 광고를 위한 데이터 사용이나 전송을 하지 않습니다.</li>
                                  <li>데이터 사용을 애플리케이션 인터페이스에서 눈에 띄는 사용자 중심 기능을 제공하거나 개선하는 데에 한정합니다. 당사는 이러한 목적을 위해서만 항상 사용자의 동의를 받아 데이터를 타인에게 전송합니다. 데이터의 다른 모든 사용은 금지됩니다.</li>
                                  <li>보안(예: 남용 조사)이나 적용 가능한 법률을 준수하는 목적으로 데이터 전송은 허용됩니다.</li>
                              </ul>
                              <p className="leading-relaxed mt-4">또한, 당사의 개인정보 보호정책은 다음과 같은 세부 사항을 명시합니다:</p>
                              <ul className="list-disc pl-5 space-y-2 leading-relaxed mt-2">
                                  <li>앱에서 요청하는 구체적인 데이터 유형.</li>
                                  <li>Google 사용자 데이터에 접근을 요청하는 이유.</li>
                                  <li>데이터가 어떻게 접근, 사용, 저장, 공유되는지.</li>
                                  <li>데이터가 전송 중이거나 저장될 때 보안을 유지하기 위한 조치.</li>
                                  <li>사용자 데이터 사용 방식에 변경이 있을 때 따르는 절차, 사용자에게 어떻게 통지하고 업데이트된 개인정보 보호정책에 대한 동의를 얻는 방법.</li>
                              </ul>
                              <p className="leading-relaxed mt-4">당사는 Google API를 통해 얻은 데이터 사용에 있어 사용자의 프라이버시를 보호하고 투명성을 확보하는 데 전념하고 있습니다.</p>
                          </div>
                          <div>
                              <h3 className="text-xl font-semibold text-gray-800 mb-3">(Eng)</h3>
                              <p className="leading-relaxed mb-4">Hypersales’s use and transfer to any other app of information received from Google APIs will adhere to Google API Services User Data Policy, including the Limited Use requirements.</p>
                              <h4 className="font-semibold text-gray-800 mb-2">Limited Use</h4>
                              <p className="leading-relaxed mb-4">Our app strictly complies with all conditions specified in the limited use policy of Google.</p>
                              <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                                  <li>Do not allow humans to read the user's data unless we have obtained the user's affirmative agreement to view specific messages, files, or other data. This includes any exceptions where Google has provided additional terms, such as those applicable to the Nest Device Access program.</li>
                                  <li>Do not use or transfer the data for serving ads, including retargeting, personalized, or interest-based advertising.</li>
                                  <li>Limit your use of data to providing or improving prominent user-facing features in the application's interface. We transfer data to others only when necessary for these functions, and always with user consent. All other uses are prohibited.</li>
                                  <li>Transfers of data for security(e.g., investigating abuse) or applicable laws purposes are permitted.</li>
                              </ul>
                              <p className="leading-relaxed mt-4">Additionally, our privacy policy details:</p>
                              <ul className="list-disc pl-5 space-y-2 leading-relaxed mt-2">
                                  <li>The specific types of data our app is requesting.</li>
                                  <li>The reasons for the requests to access Google user data.</li>
                                  <li>How the data is accessed, used, stored, and shared.</li>
                                  <li>Measures taken to ensure data is secure in transit and at rest.</li>
                                  <li>Procedures followed in case of a change in the way user data is used, including how we notify users and obtain their consent for the updated privacy policy.</li>
                              </ul>
                              <p className="leading-relaxed mt-4">We are committed to protecting user privacy and ensuring transparency in the use of data obtained via Google APIs.</p>
                          </div>
                      </div>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">11. Google Chrome Extension User Privacy Policy (Eng)</h2>
                      <p className="leading-relaxed mb-4">Hypersales’s operates the Hypersales Chrome Extension. This informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. We follows the guidance of Google Program Policies.</p>
                      <p className="leading-relaxed mb-4">We collect several different types of information for various purposes to provide and improve our Service to you. The types of data collected are:</p>
                      <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                          <li><strong>Personal Identification Information:</strong> Including, but not limited to, your name, address, and email address.</li>
                          <li><strong>Personal Communication:</strong> Any emails or messages sent and received through Hypersales.</li>
                          <li><strong>Location Data:</strong> We may use and store information about your location determined by your IP address.</li>
                          <li><strong>User Activity:</strong> This may include network monitoring, number of clicks, mouse position, scrolling, and keystroke logging.</li>
                          <li><strong>Website Content:</strong> Any text, images, sounds, videos, and hyperlinks that you encounter or input while using our Service.</li>
                      </ul>
                      <p className="leading-relaxed mt-4 mb-4">We use the collected data for various purposes:</p>
                      <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                          <li>To provide and maintain our Service</li>
                          <li>To notify you about changes to our Service</li>
                          <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                          <li>To provide customer support</li>
                          <li>To gather analysis or valuable information so that we can improve our Service</li>
                          <li>To monitor the usage of our Service</li>
                          <li>To detect, prevent and address technical issues</li>
                      </ul>
                      <p className="leading-relaxed mt-4 mb-4">Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction. We do not use or transfer data for credit assessment or loan purposes, and we will not transfer your data to any third party unless it is to comply with the law or in connection with an approved use case.</p>
                      <p className="leading-relaxed mt-4 mb-4">We may disclose your personal data in the good faith belief that such action is necessary:</p>
                      <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                          <li>To comply with a legal obligation</li>
                          <li>To protect and defend the rights or property of Hypersales</li>
                          <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
                          <li>To protect the personal safety of users of the Service or the public</li>
                          <li>To protect against legal liability</li>
                      </ul>
                      <p className="leading-relaxed mt-4 mb-4">The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is securely saved.</p>
                      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                          <p className="leading-relaxed text-sm">* 정보주체는 아래의 연락처로 행태정보와 관련하여 궁금한 사항과 거부권 행사, 피해 신고 접수 등을 문의할 수 있습니다.</p>
                          <p className="leading-relaxed text-sm mt-2"><strong>이메일:</strong> evan@dovie.io</p>
                      </div>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">12. 개인정보 보호책임자</h2>
                      <ul className="list-none space-y-1 leading-relaxed">
                          <li><strong className="font-semibold text-gray-800">성명:</strong> OOO</li>
                          <li><strong className="font-semibold text-gray-800">직책:</strong> OOO</li>
                          <li><strong className="font-semibold text-gray-800">연락처:</strong> OOO (전화), OOO (이메일)</li>
                      </ul>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">13. 권익침해 구제방법</h2>
                      <p className="leading-relaxed">정보주체는 개인정보침해에 대한 피해구제, 상담 등을 위해 아래 기관에 문의하실 수 있습니다.</p>
                      <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                          <li>개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)</li>
                          <li>대검찰청 사이버수사과 (www.spo.go.kr / 국번없이 1301)</li>
                          <li>경찰청 사이버수사국 (ecrm.cyber.go.kr / 국번없이 182)</li>
                      </ul>
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">14. 개인정보처리방침의 변경</h2>
                      <p className="leading-relaxed">이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.</p>
                  </section>
              </main>
          </div>
      </div>
  );
};

export default Privacy;
