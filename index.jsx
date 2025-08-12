import React from 'react';
import { Users, Mail, ShieldCheck, Info, Bell, LayoutDashboard, BarChartBig, Settings, ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import { PlaceholderPage } from '@/pages/PlaceholderPage';

export { Home } from '@/pages/HomePage';
export { CGUPage } from '@/pages/CGUPage';
export { PlaceholderPage } from '@/pages/PlaceholderPage';
export { NotFound } from '@/pages/NotFoundPage';
export { default as AuthPage } from '@/pages/AuthPage';
export { default as RegisterPage } from '@/pages/RegisterPage';
export { DashboardPage } from '@/pages/DashboardPage';
export { TrackCaloriesPage } from '@/pages/TrackCaloriesPage';
export { MarketplacePage } from '@/pages/marketplace/MarketplacePage';
export { CreateListingPage } from '@/pages/marketplace/CreateListingPage';
export { MyListingsPage } from '@/pages/marketplace/MyListingsPage';


export const MeetModule = () => <PlaceholderPage title="Trouver un Partenaire" icon={<Users />} description="Recherche par niveau, genre, disponibilité, style de jeu. Bientôt, tu pourras swiper des profils et proposer des créneaux !"/>;
export const SocialModule = () => <PlaceholderPage title="Rencontrer (Social)" icon={<Users />} description="Section pour rencontres amicales ou plus. Swipe & Match bientôt disponibles !" />;
export const UserSettingsPage = () => <PlaceholderPage title="Paramètres Utilisateur" icon={<Settings />} description="Modifie ton profil, gère tes préférences et ta confidentialité." />;

export const Messages = () => <PlaceholderPage title="Messagerie" icon={<Mail />} description="Tes conversations privées avec d'autres membres." />;
export const Notifications = () => <PlaceholderPage title="Notifications" icon={<Bell />} description="Alertes pour les nouveaux matchs, messages, et activités de la marketplace." />;
export const AdminDashboard = () => <PlaceholderPage title="Tableau de Bord Admin" icon={<LayoutDashboard />} description="Interface de gestion pour les administrateurs." />;
export const PrivacyPolicyPage = () => <PlaceholderPage title="Politique de Confidentialité" icon={<ShieldCheck />} description="Comment nous protégeons tes données." />;
export const ContactPage = () => <PlaceholderPage title="Contacte-Nous" icon={<Mail />} description="Pour toute question ou assistance." />;
export const AboutPage = () => <PlaceholderPage title="À Propos de VillagePoint" icon={<Info />} description="Notre mission et notre histoire." />;

// Placeholder for old MarketplaceModule to avoid breaking existing imports if any, will be removed later.
export const MarketplaceModule = () => <PlaceholderPage title="Marketplace" icon={<ShoppingCartIcon />} description="Redirection vers la nouvelle page Marketplace..." />;
export const MarketplaceNewAd = () => <PlaceholderPage title="Créer une Annonce" icon={<ShoppingCartIcon />} description="Redirection vers la nouvelle page de création d'annonce..." />;
export const MarketplaceMyAds = () => <PlaceholderPage title="Mes Annonces" icon={<ShoppingCartIcon />} description="Redirection vers la nouvelle page de mes annonces..." />;