# Zenith Learn - Frontend

Plateforme de formation entrepreneuriale éthique destinée aux marchés africains.

## Technologies

- **Framework**: React 18+ (Vite)
- **Langage**: TypeScript
- **Style**: TailwindCSS + CSS Modules (Tokens)
- **Gestion d'état**: Zustand
- **Données**: TanStack Query (React Query) + Axios
- **Icônes**: Lucide React

## Installation

```bash
# Dans le dossier zenith-frontend
npm install
```

## Lancement

```bash
# Mode développement
npm run dev
```

## Structure du Design System

Les variables de design sont centralisées dans `src/styles/tokens.css`.
Le thème supporte nativement le mode clair et sombre via la classe `.dark` sur l'élément `html`.

### Couleurs Principales
- **Primaire**: Vert Jungle (`#0D5C4D`)
- **Secondaire**: Or Africain (`#C49A28`)

## Architecture des dossiers

- `src/lib`: Configuration des bibliothèques externes (Axios, utils).
- `src/styles`: Fichiers CSS globaux et tokens.
- `src/hooks`: Hooks React personnalisés.
- `src/stores`: Stores Zustand.
- `src/components`: Composants UI réutilisables.
