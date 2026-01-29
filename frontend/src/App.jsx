import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import DailyForm from './components/DailyForm';

function App() {
  const { user } = useAuth();

  if (!user) {
    return <div className="p-10 text-center">Page de Login à isoler aussi !</div>;
  }

  return (
    <div className="min-h-screen bg-dark pb-20">
      <div className="max-w-md mx-auto px-6">
        <Header />
        
        <main className="space-y-8 mt-4">
          {/* Section 1 : Saisie */}
          <DailyForm />

          {/* Section 2 : Résumé du jour (À venir) */}
          {/* Section 3 : Flux (À venir) */}
          {/* Section 4 : Stats (À venir) */}
        </main>
      </div>
    </div>
  );
}

export default App;