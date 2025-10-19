
import React, { useState, useMemo } from 'react';
import type { Contact, ViewType } from '../../types';
import { RelationshipStrength } from '../../types';
import { ExternalLinkIcon, MailIcon, PhoneIcon, UserPlusIcon, MoonIcon, OfficeBuildingIcon, ArrowRightIcon } from '../icons';
import ContactDetailDrawer from '../ContactDetailDrawer';

interface ContactsViewProps {
  contacts: Contact[];
  setCurrentView: (view: ViewType) => void;
}

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

type SegmentKey = 'All' | 'Hot' | 'Dormant' | 'HighValue' | 'ByCompany';

const segments: { key: SegmentKey; label: string; emoji: string, description: string }[] = [
    { key: 'All', label: '전체 연락처', emoji: '👥', description: '연결된 계정에서 동기화된 모든 연락처입니다.' },
    { key: 'Hot', label: '최근 활동', emoji: '🔥', description: '최근 30일 내에 활발하게 교류한 연락처입니다.' },
    { key: 'Dormant', label: '휴면 관계', emoji: '🌙', description: '관계는 좋았지만 90일 이상 소통이 없었던 연락처입니다.' },
    { key: 'HighValue', label: '핵심 인물', emoji: '⭐', description: '직급이 높거나 관계 강도가 강한 연락처입니다.' },
    { key: 'ByCompany', label: '회사별 보기', emoji: '🏢', description: '같은 회사에 3명 이상의 연락처가 있는 경우 그룹으로 표시합니다.' }
];

const ContactTable = ({ contacts, onContactClick }: { contacts: Contact[], onContactClick: (contact: Contact) => void }) => (
     <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="w-3/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
              <th scope="col" className="w-2/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">회사 및 직책</th>
              <th scope="col" className="w-1/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관계 강도</th>
              <th scope="col" className="w-2/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">최근 연락일</th>
              <th scope="col" className="w-2/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">태그</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contacts.map((contact) => (
              <tr key={contact.id} onClick={() => onContactClick(contact)} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                  <div className="text-sm text-gray-500">{contact.emails[0]}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-800 font-medium">{contact.company}</div>
                    <div className="text-sm text-gray-500">{contact.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStrengthBadgeColor(contact.relationshipStrength)}`}>
                    {translateStrength(contact.relationshipStrength)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(contact.lastContacted).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex flex-wrap gap-1">
                    {contact.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-600">{tag}</span>
                    ))}
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-4 text-gray-400">
                      <a href={`mailto:${contact.emails[0]}`} onClick={(e) => e.stopPropagation()} className="hover:text-brand"><MailIcon className="h-5 w-5"/></a>
                      {contact.phone && <a href={`tel:${contact.phone}`} onClick={(e) => e.stopPropagation()} className="hover:text-brand"><PhoneIcon className="h-5 w-5"/></a>}
                      {contact.linkedinUrl && <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="hover:text-brand"><ExternalLinkIcon className="h-5 w-5"/></a>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
);


const ContactsView: React.FC<ContactsViewProps> = ({ contacts, setCurrentView }) => {
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [activeSegment, setActiveSegment] = useState<SegmentKey>('All');
    
    const insights = useMemo(() => {
        const today = new Date();
        const thirtyDaysAgo = new Date(new Date().setDate(today.getDate() - 30));
        const ninetyDaysAgo = new Date(new Date().setDate(today.getDate() - 90));

        const hotContacts = contacts.filter(c => new Date(c.lastContacted) > thirtyDaysAgo);
        const dormantContacts = contacts.filter(c =>
            new Date(c.lastContacted) < ninetyDaysAgo &&
            (c.relationshipStrength === RelationshipStrength.Strong || c.relationshipStrength === RelationshipStrength.Warm)
        );
        
        const companyCounts = contacts.reduce((acc, contact) => {
            acc[contact.company] = (acc[contact.company] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const topCompanies = Object.entries(companyCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([name]) => name);

        return {
            hotCount: hotContacts.length,
            dormantCount: dormantContacts.length,
            dormantIncrease: 15, // Mock data for "last month increase"
            topCompanies,
        };
    }, [contacts]);

    const displayedData = useMemo(() => {
        const today = new Date();
        const thirtyDaysAgo = new Date(new Date().setDate(today.getDate() - 30));
        const ninetyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 90));
        const highValueTitles = ['VP', 'Head', 'Director', 'Chief', 'Founder', 'CFO', 'CTO', '본부장', '팀장', '이사', '대표', '부사장'];

        switch(activeSegment) {
            case 'Hot':
                return contacts.filter(c => new Date(c.lastContacted) > thirtyDaysAgo);
            case 'Dormant':
                return contacts.filter(c => 
                    new Date(c.lastContacted) < ninetyDaysAgo &&
                    (c.relationshipStrength === RelationshipStrength.Strong || c.relationshipStrength === RelationshipStrength.Warm)
                );
            case 'HighValue':
                 return contacts.filter(c => 
                    c.relationshipStrength === RelationshipStrength.Strong ||
                    highValueTitles.some(title => c.title.includes(title))
                );
            case 'ByCompany':
                const companyGroups = contacts.reduce((acc, contact) => {
                    acc[contact.company] = [...(acc[contact.company] || []), contact];
                    return acc;
                }, {} as Record<string, Contact[]>);

                return Object.entries(companyGroups)
                    .filter(([_, companyContacts]) => companyContacts.length >= 3)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .reduce((acc, [companyName, companyContacts]) => {
                        acc[companyName] = companyContacts;
                        return acc;
                    }, {} as Record<string, Contact[]>);
            case 'All':
            default:
                return contacts;
        }

    }, [contacts, activeSegment]);

    const activeSegmentMeta = segments.find(s => s.key === activeSegment)!;

  return (
    <div className="space-y-6">
      {/* Insight Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: New Connections */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                  <div className="flex items-center">
                      <div className="flex-shrink-0">
                          <UserPlusIcon className="h-6 w-6 text-white bg-green-500 p-1 rounded-lg" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                          <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">최근 활동 인맥</dt>
                              <dd className="flex items-baseline">
                                  <p className="text-2xl font-semibold text-gray-900">{insights.hotCount}명</p>
                                  <p className="ml-2 flex items-baseline text-sm font-semibold text-gray-500">
                                      지난 30일
                                  </p>
                              </dd>
                          </dl>
                      </div>
                  </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                      <button onClick={() => setActiveSegment('Hot')} className="font-medium text-brand-700 hover:text-brand flex items-center">
                          목록 보기 <ArrowRightIcon className="ml-1 h-4 w-4" />
                      </button>
                  </div>
              </div>
          </div>

          {/* Card 2: Dormant Alert */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                  <div className="flex items-center">
                      <div className="flex-shrink-0">
                          <MoonIcon className="h-6 w-6 text-white bg-yellow-500 p-1 rounded-lg" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                          <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">휴면 관계 알림</dt>
                              <dd className="flex items-baseline">
                                  <p className="text-2xl font-semibold text-gray-900">{insights.dormantCount}명</p>
                                  <p className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                                      +{insights.dormantIncrease}명 증가
                                  </p>
                              </dd>
                          </dl>
                      </div>
                  </div>
              </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                        <button onClick={() => setActiveSegment('Dormant')} className="font-medium text-brand-700 hover:text-brand flex items-center">
                          리커넥트 보내기 <ArrowRightIcon className="ml-1 h-4 w-4" />
                      </button>
                  </div>
              </div>
          </div>

          {/* Card 3: Top Companies */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                  <div className="flex items-center">
                      <div className="flex-shrink-0">
                          <OfficeBuildingIcon className="h-6 w-6 text-white bg-brand p-1 rounded-lg" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                          <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">핵심 네트워크</dt>
                              <dd>
                                  <p className="text-lg font-semibold text-gray-900 truncate">{insights.topCompanies.join(', ')}</p>
                              </dd>
                          </dl>
                      </div>
                  </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                      <p className="font-medium text-gray-500">가장 많은 연락처를 보유한 회사</p>
                  </div>
              </div>
          </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">내 연락처</h1>
              <p className="text-sm text-gray-500">{activeSegmentMeta.description}</p>
        </div>

        <div className="mb-5 border-b border-gray-200">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            {segments.map((segment) => (
              <button
                key={segment.key}
                onClick={() => setActiveSegment(segment.key)}
                className={`whitespace-nowrap flex items-center py-3 px-1 border-b-2 font-medium text-sm ${
                  activeSegment === segment.key
                    ? 'border-brand text-brand'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{segment.emoji}</span> {segment.label}
              </button>
            ))}
          </nav>
        </div>
        
        {activeSegment === 'ByCompany' ? (
          <div className="space-y-8">
              {Object.keys(displayedData).length > 0 ? Object.entries(displayedData as Record<string, Contact[]>).map(([companyName, companyContacts]) => (
                  <div key={companyName}>
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">{companyName} <span className="text-sm font-normal text-gray-500">({companyContacts.length}명)</span></h2>
                      <ContactTable contacts={companyContacts} onContactClick={setSelectedContact} />
                  </div>
              )) : (
                  <div className="text-center py-12">
                      <h3 className="text-lg font-medium text-gray-900">회사 그룹을 찾을 수 없습니다.</h3>
                      <p className="mt-1 text-sm text-gray-500">같은 회사 소속 연락처가 3명 이상이 되면 여기에 표시됩니다.</p>
                  </div>
              )}
          </div>
        ) : (
          <>
              {(displayedData as Contact[]).length > 0 ? (
                  <ContactTable contacts={displayedData as Contact[]} onContactClick={setSelectedContact} />
              ) : (
                  <div className="text-center py-12">
                      <h3 className="text-lg font-medium text-gray-900">이 세그먼트에 연락처가 없습니다.</h3>
                      <p className="mt-1 text-sm text-gray-500">다른 세그먼트를 선택하거나 더 많은 연락처를 동기화하여 이 뷰를 채워보세요.</p>
                  </div>
              )}
          </>
        )}

        <ContactDetailDrawer contact={selectedContact} onClose={() => setSelectedContact(null)} />
      </div>
    </div>
  );
};

export default ContactsView;
