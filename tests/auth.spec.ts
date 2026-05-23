import { test, expect } from '@playwright/test';

test.describe('Authentication Flows', () => {
  test('login page loads and shows validation errors', async ({ page }) => {
    await page.goto('/login');
    
    const heading = page.locator('h1').filter({ hasText: 'Welcome back' });
    await expect(heading).toBeVisible();

    const emailInput = page.getByPlaceholder('you@example.com');
    await expect(emailInput).toBeVisible();

    const passwordInput = page.getByPlaceholder('••••••••');
    await expect(passwordInput).toBeVisible();

    const signInButton = page.getByRole('button', { name: /Sign in/i });
    await expect(signInButton).toBeVisible();
  });

  test('signup page loads successfully', async ({ page }) => {
    await page.goto('/signup');
    
    const heading = page.locator('h1').filter({ hasText: 'Create your account' });
    await expect(heading).toBeVisible();

    const signUpButton = page.getByRole('button', { name: /Create account/i });
    await expect(signUpButton).toBeVisible();
  });
});
