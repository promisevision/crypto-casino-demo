import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface NewsletterEmailProps {
  title: string;
  imageUrl: string;
  content: string;
  rating: number;
  userName?: string;
}

export default function NewsletterEmail({
  title,
  imageUrl,
  content,
  rating,
  userName = 'there',
}: NewsletterEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{title}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Crypto Casino Hub</Heading>

          <Text style={greeting}>Hi {userName},</Text>

          <Text style={introText}>
            We have exciting news to share with you! Check out our latest casino review:
          </Text>

          {/* Featured Image */}
          {imageUrl && (
            <Section style={imageSection}>
              <Img
                src={imageUrl}
                alt={title}
                style={image}
              />
            </Section>
          )}

          {/* Article Title */}
          <Heading style={h2}>{title}</Heading>

          {/* Article Content */}
          <Section style={contentSection}>
            <Text style={text}>{content}</Text>
          </Section>

          {/* Rating */}
          <Section style={reviewSectionWrapper}>
            <div style={reviewSection}>
              <Text style={reviewTitle}>Rating</Text>
              <Text style={ratingText}>
                {'⭐'.repeat(rating)}{'☆'.repeat(5 - rating)} {rating} / 5
              </Text>
            </div>
          </Section>

          {/* CTA Button */}
          <Section style={ctaSection}>
            <Button style={button} href="https://crypto-casino-demo.vercel.app">
              Read More on Crypto Casino Hub
            </Button>
          </Section>

          {/* Footer */}
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
            <Text style={disclaimer}>
              Gambling can be addictive. Please play responsibly. 18+
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

const h2 = {
  color: '#333',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '24px 0 16px',
  padding: '0 48px',
  lineHeight: '1.3',
};

const greeting = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 48px',
  margin: '0 0 8px 0',
};

const introText = {
  color: '#555',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 48px',
  margin: '0 0 24px 0',
};

const imageSection = {
  padding: '0 48px 24px',
};

const image = {
  width: '100%',
  height: 'auto',
  borderRadius: '12px',
  display: 'block',
};

const contentSection = {
  padding: '0 48px',
  marginBottom: '24px',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const reviewSectionWrapper = {
  padding: '0 48px',
  margin: '24px 0',
};

const reviewSection = {
  backgroundColor: '#f0f4ff',
  border: '2px solid #6366f1',
  borderRadius: '12px',
  padding: '20px',
};

const reviewTitle = {
  color: '#6366f1',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 12px 0',
};

const reviewText = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const ratingText = {
  color: '#333',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0',
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

const disclaimer = {
  color: '#999',
  fontSize: '11px',
  lineHeight: '18px',
  textAlign: 'center' as const,
  margin: '12px 0 0',
  fontStyle: 'italic',
};

const link = {
  color: '#6366f1',
  textDecoration: 'underline',
};
