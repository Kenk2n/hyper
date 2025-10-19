// src/components/views/OnboardingView.tsx
import React, { useEffect, useState } from "react";
import { GmailIcon, CheckCircleIcon, ArrowRightIcon } from '../icons';

interface OnboardingViewProps {
    onComplete: () => void;
}

function parseHashFragment(): Record<string, string> {
    const hash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : window.location.hash;
    const params = new URLSearchParams(hash);
    const obj: Record<string, string> = {};
    params.forEach((v, k) => (obj[k] = v));
    return obj;
}

const OnboardingView: React.FC<OnboardingViewProps> = ({ onComplete }) => {
    const [step, setStep] = useState<1 | 2 | 3>(2);
    const [progress, setProgress] = useState(0);
    const [progressText, setProgressText] = useState("서버에 연결 중...");

    // ✅ 팝업에서 돌아온 경우(같은 컴포넌트가 팝업에도 렌더됨)
    // URL 해시에 access_token이 있으면 localStorage에 저장하고 팝업 닫기.
    useEffect(() => {
        const h = parseHashFragment();
        const token = h["access_token"];
        if (token) {
            localStorage.setItem("google_access_token", token);
            if (h["token_type"]) localStorage.setItem("google_token_type", h["token_type"]);
            if (h["expires_in"]) localStorage.setItem("google_expires_in", h["expires_in"]);
            // URL 해시 제거(보기 깔끔용)
            try {
                const url = new URL(window.location.href);
                url.hash = "";
                window.history.replaceState(null, "", url.toString());
            } catch {}
            // 팝업이면 닫기
            if (window.opener) window.close();
        }
    }, []);

    // ✅ 메인 창: localStorage 변화 감지해서 step=2로 전환
    useEffect(() => {
        const toStep2IfToken = () => {
            const token = localStorage.getItem("google_access_token");
            if (token) setStep(2);
        };

        // 새로고침/첫 진입 시에도 이미 저장돼 있으면 바로 step2
        toStep2IfToken();

        // 다른 창(팝업)에서 localStorage가 바뀌면 storage 이벤트가 발생
        const onStorage = (e: StorageEvent) => {
            if (e.key === "google_access_token" && e.newValue) {
                setStep(2);
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    // ✅ step2 진행 바
    useEffect(() => {
        if (step === 2) {
            const progressSteps = [
                { percent: 25, text: "스레드 스캔 중..." },
                { percent: 50, text: "서명 파싱 중..." },
                { percent: 75, text: "회사 정보 매핑 중..." },
                { percent: 90, text: "관계 점수 계산 중..." },
                { percent: 100, text: "동기화 완료!" }
            ];

            let i = 0;
            const t = setInterval(() => {
                if (i < progressSteps.length) {
                    setProgress(progressSteps[i].percent);
                    setProgressText(progressSteps[i].text);
                    i++;
                } else {
                    clearInterval(t);
                    setTimeout(() => setStep(3), 500);
                }
            }, 800);

            return () => clearInterval(t);
        }
    }, [step]);

    // ✅ 팝업만 띄우기 (메인 이동 금지, 오탐 차단)
    const openGooglePopup = () => {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
        const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI as string; // 예: http://localhost:5173/onboarding
        const scope = [
            "openid",
            "email",
            "profile",
            "https://www.googleapis.com/auth/gmail.readonly",
        ].join(" ");

        const params = new URLSearchParams({
            response_type: "token",
            client_id: clientId,
            redirect_uri: redirectUri, // ★ 구글 콘솔 Authorized redirect URIs와 100% 일치해야 함
            scope,
            include_granted_scopes: "true",
            prompt: "consent",
        });

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

        // 심플: 클릭과 동시에 최종 URL로 팝업 오픈
        window.open(
            authUrl,
            "google_oauth",
            "width=520,height=650,menubar=no,toolbar=no,status=no"
        );
    };
  

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">숨겨진 인맥을 발견하세요</h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Gmail을 연동하여 자동으로 연락처를 정리하고, 관계를 파악하며, 소개를 위한 가장 효과적인 경로를 찾아보세요.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <button
                                onClick={openGooglePopup}
                                className="inline-flex items-center justify-center gap-x-2 rounded-lg bg-brand px-6 py-4 text-lg font-semibold text-white shadow-sm hover:bg-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(56,117,246)] transition-transform transform hover:scale-105"
                            >
                                <GmailIcon className="h-7 w-7"/>
                                Gmail 계정 연결
                            </button>
                        </div>
                        <p className="mt-4 text-xs text-gray-500">
                            이메일 메타데이터 및 서명에 대한 읽기 전용 접근 권한만 요청합니다. 개인정보 보호를 최우선으로 생각합니다.
                        </p>
                    </div>
                );
            case 2:
                return (
                    <div className="w-full max-w-lg text-center">
                        <h2 className="text-3xl font-bold text-gray-900">동기화 진행 중</h2>
                        <p className="mt-3 text-md text-gray-600">잠시만 기다려주세요. 회원님의 네트워크 지도를 만들고 있습니다. 몇 분 정도 소요될 수 있습니다.</p>
                        <div className="w-full bg-gray-200 rounded-full h-4 mt-8 dark:bg-gray-700">
                            <div className="bg-brand h-4 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                        </div>
                        <p className="mt-3 text-sm text-brand-700 font-medium">{progressText}</p>
                    </div>
                );
            case 3:
                return (
                    <div className="text-center">
                        <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500"/>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">네트워크가 준비되었습니다!</h2>
                        <p className="mt-2 text-lg text-gray-600">저희가 찾은 내용에 대한 간략한 요약입니다:</p>

                        {/* 원본 요약 카드 */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="font-semibold text-gray-900">주요 연락처</h3>
                                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                                    <li>김민준 (네이버)</li>
                                    <li>이서연 (카카오)</li>
                                    <li>최지우 (네이버)</li>
                                </ul>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="font-semibold text-gray-900">재연결 추천</h3>
                                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                                    <li>정하준 (90일 이상)</li>
                                    <li>임지민 (180일 이상)</li>
                                    <li>박도윤 (90일 이상)</li>
                                </ul>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="font-semibold text-gray-900">주요 회사</h3>
                                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                                    <li>네이버</li>
                                    <li>카카오</li>
                                    <li>쿠팡</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-10">
                            <button
                                onClick={onComplete}
                                className="inline-flex items-center gap-x-2 rounded-md bg-brand px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(56,117,246)]"
                            >
                                내 네트워크 탐색하기
                                <ArrowRightIcon className="h-5 w-5"/>
                            </button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            {renderStep()}
        </div>
    );
};

export default OnboardingView;
