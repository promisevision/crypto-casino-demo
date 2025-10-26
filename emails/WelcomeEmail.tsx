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

interface WelcomeEmailProps {
  email: string;
  userName?: string;
}

export default function WelcomeEmail({ email, userName = 'there' }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Crypto Casino Hub - Your Journey Begins!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to Crypto Casino Hub!</Heading>

          <Text style={text}>
            Hi {userName},
          </Text>

          <Text style={text}>
            Thank you for subscribing to Crypto Casino Hub! You've just joined an exclusive community
            of crypto casino enthusiasts who get access to the best bonuses, latest reviews, and insider tips.
          </Text>

          <Section style={benefitsSection}>
            <Text style={benefitsTitle}>What you'll receive:</Text>
            <Text style={benefitItem}>✨ Exclusive casino bonuses up to $5,000</Text>
            <Text style={benefitItem}>🎰 Weekly featured casino reviews</Text>
            <Text style={benefitItem}>💰 Crypto casino strategy guides</Text>
            <Text style={benefitItem}>🚀 Early access to new casino launches</Text>
          </Section>

          <Section style={ctaSection}>
            <Button style={button} href="https://crypto-casino-demo.vercel.app">
              Explore Top Casinos
            </Button>
          </Section>

          <Text style={text}>
            Stay tuned for our weekly newsletter with hand-picked casino offers and expert insights!
          </Text>

          <Text style={signature}>
            Best regards,<br />
            The Crypto Casino Hub Team
          </Text>

          <Section style={footer}>
            <Text style={footerText}>
              You're receiving this email because you subscribed at Crypto Casino Hub.
            </Text>
            <Text style={footerText}>
              <Link href="https://crypto-casino-demo.vercel.app/unsubscribe" style={link}>
                Unsubscribe
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
  color: '#333',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0 48px',
  textAlign: 'center' as const,
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 48px',
};

const benefitsSection = {
  padding: '24px 48px',
};

const benefitsTitle = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 12px 0',
};

const benefitItem = {
  color: '#555',
  fontSize: '16px',
  lineHeight: '28px',
  margin: '4px 0',
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

const signature = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '24px 48px 0',
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
