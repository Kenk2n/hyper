import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, FunnelChart, Funnel, LabelList } from 'recharts';
import type { FunnelDataPoint, IntroducerDataPoint } from '../../types';

interface ReportsViewProps {
  funnelData: FunnelDataPoint[];
  topIntroducers: IntroducerDataPoint[];
}

const ReportsView: React.FC<ReportsViewProps> = ({ funnelData, topIntroducers }) => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">성과 리포트</h1>
        <p className="text-sm text-gray-500 mt-1">네트워킹 및 소개 활동의 효율성을 분석하세요.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Funnel Chart */}
        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">소개 퍼널</h2>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <FunnelChart>
                <Tooltip />
                <Funnel dataKey="value" data={funnelData} isAnimationActive>
                  <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Introducers */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">최고의 소개자</h2>
           <div style={{ width: '100%', height: 400 }}>
             <ResponsiveContainer>
                <BarChart layout="vertical" data={topIntroducers} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="introductions" name="소개" fill="#4f46e5" />
                </BarChart>
            </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsView;