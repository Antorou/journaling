const ControlCard = ({ label, active, onToggle, icon: Icon, children }) => (
  <div className={`p-5 rounded-3xl border transition-all duration-500 ${active ? 'bg-brand/10 border-brand/30' : 'bg-surface border-white/5'}`}>
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl ${active ? 'bg-brand text-white' : 'bg-white/5 text-white/40'}`}>
          <Icon size={20} />
        </div>
        <span className={`font-bold ${active ? 'text-white' : 'text-white/40'}`}>{label}</span>
      </div>
      <button 
        type="button"
        onClick={() => onToggle(!active)}
        className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${active ? 'bg-brand' : 'bg-white/10'}`}
      >
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${active ? 'left-7' : 'left-1'}`} />
      </button>
    </div>
    
    {/* Contenu qui apparaît quand c'est actif (ex: inputs de durée) */}
    {active && (
      <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
        {children}
      </div>
    )}
  </div>
);

export default ControlCard;