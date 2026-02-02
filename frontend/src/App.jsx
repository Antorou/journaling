import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import Layout from './components/Layout';
import DailyForm from './components/DailyForm';
import EntryList from './components/EntryList';
import StatsSection from './components/StatsSection';
import EntryDetailModal from './components/EntryDetailModal';

function App() {
  const { user } = useAuth();
  const [refreshSignal, setRefreshSignal] = useState(0);
  const [editingEntry, setEditingEntry] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const handleEntryAction = () => {
    setRefreshSignal(prev => prev + 1);
    setEditingEntry(null);
    if (window.navigator.vibrate) window.navigator.vibrate(10);
  };

  const handleStartEdit = (entry) => {
    setEditingEntry(entry);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!user) return <AuthPage />;

  return (
    <Layout>
      <div className="space-y-10 py-6">
        <section className="animate-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl font-black leading-tight">Comment ça va, <br /><span className="text-brand">{user.name} ?</span></h2>
          <p className="text-white/30 mt-2 font-medium">Aujourd'hui, nous sommes le {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</p>
        </section>

        <StatsSection refreshSignal={refreshSignal} />

        <section className="animate-in slide-in-from-bottom-6 duration-1000">
          <DailyForm 
            onEntryCreated={handleEntryAction} 
            editData={editingEntry}
            onCancelEdit={() => setEditingEntry(null)}
          />
        </section>

        <section className="space-y-6">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-xl font-black uppercase tracking-tighter">Ton Flux</h3>
            <span className="text-[10px] bg-brand/10 px-2 py-1 rounded-full text-brand font-bold uppercase">Journal</span>
          </div>
          <EntryList 
            refreshSignal={refreshSignal} 
            onEdit={handleStartEdit} 
            onView={(entry) => setSelectedEntry(entry)}
          />
        </section>
      </div>
      <EntryDetailModal 
        entry={selectedEntry} 
        onClose={() => setSelectedEntry(null)} 
      />
    </Layout>
  );
}

export default App;