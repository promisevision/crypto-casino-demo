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

interface NewsDeleteEmailProps {
  title: string;
  userName?: string;
}

export default function NewsDeleteEmail({
  title,
  userName = 'Subscriber',
}: NewsDeleteEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Article Removed: {title}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>🗑️ Article Removed</Heading>

          <Text style={greeting}>Hi {userName},</Text>

          <Text style={text}>
            An article has been removed from our platform:
          </Text>

          <Section style={highlightBoxSection}>
            <div style={highlightBox}>
              <Text style={articleTitle}>{title}</Text>
            </div>
          </Section>

          <Text style={text}>
            This article is no longer available. It may have been removed due to outdated information or other editorial reasons.
          </Text>

          <Text style={text}>
            Thank you for your understanding. Continue exploring our latest content on the website.
          </Text>

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

const articleTitle = {
  color: '#dc2626',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0',
  textAlign: 'center' as const,
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
