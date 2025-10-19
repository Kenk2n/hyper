import React, { useEffect, useState } from 'react';

const ProcessView: React.FC = () => {
  useEffect(() => {
    document.title = '소개 프로세스 안내 - 하이퍼세일즈';
  }, []);

  // State for the animated timeline
  const [animatedStep, setAnimatedStep] = useState(1);

  // Effect to run the animation
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStep(prevStep => (prevStep % 4) + 1);
    }, 2500); // Change step every 2.5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const ProcessTimeline = ({ activeStep }: { activeStep: number }) => {
    const steps = [
      {
        step: 1,
        title: '1단계: 소개 요청',
        description: '소개 요청자가 소개를 요청했습니다.',
        participants: {
          requester: { role: '👤 요청자', action: '<strong>소개 요청 정보 입력 및 제출</strong>', highlight: activeStep === 1 },
          introducer: { role: '🔗 소개자', action: '요청 수신 대기', highlight: false },
          target: { role: '🎯 소개 대상', action: '소개 대기', highlight: false },
        },
      },
      {
        step: 2,
        title: '2단계: 소개 전달',
        description: '소개자가 소개 링크를 전달합니다.',
        participants: {
          requester: { role: '👤 요청자', action: '전달 대기 중', highlight: false },
          introducer: { role: '🔗 소개자', action: '<strong>👉 소개 대상에게 링크 전달</strong>', highlight: activeStep === 2 },
          target: { role: '🎯 소개 대상', action: '링크 수신 대기', highlight: false },
        },
      },
      {
        step: 3,
        title: '3단계: 응답 대기',
        description: '소개 대상자의 응답을 기다립니다.',
        participants: {
          requester: { role: '👤 요청자', action: '응답 대기 중', highlight: false },
          introducer: { role: '🔗 소개자', action: '응답 대기 중', highlight: false },
          target: { role: '🎯 소개 대상', action: '<strong>👉 수락/거절 결정</strong>', highlight: activeStep === 3 },
        },
      },
      {
        step: 4,
        title: '4단계: 소개 완료',
        description: '소개 대상자가 응답하면 최종 결과가 결정됩니다.',
        participants: {
          requester: { role: '👤 요청자', action: '<strong>연락처 확인 및 연락</strong>', highlight: activeStep === 4 },
          introducer: { role: '🔗 소개자', action: '<strong>리워드 수령</strong>', highlight: activeStep === 4 },
          target: { role: '🎯 소개 대상', action: '<strong>연락 수신 및 리워드 수령</strong>', highlight: activeStep === 4 },
        },
      },
    ];

    return (
      <div className="process-section">
        <div className="process-header">
          <div className="process-header-title">현재 진행 상황</div>
          <div className="process-header-subtitle">전체 4단계 중 {activeStep}단계 진행중</div>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${(activeStep / 4) * 100}%` }}></div>
          </div>
        </div>
        <div className="process-timeline">
          {steps.map(({ step, title, description, participants }) => {
            const isCompleted = step < activeStep;
            const isActive = step === activeStep;

            let statusClass = 'status-pending';
            if (isCompleted) statusClass = 'status-completed';
            if (isActive) statusClass = 'status-active';

            let stepClass = 'process-step';
            if (isCompleted) stepClass += ' completed';
            if (isActive) stepClass += ' active';

            return (
              <div key={step} className={stepClass}>
                {step < 4 && <div className="step-connector"></div>}
                <div className="step-number">{isCompleted ? '' : step}</div>
                <div className="step-content">
                  <div className="step-title">
                    <span>{title}</span>
                    <span className={`step-status ${statusClass}`}>
                      {isCompleted ? '완료' : isActive ? '진행중 ⏱️' : '대기'}
                    </span>
                  </div>
                  <div className="step-description">{isActive && <strong>지금 이 단계입니다!</strong>} {description}</div>
                  {isActive && (
                    <div className="participants-grid">
                      {Object.values(participants).map((p, i) => (
                        <div key={i} className={`participant-card ${p.highlight ? 'highlight' : ''}`}>
                          <div className="participant-role" dangerouslySetInnerHTML={{ __html: p.role }}></div>
                          <div className="participant-action" dangerouslySetInnerHTML={{ __html: p.action }}></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{`
        .process-section{background:linear-gradient(135deg,#f8faff 0%,#f0f4ff 100%);border-radius:16px;padding:28px 24px;margin:24px 0}.process-timeline{position:relative;padding-left:0}.process-step{position:relative;padding-left:60px;margin-bottom:32px; transition: all 0.4s ease;}.process-step:last-child{margin-bottom:0}.step-number{position:absolute;left:0;top:0;width:44px;height:44px;background:#fff;border:3px solid #e0e7ff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:18px;color:#94a3b8;box-shadow:0 2px 8px rgba(0,0,0,.06); transition: all 0.4s ease;}.process-step.active .step-number{background:#0b5fff;border-color:#0b5fff;color:#fff;box-shadow:0 4px 12px rgba(11,95,255,.3); transform: scale(1.1);}.process-step.completed .step-number{background:#10b981;border-color:#10b981;color:#fff}.process-step.completed .step-number::after{content:'✓';font-size:20px}.step-connector{position:absolute;left:21px;top:44px;width:2px;height:calc(100% - 12px);background:#e0e7ff; transition: background 0.4s ease;}.process-step:last-child .step-connector{display:none}.process-step.completed .step-connector{background:#10b981}.process-step.active .step-connector{background:linear-gradient(180deg,#0b5fff 0%,#e0e7ff 100%)}.step-content{background:#fff;border-radius:12px;padding:16px 18px;box-shadow:0 2px 8px rgba(0,0,0,.04); transition: all 0.4s ease;}.process-step.active .step-content{box-shadow:0 4px 16px rgba(11,95,255,.12);border:2px solid #0b5fff; transform: scale(1.02);}.step-title{font-weight:700;font-size:15px;color:#1e293b;margin-bottom:8px;display:flex;align-items:center;gap:8px}.step-status{display:inline-block;padding:2px 8px;border-radius:12px;font-size:11px;font-weight:600;margin-left:auto}.status-completed{background:#d1fae5;color:#065f46}.status-active{background:#dbeafe;color:#1e40af;animation:pulse 2s infinite}.status-pending{background:#f3f4f6;color:#6b7280}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.7}}.step-description{font-size:14px;color:#475569;line-height:1.6;margin-bottom:10px}.participants-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px}.participant-card{background:#f8fafc;border-radius:8px;padding:10px;font-size:12px;border:1px solid #e2e8f0; transition: all 0.4s ease;}.participant-role{font-weight:600;color:#334155;margin-bottom:4px;display:flex;align-items:center;gap:4px}.participant-action{color:#64748b;font-size:11px;line-height:1.4}.participant-card.highlight{background:#eff6ff;border:1px solid #bfdbfe; transform: translateY(-4px); box-shadow: 0 4px 10px rgba(0,0,0,0.05);}.participant-card.highlight .participant-role{color:#1e40af}.process-header{text-align:center;margin-bottom:24px}.process-header-title{font-size:18px;font-weight:700;color:#1e293b;margin-bottom:6px}.process-header-subtitle{font-size:14px;color:#64748b}.progress-bar-container{background:#e0e7ff;height:6px;border-radius:999px;margin:20px 0;overflow:hidden}.progress-bar{background:linear-gradient(90deg,#10b981 0%,#0b5fff 100%);height:100%;border-radius:999px;transition:width .8s ease-in-out}
      `}</style>
      <div className="bg-white py-10 font-sans">
        <div className="max-w-4xl mx-auto p-8">
          <header className="text-center border-b pb-6 mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">소개 진행 프로세스</h1>
            <p className="text-gray-600">요청부터 완료까지, 전체 소개 과정이 어떻게 진행되는지 확인해보세요.</p>
          </header>

          <main>
            <ProcessTimeline activeStep={animatedStep} />
          </main>
        </div>
      </div>
    </>
  );
};

export default ProcessView;
