const TIME_ZONE = "Asia/Karachi";
const PAKISTAN_OFFSET = "+05:00";
const DAY_IN_MS = 24 * 60 * 60 * 1000;

const getPakistanDateParts = (date) => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  return Object.fromEntries(parts.map(({ type, value }) => [type, value]));
};

const formatPakistanDate = (date) => {
  const { year, month, day } = getPakistanDateParts(date);
  return `${year}-${month}-${day}`;
};

// Shift a Pakistan calendar date without relying on the server timezone.
const addPakistanDays = (dateString, days) => {
  const pakistanDate = new Date(`${dateString}T12:00:00${PAKISTAN_OFFSET}`);

  pakistanDate.setTime(pakistanDate.getTime() + days * DAY_IN_MS);

  return formatPakistanDate(pakistanDate);
};

const getLastCompletedWeekRange = () => {
  // Get today's date according to Pakistan Standard Time.
  const today = formatPakistanDate(new Date());

  // Determine the weekday in Pakistan.
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
  }).format(new Date(`${today}T12:00:00${PAKISTAN_OFFSET}`));

  const weekdayNumbers = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  // Find the Sunday of the current Pakistan calendar week.
  const currentSunday = addPakistanDays(today, -weekdayNumbers[weekday]);

  // Previous completed week: Sunday through Saturday.
  const startDate = addPakistanDays(currentSunday, -7);
  const endDate = addPakistanDays(currentSunday, -1);

  return {
    startDate,
    endDate,
    timeZone: TIME_ZONE,
  };
};

module.exports = {
  getLastCompletedWeekRange,
  addPakistanDays,
};
