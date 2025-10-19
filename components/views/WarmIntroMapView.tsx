import React from 'react';
import { UserCircleIcon, ArrowRightIcon, StarIcon } from '../icons';

const Node = ({ name, title, isYou = false, isTarget = false }: { name: string, title: string, isYou?: boolean, isTarget?: boolean }) => {
    const bgColor = isYou ? 'bg-brand-100' : isTarget ? 'bg-green-100' : 'bg-white';
    const borderColor = isYou ? 'border-[rgb(56,117,246)]' : isTarget ? 'border-green-500' : 'border-gray-300';
    return (
        <div className={`flex items-center p-4 rounded-lg shadow-md border-2 ${borderColor} ${bgColor} w-64`}>
            <UserCircleIcon className="h-12 w-12 text-gray-400"/>
            <div className="ml-4">
                <p className="font-bold text-gray-900">{name}</p>
                <p className="text-sm text-gray-600">{title}</p>
            </div>
        </div>
    )
};

const Edge = ({ score }: { score: number }) => (
    <div className="flex flex-col items-center justify-center mx-4">
        <div className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
            점수: {score}
        </div>
        <ArrowRightIcon className="h-8 w-8 text-gray-400 my-2" />
    </div>
);

const WarmIntroMapView: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-xl font-bold text-gray-900">Warm Intro 지도</h2>
      <p className="text-sm text-gray-500">목표 연락처까지의 최적의 경로를 시각화하여 보여줍니다.</p>
      
      {/* Best Path */}
      <div className="mt-6 p-4 border-2 border-yellow-400 bg-yellow-50 rounded-lg">
          <div className="flex items-center mb-4">
              <StarIcon className="h-6 w-6 text-yellow-500 mr-2"/>
              <h3 className="text-lg font-semibold text-yellow-900">추천 경로 (점수: 71)</h3>
          </div>
          <div className="flex items-center justify-center">
              <Node name="나" title="내 직책" isYou={true} />
              <Edge score={78}/>
              <Node name="박서준" title="세일즈 디렉터" />
              <Edge score={65}/>
              <Node name="김민준" title="마케팅 본부장" isTarget={true} />
          </div>
      </div>

      {/* Other Paths */}
      <div className="mt-6 space-y-4">
          <h3 className="font-semibold text-gray-800">다른 가능한 경로</h3>
          <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">최지아 & 이서연을 통한 경로 (점수: 64)</p>
                  <p className="text-sm text-gray-500">나 → 최지아 → 이서연 → 김민준</p>
                </div>
                <button className="px-3 py-1 text-sm font-medium rounded-md text-brand-700 bg-brand-100 hover:bg-brand">
                    보기
                </button>
              </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">이서연을 통한 직접 연결 (점수: 55)</p>
                  <p className="text-sm text-gray-500">나 → 이서연 → 김민준</p>
                </div>
                 <button className="px-3 py-1 text-sm font-medium rounded-md text-brand-700 bg-brand-100 hover:bg-brand">
                    보기
                </button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default WarmIntroMapView;