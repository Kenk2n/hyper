
import React, { useEffect, useMemo, useState } from 'react';
import type { ViewType } from '../types';
import { BellIcon, UserCircleIcon, SearchIcon, PlusCircleIcon } from './icons';

interface HeaderProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
}

interface IntroHistoryItem {
  id: string;
  targetContactName: string;
  targetCompany: string;
  introducerName: string;
  status: string;
  requestedAt: string;
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView }) => {
  const navItems: { name: ViewType; label: string }[] = [
    { name: 'Contacts', label: '내 연락처' },
    { name: 'Network', label: '인맥 검색' },
  ];

  const [showIntroList, setShowIntroList] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const introList: IntroHistoryItem[] = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('introRequests') || '[]');
    } catch {
      return [];
    }
  }, [showIntroList]);

  // Close popovers on outside click (basic)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#intro-list-popover') && !target.closest('#intro-list-button')) {
        setShowIntroList(false);
      }
      if (!target.closest('#profile-menu-popover') && !target.closest('#profile-menu-button')) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const handleLogout = () => {
    // Minimal: clear auth-ish keys and refresh to landing
    localStorage.removeItem('google_access_token');
    localStorage.removeItem('google_token_type');
    localStorage.removeItem('google_expires_in');
    localStorage.removeItem('contacts_imported_at');
    window.location.href = '/';
  };

  const handleUpdateContacts = () => {
    try { (window as any).dispatchEvent(new CustomEvent('hs-toast', { detail: { description: '연락처 최신화가 시작됩니다(데모). 잠시 후 최신 상태가 반영됩니다.', type: 'info' } })); } catch {}
    localStorage.setItem('contacts_imported_at', new Date().toISOString());
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Nav */}
          <div className="flex items-center">
            <a href="/" className="cursor-pointer flex items-center">
              <div className="flex-shrink-0"></div>
              <span className="ml-0 text-2xl font-bold text-gray-800 tracking-tight">HyperNetwork</span>
            </a>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {[{ label: '내 연락처', href: '/' }, { label: '인맥 검색', href: '/network' }].map((item) => {
                  const isActive = (typeof window !== 'undefined') && (window.location.pathname === item.href || (item.href === '/' && window.location.pathname === ''));
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        isActive ? 'bg-brand-100 text-brand-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4 relative">
            <div className="flex-1 max-w-xs">
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        id="search"
                        name="search"
                        className="block w-full rounded-md border border-gray-300 bg-gray-100 py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-brand focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand sm:text-sm"
                        placeholder="회사, 사람 검색..."
                        type="search"
                    />
                </div>
            </div>
            <button
                id="intro-list-button"
                type="button"
                onClick={() => setShowIntroList((v) => !v)}
                className="inline-flex items-center gap-x-1.5 rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(56,117,246)]"
            >
                <PlusCircleIcon className="-ml-0.5 h-5 w-5" />
                내 소개 요청
            </button>

            {showIntroList && (
              <div id="intro-list-popover" className="absolute right-20 top-12 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-3 border-b bg-gray-50 rounded-t-lg flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-700">내 소개 요청</span>
                  <span className="text-xs text-gray-500">최근 {introList.length}건</span>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y">
                  {introList.length === 0 ? (
                    <div className="p-4 text-sm text-gray-500">아직 보낸 소개 요청이 없습니다.</div>
                  ) : (
                    introList.map((item) => (
                      <div key={item.id} className="p-3 text-sm">
                        <div className="flex justify-between">
                          <div className="font-medium text-gray-900">{item.targetContactName}</div>
                          <div className="text-xs text-gray-500">{new Date(item.requestedAt).toLocaleString()}</div>
                        </div>
                        <div className="text-xs text-gray-600 mt-0.5">{item.targetCompany} • {item.introducerName}</div>
                        <div className="mt-1">
                          <span className="px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-800">{item.status === 'Pending' ? '대기중' : item.status}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            <button className="p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(56,117,246)]">
              <BellIcon className="h-6 w-6" />
            </button>
            <button id="profile-menu-button" onClick={() => setShowProfileMenu((v)=>!v)} className="p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(56,117,246)]">
              <UserCircleIcon className="h-7 w-7" />
            </button>

            {showProfileMenu && (
              <div id="profile-menu-popover" className="absolute right-0 top-12 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="py-1">
                  <button onClick={handleUpdateContacts} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">연락처 최신으로 업데이트</button>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">로그아웃</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
