import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = isLogin 
      ? await login(formData.email, formData.password)
      : await register(formData.name, formData.email, formData.password);

    if (!result.success) {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-bg-dark">
      <div className="w-full max-w-md bg-surface p-8 rounded-3xl border border-white/10 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {isLogin ? 'Bon retour !' : 'Créer un compte'}
          </h1>
          <p className="text-white/50">
            {isLogin ? 'Heureux de vous revoir parmi nous.' : 'Commencez votre voyage de journaling.'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-medium text-white/40 uppercase mb-1 ml-1">Nom</label>
              <input
                required
                type="text"
                className="w-full bg-bg-dark border border-white/10 rounded-xl p-3 focus:border-brand outline-none transition-all"
                placeholder="Antoine"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-white/40 uppercase mb-1 ml-1">Email</label>
            <input
              required
              type="email"
              className="w-full bg-bg-dark border border-white/10 rounded-xl p-3 focus:border-brand outline-none transition-all"
              placeholder="votre@email.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/40 uppercase mb-1 ml-1">Mot de passe</label>
            <input
              required
              type="password"
              className="w-full bg-bg-dark border border-white/10 rounded-xl p-3 focus:border-brand outline-none transition-all"
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-brand hover:bg-brand/90 py-4 rounded-xl font-bold text-white transition-all shadow-lg shadow-brand/20 mt-4 disabled:opacity-50"
          >
            {loading ? 'Chargement...' : isLogin ? 'Se connecter' : "S'inscrire"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-white/40 hover:text-brand transition-colors"
          >
            {isLogin ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;