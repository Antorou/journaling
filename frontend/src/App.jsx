import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {user ? (
        <div className="p-6">
          <h1 className="text-2xl font-bold">Bienvenue {user.name} !</h1>
          <p className="opacity-50 text-sm">C'est ici que le scrolling commence.</p>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen p-4">
          <p className="text-brand">Veuillez vous connecter (AuthPage à venir)...</p>
        </div>
      )}
    </div>
  );
}

export default App;