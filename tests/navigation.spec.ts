import { test, expect } from '@playwright/test';

test.describe('Navigation and Routing', () => {
  test('homepage loads successfully and has correct title', async ({ page }) => {
    await page.goto('/');
    
    // Using a loose regex since we changed the name DecodedX -> DecodeDx
    await expect(page).toHaveTitle(/DecodeDx/i);
    
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });

  test('navigation links work correctly', async ({ page }) => {
    await page.goto('/');

    // Check How It Works link
    await page.getByRole('link', { name: 'How It Works' }).first().click();
    await expect(page).toHaveURL(/.*how-it-works/);
    await expect(page.locator('h1').first()).toBeVisible();

    // Check Solutions link
    await page.goto('/');
    await page.getByRole('link', { name: 'Solutions' }).first().click();
    await expect(page).toHaveURL(/.*solutions/);
    await expect(page.locator('h1').first()).toBeVisible();

    // Check Use Cases link
    await page.goto('/');
    await page.getByRole('link', { name: 'Use Cases' }).first().click();
    await expect(page).toHaveURL(/.*use-cases/);
    await expect(page.locator('h1').first()).toBeVisible();

    // Check Contact link
    await page.goto('/');
    await page.getByRole('link', { name: 'Contact' }).first().click();
    await expect(page).toHaveURL(/.*contact/);
    await expect(page.locator('h1').first()).toBeVisible();
  });
});
