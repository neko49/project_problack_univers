const nodemailer = require('nodemailer');

exports.sendContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Log les données reçues
    console.log('Contact form data:', { name, email, message });

    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'rasfrej23@gmail.com', // Replace with your email
        pass: 'yofi oxeo cuyp wszr', // Replace with your email password
      },
    });

    // Setup email data
    const mailOptions = {
      from: email,
      to: 'rasfrej23@gmail.com', // Replace with your email
      subject: `Contact form submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);

    // Log l'information de l'email envoyé
    console.log('Email sent: ', info);

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    // Log l'erreur complète
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send message', error });
  }
};
