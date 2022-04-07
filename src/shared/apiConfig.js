const apiConfig = {
  currentEnv: 'dev',
  prod: '/api',
  staging: '',
  dev: '/api',
  endPoint: '/',
  api: '',
  app: '',


  signUp: { url: '/signup', method: 'post' },
  authenticate: { url: '/authenticate', method: 'post' },
  withdrawal : {url: '/withdrawal', method: 'post' },
  getRecharge : {url: '/recharge', method: 'get' },
  getWithdrawal : {url: '/withdrawal', method: 'get' },
  wallet: {url: '/wallet', method: 'get' },
  profile:{url: '/profile', method: 'post' },
  changePassword:{url: '/change-password', method: 'post' },
  getBonus:{url: '/bonus', method: 'get' },
  postFeedback:{url: '/feedback', method: 'post' },
  sitRakes:{url: '/uploads/configs/sitRakes.json', method: 'get' },
  cashRakes:{url: '/uploads/configs/cashRakes.json', method: 'get' }
  
};

export default apiConfig;
