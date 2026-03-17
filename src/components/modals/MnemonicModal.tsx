import { Shield, AlertTriangle, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// const MNEMONIC = await localStorage.getItem('mnemonics')?.split(' ');

export const MnemonicModal = (
  { isOpen,
    onClose,
    MNEMONIC
  } : { isOpen: boolean, onClose: () => void, MNEMONIC: string[] }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative glass-card w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden bg-white"
        >
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-ink">Your Secret Recovery Phrase</h2>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="text-sm text-amber-800 leading-relaxed font-medium">
                Never share your recovery phrase with anyone. Anyone with this phrase can access your wallet.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {MNEMONIC.map((word, i) => (
                <div key={i} className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-2.5 rounded-lg">
                  <span className="text-[10px] font-bold text-slate-400 w-4">{i + 1}.</span>
                  <span className="text-sm font-semibold text-slate-700">{word}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all">
                <Copy className="w-5 h-5" />
                Copy to Clipboard
              </button>
              <button
                onClick={() => {
                  console.log(MNEMONIC);
                  onClose
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-secondary transition-all shadow-lg shadow-primary/20"
              >
                I've saved it
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);
