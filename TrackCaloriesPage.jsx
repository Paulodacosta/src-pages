import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { useUserData } from '@/hooks/useUserData';
import { sendImageToCalorieMamaProxy } from '@/services/calorieScanner'; 
import CaloriesChart from '@/components/track-calories/CaloriesChart';
import { TrackCaloriesUI } from '@/components/track-calories/TrackCaloriesUI';

const DAILY_CALORIE_TARGET = 2000; 

const useCreditManagement = (user, updateUserCredits, toast) => {
  const handleCreditForScan = async () => {
    if (!user) {
      toast({ title: "Utilisateur non trouvé", description: "Veuillez vous reconnecter.", variant: "destructive" });
      return false;
    }

    if (user.is_premium) {
      return true; 
    }
    
    const freeScansUsed = user.track_calories_usage || 0;
    if (freeScansUsed < 10) {
      // Logique pour décrémenter track_calories_usage si nécessaire (à gérer côté backend ou via hook useUserData)
      // Pour l'instant, on assume que useUserData gère la mise à jour de track_calories_usage après un scan réussi.
      // Si ce n'est pas le cas, il faudrait appeler une fonction ici pour incrémenter ce compteur.
      // Exemple: await incrementFreeScanUsage();
      toast({
        title: "Analyse gratuite utilisée",
        description: `Il vous reste ${10 - freeScansUsed -1} analyses gratuites.`,
        variant: "default"
      });
      return true;
    }


    if (user.credits > 0) {
      await updateUserCredits(user.credits - 1); // Ceci devrait être géré par useUserData
      toast({
        title: "Crédit utilisé",
        description: `Il vous reste ${user.credits - 1} crédits.`,
        variant: "default"
      });
      return true;
    } else {
      toast({
        title: "Crédits ou analyses gratuites épuisés",
        description: "Passez Premium pour des scans illimités ou achetez plus de crédits !",
        variant: "destructive",
        action: <Button onClick={() => { /* TODO: Implement navigation to premium page */ toast({title: "Bientôt disponible"})}}>Devenir Premium</Button>,
      });
      return false;
    }
  };
  return handleCreditForScan;
};


export const TrackCaloriesPage = () => {
  const [uploadedImagePreview, setUploadedImagePreview] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();
  const { user, mealLog, addMealToLog, updateUserCredits, loading: userLoading, incrementTrackCaloriesUsage } = useUserData();

  const handleCreditForScan = useCreditManagement(user, updateUserCredits, toast);
  const fileInputRef = useRef(null);

  const handleImageFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setUploadedImagePreview(null);
      setAnalysisResult(null);
      setError(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      setUploadedImagePreview(reader.result); 
      
      const canScan = await handleCreditForScan();
      if (!canScan) {
        setUploadedImagePreview(null); // Clear preview if scan is not allowed
        return;
      }
      
      setIsLoading(true);
      setError(null);
      setAnalysisResult(null);
      
      const base64Image = reader.result.split(',')[1];
      try {
        const data = await sendImageToCalorieMamaProxy(base64Image);
        
        if (data && data.length > 0) {
          setAnalysisResult(data); 
          // L'ajout au journal se fera via le bouton sur ResultCard
          toast({ title: "Analyse réussie!", description: `Nous avons trouvé ${data.length} aliment(s).`, variant: "success" });
          if (!user.is_premium && (user.track_calories_usage || 0) < 10) {
            await incrementTrackCaloriesUsage();
          }
        } else if (data && data.length === 0) {
          setAnalysisResult([]); // Pour afficher le message "Aucun aliment détecté"
          toast({ title: "Aucun aliment détecté", description: "L'API n'a pas pu identifier d'aliments.", variant: "warning" });
        } else {
          throw new Error("Format de réponse inattendu ou aucun aliment reconnu.");
        }
      } catch (err) {
        console.error("Error in handleImageFileChange (reader.onloadend):", err);
        setError(err.message || "Erreur lors de l'analyse de l'image.");
        // Le toast est déjà géré dans sendImageToCalorieMamaProxy
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = (fileReaderError) => {
      console.error("FileReader error:", fileReaderError);
      setError("Erreur lors de la lecture du fichier.");
      toast({ title: "Erreur Fichier", description: "Impossible de lire le fichier sélectionné.", variant: "destructive" });
      setIsLoading(false);
      setUploadedImagePreview(null);
    };
    reader.readAsDataURL(file);
  };
  
  const onScanMealClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Permet de re-sélectionner le même fichier
      fileInputRef.current.click();
    }
  };
  
  const onAddToJournalClick = (item) => {
    // S'assurer que les données correspondent à ce que addMealToLog attend
    const mealData = {
      food_name: item.food_name || item.name, // S'adapter aux variations de nom
      calories: item.calories,
      protein_g: item.protein_g || item.protein,
      fat_g: item.fat_g || item.fat,
      carbs_g: item.carbs_g || item.carbs,
      confidence: item.confidence,
      image_url: item.image_url || uploadedImagePreview // Utiliser l'image uploadée si l'API n'en fournit pas
    };
    addMealToLog(mealData);
    toast({
      title: "Ajouté au journal",
      description: `${mealData.food_name} a été ajouté à votre journal alimentaire.`,
      variant: "success"
    });
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };
  
  const userStatus = {
    isPremium: user?.is_premium || false,
    canUseForFree: (user?.track_calories_usage || 0) < 10,
    credits: user?.credits || 0,
    remainingFreeScans: Math.max(0, 10 - (user?.track_calories_usage || 0))
  };

  if (userLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary dark:text-emerald-400">
            <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.93005 4.92993L7.76005 7.75993" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.24 16.2401L19.07 19.0701" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.93005 19.0701L7.76005 16.2401" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.24 7.75993L19.07 4.92993" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8 px-4 space-y-8"
    >
      <TrackCaloriesUI
        userStatus={userStatus}
        isLoading={isLoading}
        error={error}
        analysisResult={analysisResult} 
        uploadedImagePreview={uploadedImagePreview}
        mealLog={mealLog}
        chartData={mealLog} 
        dailyTarget={DAILY_CALORIE_TARGET}
        CaloriesChartComponent={CaloriesChart}
        onScanMealClick={onScanMealClick}
        onSubscribeClick={() => { toast({title: "Bientôt disponible", description: "L'abonnement premium sera bientôt disponible."})}}
        onBuyCreditsClick={() => { toast({title: "Bientôt disponible", description: "L'achat de crédits sera bientôt disponible."})}}
        onAddToJournalClick={onAddToJournalClick}
        fileInputRef={fileInputRef}
        handleImageUpload={handleImageFileChange}
      />
    </motion.div>
  );
};
