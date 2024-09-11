import { createTransport } from "nodemailer";
const sendVerificationEmail = async (email, verify) => {
  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Account Verification",
    html: `<Html lang="en" dir="ltr">
    <Head>
      <title>Verification Code</title>
      <Font
        fontFamily="Roboto"
        fallbackFontFamily="Verdana"
        webFont={{
          url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>
    
    <Section>
      <Row>
        <h2>Hello ,</h2>
      </Row>
      <Row>
        <Text>
          Thank you for registering. Please use the following verification
          code to complete your registration:
        </Text>
      </Row>
      <Row>
        <Text>${verify}</Text>
      </Row>
      <Row>
        <Text>
          If you did not request this code, please ignore this email.
        </Text>
      </Row>
      
    </Section>
  </Html>`,
  };
  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      }
      console.log("Email sent: " + info.response);
    });
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Email not sent" };
  }
};

export default sendVerificationEmail;
