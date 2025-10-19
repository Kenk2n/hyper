import React, { useEffect } from 'react';

const FAQIntroducer: React.FC = () => {
  useEffect(() => {
    document.title = 'FAQ - 소개자 | 하이퍼세일즈';
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white shadow p-6 sm:p-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-6">소개자를 위한 FAQ</h1>
      <section className="space-y-4 text-gray-800 leading-relaxed">
        <details className="group border rounded-lg p-4">
          <summary className="cursor-pointer font-semibold">제가 아는 사람의 정보를 넘기는 것 같아 부담스럽습니다.</summary>
          <div className="mt-2 text-sm">
            회원님께서는 어떠한 개인정보도 저희에게 직접 전달하지 않습니다. 단지 저희가 드리는 '소개 링크'를 지인에게 전달하여, 최종 결정권을 지인께서 직접 행사하도록 돕는 '연결' 역할만 해주시게 됩니다. 모든 정보 공개 결정은 당사자가 직접 합니다.
          </div>
        </details>
        <details className="group border rounded-lg p-4">
          <summary className="cursor-pointer font-semibold">제가 관리하는 인맥 정보는 안전하게 보관되나요?</summary>
          <div className="mt-2 text-sm">
            그럼요. 회원님께서 '메일함 정리' 등을 통해 제공해주신 인맥 정보는 즉시 '회사명'과 '직책'만 남기고 비식별화(익명화) 처리됩니다. 이름, 이메일, 전화번호와 같은 개인 식별 정보는 저희 서버에 저장되지 않으므로 절대 외부로 유출될 수 없습니다.
          </div>
        </details>
        <details className="group border rounded-lg p-4">
          <summary className="cursor-pointer font-semibold">소개했다가 오히려 관계가 어색해지면 어떡하죠?</summary>
          <div className="mt-2 text-sm">
            저희는 소개 요청자가 매우 구체적이고 정중하게 요청 메시지를 작성하도록 유도하고 있습니다. 또한 소개 당사자가 어떠한 부담도 없이 '거절'할 수 있는 선택지를 제공하므로, 관계에 부담을 줄 가능성은 매우 낮습니다.
          </div>
        </details>
        <details className="group border rounded-lg p-4">
          <summary className="cursor-pointer font-semibold">소개 당사자가 제가 사례금을 받는다는 사실을 아나요?</summary>
          <div className="mt-2 text-sm">
            네, 저희는 투명한 보상 체계를 지향합니다. 소개 요청자, 소개자, 소개 당사자 모두가 각자의 역할에 대한 가치를 인정받고 보상받는 건강한 비즈니스 생태계를 만들고 있습니다.
          </div>
        </details>
        <details className="group border rounded-lg p-4">
          <summary className="cursor-pointer font-semibold">사례금은 언제, 어떻게 지급되나요?</summary>
          <div className="mt-2 text-sm">
            소개가 최종 성사되고 소개 요청자의 입금이 확인되면, 회원님께 이메일로 '사례금 정산 정보 입력'을 요청드립니다. 해당 폼에 계좌 정보를 입력해주시면 영업일 기준 2일 내에 입금 처리됩니다.
          </div>
        </details>
        <details className="group border rounded-lg p-4">
          <summary className="cursor-pointer font-semibold">소개 당사자에게 전달되는 '개인 링크'는 무엇인가요?</summary>
          <div className="mt-2 text-sm">
            각 소개 건마다 생성되는 고유한 웹 주소입니다. 이 링크를 통해서만 소개 당사자가 요청 내용을 확인하고 수락/거절 의사를 밝힐 수 있습니다. 또한, 이 링크를 통해 응답이 기록되어야 회원님께 정상적으로 사례금이 정산될 수 있습니다.
          </div>
        </details>
        <details className="group border rounded-lg p-4">
          <summary className="cursor-pointer font-semibold">여러 명에게 동시에 소개 요청을 전달해도 되나요?</summary>
          <div className="mt-2 text-sm">
            아니요, 한 번의 소개 요청은 한 분의 소개 당사자에게만 연결됩니다. 이는 소개의 가치를 높이고 무분별한 요청을 방지하기 위함입니다.
          </div>
        </details>
      </section>
    </div>
  );
};

export default FAQIntroducer;
