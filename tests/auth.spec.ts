import { test, expect } from '@playwright/test';

test('unauthenticated user is redirected to sign-in when accessing protected route', async ({ page }) => {
    await page.goto('/create-event');

    // Should redirect to sign-in (Clerk)
    // We look for URL pattern or specific element on Clerk page
    await expect(page).toHaveURL(/sign-in/);
});

test('sign-in button is visible on homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: /Sign In/i })).toBeVisible();
});
