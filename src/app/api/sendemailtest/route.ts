import type { NextApiRequest, NextApiResponse } from 'next';
import { EmailTemplate } from '@/components/Email-Template'
import { Resend } from 'resend';
import React from 'react'; 
const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['delivered@resend.dev'],
    subject: 'Hello world',
    react: React.createElement(EmailTemplate, {firstName: 'John'}), 
  });

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json(data);
};