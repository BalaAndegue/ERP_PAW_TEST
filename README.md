# Yowyob ERP - Gestion des Tiers Externes

Yowyob ERP est une application web moderne construite avec Next.js, React, TypeScript et Tailwind CSS, dédiée à la gestion des tiers externes (clients, fournisseurs, partenaires, prospects, commerciaux).

## Fonctionnalités principales

- **Gestion des tiers** : Ajout, modification, suppression et visualisation des clients, fournisseurs, partenaires et prospects.
- **Tableaux de bord** : Statistiques, graphiques et activités récentes.
- **Import/Export** : Export des données en CSV, Excel, PDF et import de fichiers.
- **Formulaires dynamiques** : Saisie d'informations détaillées sur les entreprises, contacts, adresses, etc.
- **Notifications et toasts** : Retour utilisateur sur les actions.
- **PWA** : Fonctionnalités offline et installation sur mobile.
- **Thème clair/sombre** : Support du mode sombre.
- **Sécurité** : Headers HTTP renforcés via middleware.

## Structure du projet

```
.
├── app/                 # Pages Next.js (layout, dashboard, offline, tiers, etc.)
├── components/          # Composants UI et formulaires
    ├── dashboard/       # charts , header, quick-actions, recent-activity, stats
    ├── dialogs/         # createTierDialog
│   ├── forms/           # Formulaires (Client, Fournisseur, Prospect, Commercial)
│   ├── ui/              # Composants UI réutilisables (Card, Button, Select, etc.)
    ├── tiers/           # tiers-filters, tiers-header, tiers-table
│   └── layout/          # Sidebar, Header, etc.
    ├── theme-providers  # la gestion du theme 
├── hooks/               # Hooks personnalisés (use-tiers, use-toast, etc.)
├── lib/                 # Fonctions utilitaires et API (export-utils, api/tiers.ts)
├── public/              # Fichiers statiques (sw.js, icons, manifest)
├── stores/              # State management (zustand)
├── types/               # Types TypeScript (tiers, etc.)
├── styles/              # Fichiers CSS globaux
├── middleware.ts        # Middleware Next.js pour la sécurité et PWA
├── tailwind.config.ts   # Configuration Tailwind CSS
├── next.config.js       # Configuration Next.js
└── package.json         # Dépendances et scripts
```

## Installation

1. **Cloner le dépôt**
   ```sh
   git clone https://github.com/BalaAndegue/ERP_PAW_TEST.git
   cd ERP_PAW_TEST
   ```

2. **Installer les dépendances**
   ```sh
   npm install
   ```

3. **Configurer les variables d'environnement**

   Créez un fichier `.env.local` à la racine et ajoutez :
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   ```

4. **Lancer le projet en développement**
   ```sh
   npm run dev
   ```

5. **Accéder à l'application**
   - Ouvrez [http://localhost:3000](http://localhost:3000)

## Scripts utiles

- `npm run dev` : Démarre le serveur de développement Next.js
- `npm run build` : Build de l'application pour la production
- `npm run start` : Démarre le serveur en mode production
- `npm run lint` : Lint du code avec ESLint

## Technologies utilisées

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/) (state management)
- [TanStack Query](https://tanstack.com/query/latest) (data fetching)
- [Radix UI](https://www.radix-ui.com/) (composants accessibles)
- [Lucide Icons](https://lucide.dev/) (icônes)
- [JSPDF, XLSX](https://github.com/MrRio/jsPDF) (export PDF/Excel)

## PWA & Offline

- L'application est installable sur mobile et fonctionne hors-ligne grâce à un service worker ([public/sw.js](public/sw.js)).
- Une page dédiée s'affiche en cas de perte de connexion ([app/offline/page.tsx](app/offline/page.tsx)).

## Contribution

Les contributions sont les bienvenues !  
Merci de créer une issue ou une pull request pour toute suggestion ou amélioration.

---

© Yowyob ERP