import React, { useState } from 'react';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);

  const calculateTotals = () => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      income,
      expenses,
      savings: income - expenses,
    };
  };

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const totals = calculateTotals();

  return (
    <div className="App">
      <header>
        <h1>Personal Finance Tracker</h1>
      </header>
      <main>
        <section id="overview">
          <h2>overview</h2>
          <p>Total Income: ${totals.income}</p>
          <p>Total Expenses: ${totals.expenses}</p>
          <p>Savings: ${totals.savings}</p>
        </section>
        <section id="add-transaction">
          <h2>Add Transaction</h2>
          <TransactionForm addTransaction={addTransaction} />
        </section>
        <section id="transactions">
          <h2>Transactions</h2>
          <TransactionList
            transactions={transactions}
            deleteTransaction={deleteTransaction}
          />
        </section>
      </main>
    </div>
  );
}

function TransactionForm({ addTransaction }) {
  const [type, setType] = useState('income');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const[date, setDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !amount || !date) {
      alert('Please fill in al fields');
      return;
    }
    const newTransaction = {
      id: Date.now(),
      type,
      category,
      amount: parseFloat(amount),
      date,
    };
    addTransaction(newTransaction);
    setCategory('');
    setAmount('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function TransactionList({ transactions, deleteTransaction }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t) => (
          <tr key={t.id}>
            <td>{t.type}</td>
            <td>{t.category}</td>
            <td>{t.amount}</td>
            <td>{t.date}</td>
            <td>
              <button onClick={() => deleteTransaction(t.id)}>Delete</button>
            </td>
          </tr>
        ))};
      </tbody>
    </table>
  );
}
export default App;
