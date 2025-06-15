import * as React from 'react';

interface EmailTemplateProps {
    fathername?: string;
    mothername?: string;
    studentname?: string;
}

export const EmailTemplatePhase2Reject: React.FC<Readonly<EmailTemplateProps>> = ({
    fathername, mothername, studentname
}) => (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>
    <h2>Thank You for Applying to SIRAJ Al-Alusi.</h2>
    <p>
        Dear <strong>Mr. {fathername}</strong> and <strong>Mrs. {mothername}</strong>. After careful consideration, we regret to inform you that the application for student <strong>{studentname}</strong> was not successful.
    </p>
    <p>
      We understand this may be disappointing, but please know that every application is reviewed thoroughly, and this decision does not reflect your child’s potential or worth.
    </p>
    <p>
      We encourage you to stay positive and continue nurturing your child's growth — there are many paths to success.
    </p>
    <p>
      Thank you once again for your interest in SIRAJ Al-Alusi.
    </p>
  </div>
);
