// Utility functions to compute earnings from orders
export const getMonthlyEarnings = (orders = [], year = null) => {
  const months = new Array(12).fill(0);
  orders.forEach(o => {
    try {
      const d = new Date(o.createdAt);
      if (isNaN(d)) return;
      if (year !== null && d.getFullYear() !== Number(year)) return; // filter by year when provided
      const m = d.getMonth();
      months[m] += Number(o.total || 0);
    } catch (e) {
      // ignore malformed dates
    }
  });
  return months.map(v => Math.round(v * 100) / 100);
};

export const getEarningsBetween = (orders = [], fromISO, toISO) => {
  try {
    // Parse YYYY-MM-DD inputs as local dates to avoid TZ shifts
    const parseInputDate = (s, endOfDay = false) => {
      if (!s) return null;
      const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (m) {
        const y = Number(m[1]);
        const mo = Number(m[2]) - 1;
        const d = Number(m[3]);
        if (endOfDay) return new Date(y, mo, d, 23, 59, 59, 999);
        return new Date(y, mo, d, 0, 0, 0, 0);
      }
      const dt = new Date(s);
      if (isNaN(dt)) return null;
      if (endOfDay) dt.setHours(23,59,59,999);
      else dt.setHours(0,0,0,0);
      return dt;
    };

    const from = parseInputDate(fromISO, false);
    const to = parseInputDate(toISO, true);
    if (!from || !to) return { total: 0, count: 0, orders: [] };

    const fromTs = from.getTime();
    const toTs = to.getTime();

    const filtered = orders.filter(o => {
      const d = new Date(o.createdAt);
      if (isNaN(d)) return false;
      const ts = d.getTime();
      return ts >= fromTs && ts <= toTs;
    });
    const total = filtered.reduce((s, o) => s + (Number(o.total) || 0), 0);
    return { total: Math.round(total * 100) / 100, count: filtered.length, orders: filtered };
  } catch (e) {
    return { total: 0, count: 0, orders: [] };
  }
};

export const combineOrdersWithUsers = (orders = [], users = []) => {
  // Create a shallow copy of orders
  const combined = [...orders];
  // Helper: try to find a matching user id for an order
  const findMatchingUserId = (order) => {
    if (!order) return null;
    const candidate = order.userId || '';
    // direct id match
    let user = users.find(u => String(u.id) === String(candidate));
    if (user) return String(user.id);

    // common prefixes like 'user-<id>' or 'user<id>'
    const m = ('' + candidate).match(/(?:user[-_]?)?(\d+)$/i);
    if (m) {
      user = users.find(u => String(u.id) === m[1]);
      if (user) return String(user.id);
    }

    // match by email if shippingAddress provided
    const email = order.shippingAddress && order.shippingAddress.email;
    if (email) {
      user = users.find(u => u.email && u.email.toLowerCase() === String(email).toLowerCase());
      if (user) return String(user.id);
    }

    // match by shipping full name
    const fullName = order.shippingAddress && order.shippingAddress.fullName;
    if (fullName) {
      const normFull = String(fullName).trim().toLowerCase();
      user = users.find(u => u.fullName && String(u.fullName).trim().toLowerCase() === normFull);
      if (user) return String(user.id);
    }

    // match by nickname inclusion in userId or shipping name
    if (candidate && candidate.toString().length > 0) {
      const candLower = String(candidate).toLowerCase();
      user = users.find(u => u.nickname && candLower.includes(String(u.nickname).toLowerCase()));
      if (user) return String(user.id);
    }

    // no matched user
    return null;
  };

  // Map userId -> sum of orders total for that user (matched)
  const sums = {};
  orders.forEach(o => {
    const matched = findMatchingUserId(o);
    const key = matched || (o.userId ? String(o.userId) : 'unknown');
    sums[key] = (sums[key] || 0) + (Number(o.total) || 0);
  });

  users.forEach(u => {
    const userId = String(u.id);
    const userTotal = Number(u.totalSpent || 0) || 0;
    const accounted = sums[userId] || 0;
    const diff = Math.round((userTotal - accounted) * 100) / 100;
    // only create synthetic when there's a meaningful positive diff
    if (diff > 0.009) {
      const dateStr = u.registrationDate || u.lastLogin || new Date().toISOString().split('T')[0];
      const createdAt = (() => {
        const d = new Date(dateStr);
        return isNaN(d) ? new Date().toISOString() : d.toISOString();
      })();
      const synthetic = {
        id: `SYN-${userId}-${Math.random().toString(36).slice(2,9)}`,
        userId: userId,
        items: [],
        subtotal: diff,
        shippingCost: 0,
        total: diff,
        shippingAddress: {},
        paymentMethod: {},
        statusHistory: [],
        currentStatus: 'confirmed',
        createdAt: createdAt,
        synthetic: true
      };
      combined.push(synthetic);
    }
  });

  return combined;
};