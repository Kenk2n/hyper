import React, { useState } from 'react';
import { ChevronDown, ChevronRight, RefreshCcw, User, Building, Briefcase, Mail, Phone, Gift, Linkedin, Info } from 'lucide-react';
import EmailPreviewModal from '../EmailPreviewModal'; // Import the modal component

// --- 타입 정의 ---
interface FaqItemProps {
    faq: { question: string; answer: string; };
}

// --- 예시 데이터 ---
const requester = {
    name: '김민준',
    title: 'Software Engineer',
    company: '네이버 (Navers)',
    profileImageUrl: 'https://cf.channel.io/thumb/200x200/pub-file/145640/677787db863f91cd0229/tmp-2113922959',
    linkedinUrl: 'https://www.linkedin.com/in/example', // 링크드인 URL 추가
    roleDescription: '네이버 AI 부서에서 대규모 언어 모델을 개발하고 있습니다.',
    background: '저희는 B2B 세일즈 SaaS를 운영하고 있고, 현재 대기업 확장을 준비 중입니다.'
};

const introducee = {
    name: '안상호', // 이 페이지를 보는 사용자
};

const rewardAmount = '30,000원';

const faqs = [
    {
        question: '제가 입력한 정보는 어디까지 공유되나요?',
        answer: '회원님께서 아래 폼에 직접 입력하신 정보만 소개 요청자에게 전달됩니다. 다른 정보는 절대 공유되지 않으며, 해당 소개 건 외 다른 용도로는 사용되지 않습니다.',
    },
    {
        question: '꼭 만나거나 통화해야 하나요?',
        answer: '아닙니다. 연락처 공개가 즉각적인 미팅이나 통화를 의미하지는 않습니다. 이후의 소통 여부는 당사자 간의 협의를 통해 자유롭게 결정하시면 됩니다.',
    },
    {
        question: '소개 요청을 거절하면 상대방에게 알림이 가나요?',
        answer: '아니요, 거절하셔도 요청자에게 별도의 알림이 가지 않습니다. 편하게 결정해주세요. (48시간이 지나면 자동으로 요청이 만료됩니다.)',
    },
];

// --- FaqItem 컴포넌트 ---
const FaqItem: React.FC<FaqItemProps> = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="border-b border-gray-200">
            <button
                className="w-full flex justify-between items-center text-left py-4"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-semibold text-gray-800">{faq.question}</span>
                {isOpen ? <ChevronDown className="h-5 w-5 text-gray-500" /> : <ChevronRight className="h-5 w-5 text-gray-500" />}
            </button>
            {isOpen && (
                <div className="pb-4 text-gray-600">
                    <p>{faq.answer}</p>
                </div>
            )}
        </div>
    );
};

// --- 메인 뷰 컴포넌트 ---
const ReferralRequestView: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [actionTaken, setActionTaken] = useState<'accepted' | 'declined' | null>(null);
    const [profileInput, setProfileInput] = useState({
        name: '', company: '', jobTitle: '', email: '', phone: '',
    });
    const [isEmailPreviewOpen, setIsEmailPreviewOpen] = useState(false);

    const showToast = (description: string, type: 'success' | 'error' | 'warning') => {
        try {
            (window as any).dispatchEvent(new CustomEvent('hs-toast', { detail: { description, type } }));
        } catch (e) {
            console.error("Could not dispatch toast event", e);
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfileInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const handleAction = (action: 'accepted' | 'declined') => {
        if (action === 'accepted') {
            //@ts-ignore
            const isFormValid = Object.values(profileInput).every(field => field.trim() !== '');
            if (!isFormValid) {
                showToast('공유할 프로필의 모든 정보를 입력해주세요.', 'warning');
                return;
            }
            setIsEmailPreviewOpen(true); // Open the preview modal
        } else {
            // Handle decline action directly
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setActionTaken('declined');
                showToast('소개 요청을 거절했습니다.', 'error');
            }, 1500);
        }
    };

    const handleConfirmSend = () => {
        setIsEmailPreviewOpen(false);
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setActionTaken('accepted');
            showToast('소개 요청을 수락했습니다. 정보를 전달합니다.', 'success');
        }, 1500);
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
            <main className="max-w-3xl mx-auto">

                {/* --- 헤더 --- */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">비즈니스 소개 요청</h1>
                    <p className="text-gray-600 mt-2">
                        안녕하세요 <span className="font-semibold text-blue-600">{introducee.name}</span>님, 새로운 기회가 도착했습니다.
                    </p>
                </div>

                {/* --- 1. 소개 요청자 상세 정보 --- */}
                <section className="bg-white rounded-xl shadow-md p-6 sm:p-8 mb-6">
                    <div className="flex items-start space-x-5">
                        <img
                            className="h-20 w-20 rounded-full object-cover border-2 border-gray-200"
                            src={requester.profileImageUrl}
                            alt={`${requester.name} profile`}
                        />
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-gray-900">{requester.name}</h2>
                            <p className="text-gray-600">{requester.title}</p>
                            <p className="text-gray-500 text-sm">{requester.company}</p>
                        </div>
                    </div>
                    <div className="mt-6 border-t border-gray-200 pt-6 space-y-4 text-gray-700">
                        <div className="flex items-start space-x-3">
                            <Info className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                            <p><strong className="text-gray-800">회사/역할:</strong> {requester.roleDescription}</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <Building className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                            <p><strong className="text-gray-800">추진 배경:</strong> {requester.background}</p>
                        </div>
                        {requester.linkedinUrl && (
                            <div className="flex items-start space-x-3">
                                <Linkedin className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                                <a href={requester.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    링크드인 프로필 보기
                                </a>
                            </div>
                        )}
                    </div>
                </section>

                {/* --- 보상 안내 --- */}
                <div className="text-center mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-center space-x-3">
                    <Gift className="h-6 w-6 text-green-600" />
                    <p className="font-semibold text-green-800">
                        요청을 수락하시면 보상금으로 <span className="font-bold">{rewardAmount}</span>을 받게 됩니다.
                    </p>
                </div>

                {/* --- 액션 결과 또는 입력/버튼 섹션 --- */}
                <section className="bg-white rounded-xl shadow-md p-6 sm:p-8 mb-6">
                    {actionTaken ? (
                        actionTaken === 'accepted' ? (
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-9 h-9">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">소개 요청을 수락해주셔서 감사합니다</h2>
                                <p className="mt-2 text-md text-gray-600">
                                    <strong>{requester.name}</strong>님의 소개 요청을 수락해주셔서 진심으로 감사합니다.<br />
                                    회원님의 연락처 정보가 요청자에게 곧 전달될 예정입니다.
                                </p>
                                <p className="mt-1 text-sm text-gray-500">소개 수락 리워드 <strong>({rewardAmount})</strong> 지급 절차가 시작되었음을 알려드립니다.</p>

                                <div className="border-t my-8"></div>

                                <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full font-bold text-xs mb-5">
                                    ✅ 소개 수락 결과
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                                    <div className="bg-gray-50 rounded-xl p-4 border">
                                        <div className="font-semibold text-gray-800 mb-2 flex items-center gap-1.5">👤 요청자</div>
                                        <div className="text-gray-600 text-sm leading-relaxed">
                                            <strong>연락처 전달 예정</strong><br />
                                            곧 연락처를 받고<br />연락을 드릴 것입니다.
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 border">
                                        <div className="font-semibold text-gray-800 mb-2 flex items-center gap-1.5">🔗 소개자</div>
                                        <div className="text-gray-600 text-sm leading-relaxed">
                                            <strong>연결 역할 완료</strong><br />
                                            가치 있는 연결을<br />만들어 주셨습니다.
                                        </div>
                                    </div>
                                    <div className="bg-blue-100 border-2 border-blue-300 rounded-xl p-4">
                                        <div className="font-semibold text-blue-800 mb-2 flex items-center gap-1.5">🎯 본인</div>
                                        <div className="text-blue-700 text-sm leading-relaxed">
                                            <strong>수락 완료</strong><br />
                                            리워드 <strong>{rewardAmount}</strong><br />수령 예정입니다.
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t my-8"></div>

                                <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full font-bold text-xs mb-5">
                                    💡 다음 절차 안내
                                </div>
                                <div className="mt-2 p-5 bg-gray-50 rounded-lg border text-gray-700 text-left">
                                    <strong className="text-base text-gray-900">앞으로 이렇게 진행됩니다.</strong>
                                    <ul className="pl-5 mt-3 space-y-2 text-sm list-disc list-inside">
                                        <li><strong>{requester.name}</strong>님께 회원님의 성함과 비즈니스 이메일이 전달됩니다.</li>
                                        <li><strong>{requester.name}</strong>님께서 곧 이메일 등으로 정식으로 연락드릴 것입니다.</li>
                                        <li>리워드 지급을 위한 <strong>계좌 정보 입력 안내 메일</strong>이 별도로 발송될 예정이니, 잠시만 기다려주세요.</li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center p-6 rounded-lg bg-red-100 text-red-800">
                                <p className="font-semibold text-lg">소개를 거절했습니다.</p>
                                <p className="text-sm mt-1">이 창을 닫아주세요.</p>
                            </div>
                        )
                    ) : (
                        <>
                            {/* --- 정보 입력 폼 --- */}
                            <h3 className="font-bold text-gray-800 text-center text-xl mb-6">공개할 프로필 정보 입력</h3>
                            <div className="space-y-4">
                                {[
                                    { name: 'name', placeholder: '이름', icon: User },
                                    { name: 'company', placeholder: '회사명', icon: Building },
                                    { name: 'jobTitle', placeholder: '직책', icon: Briefcase },
                                    { name: 'email', placeholder: '이메일', icon: Mail },
                                    { name: 'phone', placeholder: '전화번호', icon: Phone },
                                ].map((field) => (
                                    <div key={field.name} className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <field.icon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text" name={field.name}
                                            value={profileInput[field.name as keyof typeof profileInput]}
                                            onChange={handleInputChange}
                                            placeholder={field.placeholder}
                                            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-base"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* --- 수락/거절 버튼 --- */}
                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button
                                    onClick={() => handleAction('accepted')}
                                    disabled={isLoading}
                                    className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 transition-transform transform hover:-translate-y-0.5"
                                >
                                    {isLoading && actionTaken !== 'declined' ? <RefreshCcw className="animate-spin h-5 w-5 mr-2" /> : null}
                                    입력하고 수락하기
                                </button>
                                <button
                                    onClick={() => handleAction('declined')}
                                    disabled={isLoading}
                                    className="w-full inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 disabled:bg-gray-200"
                                >
                                    {isLoading && actionTaken === 'declined' ? <RefreshCcw className="animate-spin h-5 w-5 mr-2" /> : null}
                                    거절하기
                                </button>
                            </div>
                            <p className="mt-4 text-xs text-center text-gray-500">
                                48시간 이내에 응답하지 않으면 요청이 자동으로 거절됩니다.
                            </p>
                        </>
                    )}
                </section>

                {/* --- 자주 묻는 질문 --- */}
                <section>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">자주 묻는 질문 (FAQ)</h3>
                    <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 border border-gray-200">
                        {faqs.map((faq) => (
                            <FaqItem key={faq.question} faq={faq} />
                        ))}
                    </div>
                </section>

                <footer className="mt-8 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Hypersales Network. All rights reserved.</p>
                </footer>
            </main>

            <EmailPreviewModal
                isOpen={isEmailPreviewOpen}
                onClose={() => setIsEmailPreviewOpen(false)}
                onSend={handleConfirmSend}
                requesterName={requester.name}
                introduceeProfile={profileInput}
            />
        </div>
    );
};

export default ReferralRequestView;