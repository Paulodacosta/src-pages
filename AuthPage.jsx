import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/config/supabaseClient';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

const AuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;
      toast({
        title: "Connexion réussie!",
        description: "Bienvenue à nouveau!",
        className: "bg-green-500 text-white",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: error.message || "Vérifiez vos identifiants et réessayez.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-slate-800 dark:to-neutral-900 p-4"
    >
      <Card className="w-full max-w-md shadow-2xl glassmorphism-card dark:bg-slate-800/80">
        <CardHeader className="text-center">
          <LogIn className="mx-auto h-12 w-12 text-primary dark:text-emerald-400 mb-4" />
          <CardTitle className="text-3xl font-bold text-primary dark:text-emerald-400">Connexion</CardTitle>
          <CardDescription className="text-muted-foreground dark:text-slate-400">Accédez à votre compte VillagePoint.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium dark:text-slate-300">Adresse e-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="votreadresse@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/80 dark:bg-slate-700/50 dark:text-slate-100 border-gray-300 dark:border-slate-600 focus:border-primary dark:focus:border-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium dark:text-slate-300">Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/80 dark:bg-slate-700/50 dark:text-slate-100 border-gray-300 dark:border-slate-600 focus:border-primary dark:focus:border-emerald-500 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute inset-y-0 right-0 h-full px-3 text-muted-foreground dark:text-slate-400 hover:text-primary dark:hover:text-emerald-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white font-semibold py-3 text-lg" disabled={isLoading}>
              {isLoading ? 'Connexion en cours...' : 'Se connecter'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2 pt-6">
          <Link to="/mot-de-passe-oublie" className="text-sm text-primary hover:underline dark:text-emerald-400 dark:hover:text-emerald-300">
            Mot de passe oublié ?
          </Link>
          <p className="text-sm text-muted-foreground dark:text-slate-400">
            Pas encore de compte ?{' '}
            <Link to="/inscription" className="font-semibold text-primary hover:underline dark:text-emerald-400 dark:hover:text-emerald-300">
              Inscrivez-vous
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AuthPage;