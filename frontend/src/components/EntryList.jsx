import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import EntryCard from './EntryCard';
import { Loader2 } from 'lucide-react';

const EntryList = ({ refreshSignal }) => {
  const { authenticatedFetch } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    try {
      const data = await authenticatedFetch('/entries');
      setEntries(data.data);
    } catch (err) {
      console.error("Erreur lors de la récupération :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [refreshSignal]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-20">
        <Loader2 className="animate-spin" size={32} />
        <p className="text-[10px] font-black uppercase tracking-[0.2em]">Synchronisation</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {entries.length === 0 ? (
        <div className="text-center py-10 bg-surface rounded-3xl border border-white/5">
          <p className="text-white/20 font-bold uppercase text-[10px] tracking-widest">Le journal est vide</p>
        </div>
      ) : (
        entries.map((entry) => (
          <EntryCard key={entry._id} entry={entry} />
        ))
      )}
    </div>
  );
};

export default EntryList;