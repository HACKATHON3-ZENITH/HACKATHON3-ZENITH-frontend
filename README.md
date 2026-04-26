# Zenith Learn - Frontend

## La formation qui crée des entrepreneurs, pas des spectateurs

La vision de **Zenith Learn** est de révolutionner l'apprentissage en ligne. Fini les plateformes qui vous gardent captifs avec des notifications incessantes et des séries (streaks) culpabilisantes. Zenith Learn est conçu selon la pédagogie **Skills2Job** : l'objectif n'est pas de consommer du contenu, mais de passer à l'action. 

Notre application privilégie la complétion réelle et le passage à l'acte entrepreneurial. Nos algorithmes (sans biais et expliquables) identifient votre profil (Explorateur, Entrepreneur actif) et vous recommandent exactement ce dont vous avez besoin pour bâtir votre projet, sans aucune rétention artificielle.

## Comment lancer le Frontend

L'interface de Zenith Learn est développée avec **React**, **TypeScript** et **Vite**.

1. Assurez-vous d'avoir Node.js installé, puis placez-vous dans le répertoire :
   ```bash
   cd zenith-frontend
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
4. L'interface s'ouvrira sur `http://localhost:3000`.

*Le frontend se connecte par défaut au Backend (`http://localhost:8080`) et directement au moteur ML (`http://localhost:8000`) pour récupérer les recommandations personnalisées dynamiques.*

## Utilisateurs de test (Générés au startup du backend)

Pour tester la vue personnalisée du catalogue complet (recommandations ML), utilisez ces identifiants préconfigurés par le backend :

- **Alice (Développement)** : `alice.dev@example.com`
- **Bob (Marketing)** : `bob.market@example.com`
- **Charlie (Finance)** : `charlie.fin@example.com`
- **Diana (Leadership)** : `diana.lead@example.com`

**Mot de passe utilisé pour tous les comptes** : `password123`
