import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, onSnapshot, Timestamp, getDocs } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import { db, auth } from '../lib/firebase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { format, subDays, startOfDay, isAfter, parseISO } from 'date-fns';
import { Users, Image as ImageIcon, Activity, ShieldAlert, LogIn, ExternalLink, RefreshCw } from 'lucide-react';

// SECURE ADMIN EMAIL (Only this email gets access)
const ADMIN_EMAIL = 'dogarhusnian3@gmail.com';

interface Visit {
  id: string;
  timestamp: any;
  ip: string;
  path: string;
  userAgent: string;
}

interface Removal {
  id: string;
  timestamp: any;
  ip: string;
  fileName: string;
  fileSize: number;
}

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [removals, setRemovals] = useState<Removal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u?.email === ADMIN_EMAIL) {
        subscribeToData();
      } else {
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  const subscribeToData = () => {
    setLoading(true);
    const vQuery = query(collection(db, 'visits'), orderBy('timestamp', 'desc'), limit(1000));
    const rQuery = query(collection(db, 'removals'), orderBy('timestamp', 'desc'), limit(1000));

    const vUnsub = onSnapshot(vQuery, (snap) => {
      setVisits(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Visit)));
    });

    const rUnsub = onSnapshot(rQuery, (snap) => {
      setRemovals(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Removal)));
      setLoading(false);
    });

    return () => { vUnsub(); rUnsub(); };
  };

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center bg-[#F5F5F7] px-6">
        <div className="max-w-md w-full bg-white rounded-[32px] p-10 shadow-xl border border-[#D2D2D7] text-center space-y-8">
          <div className="w-16 h-16 bg-[#0066CC] rounded-2xl flex items-center justify-center text-white mx-auto">
            <ShieldAlert size={32} />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Admin Restricted Area</h1>
            <p className="text-[#86868B]">This portal is only accessible to authorized developers.</p>
          </div>
          <button 
            onClick={login}
            className="w-full flex items-center justify-center gap-3 py-4 bg-black text-white rounded-2xl font-bold hover:bg-gray-900 transition-all"
          >
            <LogIn size={20} />
            Sign in as Admin
          </button>
        </div>
      </div>
    );
  }

  // --- Data aggregation ---
  const today = startOfDay(new Date());
  const dailyVisits = visits.filter(v => v.timestamp?.toDate() > today).length;
  const totalVisits = visits.length;
  const totalRemovals = removals.length;
  const liveUsers = Array.from(new Set(visits.filter(v => v.timestamp?.toDate() > subDays(new Date(), 1 / 24)).map(v => v.ip))).length;

  // Chart data (last 7 days)
  const chartData = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), i);
    const dayStr = format(date, 'MMM dd');
    const dayStart = startOfDay(date);
    const dayEnd = new Date(dayStart.getTime() + 86400000);
    
    return {
      name: dayStr,
      visits: visits.filter(v => {
        const t = v.timestamp?.toDate();
        return t >= dayStart && t < dayEnd;
      }).length,
      creations: removals.filter(r => {
        const t = r.timestamp?.toDate();
        return t >= dayStart && t < dayEnd;
      }).length
    };
  }).reverse();

  // IP Breakdown
  const ipStats = removals.reduce((acc: any, r) => {
    acc[r.ip] = (acc[r.ip] || 0) + 1;
    return acc;
  }, {});
  const topIPs = Object.entries(ipStats)
    .sort(([, a]: any, [, b]: any) => b - a)
    .slice(0, 10);

  return (
    <div className="pt-24 min-h-screen bg-[#F5F5F7] pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Business Intelligence</h1>
            <p className="text-[#86868B] font-medium">Monitoring ClearCut Ecosystem Performance</p>
          </div>
          <div className="flex gap-4">
             <button onClick={() => window.location.reload()} className="p-3 bg-white border border-[#D2D2D7] rounded-xl hover:bg-gray-50 flex items-center gap-2 text-sm font-bold">
               <RefreshCw size={16} /> Refresh
             </button>
             <button onClick={() => auth.signOut()} className="p-3 bg-white border border-[#D2D2D7] rounded-xl hover:bg-gray-50 text-sm font-bold">Logout</button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<Users className="text-[#0066CC]" />} label="Today's Visitors" value={dailyVisits} />
          <StatCard icon={<Activity className="text-[#34C759]" />} label="Live Sessions (1h)" value={liveUsers} />
          <StatCard icon={<ImageIcon className="text-[#AF52DE]" />} label="Total Extractions" value={totalRemovals} />
          <StatCard icon={<ExternalLink className="text-[#FF9500]" />} label="Traffic (Stored)" value={totalVisits} />
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[32px] border border-[#D2D2D7] shadow-sm space-y-6">
            <h3 className="text-lg font-bold">Visitor vs Removal Volume</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F5F7" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#86868B' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#86868B' }} />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                  <Line type="monotone" dataKey="visits" stroke="#0066CC" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="creations" stroke="#34C759" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-[#D2D2D7] shadow-sm space-y-6">
            <h3 className="text-lg font-bold">Top Extraction Sources (by IP)</h3>
            <div className="space-y-4">
              {topIPs.map(([ip, count]: any) => (
                <div key={ip} className="flex items-center justify-between p-4 bg-[#F5F5F7] rounded-2xl">
                  <span className="font-mono text-sm font-semibold">{ip}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#86868B] uppercase tracking-widest leading-none">Removals</span>
                    <span className="text-lg font-bold">{count}</span>
                  </div>
                </div>
              ))}
              {topIPs.length === 0 && <p className="text-center py-12 text-[#86868B]">No removal events recorded yet.</p>}
            </div>
          </div>
        </div>

        {/* Recent Events Table */}
        <div className="bg-white rounded-[32px] border border-[#D2D2D7] shadow-sm overflow-hidden">
          <div className="p-8 border-b border-[#F5F5F7]">
            <h3 className="text-lg font-bold">Live Removal Stream</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#F5F5F7] text-xs font-bold text-[#86868B] uppercase tracking-wider">
                <tr>
                  <th className="px-8 py-4">Timestamp</th>
                  <th className="px-8 py-4">IP Address</th>
                  <th className="px-8 py-4">File Name</th>
                  <th className="px-8 py-4">Size</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F5F7]">
                {removals.slice(0, 10).map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-5 text-sm">{format(r.timestamp?.toDate() || new Date(), 'HH:mm:ss MMM dd')}</td>
                    <td className="px-8 py-5 text-sm font-mono">{r.ip}</td>
                    <td className="px-8 py-5 text-sm font-medium">{r.fileName}</td>
                    <td className="px-8 py-5 text-sm">{(r.fileSize / 1024 / 1024).toFixed(2)} MB</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: number | string }) {
  return (
    <div className="bg-white p-8 rounded-[32px] border border-[#D2D2D7] shadow-sm space-y-4">
      <div className="w-12 h-12 bg-[#F5F5F7] rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-[#86868B] uppercase tracking-[0.1em]">{label}</p>
        <p className="text-3xl font-bold tracking-tight">{value}</p>
      </div>
    </div>
  );
}
