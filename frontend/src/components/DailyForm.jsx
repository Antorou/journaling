import { useState } from 'react';
import { Smile, Frown, Meh, Dumbbell, Book, Wine, Wind, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';
import Input from './ui/Input';
import ControlCard from './ui/ControlCard';

const DailyForm = ({ onEntryCreated }) => {
  const { authenticatedFetch } = useAuth();
  const [loading, setLoading] = useState(false);

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
    try {
      await authenticatedFetch('/entries', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      if (onEntryCreated) onEntryCreated();
      // Reset optionnel ou message de succès
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="bg-surface p-6 rounded-3xl border border-white/5">
        <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-4 ml-1">
          Humeur du jour
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'bad', icon: Frown, color: 'text-red-400' },
            { id: 'ok', icon: Meh, color: 'text-yellow-400' },
            { id: 'good', icon: Smile, color: 'text-emerald-400' }
          ].map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setFormData({ ...formData, mood: { ...formData.mood, status: m.id } })}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                formData.mood.status === m.id 
                ? 'bg-brand/20 border-brand shadow-lg shadow-brand/10' 
                : 'bg-bg-dark border-transparent opacity-40'
              }`}
            >
              <m.icon size={32} className={formData.mood.status === m.id ? m.color : 'text-white'} />
              <span className="text-[10px] font-bold uppercase tracking-tighter">{m.id}</span>
            </button>
          ))}
        </div>
        <Input 
          placeholder="Un petit mot sur ta journée ?"
          className="mt-4 !bg-bg-dark !p-3 text-sm"
          onChange={(e) => setFormData({ ...formData, mood: { ...formData.mood, description: e.target.value } })}
        />
      </section>

      <div className="grid grid-cols-1 gap-4">
        <ControlCard 
          label="Sport & Energie" 
          icon={Dumbbell} 
          active={formData.sport.active}
          onToggle={(val) => setFormData({ ...formData, sport: { ...formData.sport, active: val } })}
        >
          <div className="flex gap-3">
            <Input 
              type="number" placeholder="Min" 
              onChange={(e) => setFormData({ ...formData, sport: { ...formData.sport, duration: parseInt(e.target.value) } })}
            />
            <Input 
              type="text" placeholder="Type (Yoga, Run...)" 
              onChange={(e) => setFormData({ ...formData, sport: { ...formData.sport, activityType: e.target.value } })}
            />
          </div>
        </ControlCard>

        <ControlCard 
          label="Lecture" 
          icon={Book} 
          active={formData.reading.active}
          onToggle={(val) => setFormData({ ...formData, reading: { ...formData.reading, active: val } })}
        >
          <Input 
            type="number" placeholder="Minutes de lecture" 
            onChange={(e) => setFormData({ ...formData, reading: { ...formData.reading, duration: parseInt(e.target.value) } })}
          />
        </ControlCard>

        <ControlCard 
          label="Méditation" 
          icon={Wind} 
          active={formData.meditation.active}
          onToggle={(val) => setFormData({ ...formData, meditation: { ...formData.meditation, active: val } })}
        >
          <Input 
            type="number" placeholder="Minutes de calme" 
            onChange={(e) => setFormData({ ...formData, meditation: { ...formData.meditation, duration: parseInt(e.target.value) } })}
          />
        </ControlCard>

        <div className={`p-5 rounded-3xl border flex justify-between items-center transition-all ${formData.alcohol ? 'bg-red-500/10 border-red-500/30' : 'bg-surface border-white/5'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${formData.alcohol ? 'bg-red-500' : 'bg-white/5 text-white/40'}`}>
              <Wine size={20} />
            </div>
            <span className={`font-bold ${formData.alcohol ? 'text-white' : 'text-white/40'}`}>Consommation d'alcool</span>
          </div>
          <input 
            type="checkbox" 
            className="w-6 h-6 accent-red-500"
            onChange={(e) => setFormData({ ...formData, alcohol: e.target.checked })}
          />
        </div>
      </div>

      <Button type="submit" loading={loading} className="w-full py-5 text-lg">
        <Send size={20} className="mr-2" /> Enregistrer ma journée
      </Button>
    </form>
  );
};

export default DailyForm;