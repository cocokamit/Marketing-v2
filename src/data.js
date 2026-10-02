export const CHANNELS = [
  { id: 'social', label: 'Social', color: '#4a6fa5' },
  { id: 'email', label: 'Email', color: '#6b9080' },
  { id: 'search', label: 'Search', color: '#c8744a' },
  { id: 'video', label: 'Video', color: '#8d7cb8' },
  { id: 'events', label: 'Events', color: '#c9a24a' },
]

export const STATUSES = ['Active', 'Scheduled', 'Paused', 'Completed']

export const seedCampaigns = [
  { id: 'c1', name: 'Autumn Drop ’26', channel: 'social', status: 'Active', budget: 42000, spent: 27300, leads: 1840, roi: 3.4, owner: 'AM', end: '2026-10-28' },
  { id: 'c2', name: 'Weekly Digest Revamp', channel: 'email', status: 'Active', budget: 8000, spent: 5200, leads: 960, roi: 5.1, owner: 'JK', end: '2026-11-15' },
  { id: 'c3', name: 'Brand Search Boost', channel: 'search', status: 'Paused', budget: 25000, spent: 18750, leads: 1210, roi: 2.2, owner: 'RS', end: '2026-10-20' },
  { id: 'c4', name: 'Founder Story Series', channel: 'video', status: 'Scheduled', budget: 36000, spent: 0, leads: 0, roi: 0, owner: 'LP', end: '2026-12-10' },
  { id: 'c5', name: 'Web Summit Booth', channel: 'events', status: 'Scheduled', budget: 60000, spent: 12000, leads: 0, roi: 0, owner: 'AM', end: '2026-11-04' },
  { id: 'c6', name: 'Summer Retargeting', channel: 'social', status: 'Completed', budget: 18000, spent: 17880, leads: 2290, roi: 4.6, owner: 'JK', end: '2026-08-31' },
]

export const kpis = [
  { label: 'Revenue attributed', value: 1284000, prefix: '$', delta: 18.2, spark: [12, 18, 15, 22, 26, 24, 31, 35, 33, 41, 46, 52] },
  { label: 'Qualified leads', value: 8432, delta: 9.6, spark: [30, 28, 34, 33, 38, 41, 39, 44, 47, 46, 51, 55] },
  { label: 'Blended CAC', value: 64, prefix: '$', delta: -7.4, spark: [80, 78, 79, 75, 74, 72, 73, 70, 68, 67, 66, 64], invert: true },
  { label: 'Engagement rate', value: 6.8, suffix: '%', decimals: 1, delta: 2.1, spark: [4, 4.2, 4.8, 5, 4.9, 5.4, 5.6, 6, 5.9, 6.3, 6.5, 6.8] },
]

export const channelPerf = [
  { id: 'social', reach: 92, conv: 3.8, share: 34 },
  { id: 'email', reach: 64, conv: 6.2, share: 22 },
  { id: 'search', reach: 78, conv: 4.9, share: 24 },
  { id: 'video', reach: 55, conv: 2.7, share: 12 },
  { id: 'events', reach: 31, conv: 8.1, share: 8 },
]

export const funnel = [
  { stage: 'Awareness', value: '2.4M', note: 'Impressions across 5 channels', pct: 100 },
  { stage: 'Interest', value: '186K', note: 'Clicks, saves & site visits', pct: 62 },
  { stage: 'Consideration', value: '24.8K', note: 'Demo views & pricing page', pct: 38 },
  { stage: 'Intent', value: '8.4K', note: 'Marketing qualified leads', pct: 21 },
  { stage: 'Conversion', value: '1.9K', note: 'Closed-won customers', pct: 9 },
]

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export const seedPosts = [
  { id: 'p1', day: 'Mon', title: 'Carousel: 5 myths', channel: 'social', time: '09:00' },
  { id: 'p2', day: 'Tue', title: 'Newsletter #142', channel: 'email', time: '07:30' },
  { id: 'p3', day: 'Tue', title: 'Reel teaser', channel: 'video', time: '18:00' },
  { id: 'p4', day: 'Wed', title: 'Blog: Q4 trends', channel: 'search', time: '11:00' },
  { id: 'p5', day: 'Thu', title: 'Live AMA', channel: 'events', time: '16:00' },
  { id: 'p6', day: 'Fri', title: 'UGC roundup', channel: 'social', time: '12:00' },
  { id: 'p7', day: 'Sat', title: 'Behind the scenes', channel: 'video', time: '10:00' },
]

export const team = [
  { name: 'Amara Mensah', role: 'Head of Growth', initials: 'AM', hue: 72, tasks: 12 },
  { name: 'Jun Kim', role: 'Lifecycle Lead', initials: 'JK', hue: 250, tasks: 8 },
  { name: 'Rafael Silva', role: 'Paid Media', initials: 'RS', hue: 12, tasks: 15 },
  { name: 'Lena Petrova', role: 'Content & Video', initials: 'LP', hue: 190, tasks: 9 },
]

export const channelById = (id) => CHANNELS.find((c) => c.id === id) ?? CHANNELS[0]
