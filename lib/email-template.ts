import type { StoredResult } from './types';

export function generateEmailHTML(result: StoredResult, code: string): string {
  const deepLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/results?code=${code}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your MINDTRX IMII Report</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px 30px;
      text-align: center;
      color: white;
    }
    .header h1 {
      font-size: 32px;
      font-weight: 800;
      margin-bottom: 10px;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }
    .header p {
      font-size: 16px;
      opacity: 0.95;
    }
    .content {
      padding: 40px 30px;
    }
    .code-box {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      border-radius: 12px;
      text-align: center;
      margin: 30px 0;
    }
    .code-box .label {
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;
      margin-bottom: 8px;
    }
    .code-box .code {
      color: white;
      font-size: 28px;
      font-weight: 800;
      font-family: monospace;
      letter-spacing: 2px;
    }
    .result-card {
      background: #f8f9fa;
      border-left: 4px solid #667eea;
      padding: 20px;
      margin: 20px 0;
      border-radius: 8px;
    }
    .result-card h3 {
      color: #667eea;
      font-size: 18px;
      margin-bottom: 8px;
    }
    .result-card p {
      color: #666;
      margin-bottom: 10px;
    }
    .scores {
      display: flex;
      justify-content: space-around;
      margin: 30px 0;
    }
    .score-item {
      text-align: center;
      flex: 1;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 12px;
      margin: 0 10px;
    }
    .score-item .label {
      color: #666;
      font-size: 14px;
      margin-bottom: 8px;
    }
    .score-item .value {
      color: #667eea;
      font-size: 32px;
      font-weight: 800;
    }
    .score-item .max {
      color: #999;
      font-size: 16px;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 16px 32px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      text-align: center;
      margin: 20px 0;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
    .footer {
      background: #f8f9fa;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e9ecef;
    }
    .footer p {
      color: #666;
      font-size: 14px;
      margin-bottom: 5px;
    }
    .footer .brand {
      color: #667eea;
      font-weight: 800;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>MINDTRX</h1>
      <p>Inner Mind Integration Inventory v2</p>
    </div>
    
    <div class="content">
      <h2 style="color: #333; margin-bottom: 20px;">Your Assessment Results</h2>
      
      <p style="color: #666; margin-bottom: 20px;">
        Thank you for completing the MINDTRX Inner Mind Integration Inventory. 
        Here's a summary of your results:
      </p>

      <div class="code-box">
        <div class="label">Your Result Code</div>
        <div class="code">${code}</div>
      </div>

      <div class="scores">
        <div class="score-item">
          <div class="label">Communication</div>
          <div class="value">${result.comm50}<span class="max">/50</span></div>
        </div>
        <div class="score-item">
          <div class="label">Trust</div>
          <div class="value">${result.trust50}<span class="max">/50</span></div>
        </div>
      </div>

      <div class="result-card">
        <h3>Your Quadrant</h3>
        <p style="font-size: 20px; font-weight: 600; color: #333;">${result.quadrant}</p>
      </div>

      <div class="result-card">
        <h3>Your Position</h3>
        <p style="font-size: 18px; font-weight: 600; color: #333;">${result.position}</p>
      </div>

      <p style="color: #666; margin: 30px 0 20px;">
        To view your complete results with detailed feedback and the interactive quadrant visualization, 
        click the button below:
      </p>

      <div style="text-align: center;">
        <a href="${deepLink}" class="button">View Full Results</a>
      </div>

      <p style="color: #999; font-size: 14px; margin-top: 30px; padding-top: 30px; border-top: 1px solid #e9ecef;">
        Save your result code <strong style="color: #667eea;">${code}</strong> to access your results anytime.
      </p>
    </div>

    <div class="footer">
      <p>Powered by <span class="brand">MINDTRX</span></p>
      <p>Inner Mind Integration Inventory v2</p>
      <p style="margin-top: 15px; font-size: 12px; color: #999;">
        This email was sent because you requested your MINDTRX assessment results.
      </p>
    </div>
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

