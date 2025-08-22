import type { Scenario } from './types';

export const SCENARIOS: Scenario[] = [
  {
    id: 'billing-dispute',
    title: 'Billing Dispute',
    description: 'A customer, Maria Garcia, calls in upset about an unexpected charge on her monthly invoice. She believes she was overcharged for services she did not use.',
    customerName: 'Maria Garcia',
    mood: 'frustrated and impatient',
    initialMessage: "I've been on hold for 15 minutes! There's a charge on my bill that makes absolutely no sense, and I want it removed right now.",
    customerData: {
      accountId: 'CUST-MG4839',
      joinDate: '2022-08-15',
      plan: 'Pro Connect Plan',
      email: 'maria.g@gmail.com',
      phone: '(212) 555-2368',
      orderHistory: [
          { 
              orderId: 'ORD-98332', 
              date: '2024-07-01', 
              items: 'Pro Connect Plan + Int\'l Calling Add-on', 
              status: 'Billed (Disputed)',
              details: `
INVOICE DETAILS
--------------------------------
Invoice ID: INV-2024-07-MG4839
Order ID: ORD-98332
Date: 2024-07-01
Status: Billed (Disputed by Customer on 2024-07-16)

Line Items:
1. Pro Connect Plan (Monthly) ...... $49.99
2. International Calling Add-on .... $15.00  <-- DISPUTED CHARGE
--------------------------------
Subtotal: $64.99
Taxes & Fees: $4.12
--------------------------------
TOTAL: $69.11

Customer Notes: Customer states they did not approve or use the International Calling Add-on.
`
          },
          { 
              orderId: 'ORD-97542', 
              date: '2024-06-01', 
              items: 'Pro Connect Plan', 
              status: 'Paid',
              details: `
INVOICE DETAILS
--------------------------------
Invoice ID: INV-2024-06-MG4839
Order ID: ORD-97542
Date: 2024-06-01
Status: Paid

Line Items:
1. Pro Connect Plan (Monthly) ...... $49.99
--------------------------------
Subtotal: $49.99
Taxes & Fees: $3.12
--------------------------------
TOTAL: $53.11
`
          },
      ]
    },
    contactHistory: [
      { 
          date: '2024-06-20', 
          reason: 'Password Reset', 
          outcome: 'Resolved',
          details: `
CONTACT LOG: Call
--------------------------------
Date: 2024-06-20
Agent: Mark R.
Reason: Customer forgot password and was locked out of account portal.
Summary: Agent verified customer identity via security questions (DOB, last 4 of payment method). Agent initiated password reset email. Walked customer through the reset process over the phone.
Outcome: Resolved. Customer confirmed they were able to log in successfully with the new password.
`
      },
      { 
          date: '2024-03-11', 
          reason: 'Service Inquiry re: International Calls', 
          outcome: 'Provided info',
          details: `
CONTACT LOG: Chat
--------------------------------
Date: 2024-03-11
Agent: Chloe W.
Reason: Customer inquired about rates for calling Mexico.
Summary: Agent provided information on the International Calling Add-on ($15/month) and pay-per-minute rates. A link to the rates page was sent. Customer stated they would "think about it". No confirmation to add the service was given.
Outcome: Information provided. No account changes made.
`
      },
    ],
  },
  {
    id: 'technical-issue',
    title: 'Technical Support',
    description: 'A long-time customer, David Chen, is having trouble accessing his account portal. He seems to be locked out and is getting an authentication error.',
    customerName: 'David Chen',
    mood: 'confused but polite',
    initialMessage: "Hello, I seem to be having some trouble logging into my account. I've tried resetting my password, but it keeps giving me an error message. Can you help?",
    customerData: {
      accountId: 'CUST-DC1024',
      joinDate: '2019-11-05',
      plan: 'Business Essentials',
      email: 'd.chen88@yahoo.com',
      phone: '(415) 555-1290',
    },
    contactHistory: [
        { 
            date: '2023-09-01', 
            reason: 'Feature Request: 2FA Options', 
            outcome: 'Noted for review',
            details: `
CONTACT LOG: Email
--------------------------------
Date: 2023-09-01
From: d.chen88@yahoo.com
Subject: Suggestion for Security

Body:
Hello,
I'm a long-time user and I'm very happy with the service. I was hoping you might consider adding more options for two-factor authentication, like support for authenticator apps (Google Authenticator, Authy, etc.) instead of just SMS. I think it would be a great security improvement.
Thanks,
David Chen

Agent Response: Thanked customer for feedback and logged it as a feature request for the product team.
Outcome: Noted for review.
`
        },
        { 
            date: '2021-05-22', 
            reason: 'Initial Setup Assistance', 
            outcome: 'Resolved',
            details: `
CONTACT LOG: Call
--------------------------------
Date: 2021-05-22
Agent: Sarah P.
Reason: Customer needed help configuring their account for the first time.
Summary: Agent walked customer through the initial setup wizard, explaining each step. Helped configure primary settings and user permissions.
Outcome: Resolved. Customer confirmed they were all set up and ready to go.
`
        },
    ],
  },
  {
    id: 'product-cancellation',
    title: 'Service Cancellation',
    description: "A customer, Sarah Jenkins, wants to cancel her premium subscription. She's looking for a cheaper alternative and is firm in her decision.",
    customerName: 'Sarah Jenkins',
    mood: 'calm but firm',
    initialMessage: "Hi, I'm calling to cancel my premium subscription, please. I've found another service that better fits my budget.",
    customerData: {
      accountId: 'CUST-SJ7762',
      joinDate: '2023-01-30',
      plan: 'Enterprise Suite',
      email: 'sjenkins.co@outlook.com',
      phone: '(312) 555-7845',
      orderHistory: [
          { 
              orderId: 'ORD-98411', 
              date: '2024-07-01', 
              items: 'Enterprise Suite - Monthly', 
              status: 'Paid',
              details: `
INVOICE DETAILS
--------------------------------
Invoice ID: INV-2024-07-SJ7762
Order ID: ORD-98411
Date: 2024-07-01
Status: Paid

Line Items:
1. Enterprise Suite (Monthly) ...... $199.99
--------------------------------
Subtotal: $199.99
Taxes & Fees: $12.50
--------------------------------
TOTAL: $212.49
`
          },
      ]
    },
    contactHistory: [
      { 
          date: '2024-04-15', 
          reason: 'Billing Inquiry: Annual Discount', 
          outcome: 'Info provided',
          details: `
CONTACT LOG: Call
--------------------------------
Date: 2024-04-15
Agent: Kevin L.
Reason: Customer called to ask about potential discounts for switching to an annual plan.
Summary: Agent explained the annual discount structure (15% off). Customer said they would consider it and call back if they decided to switch.
Outcome: Information provided. No account changes made.
`
      },
    ],
  },
  {
    id: 'feature-request',
    title: 'Feature Request',
    description: 'An enthusiastic customer, Tom, loves the product but has an idea for a new feature that he believes would greatly improve the service.',
    customerName: 'Tom Rodriguez',
    mood: 'enthusiastic and talkative',
    initialMessage: "Hey! I've been using your service for months and I absolutely love it. I had this great idea for a new feature that I just had to share with you.",
    customerData: {
      accountId: 'CUST-TR0098',
      joinDate: '2024-02-18',
      plan: 'Innovator Plan',
      email: 'tom.rodriguez.dev@gmail.com',
      phone: '(512) 555-9821',
    },
    contactHistory: [],
  },
  {
    id: 'contractor-offboarding',
    title: 'Contractor Final Payment Inquiry',
    description: "Alex Chen, a former Quality Assurance Analyst on a 6-month contract, is calling about their final invoice payment which is now two weeks overdue. The contract ended on June 30th, 2024. Alex has already sent two follow-up emails to the accounting department without any response and is growing concerned.",
    customerName: 'Alex Chen',
    mood: 'concerned and professionally frustrated. You are firm, not yelling, and expect a resolution.',
    initialMessage: "Hello, my name is Alex Chen. I'm calling about my final payment for my contract that ended last month. I was told I'd receive it within 30 days, but it's overdue and I haven't had any response to my emails. Can you please look into this for me?",
    userStarts: false,
    customerData: {
      accountId: 'CON-AC9876',
      joinDate: '2024-01-01',
      plan: 'Contract: Quality Assurance Analyst',
      email: 'alex.chen.qa@protonmail.com',
      phone: '(206) 555-3489',
      orderHistory: [
          { 
              orderId: 'INV-2024-06', 
              date: '2024-06-30', 
              items: 'Final Invoice: QA Services (June)', 
              status: 'Pending Payment (Overdue)',
              details: `
INVOICE DETAILS
--------------------------------
Invoice ID: INV-2024-06
Vendor ID: CON-AC9876
Date Issued: 2024-06-30
Due Date: 2024-07-30
Status: PENDING PAYMENT (16 days overdue)

Line Items:
1. Quality Assurance Services (June 1 - June 30) ...... $5,500.00
--------------------------------
TOTAL DUE: $5,500.00

Notes: Final payment for 6-month contract.
`
          },
          { 
              orderId: 'INV-2024-05', 
              date: '2024-05-31', 
              items: 'Invoice: QA Services (May)', 
              status: 'Paid',
              details: `
INVOICE DETAILS
--------------------------------
Invoice ID: INV-2024-05
Vendor ID: CON-AC9876
Date Issued: 2024-05-31
Date Paid: 2024-06-25
Status: PAID

Line Items:
1. Quality Assurance Services (May 1 - May 31) ...... $5,500.00
--------------------------------
TOTAL PAID: $5,500.00
`
          },
      ]
    },
    contactHistory: [
      { 
          date: '2024-07-15', 
          reason: 'Email Follow-up to Accounting (INV-2024-06)', 
          outcome: 'No Response',
          details: `
EMAIL LOG
--------------------------------
Date: 2024-07-15
From: alex.chen.qa@protonmail.com
To: accounting@workingsolutions.com
Subject: Follow-up: Invoice INV-2024-06 Overdue

Body:
Hi Team,
Just following up on my previous email. My final invoice, INV-2024-06, is now two weeks past its due date. Could you please provide an update on the payment status?
Thanks,
Alex Chen

Outcome: No response received from Accounting.
`
      },
      { 
          date: '2024-07-10', 
          reason: 'Initial Email to Accounting (INV-2024-06)', 
          outcome: 'No Response',
          details: `
EMAIL LOG
--------------------------------
Date: 2024-07-10
From: alex.chen.qa@protonmail.com
To: accounting@workingsolutions.com
Subject: Inquiry about final invoice INV-2024-06

Body:
Hello Accounting Team,
I hope you're well. I'm writing to check on the status of my final invoice, INV-2024-06, for my contract work in June. The payment was due on July 30th and I haven't received it yet.
Please let me know when I can expect the payment.
Best regards,
Alex Chen

Outcome: No response received from Accounting.
`
      },
    ],
  }
];