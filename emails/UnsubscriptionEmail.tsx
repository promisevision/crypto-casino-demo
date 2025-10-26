import {
  Body,
  Button,
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

interface UnsubscriptionEmailProps {
  userName?: string;
}

export default function UnsubscriptionEmail({
  userName = 'there',
}: UnsubscriptionEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>You've been unsubscribed from Crypto Casino Hub</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>👋 Unsubscribed</Heading>

          <Text style={greeting}>Hi {userName},</Text>

          <Text style={text}>
            We're sorry to see you go! You've been successfully unsubscribed from our newsletter and won't receive any more emails from us.
          </Text>

          <Section style={highlightBoxSection}>
            <div style={highlightBox}>
              <Text style={highlightText}>
                Your account is still active and you can continue using Crypto Casino Hub. You can resubscribe anytime from your profile settings.
              </Text>
            </div>
          </Section>

          <Text style={text}>
            If you unsubscribed by mistake, you can easily subscribe again:
          </Text>

          <Section style={ctaSection}>
            <Button style={button} href="https://crypto-casino-demo.vercel.app/profile">
              Resubscribe
            </Button>
          </Section>

          <Text style={feedbackText}>
            We'd love to hear why you unsubscribed. Your feedback helps us improve our service for everyone.
          </Text>

          <Section style={footer}>
            <Text style={footerText}>
              This is a confirmation email. You won't receive any more newsletters.
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
  color: '#6b7280',
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
  backgroundColor: '#fff7ed',
  border: '2px solid #fb923c',
  borderRadius: '12px',
  padding: '20px',
};

const highlightText = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0',
};

const feedbackText = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '22px',
  padding: '0 48px',
  margin: '24px 0',
  fontStyle: 'italic',
};

const ctaSection = {
  padding: '24px 48px',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#6366f1',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 40px',
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
