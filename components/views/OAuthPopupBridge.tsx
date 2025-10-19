import { useEffect } from "react";

function parseHashFragment(): Record<string, string> {
    const hash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : window.location.hash;
    const params = new URLSearchParams(hash);
    const obj: Record<string, string> = {};
    params.forEach((v, k) => (obj[k] = v));
    return obj;
}

export default function OAuthPopupBridge() {
    useEffect(() => {
        const payload = parseHashFragment(); // { access_token, token_type, expires_in, ... }
        if (window.opener && window.opener.origin === window.location.origin) {
            // 메인 창으로 토큰 전달
            window.opener.postMessage({ type: "GOOGLE_OAUTH_RESULT", payload }, window.location.origin);
        }
        window.close();
    }, []);

    return (
        <div style={{ padding: 16, fontFamily: "sans-serif" }}>
            <h3>Google 로그인 처리 중…</h3>
            <p>이 창은 자동으로 닫힙니다. 닫히지 않으면 직접 닫아주세요.</p>
        </div>
    );
}
