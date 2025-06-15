import * as React from 'react';

interface EmailTemplateProps {
    fathername?: string;
    mothername?: string;
    studentname?: string;
}

export const EmailTemplatePhase4Reject: React.FC<Readonly<EmailTemplateProps>> = ({
    fathername, mothername, studentname
}) => (
   <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>
    <h2>Application Result – SIRAJ Al-Alusi</h2>
    <p>
      Greetings <strong>Mr. {fathername}</strong> and <strong>Mrs. {mothername}</strong>. After careful assessment, we regret to inform you that <strong>{studentname}</strong> did not pass the school test.
    </p>
    <p>
      We understand this may be disappointing, but this is not the end of your child's journey. Every child is unique and grows in different ways and timelines.
    </p>
    <p>
      We encourage you to continue supporting and guiding your child. Thank you again for considering SIRAJ Al-Alusi.
    </p>
  </div>
);
