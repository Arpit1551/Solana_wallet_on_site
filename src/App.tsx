import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen } from './types';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { ImportScreen } from './screens/ImportScreen';
import { DashboardScreen } from './screens/DashboardScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentScreen]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentScreen === 'welcome' && (
            <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <WelcomeScreen onNext={setCurrentScreen} />
            </motion.div>
          )}
          {currentScreen === 'import' && (
            <motion.div key="import" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ImportScreen 
                onBack={() => setCurrentScreen('welcome')} 
                onImport={() => setCurrentScreen('dashboard')} 
              />
            </motion.div>
          )}
          {currentScreen === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DashboardScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
