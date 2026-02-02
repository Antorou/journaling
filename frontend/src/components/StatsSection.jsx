import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TrendingUp, Trophy, Calendar } from 'lucide-react';

const StatsSection = ({ refreshSignal }) => {
  const { authenticatedFetch } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await authenticatedFetch('/entries/stats');
        setStats(data.data); 
      } catch (err) {
        console.error("Erreur stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [refreshSignal]);

  if (loading || !stats) return null;

  return (
    <section className="grid grid-cols-2 gap-4">
      <div className="col-span-2 bg-brand/10 border border-brand/20 p-6 rounded-3xl flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand mb-1">Bonne Humeur</p>
          <p className="text-4xl font-black">{Math.round(stats.goodMoodPercentage || 0)}%</p>
        </div>
        <div className="w-16 h-16 bg-brand rounded-2xl flex items-center justify-center shadow-lg shadow-brand/20">
          <TrendingUp size={32} className="text-white" />
        </div>
      </div>

      <div className="bg-surface border border-white/5 p-5 rounded-3xl">
        <Trophy size={20} className="text-yellow-500 mb-3" />
        <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Sport Total</p>
        <p className="text-xl font-bold">{stats.totalSportMinutes || 0} <span className="text-[10px] opacity-50">min</span></p>
      </div>

      <div className="bg-surface border border-white/5 p-5 rounded-3xl">
        <Calendar size={20} className="text-emerald-500 mb-3" />
        <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Sans Alcool</p>
        <p className="text-xl font-bold">{stats.alcoholFreeDays || 0} <span className="text-[10px] opacity-50">jours</span></p>
      </div>
    </section>
  );
};

export default StatsSection;