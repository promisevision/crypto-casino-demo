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

interface NewsUpdateEmailProps {
  title: string;
  userName?: string;
}

export default function NewsUpdateEmail({
  title,
  userName = 'Subscriber',
}: NewsUpdateEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Article Updated: {title}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>📝 Article Updated</Heading>

          <Text style={greeting}>Hi {userName},</Text>

          <Text style={text}>
            An article you may have read has been updated with new information:
          </Text>

          <Section style={highlightBoxSection}>
            <div style={highlightBox}>
              <Text style={articleTitle}>{title}</Text>
            </div>
          </Section>

          <Text style={text}>
            Check out the updated content to stay informed with the latest information.
          </Text>

          <Section style={ctaSection}>
            <Button style={button} href="https://crypto-casino-demo.vercel.app">
              Read Updated Article
            </Button>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              You're receiving this email because you're subscribed to Crypto Casino Hub newsletter.
            </Text>
            <Text style={footerText}>
              <Link href="https://crypto-casino-demo.vercel.app/profile" style={link}>
                Manage Subscription
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
  color: '#6366f1',
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
  backgroundColor: '#f0f4ff',
  border: '2px solid #6366f1',
  borderRadius: '12px',
  padding: '20px',
};

const articleTitle = {
  color: '#6366f1',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0',
  textAlign: 'center' as const,
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
