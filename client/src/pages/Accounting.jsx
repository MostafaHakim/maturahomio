import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  createTransaction,
  deleteTransaction,
} from "../store/slice/accountingSlice";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useMemo } from "react";

const Accounting = () => {
  const dispatch = useDispatch();
  const { transactions, isLoading, isError } = useSelector(
    (state) => state.accounting
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      type: "income",
    },
  });

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);
    return {
      totalIncome: income,
      totalExpenses: expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  const onSubmit = async (data) => {
    try {
      await dispatch(createTransaction(data)).unwrap();
      toast.success("Transaction added successfully!");
      reset({
        date: new Date().toISOString().split("T")[0],
        description: "",
        amount: "",
        type: data.type,
      });
    } catch (error) {
      toast.error(`Failed to add transaction: ${error}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await dispatch(deleteTransaction(id)).unwrap();
        toast.success("Transaction deleted successfully!");
      } catch (error) {
        toast.error(`Failed to delete transaction: ${error}`);
      }
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-50 min-h-screen">
      <ToastContainer position="bottom-right" autoClose={3000} />
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
        Accounting
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-green-100 p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold text-green-800">Total Income</h3>
          <p className="text-2xl font-bold text-green-600">
            ৳{totalIncome.toFixed(2)}
          </p>
        </div>
        <div className="bg-red-100 p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold text-red-800">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-600">
            ৳{totalExpenses.toFixed(2)}
          </p>
        </div>
        <div className="bg-sky-100 p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold text-sky-800">Net Balance</h3>
          <p className="text-2xl font-bold text-sky-600">
            ৳{balance.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaction List */}
        <div className="lg:col-span-2 bg-white shadow-lg rounded-2xl p-4 sm:p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Recent Transactions
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((t) => (
                  <tr key={t._id}>
                    <td className="px-6 py-4 text-sm">
                      {new Date(t.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">{t.description}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          t.type === "income"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {t.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-semibold">
                      ৳{t.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(t._id)}>
                        <FiTrash2 className="text-red-500 hover:text-red-700" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Transaction Form */}
        <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FiPlus /> Add Transaction
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="date"
              {...register("date", { required: true })}
              className="input w-full"
            />
            <input
              {...register("description", { required: true })}
              className="input w-full"
              placeholder="Description"
            />
            <input
              type="number"
              step="0.01"
              {...register("amount", { required: true, valueAsNumber: true })}
              className="input w-full"
              placeholder="Amount"
            />
            <select {...register("type")} className="input w-full">
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full button-primary"
            >
              Save Transaction
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Accounting;
