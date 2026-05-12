import Navbar from '../components/Layout/Navbar';
import { TransactionList } from '../components/Transactions';

const Transactions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <Navbar currentPage="transactions" />

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <TransactionList />
      </main>
    </div>
  );
};

export default Transactions;