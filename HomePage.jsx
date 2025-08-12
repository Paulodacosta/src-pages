import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-250px)] text-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-10"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-emerald-500 to-teal-400">
            VillagePoint
          </span>
        </h1>
        <p className="text-2xl md:text-3xl font-semibold text-muted-foreground">
          Joue. Rencontre. Partage.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="max-w-2xl mx-auto mb-10"
      >
        <p className="text-lg text-foreground/80 leading-relaxed">
          La première App sociale et marketplace des passionnés de tennis. 
          Rencontre des partenaires de jeu de ton niveau, fait des rencontres amicales (ou plus si affinités) et déniche des produits et du matériel sans te ruiner !
        </p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 w-full max-w-3xl"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: 0.5,
              staggerChildren: 0.2
            }
          }
        }}
      >
        <FeatureCard
          to="/rencontres"
          icon={<Users className="h-12 w-12 text-primary mb-4" />}
          title="Trouver des Partenaires"
          description="Connecte-toi avec des joueurs de ton niveau, organise des matchs et partage ta passion pour le tennis."
          buttonText="Explorer les Rencontres"
        />
        <FeatureCard
          to="/marketplace"
          icon={<ShoppingCart className="h-12 w-12 text-primary mb-4" />}
          title="Marketplace Sportive"
          description="Achète, vends ou échange du matériel de tennis : raquettes, balles, vêtements, accessoires et plus encore."
          buttonText="Visiter la Marketplace"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8, type: "spring", stiffness: 120 }}
        className="space-x-4"
      >
        <Link to="/profil">
          <Button size="lg" className="group bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-primary-foreground shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
            Créer un compte
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
        <Link to="/connexion">
          <Button size="lg" variant="outline" className="group border-primary text-primary hover:bg-primary/10 hover:text-primary shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
              Se connecter
          </Button>
        </Link>
      </motion.div>

      <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl">
        <motion.div whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }} className="glassmorphism-card p-4 aspect-[4/3] flex items-center justify-center">
          <img  alt="Tennis racket and ball on a court" class="w-full h-full object-cover rounded-md" src="https://images.unsplash.com/photo-1692399884246-2082cb265592" />
        </motion.div>
         <motion.div whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }} className="glassmorphism-card p-4 aspect-[4/3] flex items-center justify-center">
          <img  alt="Two tennis players shaking hands over the net" class="w-full h-full object-cover rounded-md" src="https://images.unsplash.com/photo-1696661115319-a9b6801e2571" />
        </motion.div>
         <motion.div whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }} className="glassmorphism-card p-4 aspect-[4/3] flex items-center justify-center">
          <img  alt="Aerial view of a tennis court complex" class="w-full h-full object-cover rounded-md" src="https://images.unsplash.com/photo-1648696810668-b09311cc068e" />
        </motion.div>
         <motion.div whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }} className="glassmorphism-card p-4 aspect-[4/3] flex items-center justify-center">
          <img  alt="Collection of various tennis gear and apparel" class="w-full h-full object-cover rounded-md" src="https://images.unsplash.com/photo-1692399884246-2082cb265592" />
        </motion.div>
      </div>
    </div>
  );
};

const FeatureCard = ({ to, icon, title, description, buttonText }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      variants={cardVariants}
      className="glassmorphism-card p-6 sm:p-8 rounded-xl shadow-xl flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300 backdrop-blur-md border border-white/20 dark:border-white/10"
    >
      {icon}
      <h2 className="text-xl sm:text-2xl font-bold mb-3 text-primary">{title}</h2>
      <p className="text-sm sm:text-base text-foreground/70 mb-6 flex-grow">{description}</p>
      <Link to={to} className="w-full">
        <Button variant="outline" className="w-full mt-auto border-primary text-primary hover:bg-primary/10 hover:text-primary transition-all duration-200">
          {buttonText} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </motion.div>
  );
};