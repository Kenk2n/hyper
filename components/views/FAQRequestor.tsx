import React, { useEffect } from 'react';

const FAQRequestor: React.FC = () => {
  useEffect(() => {
    document.title = 'FAQ - 소개 요청자 | 하이퍼세일즈';
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white shadow p-6 sm:p-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-6">소개 요청자를 위한 FAQ</h1>
      <section className="space-y-4 text-gray-800 leading-relaxed">
        <details className="group border rounded-lg p-4">
          <summary className="cursor-pointer font-semibold">(주)도비스튜디오는 믿을 수 있는 회사인가요?</summary>
          <div className="mt-2 text-sm">
            네, 저희는 OOO에 본사를 둔 B2B 세일즈 솔루션 전문 기업입니다. [회사 소개 페이지 링크], [언론 보도 링크] 등을 통해 더 자세한 정보를 확인하실 수 있습니다. 투명한 운영을 최우선으로 생각합니다.
          </div>
        </details>
        <details className="group border rounded-lg p-4">
          <summary className="cursor-pointer font-semibold">소개가 실패하면 비용은 어떻게 되나요?</summary>
          <div className="mt-2 text-sm">
            소개가 최종 성사되기 전까지는 어떠한 비용도 청구되지 않습니다. (선결제 모델의 경우: "소개가 성사되지 않으면 결제하신 금액은 영업일 기준 2일 내에 100% 전액 환불됩니다.")
          </div>
        </details>
        <details className="group border rounded-lg p-4">
          <summary className="cursor-pointer font-semibold">제가 지불하는 비용은 어떻게 사용되나요?</summary>
          <div className="mt-2 text-sm">
            지불하신 비용의 상당 부분은 귀한 시간을 내어준 '소개 당사자' 와 가치 있는 연결을 만들어준 '소개자' 에게 사례금으로 지급됩니다. 나머지는 신뢰도 높은 네트워크를 유지하고 발전시키기 위한 플랫폼 운영비로 사용됩니다.
          </div>
        </details>
        <details className="group border rounded-lg p-4">
          <summary className="cursor-pointer font-semibold">소개 요청 후 진행 상황을 알 수 있나요?</summary>
          <div className="mt-2 text-sm">
            네, 요청 접수, 소개자에게 전달, 최종 수락/거절 등 각 단계마다 이메일로 진행 상황을 신속하게 알려드립니다.
          </div>
        </details>
        <details className="group border rounded-lg p-4">
          <summary className="cursor-pointer font-semibold">소개 성공까지 보통 얼마나 걸리나요?</summary>
          <div className="mt-2 text-sm">
            평균적으로 영업일 기준 3일 이내에 소개 당사자의 수락/거절 의사가 확인됩니다. 다만, 상대방의 상황에 따라 조금 더 길어질 수 있으며, 5일 이상 응답이 없을 경우 저희가 중간 상황을 다시 한번 체크하여 알려드립니다.
          </div>
        </details>
        <details className="group border rounded-lg p-4">
          <summary className="cursor-pointer font-semibold">제가 받은 연락처가 정확한 정보인가요?</summary>
          <div className="mt-2 text-sm">
            네, 저희가 전달드리는 연락처는 소개 당사자가 직접 입력하고 공개에 동의한 최신 정보입니다.
          </div>
        </details>
        <details className="group border rounded-lg p-4">
          <summary className="cursor-pointer font-semibold">소개 요청 시 어떤 정보를 제공해야 성공률이 높아지나요?</summary>
          <div className="mt-2 text-sm">
            본인의 소속과 직책을 명확히 밝히고, 왜 이분을 만나고 싶은지, 어떤 논의를 하고 싶은지(예: OOO 솔루션 도입 관련 15분 미팅), 이를 통해 상대방은 어떤 가치를 얻을 수 있는지 구체적으로 작성해주시면 좋습니다. 막연한 요청보다는 명확한 목적이 담긴 요청이 소개 성공률을 크게 높입니다.
          </div>
        </details>
        <details className="group border rounded-lg p-4">
          <summary className="cursor-pointer font-semibold">원하는 사람을 찾았는데, '소개자'는 누구인가요?</summary>
          <div className="mt-2 text-sm">
            '소개자'는 저희 플랫폼을 통해 자신의 비즈니스 인맥을 관리하는 회원으로, 찾으시는 분과 실제로 연결고리가 있는 분입니다. 저희는 이 소개자를 통해 안전하고 신뢰도 높은 연결을 만들어 드립니다. 소개자의 신원은 비공개로 유지됩니다.
          </div>
        </details>
      </section>
    </div>
  );
};

export default FAQRequestor;
