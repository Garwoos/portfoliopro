
# Portfolio Sam Maisonneuve

Bienvenue dans le portfolio de Sam Maisonneuve. Ce projet présente mes compétences et mes réalisations à travers une interface interactive et visuellement attrayante.

## Technologies Utilisées

### Frameworks et Bibliothèques

- **React** : Utilisé pour construire l'interface utilisateur de manière déclarative et composable.
- **TypeScript** : Fournit un typage statique pour améliorer la qualité du code et réduire les erreurs.
- **Vite** : Un outil de build rapide et léger pour les projets front-end.
- **Framer Motion** : Utilisé pour les animations fluides et interactives.
- **tsparticles** : Pour créer des effets de particules interactifs et visuellement attrayants.

### Techniques d'Optimisation

- **Utilisation de `requestAnimationFrame`** : Pour des animations plus fluides et efficaces, en synchronisant les mises à jour avec le taux de rafraîchissement de l'écran.
- **Tables de Lookup pour les Calculs Trigonométriques** : Pré-calcul des valeurs de sinus pour optimiser les performances des animations.
- **Réduction des Allocations de Mémoire** : Réutilisation des objets et des tableaux autant que possible pour minimiser les allocations de mémoire.
- **Web Workers** : Déchargement des calculs lourds hors du thread principal pour améliorer la réactivité de l'interface utilisateur.

### Techniques de Codage

- **Hooks React** : Utilisation de hooks comme `useState`, `useEffect`, et `useRef` pour gérer l'état et les effets secondaires dans les composants fonctionnels.
- **CSS-in-JS** : Utilisation de styles en ligne pour une gestion plus facile et dynamique des styles.
- **Modularité** : Code organisé en composants réutilisables et modulaires pour une meilleure maintenabilité.
- **TypeScript** : Utilisation de types et d'interfaces pour une meilleure documentation et une réduction des erreurs.

## Structure du Projet

- **`src/components`** : Contient les composants React utilisés dans l'application.
- **`src/data`** : Contient les données statiques utilisées dans l'application.
- **`src`** : Contient le point d'entrée principal de l'application (`main.tsx`).

## Installation et Lancement

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/votre-utilisateur/portfolioreact.git
   cd portfolioreact
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Lancer l'application** :
   ```bash
   npm run dev
   ```

4. **Accéder à l'application** :
   Ouvrez votre navigateur et allez à `http://localhost:3000`.

## Déploiement

Pour déployer l'application sur GitHub Pages :

1. **Construire l'application** :
   ```bash
   npm run build
   ```

2. **Déployer sur GitHub Pages** :
   ```bash
   npm run deploy
   ```

## Contribution

Les contributions sont les bienvenues ! Veuillez ouvrir une issue ou soumettre une pull request pour toute amélioration ou correction.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
