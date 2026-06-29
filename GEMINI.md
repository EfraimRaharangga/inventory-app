Project Guidelines: Inventory-app
1. Role & Scope
Primary Focus: Frontend development using React, Inertia.js, and Tailwind CSS.

Constraints: Do not modify backend files (Controllers, Models, Routes) unless explicitly requested.

2. Design System & Styling
Tailwind: Consistent use of flex/grid. Use `font-mono` for all data displays.
Color Palette: Use **cyan-400** as the primary accent. Base theme: **neutral-950** (background) and **neutral-800** (cards/borders).
UI Aesthetic: Prefer sharp borders over rounded corners to maintain a technical 'terminal' look.
Responsiveness: Mobile-first approach.

3. Component Guidelines
Reusability: All components must be designed to accept children or props to ensure high dynamism.

Structure:

Components/UI/: Reserved for atomic components (Button, Modal, Input, Label, Card).

Components/Layout/: Reserved for page structure and shared layouts.

Naming Convention: Use PascalCase for all component files (e.g., DeviceCard.jsx).

4. Coding Standard
React: Utilize Arrow Functions for all components.

State Management: Keep hooks (useState, useEffect) clean, concise, and focused.

Documentation: Include brief comments only for complex logic or non-obvious code paths.

5. Library Preferences
Icons: lucide-react.

Form Handling: useForm from @inertiajs/react.

Animations & Transitions: framer-motion (Mandatory for navbar transitions, modals, flash messages, and interactive elements).

6. Interaction Rules
Navigation: Implement smooth transitions for navbar menu toggles (e.g., fade-in, slide-down, or height expansion) using framer-motion's initial, animate, and exit props.

Feedback: Ensure consistent, fluid animations across all interactive elements to maintain a responsive user experience.

Performance: Always include skeleton loading states for data-heavy components (Cards/Tables) during fetch operations.