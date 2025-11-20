import type { StoredResult } from './types';

export function generateEmailHTML(result: StoredResult, code: string): string {
  const reportUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/results?code=${code}`;

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        color: white;
        padding: 30px;
        border-radius: 8px;
        text-align: center;
        margin-bottom: 30px;
      }
      .header h1 {
        margin: 0 0 5px 0;
        font-size: 32px;
      }
      .header p {
        margin: 0;
        opacity: 0.95;
      }
      .content {
        background: #f9fafb;
        padding: 30px;
        border-radius: 8px;
        margin-bottom: 20px;
      }
      .content h2 {
        margin: 0 0 15px 0;
        color: #111827;
      }
      .score-box {
        background: white;
        padding: 20px;
        border-radius: 8px;
        margin: 15px 0;
        border-left: 4px solid #6366f1;
      }
      .score-box h3 {
        margin: 0 0 10px 0;
        color: #6366f1;
      }
      .score-box p {
        margin: 8px 0;
        color: #4b5563;
      }
      .button {
        display: inline-block;
        background: #6366f1;
        color: white!important;
        padding: 12px 24px;
        text-decoration: none;
        border-radius: 6px;
        margin: 20px 0;
        font-weight: 600;
      }
      .footer {
        text-align: center;
        color: #6b7280;
        font-size: 14px;
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid #e5e7eb;
      }
      .footer p {
        margin: 5px 0;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>Your MINDTRX Results</h1>
      <p>Inner Mind Integration Inventory (IMII)</p>
    </div>

    <div class="content">
      <h2>Thank you for completing the assessment!</h2>
      <p>Your personalized results are ready. Here's a summary:</p>

      <div class="score-box">
        <h3>Your Results</h3>
        <p><strong>Report Code:</strong> ${code}</p>
        <p><strong>Quadrant:</strong> ${result.quadrant}</p>
        <p><strong>Position:</strong> ${result.position}</p>
        <p><strong>Communication Score:</strong> ${result.comm50}/50</p>
        <p><strong>Trust Score:</strong> ${result.trust50}/50</p>
      </div>

      <p>Your Communication score reflects how often you actively engage inner-mind practices. Your Trust score reflects how deeply you rely on inner guidance.</p>

      <div style="text-align: center;">
        <a href="${reportUrl}" class="button">View Full Report</a>
      </div>

      <p style="font-size: 14px; color: #6b7280; margin-top: 20px;">
        <small>You can access your full report anytime using the code: <strong>${code}</strong></small>
      </p>
    </div>

    <div class="footer">
      <p><strong>MINDTRX</strong> - Inner Mind Integration</p>
      <p>This email was sent because you requested your assessment results.</p>
    </div>
  </body>
</html>
  `;
}

export function generateEmailText(result: StoredResult, code: string): string {
  const deepLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/results?code=${code}`;

  return `
MINDTRX - Inner Mind Integration Inventory v2
Your Assessment Results

Result Code: ${code}

SCORES:
Communication: ${result.comm50}/50
Trust: ${result.trust50}/50

YOUR QUADRANT: ${result.quadrant}
YOUR POSITION: ${result.position}

To view your complete results with detailed feedback and the interactive quadrant visualization, visit:
${deepLink}

Save your result code (${code}) to access your results anytime.

---
Powered by MINDTRX
Inner Mind Integration Inventory v2
  `;
}

