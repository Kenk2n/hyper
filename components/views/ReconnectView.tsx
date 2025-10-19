import React from 'react';
import type { ReconnectContact } from '../../types';
import { MailIcon, RefreshIcon } from '../icons';

const ReconnectView: React.FC<{ reconnectQueue: ReconnectContact[] }> = ({ reconnectQueue }) => {
  const templates = [
    "잘 지내시나요? 오랜만에 연락드립니다.",
    "이 기사 보다가 생각나서 연락드렸어요.",
    "오랜만이네요, 조만간 커피 한잔해요."
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">재연결 목록</h1>
          <p className="text-sm text-gray-500">한동안 교류가 없었던 주요 연락처와 관계를 다시 활성화하세요.</p>
        </div>
      </div>
      <div className="space-y-4">
        {reconnectQueue.map(({ contact, reason }, index) => (
          <div key={contact.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                    <p className="text-sm text-gray-600">{contact.title}, {contact.company}</p>
                    <p className="mt-1 text-xs text-red-600 bg-red-100 px-2 py-0.5 rounded-full inline-block"><RefreshIcon className="h-3 w-3 inline mr-1"/>{reason}</p>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 text-sm rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-100">
                        닫기
                    </button>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand hover:bg-brand">
                        <MailIcon className="h-5 w-5 mr-2"/>
                        재연결
                    </button>
                </div>
            </div>
            <div className="mt-4 border-t border-gray-200 pt-3">
                <p className="text-sm font-medium text-gray-700 mb-2">추천 템플릿:</p>
                <div className="flex flex-wrap gap-2">
                    {templates.map(template => (
                        <button key={template} className="px-3 py-1 text-xs rounded-full text-brand-700 bg-brand-100 hover:bg-brand">
                            "{template}"
                        </button>
                    ))}
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReconnectView;