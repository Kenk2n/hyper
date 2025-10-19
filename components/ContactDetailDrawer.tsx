import React from 'react';
import type { Contact } from '../../types';
import { RelationshipStrength } from '../types';
import { XIcon, MailIcon, PhoneIcon, ExternalLinkIcon, OfficeBuildingIcon, UserGroupIcon, CalendarIcon, PencilIcon } from './icons';

interface ContactDetailDrawerProps {
  contact: Contact | null;
  onClose: () => void;
}

const getStrengthBadgeColor = (strength: RelationshipStrength) => {
  switch (strength) {
    case RelationshipStrength.Strong:
      return 'bg-green-100 text-green-800 border-green-200';
    case RelationshipStrength.Warm:
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case RelationshipStrength.Cold:
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
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

const ContactDetailDrawer: React.FC<ContactDetailDrawerProps> = ({ contact, onClose }) => {
  if (!contact) return null;

  return (
    <div
      className="relative z-50"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700 translate-x-0">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="bg-gray-50 px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <h2 className="text-xl font-semibold leading-6 text-gray-900" id="slide-over-title">
                            {contact.name}
                        </h2>
                        <p className="text-sm text-gray-500">{contact.title}</p>
                    </div>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        className="rounded-md bg-gray-50 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[rgb(56,117,246)] focus:ring-offset-2"
                        onClick={onClose}
                      >
                        <span className="sr-only">패널 닫기</span>
                        <XIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative flex-1 px-4 sm:px-6">
                  {/* Profile Section */}
                  <div className="py-6 border-b border-gray-200">
                    <dl className="space-y-4">
                        <div className="flex items-center">
                            <OfficeBuildingIcon className="h-5 w-5 text-gray-400 mr-3"/>
                            <span className="text-sm text-gray-800 font-medium">{contact.company}</span>
                        </div>
                        <div className="flex items-center">
                            <UserGroupIcon className="h-5 w-5 text-gray-400 mr-3"/>
                            <span className="text-sm text-gray-500">{contact.team || 'N/A'}</span>
                        </div>
                         <div className="flex items-center">
                            <MailIcon className="h-5 w-5 text-gray-400 mr-3"/>
                            <span className="text-sm text-brand hover:underline">{contact.emails[0]}</span>
                        </div>
                        {contact.phone && (
                            <div className="flex items-center">
                                <PhoneIcon className="h-5 w-5 text-gray-400 mr-3"/>
                                <span className="text-sm text-gray-500">{contact.phone}</span>
                            </div>
                        )}
                        {contact.linkedinUrl && (
                            <div className="flex items-center">
                                <ExternalLinkIcon className="h-5 w-5 text-gray-400 mr-3"/>
                                <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-brand hover:underline">LinkedIn 프로필</a>
                            </div>
                        )}
                    </dl>
                  </div>

                  {/* Relationship Score */}
                  <div className="py-6 border-b border-gray-200">
                      <h3 className="font-medium text-gray-900">관계</h3>
                      <div className="mt-4 flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500">강도</p>
                            <span className={`mt-1 px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full border ${getStrengthBadgeColor(contact.relationshipStrength)}`}>
                                {translateStrength(contact.relationshipStrength)}
                            </span>
                          </div>
                          <div>
                              <p className="text-sm text-gray-500">최근 연락</p>
                              <p className="mt-1 text-sm font-medium text-gray-800">{new Date(contact.lastContacted).toLocaleDateString()}</p>
                          </div>
                      </div>
                  </div>

                  {/* Timeline */}
                  <div className="py-6">
                    <h3 className="font-medium text-gray-900">타임라인</h3>
                    <ul className="mt-4 space-y-4">
                        <li className="flex items-start">
                            <CalendarIcon className="h-5 w-5 text-gray-400 mt-1 mr-3"/>
                            <div>
                                <p className="text-sm font-medium text-gray-800">이메일: 프로젝트 알파 킥오프</p>
                                <p className="text-xs text-gray-500">{new Date(contact.lastContacted).toLocaleDateString()}</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <CalendarIcon className="h-5 w-5 text-gray-400 mt-1 mr-3"/>
                            <div>
                                <p className="text-sm font-medium text-gray-800">미팅: 3분기 계획</p>
                                <p className="text-xs text-gray-500">2025-06-15</p>
                            </div>
                        </li>
                         <li className="flex items-start">
                            <PencilIcon className="h-5 w-5 text-gray-400 mt-1 mr-3"/>
                            <div>
                                <p className="text-sm font-medium text-gray-800">메모 추가됨</p>
                                <p className="text-sm text-gray-600 italic">"9월에 예산 관련하여 후속 조치 필요."</p>
                                <p className="text-xs text-gray-500">2025-06-10</p>
                            </div>
                        </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailDrawer;