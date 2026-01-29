import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const DailyForm = () => {
  const { authenticatedFetch } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    mood: { status: 'ok', description: '' },
    sport: { active: false, activityType: '', duration: 0 },
    alcohol: false,
    reading: { active: false, bookTitle: '', duration: 0 },
    meditation: { active: false, duration: 0 }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await authenticatedFetch('/entries', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      setMessage({ type: 'success', text: 'Journée enregistrée ! ✨' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-surface p-6 rounded-3xl border border-white/5 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* MOOD */}
        <div className="flex justify-around bg-dark p-2 rounded-2xl">
          {['bad', 'ok', 'good'].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setFormData({...formData, mood: {...formData.mood, status: m}})}
              className={`p-4 rounded-xl text-2xl transition-all ${formData.mood.status === m ? 'bg-primary shadow-lg' : 'opacity-30'}`}
            >
              {m === 'bad' ? '☹️' : m === 'ok' ? '😐' : '😊'}
            </button>
          ))}
        </div>

        {/* TRACKERS REUTILISABLES */}
        <div className="space-y-3">
          
          {/* SPORT */}
          <TrackerItem 
            label="🏋️‍♂️ Sport" 
            active={formData.sport.active}
            onToggle={(val) => setFormData({...formData, sport: {...formData.sport, active: val}})}
          >
            <input 
              type="number" placeholder="Min" 
              className="bg-dark p-2 rounded w-20 outline-none border border-white/10"
              onChange={(e) => setFormData({...formData, sport: {...formData.sport, duration: parseInt(e.target.value)}})}
            />
            <input 
              type="text" placeholder="Type (Yoga, Run...)" 
              className="bg-dark p-2 rounded flex-1 outline-none border border-white/10"
              onChange={(e) => setFormData({...formData, sport: {...formData.sport, activityType: e.target.value}})}
            />
          </TrackerItem>

          {/* LECTURE */}
          <TrackerItem 
            label="📚 Lecture" 
            active={formData.reading.active}
            onToggle={(val) => setFormData({...formData, reading: {...formData.reading, active: val}})}
          >
            <input 
              type="number" placeholder="Min" 
              className="bg-dark p-2 rounded w-20 outline-none border border-white/10"
              onChange={(e) => setFormData({...formData, reading: {...formData.reading, duration: parseInt(e.target.value)}})}
            />
          </TrackerItem>

          {/* ALCOOL (Simple toggle) */}
          <div className="flex justify-between items-center bg-dark p-4 rounded-2xl border border-white/5">
            <span className="font-medium">🍷 Alcool</span>
            <input 
              type="checkbox" 
              checked={formData.alcohol}
              onChange={(e) => setFormData({...formData, alcohol: e.target.checked})}
              className="w-5 h-5 accent-red-500"
            />
          </div>

        </div>

        {message.text && (
          <div className={`p-4 rounded-xl text-center text-sm ${message.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {message.text}
          </div>
        )}

        <button 
          disabled={loading}
          className="w-full py-4 bg-primary hover:bg-indigo-600 disabled:opacity-50 rounded-2xl font-bold transition-all shadow-lg"
        >
          {loading ? 'Enregistrement...' : 'Valider ma journée'}
        </button>
      </form>
    </section>
  );
};

const TrackerItem = ({ label, active, onToggle, children }) => (
  <div className={`transition-all duration-300 rounded-2xl border ${active ? 'bg-primary/10 border-primary/30 p-4' : 'bg-dark border-transparent p-4'}`}>
    <div className="flex justify-between items-center">
      <span className="font-medium">{label}</span>
      <input type="checkbox" checked={active} onChange={(e) => onToggle(e.target.checked)} className="w-5 h-5 accent-primary" />
    </div>
    {active && <div className="mt-4 flex gap-2 animate-in fade-in slide-in-from-top-2">{children}</div>}
  </div>
);

export default DailyForm;