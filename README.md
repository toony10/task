# Dashboard Starter Template

A modern, ready-to-use dashboard starter template built to accelerate your next admin panel or dashboard project. Save hours of setup time and focus on building your actual features.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-latest-black?style=flat-square)

## ✨ Features

- 🚀 **Next.js 16** with App Router
- 🎨 **Tailwind CSS 4** for styling
- 🧩 **shadcn/ui** components (Radix UI + Tailwind)
- 📱 **Responsive sidebar** with collapsible navigation
- 🔍 **Built-in search** for navigation pages
- 🌐 **RTL Support** out of the box
- 📁 **Organized folder structure** with separated layouts
- ⚡ **Fast development** with pnpm

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the dashboard.

---

## 🎨 Customization Guide

Follow these steps to customize the template for your project:

### Step 1: Update Logo

Replace the logo file with your own:

```
public/assets/images/logo.png
```

> Keep the same filename or update the import path in your components.

### Step 2: Update Favicon

Replace the favicon with your own:

```
src/app/favicon.ico
```

### Step 3: Set Your Brand Color

Update the primary color in `src/app/globals.css`:

```css
:root {
  --primary: #00548F;  /* ← Change this to your brand color */
  --primary-foreground: oklch(0.985 0 0);
  /* ... */
}
```

> You can also customize other theme variables like `--secondary`, `--accent`, etc.

### Step 4: Configure Navigation

Update your navigation structure in `src/config/navigation.ts`:

```typescript
export const navigation: NavGroup[] = [
  {
    items: [
      {
        title: 'Dashboard',
        url: '/',
        icon: Home,
        items: [
          { title: 'Analytics', url: '/analytics' },
          { title: 'Reports', url: '/reports' }
        ]
      },
      // Add more navigation items...
    ]
  }
]
```

### Step 5: Update User Info

Update the default user info in `src/config/navigation.ts`:

```typescript
export const user = {
  name: 'Your Name',
  email: 'your@email.com',
  avatar: '/avatars/user.jpg'
}
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (main)/           # Main dashboard pages (with sidebar)
│   │   ├── layout.tsx    # Main layout with sidebar
│   │   └── page.tsx      # Dashboard home
│   │
│   ├── (auth)/           # Authentication pages (no sidebar)
│   │   ├── layout.tsx    # Auth layout
│   │   └── login/        # Login page
│   │
│   ├── globals.css       # Global styles & theme variables
│   └── layout.tsx        # Root layout
│
├── components/
│   ├── app-sidebar/      # Sidebar components
│   ├── forms/            # Form components
│   ├── shared/           # Shared/reusable components
│   └── ui/               # shadcn/ui components
│
├── config/
│   └── navigation.ts     # Navigation configuration
│
├── hooks/                # Custom React hooks
│
└── lib/                  # Utility functions
```

### Layout System

| Folder | Purpose | Features |
|--------|---------|----------|
| `(main)/` | Dashboard pages | Sidebar, header, authenticated layout |
| `(auth)/` | Authentication pages | Clean layout, no sidebar |

> The parentheses `()` in folder names create route groups without affecting the URL path.

---

## 🌐 Multi-Language Support (i18n)

To add internationalization:

1. **Install i18n library** (recommended: `next-intl` or `next-i18next`)

```bash
pnpm add next-intl
```

2. **Configure language directions**

For RTL languages (Arabic, Hebrew, Persian):
```tsx
<main dir="rtl">
```

For LTR languages (English, French, etc.):
```tsx
<main dir="ltr">
```

3. **Dynamic direction based on locale**

```tsx
const direction = locale === 'ar' ? 'rtl' : 'ltr'
<main dir={direction}>
```

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

---

## 🛠️ Built With

- [Next.js 16](https://nextjs.org/) - React framework
- [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Radix UI](https://www.radix-ui.com/) - Headless UI primitives
- [Lucide Icons](https://lucide.dev/) - Beautiful icons

---

## 💡 Tips

- **Adding new pages**: Create files in `src/app/(main)/` for dashboard pages or `src/app/(auth)/` for auth pages
- **Adding components**: Use `npx shadcn@latest add [component]` to add more shadcn/ui components
- **Sidebar collapse**: Press `Ctrl/Cmd + B` to toggle sidebar
- **Search**: Use the search bar in sidebar to quickly navigate between pages

---

## 📄 License

This project is open source and available for personal and commercial use.

---

Made with ❤️ to save your development time
