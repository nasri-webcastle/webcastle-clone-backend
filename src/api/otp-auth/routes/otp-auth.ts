module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/otp-auth/generate-otp',
      handler: 'otp-auth.generateOtp',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },

    {
      method: 'POST', // ✅ Allow POST requests
      path: '/otp-auth/reset-password',
      handler: 'otp-auth.resetPasswordWithOtp',
      config: {
        auth: false, // or true if login required
      },
    },
  ],
};
