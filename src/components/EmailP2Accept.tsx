import * as React from 'react';

interface EmailTemplateProps {
    fathername?: string;
    mothername?: string;
    studentname?: string;
}

export const EmailTemplatePhase2Accept: React.FC<Readonly<EmailTemplateProps>> = ({
    fathername, mothername, studentname
}) => (
   <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>
    <h2>Congratulations from SIRAJ Al-Alusi!</h2>
    <p>
      Dear <strong>Mr. {fathername}</strong> and <strong>Mrs. {mothername}</strong>. We are delighted to inform you that your application for student <strong>{studentname}</strong> has been accepted. 🎉
    </p>
    <p>
      The next step is the school test and interview session. We will notify you shortly regarding the date and time.
    </p>
    <p>
      Thank you for choosing SIRAJ Al-Alusi as your educational partner.
    </p>
  </div>
);
