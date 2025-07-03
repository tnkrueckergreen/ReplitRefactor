# New CSS Architecture

## Overview
This is a complete refactor of the CSS architecture to solve the following problems:
- Overly fragmented files (32 CSS files reduced to ~10)
- Mobile styles scattered and unreliable
- Unclear cascade and specificity issues
- Difficulty finding where styles are defined
- Need for !important hacks

## New Structure

### 1. Base Layer (Foundation)
- `base/reset.css` - Normalize and reset styles
- `base/variables.css` - CSS custom properties (colors, spacing, typography)
- `base/typography.css` - Global type styles and scales

### 2. Layout Layer
- `layout/grid.css` - Grid systems and containers
- `layout/header.css` - Header and navigation (includes mobile)
- `layout/footer.css` - Footer styles

### 3. Components Layer
- `components/cards.css` - All card variations
- `components/forms.css` - All form styles
- `components/modals.css` - Modal and overlay styles

### 4. Pages Layer
- `pages/pages.css` - Page-specific styles (home, about, article, etc.)

### 5. Utilities Layer
- `utilities/helpers.css` - Utility classes and helpers

### Main Entry Point
- `main.css` - Imports all in correct order

## Key Principles

1. **Mobile-First**: All components designed mobile-first with min-width media queries
2. **Co-location**: Responsive styles live with their components, not in separate files
3. **Cascade Control**: Clear layer hierarchy prevents specificity wars
4. **Modern CSS**: Uses custom properties, grid, clamp(), etc.
5. **No Hacks**: Clean code without !important or other workarounds
6. **Easy to Find**: Logical organization makes it obvious where styles live

## Migration Notes
- All responsive styles integrated into their respective component files
- No more separate responsive.css file
- Media queries use consistent breakpoints defined as custom properties
- Component variations use modifier classes, not nested selectors