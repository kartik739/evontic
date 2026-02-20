import { test, expect } from '@playwright/test';

test('explore page loads and shows search/filters', async ({ page }) => {
    await page.goto('/explore');

    // Check title
    await expect(page).toHaveTitle(/Evontic/);

    // Wait for loader to disappear (if present)
    await expect(page.locator('.animate-spin')).not.toBeVisible({ timeout: 10000 });

    // Check for search input
    await expect(page.getByPlaceholder('Search events...').first()).toBeVisible();

    // Check for category filters
    await expect(page.getByText('Music')).toBeVisible();
    await expect(page.getByText('Technology')).toBeVisible();

    // Check that events lists are present (Local, Popular, etc.)
    // Check that events lists are present OR empty state
    const hasEvents = await page.getByText('Happening Near You').isVisible();
    const hasTrending = await page.getByText('Trending Now').isVisible();
    expect(hasEvents || hasTrending).toBeTruthy();
});
