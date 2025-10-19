import React from "react";
import { CheckCircleIcon, ArrowRightIcon } from "../icons";

type Props = { onExplore: () => void };

const OnboardingComplete: React.FC<Props> = ({ onExplore }) => {
    return (
        <div className="text-center">
            <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
                네트워크가 준비되었습니다!
            </h2>
            <p className="mt-2 text-lg text-gray-600">저희가 찾은 내용에 대한 간략한 요약입니다:</p>

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
                    onClick={onExplore}
                    className="inline-flex items-center gap-x-2 rounded-md bg-brand px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(56,117,246)]"
                >
                    내 네트워크 탐색하기
                    <ArrowRightIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export default OnboardingComplete;
