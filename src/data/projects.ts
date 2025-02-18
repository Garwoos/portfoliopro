export const projects = [
  {
    id: 1,
    titre: "Publicom.local",
    description: "Un projet basé sur PHP.",
    défi: "Créer une plateforme robuste et évolutive avec PHP.",
    solution: "Mise en œuvre de pratiques PHP efficaces et optimisation pour de meilleures performances.",
    technologies: ["PHP", "MySQL", "Docker"],
    image: "https://avatars.githubusercontent.com/u/115900098?v=4",
    urlDemo: "https://example.com/demo",
    urlGithub: "https://github.com/Garwoos/publicom.local"
  },
  {
    id: 2,
    titre: "Heavent",
    description: "Heavent est une application moderne et intuitive qui permet de créer, gérer et suivre des événements en toute simplicité, qu’il s’agisse de concerts, mariages, conférences ou fêtes privées. L'application propose une plateforme centralisée avec un système de notifications intelligentes et un historique détaillé pour assurer un suivi optimal.",
    objectif: "Offrir une solution fluide et efficace pour organiser des événements sans stress, tout en anticipant les imprévus et en facilitant la communication entre organisateurs et participants.",
    fonctionnalités: {
        gestion_evenements: [
            "Création rapide d’un événement avec tous les détails (nom, lieu, date, description, invités).",
            "Modification et mise à jour en temps réel.",
            "Suppression d’événements en cas d’annulation.",
            "Catégorisation des événements (Concert, Mariage, Soirée privée, Conférence, etc.)."
        ],
        notifications: [
            "Rappel automatique avant l’événement.",
            "Notification aux participants en cas de modification (changement d’horaire, de lieu…).",
            "Alertes personnalisées selon les préférences de l’utilisateur."
        ],
        historique: [
            "Journal des modifications : qui a changé quoi et quand.",
            "Suivi des confirmations et refus des invités.",
            "Archivage des anciens événements pour référence future."
        ],
        gestion_participants: [
            "Invitation et gestion de la liste des invités.",
            "Confirmation de présence avec options (présent, en retard, absent).",
            "Messagerie intégrée pour communiquer avec les participants."
        ],
        accessibilite: [
            "Disponible sur mobile et web.",
            "Synchronisation avec Google Calendar, Outlook et d’autres outils.",
            "Partage facile d’événements via un lien ou QR code."
        ]
    },
    défi: "Assurer la compatibilité et la performance avec Java tout en offrant une expérience utilisateur fluide et intuitive.",
    solution: "Utilisation des meilleures pratiques Java avec Spring Boot pour un backend robuste, Docker pour la scalabilité et des notifications en temps réel pour une gestion efficace.",
    technologies: ["Java", "Spring Boot", "Docker"],
    evolution_future: [
        "IA prédictive qui aide à planifier selon les tendances et préférences des utilisateurs.",
        "Mode collaboratif où plusieurs organisateurs peuvent gérer un même événement.",
        "Intégration avec des plateformes de billetterie pour gérer les entrées."
    ],
    conclusion: "Avec Heavent, plus besoin de stresser pour organiser un événement. Tout est sous contrôle, fluide et centralisé. L’événement parfait est à portée de main !",
    image: `${import.meta.env.BASE_URL}Heavent.png`,
    urlDemo: "https://example.com/demo",
    urlGithub: "https://github.com/Garwoos/Heavent"
  },
  {
    id: 3,
    titre: "Acti-Protect",
    description: "Un projet basé sur JavaScript.",
    défi: "Construire une application sécurisée et efficace avec JavaScript.",
    solution: "Application des meilleures pratiques JavaScript et mesures de sécurité.",
    technologies: ["JavaScript", "Node.js", "MongoDB"],
    image: "https://avatars.githubusercontent.com/u/115900098?v=4",
    urlDemo: "https://example.com/demo",
    urlGithub: "https://github.com/Garwoos/Acti-Protect"
  }
];