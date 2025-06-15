import * as React from 'react';

interface EmailTemplateProps {
    fathername?: string;
    mothername?: string;
    studentname?: string;
    testDate?: string;
}

export const EmailTemplatePhase3: React.FC<Readonly<EmailTemplateProps>> = ({
    fathername, mothername, studentname, testDate
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>
    <h2>Upcoming Test & Interview – SIRAJ Al-Alusi</h2>
    <p>
      Greetings <strong>Mr. {fathername}</strong> and <strong>Mrs. {mothername}</strong>. This is to inform you that the school test and interview for <strong>{studentname}</strong> has been scheduled on <strong>{testDate}</strong> at <strong>2PM.</strong>.
    </p>
    <p>
      Please ensure punctuality and bring the necessary documents such as identity card and such on the test day.
    </p>
    <p>
      We look forward to meeting you and your child soon.
    </p>
  </div>
);
