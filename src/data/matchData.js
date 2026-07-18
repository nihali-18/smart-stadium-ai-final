export const getSharedMatchData = (t) => ({
  homeTeam: t('teamArgentina', '🇦🇷 Argentina'),
  awayTeam: t('teamFrance', '🇫🇷 France'),
  matchDate: '15 July 2026',
  matchTime: '19:00',
  venue: t('stadiumName', 'Smart Stadium'),
  status: t('matchStatusLive', 'Live'),
  
  score: '3 - 2',
  liveTime: "108'",
  timeline: [
    { time: "23'", event: t('eventGoal', 'Goal'), team: t('teamArgentina', '🇦🇷 Argentina'), type: 'goal' },
    { time: "36'", event: t('eventGoal', 'Goal'), team: t('teamArgentina', '🇦🇷 Argentina'), type: 'goal' },
    { time: "80'", event: t('eventGoal', 'Goal'), team: t('teamFrance', '🇫🇷 France'), type: 'goal' },
    { time: "81'", event: t('eventGoal', 'Goal'), team: t('teamFrance', '🇫🇷 France'), type: 'goal' },
    { time: "108'", event: t('eventGoal', 'Goal'), team: t('teamArgentina', '🇦🇷 Argentina'), type: 'goal' }
  ],
  stats: {
    possession: { home: 54, away: 46, label: t('statPossession', 'Possession') },
    shots: { home: 20, away: 14, label: t('statShots', 'Shots') },
    shotsOnTarget: { home: 10, away: 5, label: t('statShotsOnTarget', 'Shots On Target') },
    corners: { home: 6, away: 4, label: t('statCorners', 'Corners') },
    fouls: { home: 15, away: 18, label: t('statFouls', 'Fouls') }
  },
  upcomingMatches: [
    { day: t('dayFriday', 'Friday'), match: t('matchBrazilJapan', '🇧🇷 Brazil vs 🇯🇵 Japan'), time: '7:30 PM' },
    { day: t('daySaturday', 'Saturday'), match: t('matchSpainEngland', '🇪🇸 Spain vs 🏴󠁧󠁢󠁥󠁮󠁧󠁿 England'), time: '8:00 PM' }
  ],
  fanInfo: {
    gateOpens: t('gateOpensAt', 'Gate opens at 5:30 PM'),
    weather: t('weatherClear', 'Weather inside stadium: Clear, 28°C'),
    expectedAttendance: t('expectedAttendance', 'Expected attendance: 24,500'),
    parkingAvailability: t('parkingLow', 'Parking availability: Low')
  }
});
