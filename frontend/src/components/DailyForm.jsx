import { useState, useEffect } from 'react';
import { Smile, Frown, Meh, Dumbbell, Book, Wine, Wind, Send, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';
import Input from './ui/Input';
import ControlCard from './ui/ControlCard';

const initialState = {
  date: new Date().toISOString().split('T')[0],
  mood: { status: 'ok', description: '' },
  sport: { active: false, activityType: '', duration: 0 },
  alcohol: false,
  reading: { active: false, bookTitle: '', duration: 0 },
  meditation: { active: false, duration: 0 }
};

const DailyForm = ({ onEntryCreated, editData, onCancelEdit }) => {
  const { authenticatedFetch } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editData) {
      setFormData({
        ...initialState,
        ...editData,
        mood: editData.mood || initialState.mood,
        sport: editData.sport || initialState.sport,
        reading: editData.reading || initialState.reading,
        meditation: editData.meditation || initialState.meditation
      });
    } else {
      setFormData(initialState);
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const isEdit = !!editData;
      const url = isEdit ? `/entries/${editData._id}` : '/entries';
      const method = isEdit ? 'PUT' : 'POST';

      // --- NETTOYAGE DU PAYLOAD (Solution pour l'erreur 400) ---
      // On ne renvoie pas _id, user, ou createdAt que MongoDB rejette en PUT
      const payload = {
        date: formData.date,
        mood: {
          status: formData.mood.status,
          description: formData.mood.description
        },
        sport: {
          active: formData.sport.active,
          activityType: formData.sport.activityType,
          duration: Number(formData.sport.duration) || 0 // Force le type Number
        },
        reading: {
          active: formData.reading.active,
          bookTitle: formData.reading.bookTitle,
          duration: Number(formData.reading.duration) || 0
        },
        meditation: {
          active: formData.meditation.active,
          duration: Number(formData.meditation.duration) || 0
        },
        alcohol: Boolean(formData.alcohol) // Force le type Boolean
      };

      await authenticatedFetch(url, {
        method: method,
        body: JSON.stringify(payload)
      });

      setFormData(initialState);
      if (onEntryCreated) onEntryCreated();
      
    } catch (err) {
      console.error("Erreur API:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {editData && (
        <div className="flex justify-between items-center bg-brand/10 border border-brand/20 p-4 rounded-2xl animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-brand">Mode Édition</span>
          </div>
          <button type="button" onClick={onCancelEdit} className="text-white/40 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>
      )}

      {/* SECTION MOOD */}
      <section className="bg-surface p-6 rounded-3xl border border-white/5">
        <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-4 ml-1">Humeur</label>
        <div className="grid grid-cols-3 gap-3">
          {[{ id: 'bad', icon: Frown, color: 'text-red-400' }, { id: 'ok', icon: Meh, color: 'text-yellow-400' }, { id: 'good', icon: Smile, color: 'text-emerald-400' }].map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setFormData({ ...formData, mood: { ...formData.mood, status: m.id } })}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${formData.mood.status === m.id ? 'bg-brand/20 border-brand shadow-lg shadow-brand/10' : 'bg-bg-dark border-transparent opacity-30 hover:opacity-50'}`}
            >
              <m.icon size={32} className={formData.mood.status === m.id ? m.color : 'text-white'} />
              <span className="text-[10px] font-bold uppercase tracking-tighter">{m.id}</span>
            </button>
          ))}
        </div>
        <Input 
          placeholder="Un petit mot sur ta journée ?"
          value={formData.mood.description || ''}
          className="mt-4 !bg-bg-dark !p-3 text-sm"
          onChange={(e) => setFormData({ ...formData, mood: { ...formData.mood, description: e.target.value } })}
        />
      </section>

      {/* ACTIVITÉS */}
      <div className="grid grid-cols-1 gap-4">
        <ControlCard 
          label="Sport" icon={Dumbbell} active={formData.sport?.active}
          onToggle={(val) => setFormData({ ...formData, sport: { ...formData.sport, active: val } })}
        >
          <div className="flex gap-3">
            <Input type="number" placeholder="Min" value={formData.sport?.duration || ''} onChange={(e) => setFormData({ ...formData, sport: { ...formData.sport, duration: e.target.value } })} />
            <Input type="text" placeholder="Type" value={formData.sport?.activityType || ''} onChange={(e) => setFormData({ ...formData, sport: { ...formData.sport, activityType: e.target.value } })} />
          </div>
        </ControlCard>

        <ControlCard 
          label="Lecture" icon={Book} active={formData.reading?.active}
          onToggle={(val) => setFormData({ ...formData, reading: { ...formData.reading, active: val } })}
        >
          <div className="flex gap-3">
            <Input 
              type="text" 
              placeholder="Titre du livre" 
              value={formData.reading?.bookTitle || ''} 
              onChange={(e) => setFormData({ ...formData, reading: { ...formData.reading, bookTitle: e.target.value } })} 
            />
            <Input 
              type="number" 
              placeholder="Min" 
              value={formData.reading?.duration || ''} 
              onChange={(e) => setFormData({ ...formData, reading: { ...formData.reading, duration: e.target.value } })} 
            />
          </div>          
        </ControlCard>

        <div className={`p-5 rounded-3xl border flex justify-between items-center transition-all ${formData.alcohol ? 'bg-red-500/10 border-red-500/30' : 'bg-surface border-white/5'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl transition-colors ${formData.alcohol ? 'bg-red-500 text-white' : 'bg-white/5 text-white/40'}`}><Wine size={20} /></div>
            <span className={`font-bold ${formData.alcohol ? 'text-white' : 'text-white/40'}`}>Alcool</span>
          </div>
          <input type="checkbox" checked={formData.alcohol || false} className="w-6 h-6 accent-red-500 cursor-pointer" onChange={(e) => setFormData({ ...formData, alcohol: e.target.checked })} />
        </div>
      </div>

      <Button type="submit" loading={loading} className="w-full py-5 text-lg">
        <Send size={20} className="mr-2" /> 
        {editData ? 'Mettre à jour' : 'Enregistrer ma journée'}
      </Button>
    </form>
  );
};

export default DailyForm;