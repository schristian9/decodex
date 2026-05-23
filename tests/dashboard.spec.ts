import { test, expect } from '@playwright/test';

test.describe('Dashboard Interactions', () => {
  test('dashboard widgets render properly', async ({ page }) => {
    await page.goto('/');

    // Ensure we are interacting with the main Dashboard interface that the user sees on the homepage, 
    // or navigate if the dashboard is on a separate route. Assuming it's part of the homepage or there's a demo.
    
    // Check if the dashboard components are visible
    const dashboardContainer = page.locator('.dashboard-widget').first();
    await expect(dashboardContainer).toBeVisible();

    // Verify key elements like the "Metabolic health snapshot" exists
    await expect(page.getByText('Metabolic health snapshot')).toBeVisible();

    // Verify the "Analyze with AI" button exists
    const analyzeBtn = page.getByRole('button', { name: /Analyze with AI/i });
    await expect(analyzeBtn).toBeVisible();
  });
});
