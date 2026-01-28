# Neuomorphism (Soft UI) Implementation Guide

## 1. Overview
Neuomorphism is a design language that bridges the gap between flat design and skeuomorphism. It creates a "Soft UI" where elements appear to be part of the background, either extruded (raised) or indented (sunken).

## 2. Core Principles
- **Color Matching**: The element surface must match the background color exactly.
- **Dual Shadows**: Depth is created using two shadows (one light, one dark) to simulate a 3D effect.
- **Lighting**: Assumes a single light source, typically from the top-left.
- **Softness**: Uses large blur radii and low-contrast shadow colors.
- **Geometry**: High border-radius (rounded corners) is essential for the "soft" feel.

## 3. Brand Palette & Semantic Tokens

The project uses semantic tokens to ensure consistency across themes.

### Semantic Tokens
- `nm-bg`: The base background color for the surface.
- `nm-text`: The primary text color.
- `nm-text-muted`: Muted/secondary text color.
- `nm-accent`: The primary brand accent (Orange).
- `nm-accent-text`: The text color to be used on top of the accent background (White).
- `nm-accent-light`: Subtle highlight tint for accent buttons (RGBA).
- `nm-accent-dark`: Subtle shadow tint for accent buttons (RGBA).

### Light Theme (Light Mode Grey)
- **Background (`nm-bg`)**: `#f0f0f0`
- **Text (`nm-text`)**: `#1c1e20`
- **Muted Text (`nm-text-muted`)**: `#6b7280`
- `nm-accent`: `#f15a2f` (Orange)
- `nm-accent-text`: `#ffffff` (White)
- `nm-accent-light`: `rgba(255, 255, 255, 0.2)`
- `nm-accent-dark`: `rgba(0, 0, 0, 0.2)`
- `nm-light-shadow`: `#ffffff`
- `nm-dark-shadow`: `#c8d0e7`

### Dark Theme (Dark Mode Palette)
- **Background (`nm-bg`)**: `#121212`
- **Text (`nm-text`)**: `#fffdf2`
- **Muted Text (`nm-text-muted`)**: `#9ca3af`
- **Accent (`nm-accent`)**: `#f15a2f` (Orange)
- **Accent Text (`nm-accent-text`)**: `#ffffff` (White)
- **nm-accent-light**: `rgba(255, 255, 255, 0.15)`
- **nm-accent-dark**: `rgba(0, 0, 0, 0.3)`
- **Light Shadow**: `#252525`
- **Dark Shadow**: `#050505`

## 4. CSS Formula
The effect is achieved using two box-shadows:

### Raised (Extruded)
```css
box-shadow: [distance] [distance] [blur] [dark-shadow],
            -[distance] -[distance] [blur] [light-shadow];
```

### Sunken (Pressed)
```css
box-shadow: inset [distance] [distance] [blur] [dark-shadow],
            inset -[distance] -[distance] [blur] [light-shadow];
```

## 5. Tailwind Utility Classes
The following utilities are available in `globals.css` with three depth levels (`sm`, `md`, `lg`):

- `.nm-flat-[sm|md|lg]`: Raised surfaces at different depths.
- `.nm-pressed-[sm|md|lg]`: Sunken surfaces for active states.
- `.nm-inset-[sm|md]`: Subtle sunken tracks for inputs and toggles.
- `.nm-convex-md`: Slightly rounded out surface.
- `.nm-concave-md`: Slightly rounded in surface.

## 6. Accessibility & Best Practices
- **Active Indicators**: Always use the brand orange for active states (toggles, sliders) to ensure high contrast.
- **Focus States**: Use `ring-2 ring-brand-orange` for keyboard accessibility.
- **Readability**: Ensure text colors maintain a contrast ratio of at least 4.5:1 against the background.
