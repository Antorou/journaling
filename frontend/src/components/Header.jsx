import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex justify-between items-center py-6">
      <div>
        <h1 className="text-xl opacity-60">Bonjour,</h1>
        <p className="text-3xl font-bold tracking-tight">{user.name} 👋</p>
      </div>
      <button 
        onClick={logout}
        className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm transition-all border border-white/10"
      >
        Déconnexion
      </button>
    </header>
  );
};

export default Header;