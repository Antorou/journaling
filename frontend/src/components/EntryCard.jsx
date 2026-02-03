import { Trash2, Edit3, Smile, Meh, Frown, Dumbbell, Book, Wine, Wind } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const EntryCard = ({ entry, onRefresh, onEdit, onView }) => {
  const { authenticatedFetch } = useAuth();

  const handleDelete = async (e) => {
    // Empêche d'ouvrir le modal de détail quand on veut supprimer
    e.stopPropagation(); 
    if (!window.confirm("Supprimer cette entrée ?")) return;
    try {
      await authenticatedFetch(`/entries/${entry._id}`, { method: 'DELETE' });
      onRefresh();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (e) => {
    // Empêche d'ouvrir le modal de détail quand on veut éditer
    e.stopPropagation();
    onEdit(entry);
  };

  const date = new Date(entry.date).toLocaleDateString('fr-FR', {
    weekday: 'short', day: 'numeric', month: 'short'
  });

  const moods = {
    good: { icon: Smile, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    ok: { icon: Meh, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
    bad: { icon: Frown, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' }
  };

  const config = moods[entry.mood.status] || moods.ok;
  const MoodIcon = config.icon;

  return (
    <div 
      onClick={() => onView(entry)} // Déclenche l'ouverture du modal de détail
      className={`group relative p-5 rounded-3xl border cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.98] ${config.bg} ${config.border}`}
    >
      {/* BOUTONS ACTIONS */}
      <div className="absolute top-4 right-4 flex gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity z-20">
        <button 
          onClick={handleEdit} 
          className="p-2 hover:bg-white/10 rounded-xl text-white/40 hover:text-white transition-colors"
        >
          <Edit3 size={16} />
        </button>
        <button 
          onClick={handleDelete} 
          className="p-2 hover:bg-red-500/20 rounded-xl text-white/40 hover:text-red-400 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">{date}</p>
          <MoodIcon className={config.color} size={24} />
        </div>
        {entry.alcohol && (
          <div className="bg-red-500/20 p-2 rounded-xl text-red-400 mr-12 sm:mr-0">
            <Wine size={16} />
          </div>
        )}
      </div>

      {entry.mood.description && (
        <p className="text-sm text-white/80 mb-4 italic line-clamp-2 pr-10">
          "{entry.mood.description}"
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        {entry.sport?.active && (
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            <Dumbbell size={12} className="text-brand" />
            <span className="text-[10px] font-bold uppercase tracking-tight">{entry.sport.duration}min</span>
          </div>
        )}
        {entry.reading?.active && (
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            <Book size={12} className="text-blue-400" />
            <span className="text-[10px] font-bold uppercase tracking-tight">
              {entry.reading.duration}min {entry.reading.bookTitle && `- ${entry.reading.bookTitle}`}
            </span>
          </div>
        )}
        {entry.meditation?.active && (
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            <Wind size={12} className="text-emerald-400" />
            <span className="text-[10px] font-bold uppercase tracking-tight">{entry.meditation.duration}min</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntryCard;