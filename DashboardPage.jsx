import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { User, Zap, Users, ShoppingBag, Bell, BarChart2, Calendar, Edit3, Camera, Heart, MessageCircle, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ icon, title, value, actionLabel, actionLink, bgColorClass = "bg-primary/10", textColorClass = "text-primary" }) => (
  <motion.div
    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
    className="glassmorphism-card rounded-xl shadow-lg overflow-hidden h-full flex flex-col"
  >
    <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-2 ${bgColorClass}`}>
      <CardTitle className={`text-sm font-medium ${textColorClass}`}>{title}</CardTitle>
      {React.cloneElement(icon, { className: `h-5 w-5 ${textColorClass}` })}
    </CardHeader>
    <CardContent className="flex-grow flex flex-col justify-center">
      <div className={`text-2xl font-bold ${textColorClass}`}>{value}</div>
      {actionLabel && actionLink && (
        <Link to={actionLink} className="text-xs text-muted-foreground hover:text-primary mt-1">
          {actionLabel}
        </Link>
      )}
    </CardContent>
  </motion.div>
);

const QuickAccessButton = ({ icon, label, to }) => (
  <Link to={to} className="w-full">
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center justify-center space-y-2 p-4 bg-background hover:bg-accent rounded-lg shadow-md transition-all duration-200 glassmorphism-button h-full"
    >
      {React.cloneElement(icon, { className: "h-8 w-8 text-primary" })}
      <span className="text-sm font-medium text-center text-foreground">{label}</span>
    </motion.div>
  </Link>
);


export const DashboardPage = () => {
  const user = {
    pseudo: "TennisFan23",
    niveau: "Intermédiaire",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces",
    profileStatus: "Normal", // "Boosté"
    usersOnline: 127,
    pendingMatches: 3,
    newMatches: 2,
    marketplaceNotifications: 5,
    lastMeal: { name: "Salade Caesar", calories: 450 },
    nextActivity: { type: "Match amical", date: "Demain à 18h", opponent: "JoueuseX" }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-8 space-y-8"
    >
      {/* Section Profil et Statut */}
      <Card className="overflow-hidden shadow-xl glassmorphism-card">
        <div className="bg-gradient-to-r from-primary to-emerald-600 p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background shadow-lg">
              <AvatarImage src={user.avatarUrl} alt={user.pseudo} />
              <AvatarFallback>{user.pseudo.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">{user.pseudo}</h1>
              <p className="text-md text-primary-foreground/90">{user.niveau}</p>
              <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.profileStatus === "Boosté" ? "bg-amber-400 text-amber-900" : "bg-green-100 text-green-800"}`}>
                <Zap className={`h-4 w-4 mr-1.5 ${user.profileStatus === "Boosté" ? "text-amber-700" : "text-green-600"}`} />
                Profil {user.profileStatus}
              </span>
            </div>
            <div className="md:ml-auto pt-4 md:pt-0 flex flex-col items-center md:items-end space-y-2">
                <Link to="/profil/modifier">
                    <Button variant="secondary" size="sm" className="bg-background/20 hover:bg-background/30 text-primary-foreground">
                        <Edit3 className="mr-2 h-4 w-4" /> Modifier Profil
                    </Button>
                </Link>
                 {user.profileStatus === "Normal" && (
                     <Button variant="outline" size="sm" className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10">
                        <Zap className="mr-2 h-4 w-4" /> Booster Profil
                    </Button>
                 )}
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Rapides */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard icon={<Users />} title="Utilisateurs en ligne" value={user.usersOnline} />
        <StatCard icon={<Bell />} title="Matchs en attente" value={user.pendingMatches} actionLabel="Voir les matchs" actionLink="/matchs" bgColorClass="bg-amber-400/20" textColorClass="text-amber-600" />
        <StatCard icon={<ShoppingBag />} title="Nouveautés Marketplace" value={user.marketplaceNotifications} actionLabel="Explorer la boutique" actionLink="/marketplace" bgColorClass="bg-sky-400/20" textColorClass="text-sky-600" />
        <StatCard icon={<Calendar />} title="Prochaine activité" value={user.nextActivity.type} actionLabel={`${user.nextActivity.date} vs ${user.nextActivity.opponent}`} actionLink="/calendrier" bgColorClass="bg-violet-400/20" textColorClass="text-violet-600"/>
      </div>
      
      {/* Navigation Rapide */}
       <Card className="glassmorphism-card shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary">Accès Rapide</CardTitle>
          <CardDescription>Explore les fonctionnalités clés de VillagePoint.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <QuickAccessButton icon={<Users />} label="Partenaires" to="/rencontres" />
          <QuickAccessButton icon={<Heart />} label="Rencontrer" to="/social" />
          <QuickAccessButton icon={<ShoppingBag />} label="Boutique" to="/marketplace" />
          <QuickAccessButton icon={<Camera />} label="Track-Calories" to="/track-calories" />
          <QuickAccessButton icon={<MessageCircle />} label="Messages" to="/messages" />
        </CardContent>
      </Card>


      {/* Dernier Repas (Track-Calories) */}
      {user.lastMeal && (
        <Card className="glassmorphism-card shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-primary flex items-center"><BarChart2 className="mr-2 h-5 w-5"/>Dernier repas analysé</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-md">{user.lastMeal.name} - <span className="font-semibold">{user.lastMeal.calories} kcal</span></p>
            <Link to="/track-calories/historique">
              <Button variant="link" className="p-0 h-auto text-primary hover:underline mt-2">Voir l'historique</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};