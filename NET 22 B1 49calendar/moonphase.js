function calculateMoonPhase(year, month, day, hour, minute) {
  // Constants for lunar phase calculation
  const SYNODIC_MONTH = 29.53058868; // Synodic month (average)
  const PHASES = [
    "New Moon",
    "Waxing Crescent",
    "First Quarter",
    "Waxing Gibbous",
    "Full Moon",
    "Waning Gibbous",
    "Last Quarter",
    "Waning Crescent",
  ];

  // Convert the date and time to Julian Day
  const JD =
    367 * year -
    Math.floor((7 * (year + Math.floor((month + 9) / 12))) / 4) +
    Math.floor((275 * month) / 9) +
    day +
    1721013.5 +
    (hour - 5 + minute / 60) / 24.0; // Adjust for Colombo time zone

  // Calculate the number of days since the approximate new moon
  const phaseDays = (JD - 2451550.1) % SYNODIC_MONTH;

  // Calculate the phase index
  const phaseIndex = Math.floor((phaseDays / SYNODIC_MONTH) * 8) % 8;

  // Return the corresponding moon phase
  return PHASES[phaseIndex];
}

function getFullMoonDays(currentYear, currentMonth) {
  let lastDateofMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  let fullmoon_days = [];

  for (let i = 1; i <= lastDateofMonth; i++) {
    const i__moon_phase = calculateMoonPhase(
      currentYear,
      currentMonth + 3,
      i,
      12,
      0
    );
    if (i__moon_phase === "Full Moon") {
      fullmoon_days.push(i);
    }
  }

  return fullmoon_days;
}
