import React, { useState, useEffect } from 'react';
import { useOrder } from '../context/OrderContext';
import { useUser } from '../context/UserContext';
import { getEarningsBetween, combineOrdersWithUsers } from './earningsUtils';

const formatDateInput = (date) => {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const parseDateOnly = (isoOrInput) => {
  // Ensure we treat dates as local dates with time 00:00
  const d = new Date(isoOrInput);
  d.setHours(0,0,0,0);
  return d;
};

const DateRangeEarnings = () => {
  const { orders } = useOrder();
  const { users } = useUser();
  const today = new Date();
  const todayStr = formatDateInput(today);
  const [from, setFrom] = useState(todayStr);
  const [to, setTo] = useState(todayStr);
  const [result, setResult] = useState({ total: 0, count: 0 });

  const calculateEarnings = (fromStr, toStr) => {
    const combined = combineOrdersWithUsers(orders, users);
    const res = getEarningsBetween(combined, fromStr, toStr);
    setResult({ total: res.total, count: res.count });
  };

  useEffect(() => {
    // Recalculate whenever orders or date inputs change
    calculateEarnings(from, to);
  }, [orders, from, to]);

  return (
    <div>
      <div className="row g-2 align-items-end">
        <div className="col-md-5">
          <label className="form-label">Desde</label>
          <input type="date" className="form-control" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div className="col-md-5">
          <label className="form-label">Hasta</label>
          <input type="date" className="form-control" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
        <div className="col-md-2">
          <button
            className="btn btn-primary w-100"
            onClick={() => calculateEarnings(from, to)}
            style={{height: '38px'}}
          >
            Filtrar
          </button>
        </div>
      </div>

      <div className="mt-3">
        {new Date(from) > new Date(to) ? (
          <div className="alert alert-warning p-2">La fecha "Desde" no puede ser posterior a "Hasta".</div>
        ) : (
          <>
            <h6>Ganancias ({result.count} pedidos):</h6>
            <p className="display-6 fw-bold">${result.total.toFixed(2)}</p>
            <small className="text-muted">Por defecto se muestran las ganancias del día actual.</small>
          </>
        )}
      </div>
    </div>
  );
};

export default DateRangeEarnings;