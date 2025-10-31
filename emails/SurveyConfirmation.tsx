import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";

interface SurveyConfirmationEmailProps {
  mainGoal?: string;
  budget?: string;
  experience?: string;
  role?: string;
}

export default function SurveyConfirmationEmail({
  mainGoal = "Marketing content creation",
  budget = "<$20 / month",
  experience = "Intermediate",
  role = "Founder / Entrepreneur",
}: SurveyConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your personalized AI tool recommendations are on the way</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Your personalized AI tool recommendations are on the way</Heading>

          <Text style={text}>Hi there,</Text>

          <Text style={text}>
            Thanks for completing our AI tool quiz! We've received your responses and our team is
            working on curating personalized recommendations that match your goals, budget, and
            experience level.
          </Text>

          <Section style={summaryBox}>
            <Heading as="h2" style={h2}>Here's what you told us:</Heading>
            <Text style={summaryText}>
              <strong>Main goal:</strong> {mainGoal}
            </Text>
            <Text style={summaryText}>
              <strong>Budget:</strong> {budget}
            </Text>
            <Text style={summaryText}>
              <strong>Experience:</strong> {experience}
            </Text>
            <Text style={summaryText}>
              <strong>Role:</strong> {role}
            </Text>
          </Section>

          <Heading as="h2" style={h2}>What happens next:</Heading>

          <Text style={text}>
            Within the next 24-48 hours, we'll send you a curated list of AI tools perfectly
            suited to your needs. Each recommendation will include:
          </Text>

          <ul style={list}>
            <li style={listItem}>Why it's a good fit for you</li>
            <li style={listItem}>Pricing details</li>
            <li style={listItem}>Key features</li>
            <li style={listItem}>Getting started tips</li>
          </ul>

          <Text style={text}>
            In the meantime, feel free to explore more at{" "}
            <a href="https://rada-ai.com" style={link}>rada-ai.com</a>
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            Best,<br />
            The Rada Team
          </Text>

          <Text style={footer}>
            P.S. If you have any questions, just reply to this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "700",
  margin: "40px 0 20px",
  padding: "0 40px",
  lineHeight: "1.4",
};

const h2 = {
  color: "#333",
  fontSize: "18px",
  fontWeight: "600",
  margin: "20px 0 12px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  padding: "0 40px",
  margin: "16px 0",
};

const summaryBox = {
  backgroundColor: "#f8f9ff",
  border: "1px solid #e0e7ff",
  borderRadius: "8px",
  padding: "20px 40px",
  margin: "24px 40px",
};

const summaryText = {
  color: "#333",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "8px 0",
};

const list = {
  padding: "0 40px 0 60px",
  margin: "16px 0",
};

const listItem = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  marginBottom: "8px",
};

const link = {
  color: "#8b5cf6",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "32px 40px",
};

const footer = {
  color: "#8898aa",
  fontSize: "14px",
  lineHeight: "24px",
  padding: "0 40px",
  margin: "8px 0",
};
