import { useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';

function App() {
  const { user } = useAuth();

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-bg-dark">
      <div className="max-w-md mx-auto p-6">
        <header className="flex justify-between items-center py-8">
          <h1 className="text-2xl font-bold italic tracking-tighter">Journal.</h1>
          <div className="w-10 h-10 bg-brand rounded-full flex items-center justify-center font-bold">
            {user.name[0].toUpperCase()}
          </div>
        </header>
        
        <main>
          <p className="text-3xl font-bold">Bonjour {user.name} 👋</p>
          <p className="text-white/40 mt-2">Prêt à enregistrer votre journée ?</p>
          
          {/* Les composants DailyForm, EntryList et Stats viendront ici */}
        </main>
      </div>
    </div>
  );
}

export default App;