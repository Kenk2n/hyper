
import React, { useState } from 'react';
import { SearchIcon, UserCircleIcon, PlusCircleIcon } from '../icons';
import type { SearchResultItem, Contact } from '../../types';
import { RelationshipStrength } from '../../types';
import { mockContacts } from '../../data/mockData';
import IntroRequestModal from '../IntroRequestModal';

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
    connectorNameMap.set(name, `소개자 ${String.fromCharCode(65 + connectorCharIndex)}`);
    connectorCharIndex++;
  }
  return connectorNameMap.get(name)!;
};


const EmptyState = ({ initial }: { initial: boolean }) => (
    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-lg">
        <SearchIcon className="mx-auto h-12 w-12 text-gray-400"/>
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          {initial ? "다음 연결을 찾아보세요" : "검색 결과가 없습니다"}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {initial 
            ? "사람, 회사 또는 직책으로 검색하여 소개 경로를 발견하세요."
            : "다른 키워드로 다시 검색해 보세요."
          }
        </p>
    </div>
)

const SearchResultCard = ({ result, onRequestIntro }: { result: SearchResultItem, onRequestIntro: (result: SearchResultItem) => void }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{anonymizeContactName(result.contact)}</h3>
          <p className="text-sm text-gray-600">{result.contact.title}</p>
          <p className="text-sm text-gray-500">{result.contact.company}</p>
        </div>
        <button
          onClick={() => onRequestIntro(result)}
          className="inline-flex items-center gap-x-1.5 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(56,117,246)]"
        >
          <PlusCircleIcon className="-ml-0.5 h-5 w-5" />
          소개 요청하기
        </button>
      </div>
      {result.connectors.length > 0 && (
        <div className="mt-4 border-t border-gray-200 pt-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">소개 가능한 연결 경로</h4>
            <div className="mt-3 space-y-3">
            {result.connectors.map((connector, index) => (
                <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                    <UserCircleIcon className="h-6 w-6 text-gray-400" />
                    <span className="ml-2 text-sm font-medium text-gray-800">{anonymizeConnectorName(connector.name)}</span>
                </div>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStrengthBadgeColor(connector.relationshipStrength)}`}>
                    {translateStrength(connector.relationshipStrength)}
                </span>
                </div>
            ))}
            </div>
        </div>
      )}
    </div>
);

const NetworkSearchView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [selectedIntroTarget, setSelectedIntroTarget] = useState<SearchResultItem | null>(null);


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const term = searchTerm.trim().toLowerCase();
    if (!term) return;

    setHasSearched(true);
    
    const results: SearchResultItem[] = [];
    const foundContacts = mockContacts.filter(contact => 
        contact.name.toLowerCase().includes(term) ||
        contact.company.toLowerCase().includes(term) ||
        contact.title.toLowerCase().includes(term) ||
        (contact.team && contact.team.toLowerCase().includes(term))
    );

    // Mocking connectors for demo purposes
    foundContacts.forEach(contact => {
        let connectors = [];
        if (contact.id === 'c_1') { // 김민준
            connectors.push({ name: '박서준', relationshipStrength: RelationshipStrength.Strong });
            connectors.push({ name: '최지아', relationshipStrength: RelationshipStrength.Warm });
        } else if (contact.companyId === 'comp_1') { // 네이버
             connectors.push({ name: '박서준', relationshipStrength: RelationshipStrength.Strong });
        } else if (contact.companyId === 'comp_2') { // 카카오
            connectors.push({ name: '최지아', relationshipStrength: RelationshipStrength.Warm });
        }
        
        results.push({ contact, connectors });
    });
    
    setSearchResults(results);
  };


  // @ts-ignore
    // @ts-ignore
    return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900">인맥 검색</h1>
        <p className="text-sm text-gray-500 mt-1">목표 연락처까지 가장 효과적인 경로를 찾아보세요.</p>
        <form onSubmit={handleSearch} className="mt-4 flex items-center space-x-2">
          <div className="relative flex-grow">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full rounded-md border-gray-300 bg-gray-100 py-3 pl-10 pr-3 shadow-sm focus:border-brand focus:bg-white focus:ring-brand sm:text-sm"
                  placeholder="예: '김민준', '네이버 광고팀', '마케팅 본부장'"
              />
          </div>
          <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-brand px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-brand"
          >
              검색
          </button>
        </form>
      </div>

      {hasSearched ? (
        searchResults.length > 0 ? (
            <div className="space-y-4">
                {searchResults.map(result => (
                    <SearchResultCard
                        //@ts-ignore
                      key={result.contact.id}
                      result={result} 
                      onRequestIntro={setSelectedIntroTarget}
                    />
                ))}
            </div>
        ) : <EmptyState initial={false} />
      ) : <EmptyState initial={true} />}
      
      {selectedIntroTarget && (
        <IntroRequestModal 
          isOpen={!!selectedIntroTarget}
          onClose={() => setSelectedIntroTarget(null)}
          searchResult={selectedIntroTarget}
        />
      )}

    </div>
  );
};

export default NetworkSearchView;
