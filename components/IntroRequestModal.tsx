
import React, { useState } from 'react';
import type { SearchResultItem, Contact } from '../types';
import { RelationshipStrength } from '../types';
import { XIcon, PaperAirplaneIcon, UserCircleIcon, InformationCircleIcon } from './icons';

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

// This map ensures consistent anonymization across the component lifecycle.
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
  const [message, setMessage] = useState('');
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [requesterInfo, setRequesterInfo] = useState({
    name: '',
    title: '',
    company: '',
    linkedin: '',
    roleDescription: '',
    background: '',
  });

  const handleRequesterInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRequesterInfo(prevState => ({ ...prevState, [name]: value }));
  };

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
        requesterInfo,
        message,
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
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold leading-6 text-gray-900" id="modal-title">소개 요청하기</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                      <XIcon className="h-6 w-6" />
                    </button>
                  </div>
                  
                  <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-r-lg">
                      <p className="font-bold">소개 성사시</p>
                      <p className="text-sm">소개 대상자가 수락시, 소개 대상자의 이름과 비즈니스 이메일이 공개됩니다. 다만, 소개 수락이 미팅 성사를 보장하는 것은 아니며 소개 대상자의 이름과 비즈니스 이메일만 공개됩니다.</p>
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

                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-base font-semibold text-gray-800">내 소개</h4>
                    <p className="mt-1 text-sm text-gray-500">소개를 요청하는 본인에 대한 정보를 입력해주세요.</p>
                    <div className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">이름</label>
                            <input type="text" name="name" id="name" value={requesterInfo.name} onChange={handleRequesterInfoChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand focus:ring-brand sm:text-sm py-2 px-3" />
                        </div>
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">직함</label>
                            <input type="text" name="title" id="title" value={requesterInfo.title} onChange={handleRequesterInfoChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand focus:ring-brand sm:text-sm py-2 px-3" />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="company" className="block text-sm font-medium text-gray-700">회사명</label>
                            <input type="text" name="company" id="company" value={requesterInfo.company} onChange={handleRequesterInfoChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand focus:ring-brand sm:text-sm py-2 px-3" />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">링크드인 (선택)</label>
                            <input type="text" name="linkedin" id="linkedin" value={requesterInfo.linkedin} onChange={handleRequesterInfoChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand focus:ring-brand sm:text-sm py-2 px-3" />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="roleDescription" className="block text-sm font-medium text-gray-700">간단한 회사나 역할 설명</label>
                            <textarea name="roleDescription" id="roleDescription" rows={2} value={requesterInfo.roleDescription} onChange={handleRequesterInfoChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand focus:ring-brand sm:text-sm py-2 px-3"></textarea>
                            <p className="mt-1 text-xs text-gray-500">한두 줄이면 충분합니다.</p>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="background" className="block text-sm font-medium text-gray-700">신뢰를 줄 수 있는 간단한 배경</label>
                            <input type="text" name="background" id="background" value={requesterInfo.background} onChange={handleRequesterInfoChange} placeholder="예: 저희는 B2B 세일즈 SaaS를 운영하고 있고..." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand focus:ring-brand sm:text-sm py-2 px-3" />
                        </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-base font-semibold text-gray-800">소개받고 싶은 이유</h4>
                    <label htmlFor="message" className="mt-2 block text-sm font-medium text-gray-700">
                      소개 요청 배경 및 목적
                    </label>
                    <p className="mt-1 text-sm text-gray-500">이 메시지는 연결자에게만 전달됩니다. 왜 소개받고 싶은지 알려주세요.</p>
                    <div className="mt-2">
                      <textarea
                        rows={5}
                        name="message"
                        id="message"
                        value={message}퍄
                        onChange={(e) => setMessage(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand focus:ring-brand sm:text-sm py-2 px-3"
                        placeholder={`${anonymizedTargetName}님과 어떤 이야기를 나누고 싶으신가요?`}
                      ></textarea>
                    </div>
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
