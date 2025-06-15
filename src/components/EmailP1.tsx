import * as React from 'react';

interface EmailTemplateProps {
    fathername?: string;
    mothername?: string;
}

export const EmailTemplatePhase1: React.FC<Readonly<EmailTemplateProps>> = ({
    fathername, mothername
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>
    <h2>Greetings from SIRAJ Al-Alusi</h2>
    <p>
      Dear <strong>Mr. {fathername}</strong> and <strong>Mrs. {mothername}</strong>. Thank you for submitting your application. We are pleased to inform you that your application has been received successfully.
    </p>
    <p>
      Our team will review it thoroughly, and you will be notified once the application is accepted or rejected.
    </p>
    <p>
      We appreciate your interest in SIRAJ Al-Alusi and thank you for your patience.
    </p>
  </div>
);
