// OnboardingConnect.tsx
import React from "react";
import { GmailIcon } from "../icons";

type Props = { onNext: () => void };

function buildGoogleAuthUrl() {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
    const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI as string; // 예: http://localhost:5173/oauth/callback
    const scope = [
        "openid",
        "email",
        "profile",
        "https://www.googleapis.com/auth/gmail.readonly",
    ].join(" ");

    const params = new URLSearchParams({
        response_type: "token",
        client_id: clientId,
        redirect_uri: redirectUri, // ★ .env와 구글 콘솔 등록값 ‘완전 일치’ 필요
        scope,
        include_granted_scopes: "true",
        prompt: "consent",
    });

    const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    // 디버깅 로그
    console.log("[OAuth] redirect_uri =", redirectUri);
    console.log("[OAuth] auth url =", url);
    return url;
}

const OnboardingConnect: React.FC<Props> = () => {
    const handleConnect = () => {
        const url = buildGoogleAuthUrl();
        const popup = window.open(
            url,
            "google_oauth",
            "width=520,height=650,menubar=no,toolbar=no,status=no,noopener"
        );
        // ❌ popup.closed 즉시 검사하지 말 것 (오탐)
        if (!popup) {
            try { (window as any).dispatchEvent(new CustomEvent('hs-toast', { detail: { description: '팝업이 차단되었습니다. 브라우저에서 팝업 허용 후 다시 시도해주세요.', type: 'warning' } })); } catch {}
            return;
        }

        // (선택) 백엔드 로그
        fetch("/api/auth/attempt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ returnTo: window.location.origin + "/onboarding" }),
        }).catch(() => {});
    };

    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">숨겨진 인맥을 발견하세요</h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
                Gmail을 연동하여 자동으로 연락처를 정리하고, 관계를 파악하며, 소개를 위한 가장 효과적인 경로를 찾아보세요.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <button
                    onClick={handleConnect}
                    className="inline-flex items-center justify-center gap-x-2 rounded-lg bg-brand px-6 py-4 text-lg font-semibold text-white shadow-sm hover:bg-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(56,117,246)] transition-transform transform hover:scale-105"
                >
                    <GmailIcon className="h-7 w-7" />
                    Gmail 계정 연결
                </button>
            </div>
            <p className="mt-4 text-xs text-gray-500">
                이메일 메타데이터 및 서명에 대한 읽기 전용 접근 권한만 요청합니다. 개인정보 보호를 최우선으로 생각합니다.
            </p>
        </div>
    );
};

export default OnboardingConnect;
