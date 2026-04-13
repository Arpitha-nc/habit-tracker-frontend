# Frontend Architecture

- **Framework:** React 19
- **Styling:** Tailwind CSS v4 (Vite plugin — no `postcss.config.js` needed)
- **Animation:** Framer Motion v12
- **Icons:** Lucide React

---

# Design Inspiration

The UI design reference:

https://stitch.withgoogle.com/projects/856584206099914114

The design style is called **Terminal Kinetic**.

Characteristics:

• dark neon interface  
• glass-like UI panels  
• asymmetrical layout  
• glowing accent colors

---

# Color Palette

Primary: #81ecff

Secondary: #2ff801

Tertiary: #d277ff

Background surfaces (exact Tailwind token names):

| Token         | Hex       | Use                     |
| ------------- | --------- | ----------------------- |
| `surface`     | `#0f141a` | Base page background    |
| `surfaceLow`  | `#141a21` | Card / inset background |
| `surfaceHigh` | `#20262f` | Elevated surface        |

Box shadows:

- `shadow-glow` — cyan glow at 45% opacity
- `shadow-neon` — cyan glow at 90% opacity

Background grid:

- `bg-grid` with `bg-size-grid` (40px) — subtle dot-grid overlay

---

# Typography

Headlines:
Space Grotesk

Body text:
Manrope

Counters should use tabular numeric style.

---

# UI Components

Habit Card

Displays:
• habit name
• streak
• completion action
• progress indicator

Card styling:

• layered surface
• glowing accent
• rounded edges

---

# XP Progress Bar

Gradient:

primary → secondary

Add a glowing head effect to indicate progress.

---

# Navigation

Top navigation bar must use:

• glassmorphism
• backdrop blur
• translucent surfaces

---

# Frontend Best Practices

• small reusable components
• avoid monolithic files
• separate UI from API logic
• use hooks for shared logic
