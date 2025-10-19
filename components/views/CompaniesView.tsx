import React from 'react';
import type { Company } from '../../types';
import { StarIcon as StarSolidIcon, OfficeBuildingIcon, GlobeAltIcon, UsersIcon } from '../icons';
import { StarIcon as StarOutlineIcon } from '../icons'; // Renaming to avoid conflict


const CompaniesView: React.FC<{ companies: Company[] }> = ({ companies }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">회사</h1>
            <p className="text-sm text-gray-500">목표 계정(회사)에 대한 우리 조직의 네트워크 영향력을 추적하세요.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map(company => (
          <div key={company.id} className="bg-gray-50 border border-gray-200 rounded-lg p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                  <div>
                      <h2 className="text-lg font-bold text-gray-900">{company.name}</h2>
                      <p className="text-sm text-brand hover:underline cursor-pointer">{company.domain}</p>
                  </div>
                  <button className="text-gray-400 hover:text-yellow-500">
                      {company.isWatchlisted ? <StarSolidIcon className="h-6 w-6 text-yellow-400" /> : <StarOutlineIcon className="h-6 w-6" />}
                  </button>
              </div>
              <div className="mt-4 flex items-center">
                  <div className="relative w-24 h-24">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                          <path
                              className="text-gray-200"
                              strokeWidth="3"
                              fill="none"
                              d="M18 2.0845
                                 a 15.9155 15.9155 0 0 1 0 31.831
                                 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                              className="text-green-500"
                              strokeWidth="3"
                              fill="none"
                              strokeDasharray={`${company.networkScore}, 100`}
                              d="M18 2.0845
                                 a 15.9155 15.9155 0 0 1 0 31.831
                                 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-bold text-gray-800">{company.networkScore}</span>
                          <span className="text-xs text-gray-500">점수</span>
                      </div>
                  </div>
                  <div className="ml-6 space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                          <OfficeBuildingIcon className="h-5 w-5 mr-2 text-gray-400" />
                          <span>{company.industry}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                          <GlobeAltIcon className="h-5 w-5 mr-2 text-gray-400" />
                          <span>{company.region}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                          <UsersIcon className="h-5 w-5 mr-2 text-gray-400" />
                          <span className="font-medium text-gray-800">{company.knownContacts}명</span>
                          <span className="ml-1">아는 연락처</span>
                      </div>
                  </div>
              </div>
            </div>
             <div className="mt-5">
                <button className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand hover:bg-brand">
                    상세 정보 보기
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompaniesView;