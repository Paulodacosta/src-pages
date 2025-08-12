import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home as HomeIcon, Construction } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const PlaceholderPage = ({ title, icon }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col items-center justify-center min-h-[calc(100vh-250px)] text-center p-8"
  >
    <Card className="w-full max-w-lg glassmorphism-card">
      <CardHeader className="items-center">
        {icon && React.cloneElement(icon, { className: "h-16 w-16 text-primary mb-4" })}
        <CardTitle className="text-3xl font-bold text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-lg text-foreground/80">
          Cette section est en cours de construction. Reviens bientôt pour découvrir les fonctionnalités !
        </CardDescription>
        <Construction className="h-24 w-24 text-primary/30 mx-auto my-8 animate-pulse" />
        <Link to="/">
          <Button variant="outline" className="mt-8 border-primary text-primary hover:bg-primary/10">
            <HomeIcon className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Button>
        </Link>
      </CardContent>
    </Card>
  </motion.div>
);