
import React, { useState, useMemo } from 'react';
import type { SearchResultItem, Contact } from '../types';
import { RelationshipStrength } from '../types';
import { XIcon, PaperAirplaneIcon, UserCircleIcon, InformationCircleIcon } from './icons';
import { Gift, FileText, User, Briefcase, Building, Linkedin } from 'lucide-react';

const getStrengthBadgeColor = (strength: RelationshipStrength) => {
  switch (strength) {
    case RelationshipStrength.Strong:
      return 'bg-green-100 text-green-800';
    case RelationshipStrength.Warm:
      return 'bg-yellow-100 text-yellow-800';
    case RelationshipStrength.Cold:
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const translateStrength = (strength: RelationshipStrength) => {
    switch (strength) {
        case RelationshipStrength.Strong: return '강함';
        case RelationshipStrength.Warm: return '따뜻함';
        case RelationshipStrength.Cold: return '얕음';
        default: return strength;
    }
}

// Anonymization helpers
const getCharFromId = (id: string) => String.fromCharCode(65 + (id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 26));

const anonymizeContactName = (contact: Contact) => {
    return `${contact.company} 직원 ${getCharFromId(contact.id)}`;
};

const connectorNameMap = new Map<string, string>();
let connectorCharIndex = 0;
const anonymizeConnectorName = (name: string): string => {
  if (!connectorNameMap.has(name)) {
    connectorNameMap.set(name, `연결자 ${String.fromCharCode(65 + connectorCharIndex)}`);
    connectorCharIndex++;
  }
  return connectorNameMap.get(name)!;
};


interface IntroRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchResult: SearchResultItem;
}

const IntroRequestModal: React.FC<IntroRequestModalProps> = ({ isOpen, onClose, searchResult }) => {
  if (!isOpen) return null;

  const { contact, connectors } = searchResult;
  const anonymizedTargetName = anonymizeContactName(contact);
  const [selectedConnector, setSelectedConnector] = useState<string>(connectors[0]?.name || '');
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    requesterName: '',
    requesterTitle: '',
    requesterCompany: '',
    requesterLinkedin: '',
    requesterRoleDescription: '',
    requestReason: '',
    actualRequestWording: '혹시 연결해주셔도 괜찮을까요?\n 다음과 같은 목적으로 소개를 요청드리고자 합니다.',
    rewardAmount: '60000', // Default value
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const messagePreview = useMemo(() => {
    const { requesterName, requesterCompany, requesterTitle, rewardAmount } = formData;
    const targetInfo = `${contact.company} ${contact.title}`;
    const introducerInfo = `{{소개자 회사}}의 {{소개자}}`;
    const reward = rewardAmount ? (parseInt(rewardAmount, 10) / 2).toLocaleString() : '{{리워드/2}}';

    return `안녕하세요 ${contact.name}님.\n저는 ${introducerInfo}입니다.\n저에게 아래와 같은 요청이 들어왔는데, 혹시 소개받으실 의향이 있으실까요?\n${requesterCompany || '{{소개요청자_회사명}}'}, ${requesterTitle || '{{소개요청자_직책}}'} ${requesterName || '{{소개요청자_이름}}'}이 ${targetInfo}을 만나고 싶어합니다.\n소개 수락시 ${contact.name}님의 이름과 비즈니스 이메일이 공개되며,\n소개 수락 리워드로 ${reward}원이 지급됩니다.\n괜찮으시다면, 아래 링크로 초대 수락해주시면 됩니다!`;
  }, [formData, contact]);

  const handleSubmit = () => {
    try {
      const prev = JSON.parse(localStorage.getItem('introRequests') || '[]');
      const newItem = {
        id: `${Date.now()}`,
        targetContactName: anonymizedTargetName,
        targetCompany: contact.company,
        introducerName: selectedConnector,
        status: 'Pending',
        requestedAt: new Date().toISOString(),
        requesterInfo: {
          name: formData.requesterName,
          title: formData.requesterTitle,
          company: formData.requesterCompany,
          linkedin: formData.requesterLinkedin,
          roleDescription: formData.requesterRoleDescription,
        },
        message: formData.requestReason,
        actualRequestWording: formData.actualRequestWording,
        reward: formData.rewardAmount,
      };
      localStorage.setItem('introRequests', JSON.stringify([newItem, ...prev]));
    } catch (e) {
      // ignore
    }
    try { (window as any).dispatchEvent(new CustomEvent('hs-toast', { detail: { description: '소개 요청이 전송되었습니다. 평균 처리 기간은 약 1주일입니다.', type: 'success' } })); } catch {}
    setConfirmationModalOpen(false);
    onClose();
  };

  return (
    <>
      <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold leading-6 text-gray-900" id="modal-title">소개 요청하기</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                      <XIcon className="h-6 w-6" />
                    </button>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-500">To:</p>
                      <p className="text-lg font-bold text-gray-900">{anonymizedTargetName}</p>
                      <p className="text-sm text-gray-600">{contact.title}, {contact.company}</p>
                  </div>

                  <div className="mt-5">
                    <label className="block text-base font-semibold text-gray-800 px-1">연결자 선택</label>
                    <fieldset className="mt-2">
                      <legend className="sr-only">소개를 요청할 연결자를 선택하세요.</legend>
                      <div className="space-y-2">
                        {connectors.map((connector) => (
                          <label key={connector.name} className={`relative flex items-center justify-between rounded-lg border p-3 cursor-pointer ${selectedConnector === connector.name ? 'border-brand ring-2 ring-brand' : 'border-gray-300'}`}>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                name="connector"
                                value={connector.name}
                                checked={selectedConnector === connector.name}
                                onChange={() => setSelectedConnector(connector.name)}
                                className="h-4 w-4 border-gray-300 text-brand focus:ring-brand"
                              />
                              <div className="ml-3 flex items-center text-sm">
                                <UserCircleIcon className="h-6 w-6 text-gray-400 mr-2"/>
                                <span className="font-medium text-gray-900">{anonymizeConnectorName(connector.name)}</span>
                              </div>
                            </div>
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStrengthBadgeColor(connector.relationshipStrength)}`}>
                              {translateStrength(connector.relationshipStrength)}
                            </span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </div>

                  {/* Form Sections */}
                  <div className="mt-6 space-y-6">
                    {/* 1. 내 소개 */}
                    <section className="bg-gray-50 rounded-xl p-6">
                        <h3 className="font-bold text-gray-800 text-lg mb-4">1. 내 소개</h3>
                        <div className="space-y-4">
                            <div className="relative">
                                <User className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                                <input type="text" name="requesterName" value={formData.requesterName} onChange={handleInputChange} placeholder="이름" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div className="relative">
                                <Briefcase className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                                <input type="text" name="requesterTitle" value={formData.requesterTitle} onChange={handleInputChange} placeholder="직함" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div className="relative">
                                <Building className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                                <input type="text" name="requesterCompany" value={formData.requesterCompany} onChange={handleInputChange} placeholder="회사명" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div className="relative">
                                <Linkedin className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                                <input type="text" name="requesterLinkedin" value={formData.requesterLinkedin} onChange={handleInputChange} placeholder="링크드인 프로필 URL (선택)" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="relative">
                                <InformationCircleIcon className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                                <textarea name="requesterRoleDescription" value={formData.requesterRoleDescription} onChange={handleInputChange} placeholder="한 두줄 정도의 간단한 회사나 역할 설명" rows={2} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                        </div>
                    </section>

                    {/* 2. 소개받고 싶은 이유 */}
                    <section className="bg-gray-50 rounded-xl p-6">
                        <h3 className="font-bold text-gray-800 text-lg mb-4">2. 소개받고 싶은 이유</h3>
                        <div className="relative">
                            <FileText className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                            <textarea name="requestReason" value={formData.requestReason} onChange={handleInputChange} placeholder="소개 요청 배경 및 목적" rows={4} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>
                    </section>

                    {/* 3. 실제 요청 문구 */}
                    <section className="bg-gray-50 rounded-xl p-6">
                        <h3 className="font-bold text-gray-800 text-lg mb-4">3. 실제 요청 문구</h3>
                        <div className="relative">
                            <FileText className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                            <textarea name="actualRequestWording" value={formData.actualRequestWording} onChange={handleInputChange} rows={4} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>
                    </section>
                    
                    {/* 4. 리워드 액수 */}
                    <section className="bg-gray-50 rounded-xl p-6">
                        <h3 className="font-bold text-gray-800 text-lg mb-4">4. 리워드 액수 (원)</h3>
                        <div className="relative">
                            <Gift className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                            <input type="number" name="rewardAmount" value={formData.rewardAmount} onChange={handleInputChange} placeholder="총 리워드 액수 (숫자만 입력)" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>
                        <p className="mt-3 text-xs text-gray-500">
                            해당 리워드는 소개 대상자가 비즈니스 이메일 공개 수락시, 소개자와 소개 대상자에게 각 50%씩 분배됩니다.
                            <br />
                            소개를 해주는 분이 소개 대상자에게 소개를 해줄 수 있을 정도의 모티베이션을 얻을 수 있는 금액은 입력해주시길 바랍니다.
                        </p>
                    </section>

                    {/* 5. 미리보기 */}
                    <section className="bg-gray-50 rounded-xl p-6">
                        <h3 className="font-bold text-gray-800 text-lg mb-4">5. 소개자가 소개 대상자에게 보낼 메세지 미리보기</h3>
                        <div className="bg-white p-4 rounded-md border border-gray-300 text-xs leading-relaxed whitespace-pre-wrap">
                            {messagePreview}
                        </div>
                    </section>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center items-center gap-x-2 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark sm:ml-3 sm:w-auto"
                  onClick={() => setConfirmationModalOpen(true)}
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                  요청 보내기
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={onClose}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isConfirmationModalOpen && (
        <div className="relative z-50" aria-labelledby="confirmation-modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <InformationCircleIcon className="h-6 w-6 text-brand" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3 className="text-base font-semibold leading-6 text-gray-900" id="confirmation-modal-title">
                        요청 전 확인해주세요
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">
                          소개 대상자가 수락시, 소개 대상자의 이름과 비즈니스 이메일이 공개됩니다. 다만, 소개 수락이 미팅 성사를 보장하는 것은 아니며 소개 대상자의 이름과 비즈니스 이메일만 공개됩니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark sm:ml-3 sm:w-auto"
                    onClick={handleSubmit}
                  >
                    확인 및 요청
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setConfirmationModalOpen(false)}
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IntroRequestModal;
