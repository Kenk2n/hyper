/// <reference types="vite/client" />

// 선택: 사용 중인 환경변수 타입 명시 (있으면 자동완성/타입체크 좋아짐)
interface ImportMetaEnv {
    readonly VITE_GOOGLE_CLIENT_ID: string;
    readonly VITE_GOOGLE_REDIRECT_URI: string;
    // 다른 VITE_ 변수들 있으면 여기에 추가
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
