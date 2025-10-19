import React, { useEffect } from 'react';

const FAQTarget: React.FC = () => {
  useEffect(() => {
    document.title = 'FAQ - 소개 당사자 | 하이퍼세일즈';
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white shadow p-6 sm:p-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-6">소개 당사자를 위한 FAQ</h1>
      <section className="space-y-4 text-gray-800 leading-relaxed">
        <details className="group border rounded-lg p-4">
          <summary className="cursor-pointer font-semibold">하이퍼세일즈-네트워크는 어떻게 제 정보를 알게 되었나요?</summary>
          <div className="mt-2 text-sm">
            저희는 회원님의 연락처 정보를 전혀 모르고 있습니다. 회원님의 지인인 OOO님께서 저희 플랫폼의 '소개자'로 활동 중이며, 그분을 통해 '소개 요청'을 전달만 해드린 것입니다. 회원님의 정보는 직접 '수락'하고 입력하시기 전까지는 누구에게도 공개되지 않습니다.
          </div>
        </details>
        <details className="group border rounded-lg p-4">
          <summary className="cursor-pointer font-semibold">제 연락처가 스팸이나 마케팅에 활용될 수도 있나요?</summary>
          <div className="mt-2 text-sm">
            절대 그렇지 않습니다. 회원님의 연락처는 이번 소개를 요청한 특정 요청자에게 단 한 번만 제공되며, 해당 목적 외에는 절대 사용되거나 저장되지 않음을 약속드립니다.
          </div>
        </details>
        <details className="group border rounded-lg p-4">
          <summary className="cursor-pointer font-semibold">저를 소개한 '지인'은 누구인가요?</summary>
          <div className="mt-2 text-sm">
            개인정보 보호를 위해 소개자의 신원을 직접적으로 공개하지는 않습니다. 하지만 회원님께 링크를 전달한 분이 바로 그 '소개자'입니다. 신뢰하는 지인이 연결해 준 기회라고 생각해주시면 좋습니다.
          </div>
        </details>
        <details className="group border rounded-lg p-4">
          <summary className="cursor-pointer font-semibold">소개 요청자의 정보는 믿을 만한가요?</summary>
          <div className="mt-2 text-sm">
            저희는 비즈니스 목적으로 가입한 회원들의 정보를 기반으로 서비스를 운영하고 있습니다. 허위 프로필이나 스팸성 요청을 방지하기 위해 내부적으로 모니터링을 진행하고 있습니다. 하지만 최종적인 판단은 회원님께서 요청자의 프로필과 메시지를 직접 보시고 결정하시는 것이 가장 중요합니다.
          </div>
        </details>
        <details className="group border rounded-lg p-4">
          <summary className="cursor-pointer font-semibold">꼭 만나거나 통화해야 하나요?</summary>
          <div className="mt-2 text-sm">
            아닙니다. 연락처 공개가 즉각적인 미팅이나 통화를 의미하지는 않습니다. 이후의 소통 여부는 당사자 간의 협의를 통해 자유롭게 결정하시면 됩니다.
          </div>
        </details>
        <details className="group border rounded-lg p-4">
          <summary className="cursor-pointer font-semibold">수락 후 마음이 바뀌면 어떻게 하나요?</summary>
          <div className="mt-2 text-sm">
            일단 연락처가 전달된 이후에는 저희 플랫폼이 직접 개입하기 어렵습니다. 다만, 소개 요청자에게 연락하여 정중하게 상황을 설명하시면 대부분의 경우 원만하게 해결될 수 있습니다. 연락처 공개는 '반드시 만나야 한다'는 강제성을 띠지 않습니다.
          </div>
        </details>
        <details className="group border rounded-lg p-4">
          <summary className="cursor-pointer font-semibold">거절 의사를 밝히면 요청자에게 어떻게 전달되나요?</summary>
          <div className="mt-2 text-sm">
            "아쉽게도 요청하신 분과의 소개가 성사되지 않았습니다." 와 같이 정중하고 간결하게 전달됩니다. 회원님의 거절 사유나 개인적인 의견은 전달되지 않으니 안심하셔도 괜찮습니다.
          </div>
        </details>
        <details className="group border rounded-lg p-4">
          <summary className="cursor-pointer font-semibold">왜 저에게 사례금을 지급하나요? 부담스럽습니다.</summary>
          <div className="mt-2 text-sm">
            부담 갖지 않으셔도 괜찮습니다. 저희는 전문가의 시간과 지식에는 정당한 가치가 있다고 믿습니다. 새로운 비즈니스 기회를 검토해주시는 것만으로도 충분한 가치가 있기에, 그에 대한 최소한의 존중과 감사의 표현입니다.
          </div>
        </details>
        <details className="group border rounded-lg p-4">
          <summary className="cursor-pointer font-semibold">소개를 수락하면 어떤 일이 생기나요?</summary>
          <div className="mt-2 text-sm">
            입력하신 연락처가 소개 요청자에게 전달되며, 약속된 사례금 지급 절차가 시작됩니다. 이후 요청자와의 소통은 이메일, 전화 등 편하신 방법으로 직접 진행하시면 되며, 저희가 중간에 개입하지 않습니다.
          </div>
        </details>
      </section>
    </div>
  );
};

export default FAQTarget;
