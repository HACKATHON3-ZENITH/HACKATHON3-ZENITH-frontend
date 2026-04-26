export const MOCK_COURSES = [
  {
    id: '1',
    title: 'Masterclass : Business Plan de A à Z',
    slug: 'business-plan-masterclass',
    shortDescription: 'Apprenez à structurer votre projet et à convaincre les investisseurs avec un Business Plan solide.',
    longDescription: 'Ce cours complet vous guide à travers chaque étape de la rédaction d\'un business plan professionnel. Que vous soyez au stade de l\'idée ou en pleine recherche de financement, vous apprendrez à modéliser votre stratégie, analyser votre marché et projeter vos finances avec précision.\n\nPourquoi ce cours ?\n- Méthodologie éprouvée\n- Modèles téléchargeables inclus\n- Études de cas réelles de startups africaines.',
    coverImageUrl: 'https://images.unsplash.com/photo-1454165833767-027ffea70288?q=80&w=800',
    level: 'BEGINNER',
    format: 'SELF_PACED',
    durationHours: 12,
    language: 'fr',
    categoryName: 'Business',
    creatorName: 'Amadou Koné',
    avgRating: 4.8,
    reviewCount: 124,
    enrolledCount: 1250,
    priceXaf: 15000,
    isEnrolled: false,
    modules: [
      {
        id: 'm1',
        title: 'Introduction et Vision',
        lessons: [
          { 
            id: 'l1', 
            title: 'Bienvenue dans la formation', 
            durationMinutes: 5, 
            type: 'VIDEO', 
            isPreview: true,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' 
          },
          { 
            id: 'l2', 
            title: 'Définir sa proposition de valeur', 
            durationMinutes: 15, 
            type: 'TEXT',
            isCompleted: true,
            contentHtml: `
              <h2>Pourquoi la proposition de valeur est cruciale ?</h2>
              <p>La proposition de valeur est la promesse de bénéfice que vous faites à vos clients. Ce n'est pas seulement votre produit ou service, c'est la <strong>solution précise</strong> à un problème qu'ils rencontrent au quotidien.</p>
              
              <div class="video-wrapper">
                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Proposition de valeur" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>

              <h3>Le Value Proposition Canvas</h3>
              <p>Dans ce chapitre, nous allons voir comment utiliser cet outil puissant (inventé par Alexander Osterwalder) pour aligner vos fonctionnalités sur les gains attendus par votre audience cible. Voici les piliers essentiels :</p>
              
              <ul>
                <li><strong>Identifier les "Pain Points" :</strong> quelles sont les douleurs ou frustrations de vos clients potentiels ?</li>
                <li><strong>Définir les "Gain Creators" :</strong> comment votre solution crée-t-elle des bénéfices ou résultats concrets ?</li>
                <li><strong>Rédiger un pitch percutant :</strong> résumer cette adéquation en moins de 30 secondes.</li>
              </ul>

              <blockquote>
                "Les clients ne s'intéressent pas à votre solution. Ils s'intéressent à leurs problèmes." <br />— <strong>Dave McClure</strong> (Fondateur de 500 Startups)
              </blockquote>
              
              <p>Pour la prochaine étape de cette leçon, téléchargez le modèle de canevas et essayez de le remplir avec votre propre idée d'entreprise avant de passer au quiz de validation.</p>
            `
          }
        ]
      },
      {
        id: 'm2',
        title: 'Étude de Marché',
        lessons: [
          { id: 'l3', title: 'Analyser la concurrence', durationMinutes: 20, type: 'VIDEO' },
          { id: 'l4', title: 'Savoir segmenter ses clients', durationMinutes: 12, type: 'VIDEO' },
          { id: 'l5', title: 'Quiz : Connaissance du marché', durationMinutes: 10, type: 'QUIZ' }
        ]
      },
      {
        id: 'm3',
        title: 'Modèle Économique',
        lessons: [
          { id: 'l6', title: 'Le Business Model Canvas', durationMinutes: 25, type: 'VIDEO' },
          { id: 'l7', title: 'Générer des revenus', durationMinutes: 15, type: 'TEXT' }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Marketing Digital : Stratégie 360°',
    slug: 'marketing-digital-360',
    shortDescription: 'Maîtrisez les réseaux sociaux, le SEO et la publicité en ligne pour booster vos ventes.',
    longDescription: 'Devenez un expert du marketing digital. Ce cours couvre tout ce dont vous avez besoin pour créer une présence en ligne percutante. Nous explorerons Facebook Ads, Google Search, et les stratégies de contenu qui engagent vraiment votre audience.',
    coverImageUrl: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=800',
    level: 'INTERMEDIATE',
    format: 'INSTRUCTOR_LED',
    durationHours: 24,
    language: 'fr',
    categoryName: 'Marketing',
    creatorName: 'Sarah Diop',
    avgRating: 4.9,
    reviewCount: 89,
    enrolledCount: 850,
    priceXaf: null, // Gratuit
    isEnrolled: true,
    userCompletionRate: 65,
    modules: [
      {
        id: 'm4',
        title: 'Fondamentaux du Digital',
        lessons: [
          { id: 'l8', title: 'L\'agorithme Facebook en 2024', durationMinutes: 18, type: 'VIDEO', isCompleted: true },
          { id: 'l9', title: 'Créer une marque forte', durationMinutes: 22, type: 'VIDEO', isCompleted: true }
        ]
      },
      {
        id: 'm5',
        title: 'Publicité Payante',
        lessons: [
          { id: 'l10', title: 'Installation du Pixel', durationMinutes: 30, type: 'VIDEO', isCompleted: true },
          { id: 'l11', title: 'Optimisation des campagnes', durationMinutes: 25, type: 'VIDEO' }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Développement Mobile avec Flutter',
    slug: 'flutter-mobile-dev',
    shortDescription: 'Créez des applications iOS et Android performantes avec un seul code source.',
    longDescription: 'Flutter est le framework de Google pour le développement multiplateforme. Ce cours pratique vous apprendra à construire des interfaces magnifiques et des fonctionnalités complexes.',
    coverImageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800',
    level: 'ADVANCED',
    format: 'SELF_PACED',
    durationHours: 45,
    language: 'fr',
    categoryName: 'Technologie',
    creatorName: 'Kevin Tene',
    avgRating: 4.7,
    reviewCount: 210,
    enrolledCount: 3200,
    priceXaf: 25000,
    isEnrolled: false,
    modules: [
      {
        id: 'm6',
        title: 'Le langage Dart',
        lessons: [
          { id: 'l12', title: 'Variables et Types', durationMinutes: 10, type: 'VIDEO' },
          { id: 'l13', title: 'Programmation Orientée Objet', durationMinutes: 40, type: 'VIDEO' }
        ]
      }
    ]
  },
  {
    id: '4',
    title: 'Leadership et Management d\'Équipe',
    slug: 'leadership-management',
    shortDescription: 'Développez votre posture de leader et apprenez à motiver vos collaborateurs au quotidien.',
    longDescription: 'Gérer une équipe ne s\'improvise pas. Apprenez les techniques de communication non-violente, la délégation efficace et la gestion des conflits.',
    coverImageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800',
    level: 'INTERMEDIATE',
    format: 'SELF_PACED',
    durationHours: 10,
    language: 'fr',
    categoryName: 'Soft Skills',
    creatorName: 'Fatou Ndiaye',
    avgRating: 4.6,
    reviewCount: 56,
    enrolledCount: 420,
    priceXaf: 10000,
    isEnrolled: false,
    modules: []
  },
  {
    id: '5',
    title: 'L\'Art de la Négociation Commerciale',
    slug: 'negociation-commerciale',
    shortDescription: 'Apprenez les techniques des meilleurs vendeurs pour conclure plus de contrats.',
    longDescription: 'La négociation est une compétence clé. Ce cours vous donne les scripts et les méthodes psychologiques pour réussir vos ventes B2B.',
    coverImageUrl: 'https://images.unsplash.com/photo-1556761175-5973eb0732da?q=80&w=800',
    level: 'INTERMEDIATE',
    format: 'SELF_PACED',
    durationHours: 8,
    language: 'fr',
    categoryName: 'Business',
    creatorName: 'Jean Bosco',
    avgRating: 4.5,
    reviewCount: 42,
    enrolledCount: 310,
    priceXaf: 5000,
    isEnrolled: true,
    userCompletionRate: 20,
    modules: []
  },
  {
    id: '6',
    title: 'Comptabilité pour non-comptables',
    slug: 'compta-simplifiee',
    shortDescription: 'Comprenez enfin vos bilans et comptes de résultats sans mal de tête.',
    longDescription: 'Ce cours démystifie la comptabilité. Idéal pour les chefs d\'entreprise qui veulent piloter leur activité avec des chiffres clairs.',
    coverImageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800',
    level: 'BEGINNER',
    format: 'SELF_PACED',
    durationHours: 15,
    language: 'fr',
    categoryName: 'Business',
    creatorName: 'Moussa Traoré',
    avgRating: 4.8,
    reviewCount: 33,
    enrolledCount: 180,
    priceXaf: 12000,
    isEnrolled: false,
    modules: []
  },
  {
    id: '7',
    title: 'Instagram pour Entrepreneurs Africains',
    slug: 'instagram-entrepreneurs',
    shortDescription: 'Optimisez votre profil et votre contenu pour vendre sur le continent.',
    longDescription: 'Découvrez comment utiliser les Reels et les Stories pour engager le marché local et continental.',
    coverImageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800',
    level: 'BEGINNER',
    format: 'SELF_PACED',
    durationHours: 6,
    language: 'fr',
    categoryName: 'Marketing',
    creatorName: 'Sarah Diop',
    avgRating: 4.9,
    reviewCount: 150,
    enrolledCount: 2100,
    priceXaf: 2000,
    isEnrolled: false,
    recoReason: 'Basé sur vos intérêts pour le e-commerce',
    modules: []
  },
  {
    id: '8',
    title: 'Gestion de Projet Agile (Scrum)',
    slug: 'agile-scrum-master',
    shortDescription: 'Devenez plus efficace dans vos projets complexes avec la méthode Scrum.',
    longDescription: 'Apprenez à organiser vos tâches, vos sprints et vos revues de projet comme les meilleures équipes tech au monde.',
    coverImageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800',
    level: 'ADVANCED',
    format: 'INSTRUCTOR_LED',
    durationHours: 32,
    language: 'fr',
    categoryName: 'Technologie',
    creatorName: 'Pauline Atangana',
    avgRating: 4.7,
    reviewCount: 67,
    enrolledCount: 540,
    priceXaf: 35000,
    isEnrolled: false,
    modules: []
  }
];
