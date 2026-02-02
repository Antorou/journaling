const Input = ({ label, icon: Icon, className, ...props }) => (
  <div className="w-full">
    {label && <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-2 ml-1">{label}</label>}
    <div className="relative group">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-brand transition-colors" />}
      <input 
        className={`w-full bg-surface border border-white/5 rounded-2xl p-4 ${Icon ? 'pl-12' : ''} outline-none focus:border-brand/50 focus:bg-surface/80 transition-all text-white placeholder:text-white/10 ${className}`}
        {...props}
      />
    </div>
  </div>
);

export default Input;