import { test, expect } from '@playwright/test';

test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');

    // Check title
    await expect(page).toHaveTitle(/Evontic/);

    // Check for main heading
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Check for "Get Started" or similar CTA
    const getStartedButton = page.getByRole('link', { name: /Get Started/i }).first();
    await expect(getStartedButton).toBeVisible();

    // Check for featured events section
    await expect(page.getByText('Popular Events')).toBeVisible();
});
