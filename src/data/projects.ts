import { desc } from "framer-motion/client";

export const projects = [
  {
    id: 1,
    titre: "PubliCom",
    description: "Une application moderne et intuitive permettant aux municipalités de gérer facilement l'affichage des messages sur leurs panneaux d’information.",
    défi: "Assurer une gestion fluide et sécurisée des messages tout en proposant une interface intuitive pour les agents municipaux.",
    solution: "Mise en place d’une application en ligne permettant la création, la modification et la suppression de messages textuels. Sécurisation de l'accès et traçabilité des modifications.",
    objectif: "Offrir un outil efficace aux collectivités pour centraliser et simplifier la gestion de leurs communications publiques, avec un affichage dynamique et interactif.",
    fonctionnalités: {
      "Gestion des messages": [
        "Création et publication de messages avec un titre (32 caractères max) et un texte (160 caractères max).",
        "Modification et suppression des messages avec traçabilité.",
        "Gestion des statuts de diffusion ('En ligne' ou non)."
      ],
      "Sécurité et gestion des utilisateurs": [
        "Accès sécurisé avec gestion des droits.",
        "Historique détaillé des modifications avec suivi des utilisateurs."
      ],
      "Affichage et ergonomie": [
        "Interface de visualisation simulant un panneau d'affichage.",
        "Navigation intuitive entre les messages.",
        "Personnalisation des messages (ajout d’images de fond, polices, mises en page)."
      ]
    },
    technologies: ["Java", "Spring Boot", "Docker"],
    image: `${import.meta.env.BASE_URL}Publicom.png`,
    urlDemo: `${import.meta.env.BASE_URL}Publicom.mp4`,
    urlGithub: "https://github.com/Garwoos/PubliCom"
  },
  {
    id: 2,
    titre: "Heavent",
    description: "Heavent est une application moderne et intuitive qui permet de créer, gérer et suivre des événements en toute simplicité, qu’il s’agisse de concerts, mariages, conférences ou fêtes privées. L'application propose une plateforme centralisée avec un système de notifications intelligentes et un historique détaillé pour assurer un suivi optimal.",
    objectif: "Offrir une solution fluide et efficace pour organiser des événements sans stress, tout en anticipant les imprévus et en facilitant la communication entre organisateurs et participants.",
    fonctionnalités: {
        "Gestion des évenements": [
            "Création rapide d’un événement avec tous les détails (nom, lieu, date, description, invités).",
            "Modification et mise à jour en temps réel.",
            "Suppression d’événements en cas d’annulation.",
            "Catégorisation des événements (Concert, Mariage, Soirée privée, Conférence, etc.)."
        ],
        "Notifications": [
            "Rappel automatique avant l’événement.",
            "Notification aux participants en cas de modification (changement d’horaire, de lieu…).",
        ],
        "Historique": [
            "Journal des modifications : qui a changé quoi et quand.",
            "Archivage des anciens événements pour référence future."
        ],
        "Gestion des participants": [
            "Invitation et gestion de la liste des invités.",
        ],
        "Accessibilite": [
            "Application sur ordinateur",
        ],
        "Sécurite" : [
            "Système de connexion sécurisé avec authentification à deux facteurs.",
            "Chiffrement des données pour protéger la vie privée des utilisateurs.",
        ]
    },
    défi: "Assurer la compatibilité et la performance avec Java tout en offrant une expérience utilisateur fluide et intuitive.",
    solution: "Utilisation des meilleures pratiques Java avec Spring Boot pour un backend robuste, Docker pour la scalabilité et des notifications en temps réel pour une gestion efficace.",
    technologies: ["Java", "Spring Boot", "MySQL"],
    evolution_future: [
        "IA prédictive qui aide à planifier selon les tendances et préférences des utilisateurs.",
        "Mode collaboratif où plusieurs organisateurs peuvent gérer un même événement.",
        "Intégration avec des plateformes de billetterie pour gérer les entrées."
    ],
    conclusion: "Avec Heavent, plus besoin de stresser pour organiser un événement. Tout est sous contrôle, fluide et centralisé. L’événement parfait est à portée de main !",
    image: `${import.meta.env.BASE_URL}Heavent.png`,
    urlDemo: `${import.meta.env.BASE_URL}Heavent.mp4`,
    urlGithub: "https://github.com/Garwoos/Heavent"
  },
  {
    id: 3,
    titre: "StartAlarm",
    description: "StartAlarm est une plateforme permettant aux utilisateurs de concevoir et configurer leur propre système d’alarme, commander les équipements nécessaires et bénéficier d’une assistance technique dédiée.",
    défi: "Développer une solution intuitive pour la création et la gestion des systèmes d’alarme tout en garantissant la sécurité des données des utilisateurs.",
    solution: "Mise en place d’un configurateur 2D permettant de créer le plan de l’habitation et de positionner les éléments de sécurité. Intégration d’un système de devis et d’une interface de commande des équipements.",
    objectif: "Fournir un outil interactif et ergonomique permettant aux utilisateurs de concevoir leur propre système d’alarme, de simuler son efficacité et de commander directement les produits adaptés.",
    fonctionnalités: {
      "Gestion des utilisateurs et accès": [
        "Authentification sécurisée pour les utilisateurs et clients.",
        "Gestion des rôles : administrateur, utilisateur, client.",
        "Historique des modifications et suivi des actions."
      ],
      "Configuration du système d'alarme": [
        "Création d’un plan d’habitation en 2D avec positionnement des ouvertures (portes, fenêtres, etc.).",
        "Ajout et configuration des équipements de sécurité (détecteurs, caméras, sirènes, etc.).",
        "Positionnement intelligent des capteurs grâce à une intelligence artificielle."
      ],
      "Personnalisation et évaluation de la sécurité": [
        "Calcul d’un coefficient de sécurité basé sur la disposition des équipements.",
        "Affichage d’un rapport d’efficacité avec recommandations.",
        "Possibilité de modifier et optimiser l’implantation des équipements."
      ],
      "Caractéristiques techniques": [
        "Accès via un navigateur web sans installation requise.",
        "Compatible avec Windows et les principaux navigateurs (Chrome, Firefox, Edge).",
        "Utilisation de MySQL pour la gestion des données et Apache comme serveur d’application."
      ]
    },
    technologies: ["JavaScript", "React", "Node.js", "MariaDB", "Docker"],
    image: `${import.meta.env.BASE_URL}StartAlarm.png`,
    urlDemo: ``,
    urlGithub: ""
  }
];