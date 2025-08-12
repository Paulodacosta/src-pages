import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home as HomeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotFound = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, type: "spring" }}
    className="p-8 text-center flex flex-col items-center justify-center min-h-[calc(100vh-250px)]"
  >
    <img  alt="Confused tennis ball character" class="w-48 h-48 mb-8 opacity-70" src="https://images.unsplash.com/photo-1680298908216-344a4d9fb4fd" />
    <h1 className="text-6xl font-bold mb-4 text-destructive tracking-tighter">404</h1>
    <p className="text-2xl font-semibold text-foreground/80 mb-2">Oops! Page non trouvée.</p>
    <p className="text-lg text-muted-foreground mb-8 max-w-md">
      Il semblerait que cette page ait pris des vacances... ou peut-être qu'elle n'a jamais existé.
    </p>
    <Link to="/">
      <Button size="lg" className="group bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-primary-foreground">
        <HomeIcon className="mr-2 h-5 w-5" />
        Retourner à l'accueil
      </Button>
    </Link>
  </motion.div>
);