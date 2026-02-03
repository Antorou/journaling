import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-bg-dark text-white selection:bg-brand/30">
      <div className="max-w-2xl mx-auto px-6 pb-24">
        
        <header className="flex justify-between items-center py-8 sticky top-0 bg-bg-dark/80 backdrop-blur-md z-10">
          <div>
            <h1 className="text-xl font-black tracking-tighter text-brand">JOURNAL.</h1>
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">de bord</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">{user?.name}</p>
              <button 
                onClick={logout}
                className="text-[10px] text-white/40 hover:text-red-400 transition-colors uppercase font-bold"
              >
                Déconnexion
              </button>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-surface border border-white/10 flex items-center justify-center text-brand font-black shadow-inner">
              {user?.name?.[0].toUpperCase()}
            </div>
          </div>
        </header>

        <main className="animate-in fade-in duration-700">
          {children}
        </main>

      </div>
    </div>
  );
};

export default Layout;