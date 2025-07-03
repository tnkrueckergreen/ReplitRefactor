# CSS Migration Guide

## Overview
This guide helps you migrate from the old fragmented CSS structure (32 files) to the new clean architecture (10 files).

## What Changed

### Old Structure Problems
- 32 CSS files with unclear organization
- 460-line responsive.css with overrides
- Mobile styles scattered across files
- Needed !important hacks
- Difficult to find where styles were defined

### New Structure Benefits
- Only 10 CSS files with clear purpose
- Mobile-first responsive design integrated into components
- Modern CSS features (custom properties, clamp(), grid)
- Predictable cascade and specificity
- Easy to find and modify styles

## File Mapping

### Consolidated Files
| Old Files | New File | Purpose |
|-----------|----------|---------|
| `components/header.css`<br>`components/header/*.css`<br>`components/ticker.css` | `layout/header.css` | All header, nav, and ticker styles |
| `components/footer.css` | `layout/footer.css` | All footer styles |
| `components/card.css`<br>`components/article/*.css` | `components/cards.css` | All card variations |
| `components/subscribe/*.css`<br>`components/contact/*.css`<br>`utilities/buttons.css` | `components/forms.css` | All forms and buttons |
| `components/modal.css` | `components/modals.css` | All modal styles |
| `components/home.css`<br>`components/about.css`<br>`components/article.css`<br>`components/issues.css`<br>`components/contact.css`<br>`components/subscribe.css`<br>`components/search.css` | `pages/pages.css` | All page-specific styles |
| `components/responsive.css` | *Integrated into each file* | Responsive styles now live with their components |

## Class Name Changes

### Cards
- `.featured-card` → `.card--featured`
- `.recent-card` → `.card--recent`
- `.small-card` → `.card--small`
- `.staff-card` → `.card--staff`
- `.issue-card` → `.card--issue`

### Buttons
- `.button-primary` → `.btn.btn--primary`
- `.button-secondary` → `.btn.btn--secondary`
- `.button-subscribe` → `.btn.btn--primary`

### Forms
- Form inputs now use consistent `.form-input` class
- Error states use `.form-input--error`

## Migration Steps

### 1. Update HTML Import
Change in your HTML files:
```html
<!-- OLD -->
<link rel="stylesheet" href="css/main.css">

<!-- NEW -->
<link rel="stylesheet" href="css/main-new.css">
```

### 2. Update Class Names
Use find and replace to update class names across your HTML/JS files:
- Search for old class names listed above
- Replace with new class names

### 3. Remove Old CSS References
- Delete or archive the old CSS files
- Remove any inline style fixes or !important overrides

### 4. Test Responsive Behavior
- Test on mobile devices
- Verify all breakpoints work correctly
- Check that mobile navigation works

## Common Issues and Solutions

### Issue: Styles not applying
**Solution**: Check if class names were updated correctly

### Issue: Layout looks different
**Solution**: The new system uses modern CSS Grid - layouts may improve automatically

### Issue: Custom styles missing
**Solution**: Add them to the appropriate new file:
- Component modifications → relevant component file
- Page-specific styles → `pages/pages.css`
- Utility classes → `utilities/helpers.css`

## Best Practices Going Forward

1. **Mobile-First Development**
   - Start with mobile styles
   - Use min-width media queries
   - Test on real devices

2. **Use CSS Custom Properties**
   - All design tokens are in `base/variables.css`
   - Use variables for consistency

3. **Component Modifications**
   - Use modifier classes (e.g., `.card--featured`)
   - Keep variations in the same file

4. **Responsive Design**
   - Responsive styles live with their components
   - Use consistent breakpoints from variables

5. **No More Hacks**
   - No !important needed
   - Clear cascade hierarchy prevents conflicts

## Testing Checklist

- [ ] Header navigation works on all screen sizes
- [ ] Mobile menu opens and closes correctly
- [ ] Cards display properly at all breakpoints
- [ ] Forms are accessible and responsive
- [ ] Modals work on mobile devices
- [ ] Footer subscription form works
- [ ] All pages render correctly
- [ ] No horizontal scroll on mobile
- [ ] Fonts scale appropriately
- [ ] Images are responsive

## Quick Reference

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: ≥ 1024px

### File Organization
```
css/
├── base/           # Foundation
├── layout/         # Major layouts
├── components/     # Reusable components
├── pages/          # Page-specific
├── utilities/      # Helpers
└── main-new.css    # Entry point
```

### Where to Add New Styles
- Global typography → `base/typography.css`
- New component → Create in `components/`
- Page override → `pages/pages.css`
- Utility class → `utilities/helpers.css`