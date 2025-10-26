import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface AccountDeleteEmailProps {
  userName?: string;
  userEmail: string;
}

export default function AccountDeleteEmail({
  userName = 'User',
  userEmail,
}: AccountDeleteEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Crypto Casino Hub account has been deleted</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Account Deleted</Heading>

          <Text style={greeting}>Hi {userName},</Text>

          <Text style={text}>
            Your account ({userEmail}) has been permanently deleted from Crypto Casino Hub.
          </Text>

          <Section style={highlightBoxSection}>
            <div style={highlightBox}>
              <Text style={highlightTitle}>⚠️ What this means:</Text>
              <Text style={bulletText}>• Your account has been permanently removed</Text>
              <Text style={bulletText}>• You've been unsubscribed from all newsletters</Text>
              <Text style={bulletText}>• All your data has been deleted</Text>
              <Text style={bulletText}>• You will not receive any more emails from us</Text>
            </div>
          </Section>

          <Text style={text}>
            If you didn't request this deletion or believe this was done in error, please contact us immediately.
          </Text>

          <Text style={text}>
            You can create a new account anytime if you wish to return.
          </Text>

          <Section style={footer}>
            <Text style={footerText}>
              This is a confirmation email for your account deletion.
            </Text>
            <Text style={footerText}>
              <Link href="https://crypto-casino-demo.vercel.app" style={link}>
                Visit Website
              </Link>
              {' | '}
              <Link href="https://crypto-casino-demo.vercel.app/privacy" style={link}>
                Privacy Policy
              </Link>
            </Text>
            <Text style={footerText}>
              © 2024 Crypto Casino Hub. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const h1 = {
  color: '#dc2626',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '40px 0 20px',
  padding: '0 48px',
  textAlign: 'center' as const,
};

const greeting = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 48px',
  margin: '0 0 8px 0',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 48px',
  margin: '0 0 16px 0',
};

const highlightBoxSection = {
  padding: '0 48px',
  margin: '24px 0',
};

const highlightBox = {
  backgroundColor: '#fef2f2',
  border: '2px solid #dc2626',
  borderRadius: '12px',
  padding: '20px',
};

const highlightTitle = {
  color: '#dc2626',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 12px 0',
};

const bulletText = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '4px 0',
};

const footer = {
  borderTop: '1px solid #eaeaea',
  margin: '32px 48px 0',
  padding: '24px 0 0',
};

const footerText = {
  color: '#666',
  fontSize: '12px',
  lineHeight: '20px',
  textAlign: 'center' as const,
  margin: '4px 0',
};

const link = {
  color: '#6366f1',
  textDecoration: 'underline',
};
