import { X, Calendar, Smile, Meh, Frown, Dumbbell, Book, Wine, Wind, Clock } from 'lucide-react';

const EntryDetailModal = ({ entry, onClose }) => {
  if (!entry) return null;

  const dateStr = new Date(entry.date).toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  const moodConfig = {
    good: { icon: Smile, color: 'text-emerald-400', label: 'Excellente journée' },
    ok: { icon: Meh, color: 'text-yellow-400', label: 'Journée correcte' },
    bad: { icon: Frown, color: 'text-red-400', label: 'Journée difficile' }
  };

  const { icon: MoodIcon, color: moodColor, label: moodLabel } = moodConfig[entry.mood.status];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Overlay sombre avec flou */}
      <div className="absolute inset-0 bg-bg-dark/80 backdrop-blur-sm" onClick={onClose} />

      {/* Contenu du Modal */}
      <div className="relative w-full max-w-lg bg-surface border-t sm:border border-white/10 rounded-t-[2.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
        
        {/* Header du Modal */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-3 text-white/40">
            <Calendar size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">{dateStr}</span>
          </div>
          <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          {/* Section Mood */}
          <div className="text-center space-y-4">
            <div className="inline-flex p-5 rounded-full bg-white/5">
              <MoodIcon size={48} className={moodColor} />
            </div>
            <h2 className="text-2xl font-black">{moodLabel}</h2>
            {entry.mood.description && (
              <p className="text-lg text-white/60 italic leading-relaxed px-4">
                "{entry.mood.description}"
              </p>
            )}
          </div>

          {/* Section Activités (Grille) */}
          <div className="grid grid-cols-1 gap-4">
            {entry.sport?.active && (
              <DetailItem icon={Dumbbell} title="Sport" color="text-brand">
                <span className="font-bold text-white">{entry.sport.duration} minutes</span>
                <span className="text-white/40 ml-2">• {entry.sport.activityType}</span>
              </DetailItem>
            )}

            {entry.reading?.active && (
              <DetailItem icon={Book} title="Lecture" color="text-blue-400">
                <span className="font-bold text-white">{entry.reading.duration} minutes</span>
              </DetailItem>
            )}

            <DetailItem 
              icon={Wine} 
              title="Alcool" 
              color={entry.alcohol ? "text-red-500" : "text-emerald-500"}
            >
              <span className="font-bold text-white">
                {entry.alcohol ? "Consommation enregistrée" : "Aucune consommation"}
              </span>
            </DetailItem>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon: Icon, title, color, children }) => (
  <div className="flex items-center gap-4 p-5 bg-bg-dark/50 rounded-3xl border border-white/5">
    <div className={`p-3 rounded-2xl bg-white/5 ${color}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-1">{title}</p>
      <div className="text-sm">{children}</div>
    </div>
  </div>
);

export default EntryDetailModal;