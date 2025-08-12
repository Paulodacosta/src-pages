import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Home as HomeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const CGUPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8 text-foreground"
    >
      <Card className="glassmorphism-card shadow-xl">
        <CardHeader className="border-b border-border/40">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="h-10 w-10 text-primary" />
            <div>
              <CardTitle className="text-3xl font-bold text-primary">Conditions Générales d’Utilisation</CardTitle>
              <CardDescription className="text-md text-muted-foreground">CGU Simplifiées de VillagePoint</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6 text-left">
          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">1. Qui peut s’inscrire ?</h2>
            <p className="text-foreground/80 leading-relaxed">
              VillagePoint est une Application réservée aux personnes âgées de 18 ans et plus. Les utilisateurs doivent être passionnés de tennis, membres d’un club ou motivés à rejoindre une communauté conviviale et bienveillante.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">2. Ce que tu peux faire</h2>
            <ul className="list-disc list-inside space-y-1 text-foreground/80 leading-relaxed">
              <li>Créer un profil.</li>
              <li>Rencontrer d’autres membres dans un cadre amical ou sportif.</li>
              <li>Vendre et acheter du matériel dans la marketplace.</li>
              <li>Discuter en toute liberté… avec respect.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">3. Ce que tu ne peux pas faire</h2>
            <ul className="list-disc list-inside space-y-1 text-foreground/80 leading-relaxed">
              <li>Poster du contenu inapproprié ou offensant.</li>
              <li>Vendre des produits illégaux ou sans rapport avec le tennis.</li>
              <li>Usurper l’identité d’un autre membre.</li>
              <li>Importuner ou harceler d’autres utilisateurs.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">4. Confidentialité et données</h2>
            <ul className="list-disc list-inside space-y-1 text-foreground/80 leading-relaxed">
              <li>Tes données sont utilisées uniquement pour le bon fonctionnement de l'App.</li>
              <li>Tu peux supprimer ton compte à tout moment.</li>
              <li>VillagePoint respecte le RGPD et ne revend pas tes infos.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">5. Modération</h2>
            <p className="text-foreground/80 leading-relaxed">
              L’équipe VillagePoint se réserve le droit de suspendre ou supprimer un compte ne respectant pas les règles, sans préavis. Le but est d’assurer une ambiance safe et fair play, comme sur un vrai terrain.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">6. Contact</h2>
            <p className="text-foreground/80 leading-relaxed">
              Des questions ? Besoin d’aide ? <br />
              Contacte-nous via l’appli ou par mail : <a href="mailto:contact@villagepoint.fr" className="text-primary hover:underline">contact@villagepoint.fr</a>.
            </p>
          </section>

          <div className="pt-6 text-center">
            <Link to="/">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <HomeIcon className="mr-2 h-4 w-4" />
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};