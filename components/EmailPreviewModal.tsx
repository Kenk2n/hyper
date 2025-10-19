
import React from 'react';
import { X, Send } from 'lucide-react';

// Define props interface
interface EmailPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: () => void;
  requesterName: string;
  introduceeProfile: {
    name: string;
    company: string;
    jobTitle: string;
    email: string;
    phone: string;
  };
}

const EmailPreviewModal: React.FC<EmailPreviewModalProps> = ({
  isOpen,
  onClose,
  onSend,
  requesterName,
  introduceeProfile,
}) => {
  if (!isOpen) return null;

  const subject = `소개 요청 수락: ${introduceeProfile.name}님과 ${requesterName}님의 연결`;
  const to = `${requesterName}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl flex flex-col font-sans animate-in fade-in-0 zoom-in-95">
        {/* Modal Header */}
        <div className="bg-gray-100 px-4 py-2 rounded-t-lg flex justify-between items-center border-b">
          <h2 className="text-sm text-gray-700 font-medium">새 메시지</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Email Header */}
        <div className="px-6 py-3 border-b text-sm space-y-2">
          <div className="flex items-center">
            <span className="text-gray-500 w-16 flex-shrink-0">받는사람</span>
            <span className="text-gray-800 bg-gray-100 px-2 py-1 rounded-md">{to}</span>
          </div>
          <div className="flex items-center border-t pt-2">
            <span className="text-gray-500 w-16 flex-shrink-0">제목</span>
            <span className="text-gray-800">{subject}</span>
          </div>
        </div>

        {/* Email Body */}
        <div className="px-6 py-4 flex-grow overflow-y-auto" style={{ maxHeight: '55vh' }}>
          <p className="text-gray-800">안녕하세요, {requesterName}님.</p>
          <br />
          <p className="text-gray-800">
            요청하신 소개 건에 대해 {introduceeProfile.name}님께서 수락 의사를 밝히셨습니다.
            <br />
            아래는 {introduceeProfile.name}님께서 공유해주신 프로필 정보입니다.
          </p>
          <div className="mt-4 p-4 border rounded-lg bg-gray-50 text-sm space-y-1">
            <p><strong>이름:</strong> {introduceeProfile.name}</p>
            <p><strong>회사:</strong> {introduceeProfile.company}</p>
            <p><strong>직책:</strong> {introduceeProfile.jobTitle}</p>
            <p><strong>이메일:</strong> <a href={`mailto:${introduceeProfile.email}`} className="text-blue-600 hover:underline">{introduceeProfile.email}</a></p>
            <p><strong>연락처:</strong> {introduceeProfile.phone}</p>
          </div>
          <br />
          <p className="text-gray-800">이후의 소통은 두 분께서 직접 진행해주시면 됩니다.</p>
          <br />
          <p className="text-gray-600 text-sm">감사합니다.</p>
          <p className="text-gray-600 text-sm">Hypersales Network 드림</p>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end items-center border-t">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-200 transition-colors mr-3"
          >
            취소
          </button>
          <button
            onClick={onSend}
            className="inline-flex items-center gap-x-2 px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
          >
            <Send size={16} />
            보내기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailPreviewModal;
