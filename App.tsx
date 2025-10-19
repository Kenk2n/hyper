
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import OnboardingView from './components/views/OnboardingView';
import ContactsView from './components/views/ContactsView';
import NetworkSearchView from './components/views/NetworkSearchView';
import OAuthPopupBridge from './components/views/OAuthPopupBridge';
import Terms from './components/views/Terms';
import Privacy from './components/views/Privacy';
import FAQRequestor from './components/views/FAQRequestor';
import FAQIntroducer from './components/views/FAQIntroducer';
import FAQTarget from './components/views/FAQTarget';
import ReferralRequestView from './components/views/ReferralRequestView';
import ProcessView from './components/views/ProcessView'; // Import ProcessView
import { mockContacts } from './data/mockData';
import type { Contact, ViewType } from './types';

const App: React.FC = () => {
    if (window.location.pathname === '/oauth/callback' && window.opener) {
        return <OAuthPopupBridge />;
    }

    const [isOnboarded, setIsOnboarded] = useState<boolean>(() => !!localStorage.getItem('contacts_imported_at'));
    
    const [contacts, setContacts] = useState<Contact[]>(() => {
        try {
            const savedContacts = localStorage.getItem('my_contacts');
            return savedContacts ? JSON.parse(savedContacts) : [];
        } catch (error) {
            console.error("Failed to parse contacts from localStorage", error);
            return [];
        }
    });

    const [currentView, setCurrentView] = useState<ViewType>(() => {
        return isOnboarded ? 'Contacts' : 'Onboarding';
    });

    useEffect(() => {
        if (isOnboarded) {
            const savedContacts = localStorage.getItem('my_contacts');
            if (!savedContacts || JSON.parse(savedContacts).length === 0) {
                const newContacts = mockContacts;
                localStorage.setItem('my_contacts', JSON.stringify(newContacts));
                setContacts(newContacts);
            }
        }
    }, [isOnboarded]);

    const handleOnboardingComplete = useCallback(() => {
        localStorage.setItem('contacts_imported_at', new Date().toISOString());
        localStorage.removeItem('google_access_token');
        
        const newContacts = mockContacts;
        localStorage.setItem('my_contacts', JSON.stringify(newContacts));
        setContacts(newContacts);
        
        setIsOnboarded(true);
        setCurrentView('Contacts');
    }, []);

    const renderView = () => {
        if (window.location.pathname.startsWith('/referral/')) {
            return <ReferralRequestView />;
        }
        if (window.location.pathname === '/terms') { return <Terms />; }
        if (window.location.pathname === '/privacy') { return <Privacy />; }
        if (window.location.pathname === '/process') { return <ProcessView />; } // Add route for ProcessView
        if (window.location.pathname === '/faq/requestor') { return <FAQRequestor />; }
        if (window.location.pathname === '/faq/introducer') { return <FAQIntroducer />; }
        if (window.location.pathname === '/faq/target') { return <FAQTarget />; }

        if (!isOnboarded) {
            return <OnboardingView onComplete={handleOnboardingComplete} />;
        }

        if (window.location.pathname === '/network') {
            return <NetworkSearchView />;
        }
        switch (currentView) {
            case 'Contacts':
                return <ContactsView contacts={contacts} setCurrentView={setCurrentView} />;
            case 'Network':
                return <NetworkSearchView />;
            default:
                return <ContactsView contacts={contacts} setCurrentView={setCurrentView} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {isOnboarded && !window.location.pathname.startsWith('/referral/') && (
                <Header currentView={currentView} setCurrentView={setCurrentView} />
            )}
            <main className={`flex-grow ${isOnboarded && !window.location.pathname.startsWith('/referral/') ? 'p-4 sm:p-6 lg:p-8' : ''}`}>
                {renderView()}
            </main>
            {!window.location.pathname.startsWith('/referral/') && (
                 <footer className="bg-white border-t">
                    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
                        <p className="mb-2 sm:mb-0">© {new Date().getFullYear()} HyperNetwork</p>
                        <nav className="flex items-center gap-4 flex-wrap">
                            <a className="hover:text-brand" href="/terms">이용약관</a>
                            <span className="text-gray-300">|</span>
                            <a className="hover:text-brand" href="/privacy">개인정보 처리방침</a>
                            <span className="text-gray-300">|</span>
                            <a className="hover:text-brand" href="/process">소개 프로세스</a>
                            <span className="text-gray-300">|</span>
                            <a className="hover:text-brand" href="/faq/requestor">FAQ(요청자)</a>
                            <span className="text-gray-300">|</span>
                            <a className="hover:text-brand" href="/faq/introducer">FAQ(소개자)</a>
                            <span className="text-gray-300">|</span>
                            <a className="hover:text-brand" href="/faq/target">FAQ(당사자)</a>
                        </nav>
                    </div>
                </footer>
            )}
        </div>
    );
};

export default App;
