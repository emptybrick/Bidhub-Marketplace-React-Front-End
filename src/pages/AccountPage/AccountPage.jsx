// account page will have account details that are edittable from this page and
// wallet with ability to add funds
// re-useable components:

import { useAuth } from "../../state/AuthContext.jsx";

const AccountPage = () => {
  const { user } = useAuth();
  // need to limit access to userId = logged in user
  return <h1>User Account Page</h1>;
};

export default AccountPage;

// ================================================================
// WALLET CODE UNUSED FOR NOW

// import { useEffect, useState } from "react";
// import api from "../lib/api.js";

// export default function WalletPage(){
//   const [wallet, setWallet] = useState(null);
//   const [amount, setAmount] = useState("");
//   const [txs, setTxs] = useState([]);
//   const {user} = useContect()

//   async function load(){
//     const { data } = await api.get(`${user.Id}/wallet/`);
//     setWallet(data);
//     const t = await api.get(`${user.Id}/wallet/transactions/`);
//     setTxs(t.data);
//   }

//   useEffect(()=>{ load(); },[]);

//   async function topUp(){
//     if (!amount) return;
//     await api.post(`/wallet/top-up/`, { amount });
//     setAmount("");
//     await load();
//   }

//   if (!wallet) return <p>Loading…</p>;
//   return (
//     <div className="container">
//       <h2>Wallet</h2>
//       <div className="card">
//         <p><strong>Balance:</strong> ${wallet.balance}</p>
//         <input type="number" step="0.01" placeholder="Top-up amount" value={amount} onChange={(e)=>setAmount(e.target.value)} />
//         <button onClick={topUp}>Top Up</button>
//       </div>
//       <div className="card">
//         <h3>Transactions</h3>
//         <ul>
//           {txs.map(tx=> (
//             <li key={tx.id}>{tx.type} ${tx.amount} — {tx.reference} — {new Date(tx.created_at).toLocaleString()}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
