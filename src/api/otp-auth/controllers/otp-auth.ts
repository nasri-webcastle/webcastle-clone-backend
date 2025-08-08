// // 'use strict';

// // module.exports = {
// //   async generateOtp(ctx) {
// //     const { identifier } = ctx.request.body;

// //     if (!identifier) {
// //       return ctx.badRequest('Identifier is required');
// //     }

// //     const user = await strapi.db.query('plugin::users-permissions.user').findOne({
// //       where: {
// //         $or: [
// //           { email: identifier },
// //           { username: identifier },
// //         ],
// //       },
// //     });

// //     if (!user) {
// //       return ctx.badRequest('User not found');
// //     }

// //     const otp = Math.floor(100000 + Math.random() * 900000).toString();

// //     await strapi.db.query('plugin::users-permissions.user').update({
// //       where: { id: user.id },
// //       data: { otp },
// //     });

// //     return ctx.send({ message: 'OTP generated successfully', otp }); // ⚠️ Send OTP only for testing
// //   },
// // };
// 'use strict';

// module.exports = {
//   // ✅ OTP Generator
//   async generateOtp(ctx) {
//     const { identifier } = ctx.request.body;

//     if (!identifier) {
//       return ctx.badRequest('Identifier is required');
//     }

//     const user = await strapi.db.query('plugin::users-permissions.user').findOne({
//       where: {
//         $or: [{ email: identifier }, { username: identifier }],
//       },
//     });

//     if (!user) {
//       return ctx.badRequest('User not found');
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     await strapi.db.query('plugin::users-permissions.user').update({
//       where: { id: user.id },
//       data: { otp },
//     });

//     return ctx.send({ message: 'OTP generated successfully', otp }); // ⚠️ Remove `otp` in prod
//   },

//   // ✅ OTP-Based Password Reset
//   async resetPasswordWithOtp(ctx) {
//     const { identifier, otp, newPassword } = ctx.request.body;

//     if (!identifier || !otp || !newPassword) {
//       return ctx.badRequest('Missing required fields');
//     }

//     const user = await strapi.db.query('plugin::users-permissions.user').findOne({
//       where: {
//         $or: [{ email: identifier }, { username: identifier }],
//       },
//     });

//     if (!user) {
//       return ctx.badRequest('User not found');
//     }

//     if (user.otp !== otp) {
//       return ctx.badRequest('Invalid OTP');
//     }

//     const hashedPassword = await strapi
//       .plugin('users-permissions')
//       .service('user')
//       .hashPassword({ password: newPassword });

//     await strapi.db.query('plugin::users-permissions.user').update({
//       where: { id: user.id },
//       data: {
//         password: hashedPassword,
//         otp: null, // Clear OTP after use
//       },
//     });

//     return ctx.send({ message: 'Password reset successful' });
//   },
// };
'use strict';

const { hashSync } = require('bcryptjs'); // ✅ Import bcrypt

module.exports = {
  async resetPasswordWithOtp(ctx) {
    const { identifier, otp, newPassword } = ctx.request.body;

    if (!identifier || !otp || !newPassword) {
      return ctx.badRequest('Missing required fields');
    }

    // Find user by email or username
    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: {
        $or: [
          { email: identifier },
          { username: identifier },
        ],
      },
    });

    if (!user) return ctx.badRequest('User not found');

    if (user.otp !== otp) {
      return ctx.badRequest('Invalid OTP');
    }

    // ✅ Hash the new password using bcrypt
    const hashedPassword = hashSync(newPassword, 10);

    // ✅ Update user's password and clear OTP
    await strapi.db.query('plugin::users-permissions.user').update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        otp: null,
      },
    });

    return ctx.send({ message: 'Password reset successfully' });
  },

async generateOtp(ctx) {
    const { identifier } = ctx.request.body;

    if (!identifier) {
      return ctx.badRequest('Identifier is required');
    }

    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: {
        $or: [{ email: identifier }, { username: identifier }],
      },
    });

    if (!user) {
      return ctx.badRequest('User not found');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await strapi.db.query('plugin::users-permissions.user').update({
      where: { id: user.id },
      data: { otp },
    });

    return ctx.send({ message: 'OTP generated successfully', otp }); // ⚠️ Remove `otp` in prod
  },


};
