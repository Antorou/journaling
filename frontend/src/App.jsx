import { useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import Layout from './components/Layout';

function App() {
  const { user } = useAuth();

  if (!user) return <AuthPage />;

  return (
    <Layout>
      <div className="space-y-12 py-4">
        
        <section>
          <h2 className="text-4xl font-black leading-tight">
            C'est une belle journée <br />
            pour écrire, <span className="text-brand">{user.name}.</span>
          </h2>
        </section>

        <div className="h-40 border-2 border-dashed border-white/5 rounded-3xl flex items-center justify-center text-white/20">
          DailyForm à venir...
        </div>
        
        <div className="h-80 border-2 border-dashed border-white/5 rounded-3xl flex items-center justify-center text-white/20">
          EntryList (Feed) à venir...
        </div>

      </div>
    </Layout>
  );
}

export default App;