const Button = ({ children, variant = 'primary', loading, className, ...props }) => {
  const baseStyles = "relative flex items-center justify-center px-6 py-4 rounded-2xl font-bold transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100";
  
  const variants = {
    primary: "bg-brand text-white shadow-lg shadow-brand/20 hover:bg-brand/90",
    secondary: "bg-surface text-white border border-white/10 hover:bg-white/5",
    ghost: "bg-transparent text-white/50 hover:text-white hover:bg-white/5"
  };

  return (
    <button 
      disabled={loading} 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : children}
    </button>
  );
};

export default Button;