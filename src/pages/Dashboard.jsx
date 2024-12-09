import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { donorService } from '../services/donorService';
import { beneficiaryService } from '../services/beneficiaryService';

function Dashboard() {
  const [stats, setStats] = useState({
    totalDonors: 0,
    activeDonors: 0,
    totalBeneficiaries: 0,
    urgentBeneficiaries: 0
  });
  const [recentDonors, setRecentDonors] = useState([]);
  const [urgentBeneficiaries, setUrgentBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [donors, beneficiaries] = await Promise.all([
        donorService.getAllDonors(),
        beneficiaryService.getAllBeneficiaries()
      ]);

      setStats({
        totalDonors: donors.length,
        activeDonors: donors.filter(d => d.status === 'active').length,
        totalBeneficiaries: beneficiaries.length,
        urgentBeneficiaries: beneficiaries.filter(b => b.status === 'urgent').length
      });

      setRecentDonors(donors.slice(0, 5));
      setUrgentBeneficiaries(
        beneficiaries.filter(b => b.status === 'urgent').slice(0, 5)
      );
    } catch (err) {
      setError('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Tableau de Bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Donateurs"
          value={stats.totalDonors}
          link="/donors"
        />
        <StatCard
          title="Donateurs Actifs"
          value={stats.activeDonors}
          link="/donors"
        />
        <StatCard
          title="Total Bénéficiaires"
          value={stats.totalBeneficiaries}
          link="/beneficiaries"
        />
        <StatCard
          title="Cas Urgents"
          value={stats.urgentBeneficiaries}
          link="/beneficiaries"
          urgent
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Donateurs Récents</h2>
          <div className="space-y-4">
            {recentDonors.map(donor => (
              <Link
                key={donor.id}
                to={`/donors/${donor.id}`}
                className="block p-4 border rounded hover:bg-gray-50"
              >
                <div className="font-medium">{donor.name}</div>
                <div className="text-sm text-gray-500">
                  Type: {donor.donationType}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Cas Urgents</h2>
          <div className="space-y-4">
            {urgentBeneficiaries.map(beneficiary => (
              <Link
                key={beneficiary.id}
                to={`/beneficiaries/${beneficiary.id}`}
                className="block p-4 border rounded hover:bg-gray-50"
              >
                <div className="font-medium">{beneficiary.name}</div>
                <div className="text-sm text-gray-500">
                  Need: {beneficiary.needType}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, link, urgent }) {
  return (
    <Link
      to={link}
      className={`block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow
        ${urgent ? 'border-l-4 border-red-500' : ''}`}
    >
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </Link>
  );
}

export default Dashboard;