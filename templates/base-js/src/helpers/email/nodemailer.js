// Exclusive example to use nodemailer without OAuth2 authentication,
// With gmail its required to allow "less secure apps" at https://myaccount.google.com/lesssecureapps

const nodemailer = require('nodemailer');
// const fs = require('fs');

exports.sendEmailTo = (targetEmail) => {
  const mailAccountUser = process.env.EMAIL;
  const mailAccountPassword = process.env.EMAIL_PASS;
  const fromEmailAddress = mailAccountUser;
  const toEmailAddress = targetEmail;

  const mailSubject = 'Email subject';

  const transport = nodemailer.createTransport({
    service: 'gmail',
    tls: { rejectUnauthorized: false },
    auth: {
      user: mailAccountUser,
      pass: mailAccountPassword,
    },
  });

  // Could load html file with fs.readFileSync and use .replace() on dynamic data
  const mailBody = 'Default email message, which also could be HTML';

  const mail = {
    from: `SENDER <${fromEmailAddress}>`,
    to: toEmailAddress,
    subject: mailSubject,
    html: mailBody,
  };

  // wrapping callback in a promise for proper response
  return new Promise((resolve, reject) => {
    transport.sendMail(mail, (error/* , response */) => {
      transport.close();
      if (error) {
        reject(error);
      }
      resolve(true);
    });
  });
};
