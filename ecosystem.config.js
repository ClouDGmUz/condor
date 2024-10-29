module.exports = {
  apps: [{
    name: 'condor',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      DATABASE_URL: 'postgresql://root:user@localhost:5432/condor_db'  // Add your actual DATABASE_URL
    }
  }]
} 