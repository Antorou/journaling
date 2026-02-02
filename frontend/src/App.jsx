import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import Layout from './components/Layout';
import DailyForm from './components/DailyForm';

function App() {
  const { user } = useAuth();
  
  const [refreshSignal, setRefreshSignal] = useState(0);

  const handleEntryCreated = () => {
    setRefreshSignal(prev => prev + 1);
    
    if (window.navigator.vibrate) window.navigator.vibrate(10);
  };

  if (!user) return <AuthPage />;

  return (
    <Layout>
      <div className="space-y-10 py-6">
        
        <section className="animate-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl font-black leading-tight">
            Comment ça va, <br />
            <span className="text-brand">{user.name} ?</span>
          </h2>
          <p className="text-white/30 mt-2 font-medium">Aujourd'hui, nous sommes le {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</p>
        </section>

        <section className="animate-in slide-in-from-bottom-6 duration-1000">
          <DailyForm onEntryCreated={handleEntryCreated} />
        </section>

        <section className="space-y-6">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-xl font-black uppercase tracking-tighter">Ton Flux</h3>
            <span className="text-[10px] bg-white/5 px-2 py-1 rounded-full text-white/40 font-bold">RÉCENT</span>
          </div>
          
          <div className="p-10 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-white/20 gap-2">
            <div className="w-8 h-8 border-2 border-white/10 border-t-brand rounded-full animate-spin" />
            <p className="text-xs font-bold uppercase tracking-widest">Chargement du journal...</p>
          </div>
        </section>

      </div>
    </Layout>
  );
}

export default App;