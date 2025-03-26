import { Email } from '../types/email';

export const scamEmails: Email[] = [
  {
    sender: 'From: Microsoft Support',
    subject: 'Subject: Your Office 365 subscription has expired',
    greeting: 'Dear Customer',
    text: 'We noticed your Office 365 subscription has expired. To continue using your services without interruption, please update your payment details.',
    buttonText: 'Renew Subscription',
    buttonLink: 'https://microsoft-office-billing.com',
    correctAnswer: 'Scam',
    scamSigns: ['Fake urgency', 'Suspicious link'],
    explanation:
      'Microsoft does not send renewal requests with external payment links. Always renew through the official Office website.',
  },
  {
    sender: 'From: Instagram Security',
    subject: 'Subject: Your account is at risk of being banned!',
    greeting: 'Hi',
    text: "We detected unusual activity on your Instagram account. If you don't verify within 24 hours, your account may be suspended.",
    buttonText: 'Verify Account',
    buttonLink: 'https://instagram-security-alerts.com',
    correctAnswer: 'Scam',
    scamSigns: ['Threats of suspension', 'Fake urgency', 'Suspicious link'],
    explanation:
      'Instagram does not send emails threatening account suspension in this manner. Always check notifications within the app.',
  },
  {
    sender: 'From: Spotify Team',
    subject: "Subject: 🎁 You've won a free 1-year Spotify Premium membership!",
    greeting: 'Congratulations',
    text: 'You have been randomly selected to receive a free 1-year Spotify Premium subscription. Click below to claim your reward.',
    buttonText: 'Claim Your Prize',
    buttonLink: 'https://spotify-premium-free.com',
    correctAnswer: 'Scam',
    scamSigns: ['Unrealistic offer', 'Suspicious link'],
    explanation:
      'Spotify does not randomly give away free subscriptions via email. Be cautious of too-good-to-be-true offers.',
  },
  {
    sender: 'From: Your Friend Alex',
    subject: 'Subject: Hey, check this out!',
    greeting: `Hey`,
    text: 'I found this really cool website where you can win prizes just for signing up. You should totally check it out!',
    buttonText: 'Visit Website',
    buttonLink: 'https://freemoney-deals.com',
    correctAnswer: 'Scam',
    scamSigns: ['Casual tone but suspicious link'],
    explanation:
      'Even if an email appears to come from a friend, scammers can spoof email addresses. Verify with your friend first before clicking any links.',
    personal: true,
  },
  {
    sender: 'From: Apple Rewards <support@applerewardz.com>',
    subject: 'Subject: 🎉 Congratulations! You won a brand-new iPhone 15!',
    greeting: 'Dear Customer',
    text: "You have been randomly selected to receive a free iPhone 15! Click the button below to claim your prize before it's too late.",
    buttonText: 'Claim My iPhone',
    buttonLink: 'https://apple-gift-free.com',
    correctAnswer: 'Scam',
    scamSigns: ['Unrealistic offer', 'Suspicious link'],
    explanation:
      'Apple does not give away free iPhones via email. Always verify offers directly on the official Apple website.',
  },
  {
    sender: 'From: Netflix Support <security@netflix-alert.com>',
    subject: 'Subject: ⚠️ Immediate Action Required: Your Netflix Account!',
    greeting: 'Dear Customer',
    text: 'We have detected unusual activity on your Netflix account. If you do not verify your details within 24 hours, your account will be permanently suspended.',
    buttonText: 'Verify My Account',
    buttonLink: 'https://netflix-security-verification.com',
    correctAnswer: 'Scam',
    scamSigns: ['Fake urgency', 'Generic greeting'],
    explanation:
      'Netflix will never pressure you to verify your account like this. Always check your account status directly on the official Netflix website.',
  },
  {
    sender: 'From: Bank Security <support@dnb-secure-login.com>',
    subject: 'Subject: Urgent! Your Account Has Been Temporarily Locked',
    greeting: 'Dear Valued Customer',
    text: 'Due to suspicious activity, we have temporarily locked your bank account. To restore access, please confirm your identity by providing your login details and credit card number.',
    buttonText: 'Unlock My Account',
    buttonLink: 'https://dnb-security-login.com',
    correctAnswer: 'Scam',
    scamSigns: ['Requests sensitive information', 'Suspicious sender address'],
    explanation:
      'Banks never ask for login details or card information via email. Always log in through your bank’s official website.',
  },
  {
    sender: 'From: Vipps Support <support@vippz.com>',
    subject: 'Subject: 💰 You have received NOK 500!',
    greeting: 'Hi',
    text: 'Your friend has sent you NOK 500 via Vipps. To accept the payment, click the button below and log in to your Vipps account.',
    buttonText: 'Claim Money',
    buttonLink: 'https://vipps-payouts.net',
    correctAnswer: 'Scam',
    scamSigns: ['Suspicious link', 'Spelling mistake in sender address'],
    explanation:
      'Vipps does not send emails like this. If someone sends you money, you will see it directly in the Vipps app.',
  },
];

export const legitEmails: Email[] = [
  {
    sender: 'From: Amazon Orders',
    subject: 'Subject: Your order has been shipped!',
    greeting: `Hello`,
    text: 'Your order <b>#5678-1234</b> has been shipped. You can track it through your Amazon account.',
    buttonText: 'Track My Package',
    buttonLink: 'https://www.amazon.com/orders',
    correctAnswer: 'Legit',
    scamSigns: [],
    explanation:
      'Amazon sends order updates with direct links to your account. No suspicious payment requests.',
    personal: true,
  },
  {
    sender: 'From: Snapchat <support@snapchat.com>',
    subject: "Subject: We've Updated Our Privacy Policy",
    greeting: 'Hello',
    text: 'We have updated our Privacy Policy, effective May 1, 2025. You do not need to take any action, but we encourage you to review the updates.',
    buttonText: 'Review Policy',
    buttonLink: 'https://www.snapchat.com/privacy',
    correctAnswer: 'Legit',
    scamSigns: [],
    explanation:
      'Snapchat notifies users of policy updates without requiring immediate action or personal details.',
  },
  {
    sender: 'From: Spotify <no-reply@spotify.com>',
    subject: 'Subject: Your Spotify Premium Payment Was Successful',
    greeting: `Hi`,
    text: 'Your payment for Spotify Premium has been processed successfully. Your next billing date is May 15, 2025.',
    buttonText: 'Manage Subscription',
    buttonLink: 'https://www.spotify.com/account',
    correctAnswer: 'Legit',
    scamSigns: [],
    explanation:
      'Spotify sends confirmation emails without requesting additional payment details or login credentials.',
    personal: true,
  },
  {
    sender: 'From: TikTok <no-reply@tiktok.com>',
    subject: 'Subject: Your TikTok Verification Code',
    greeting: 'Hello',
    text: "Your TikTok verification code is: <b>847293</b>. Enter this code to complete your login. If you didn't request this, you can ignore this email.",
    buttonText: 'Go to TikTok',
    buttonLink: 'https://www.tiktok.com/login',
    correctAnswer: 'Legit',
    scamSigns: [],
    explanation:
      'TikTok only sends verification codes when requested by the user. They never ask for passwords via email.',
  },
  {
    sender: 'From: SAS Airlines <no-reply@sas.no>',
    subject: 'Subject: Your SAS Booking Confirmation - Flight to London',
    greeting: 'Dear',
    text: 'Your booking for Flight SK531 to London on June 10, 2025, has been confirmed. You can check your itinerary and manage your booking below.',
    buttonText: 'Manage My Booking',
    buttonLink: 'https://www.flysas.com/my-booking',
    correctAnswer: 'Legit',
    scamSigns: [],
    explanation:
      'Airlines always send booking confirmations with direct links to their official website, not third-party payment sites.',
    personal: true,
  },
];
