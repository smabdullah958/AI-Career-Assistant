// Apply the same minimum to totals, percentages, and nested chart data.
const NonNegativeAnalytics = (value) => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? Math.max(0, value) : 0;
  }

  if (Array.isArray(value)) {
    return value.map(NonNegativeAnalytics);
  }

  if (value !== null && typeof value === "object" && !(value instanceof Date)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, NonNegativeAnalytics(item)]),
    );
  }

  return value;
};

module.exports = NonNegativeAnalytics;
