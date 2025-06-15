import * as React from 'react';

interface EmailTemplateProps {
    fathername?: string;
    mothername?: string;
    studentname?: string;
    registrationDate?: string;
}

export const EmailTemplatePhase4Accept: React.FC<Readonly<EmailTemplateProps>> = ({
    fathername, mothername, studentname, registrationDate
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>
    <h2>Great News from SIRAJ Al-Alusi!</h2>
    <p>
       Greetings <strong>Mr. {fathername}</strong> and <strong>Mrs. {mothername}</strong>. We are pleased to inform you that <strong>{studentname}</strong> has passed the test and interview! 🎉
    </p>
    <p>
      The school registration is scheduled on <strong>{registrationDate}</strong> at <strong>9AM</strong>. Further instructions will be provided soon.
    </p>
    <p>
      Welcome to the SIRAJ Al-Alusi!
    </p>
  </div>
);
