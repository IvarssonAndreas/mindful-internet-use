// tiny wrapper with default env vars
module.exports = {
  SENTRY_DSN:
    process.env.NODE_ENV === 'test'
      ? null
      : 'https://9a27b97746524679ada5a913643851a4@o1024467.ingest.sentry.io/6319645',
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
}
