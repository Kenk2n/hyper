import React, { useEffect, useState } from "react";

type Props = { onDone: () => void };

const OnboardingLoading: React.FC<Props> = ({ onDone }) => {
    const [progress, setProgress] = useState(0);
    const [progressText, setProgressText] = useState("서버에 연결 중...");

    useEffect(() => {
        const steps = [
            { percent: 25, text: "스레드 스캔 중..." },
            { percent: 50, text: "서명 파싱 중..." },
            { percent: 75, text: "회사 정보 매핑 중..." },
            { percent: 90, text: "관계 점수 계산 중..." },
            { percent: 100, text: "동기화 완료!" },
        ];

        let i = 0;
        const timer = setInterval(() => {
            if (i < steps.length) {
                setProgress(steps[i].percent);
                setProgressText(steps[i].text);
                i++;
            } else {
                clearInterval(timer);
                setTimeout(onDone, 500);
            }
        }, 800);

        return () => clearInterval(timer);
    }, [onDone]);

    return (
        <div className="w-full max-w-lg text-center">
            <h2 className="text-3xl font-bold text-gray-900">동기화 진행 중</h2>
            <p className="mt-3 text-md text-gray-600">
                잠시만 기다려주세요. 회원님의 네트워크 지도를 만들고 있습니다. 몇 분 정도 소요될 수 있습니다.
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-8 dark:bg-gray-700">
                <div
                    className="bg-brand h-4 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <p className="mt-3 text-sm text-brand-700 font-medium">{progressText}</p>
        </div>
    );
};

export default OnboardingLoading;
