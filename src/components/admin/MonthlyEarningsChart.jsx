import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useOrder } from '../context/OrderContext';
import { useUser } from '../context/UserContext';
import { getMonthlyEarnings, combineOrdersWithUsers } from './earningsUtils';

const MonthlyEarningsChart = () => {
  const canvasRef = useRef(null);

  const { orders } = useOrder();
  const { users } = useUser();

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

  // Combine orders with user-aggregated totals to include historical purchases
  const combined = combineOrdersWithUsers(orders, users);
  const monthly = getMonthlyEarnings(combined, 2025);

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ],
        datasets: [
          {
            label: 'Ganancias ($)',
            data: monthly,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `$${context.raw}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `$${value}`
            }
          }
        }
      }
    });

    return () => {
      chart.destroy();
    };
  }, [orders]);

  return <canvas ref={canvasRef} height={200}></canvas>;
};

export default MonthlyEarningsChart;