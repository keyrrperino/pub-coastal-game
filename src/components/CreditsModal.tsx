import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreditsModal({
  isOpen,
  onClose,
}: CreditsModalProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 10000); // Auto-hide after 10 seconds

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const teamMembers = {
    coastalProtectors: [
      { role: 'Questmaster of Timelines', name: 'Tom Garcia' },
      { role: 'Archmage of Code', name: 'Keyrr John Perino' },
      { role: 'High Cleric of Support', name: 'Ronnel Marfil' },
      { role: 'Grand Architect of Worlds', name: 'Carri Abenoja' },
      { role: 'Forgemaster of Artifacts', name: 'Grant Gutierrez' },
      { role: 'Envoy of the Sacred Curves', name: 'raff abenoja' },
      { role: 'Apprentice Healer of Bugs', name: 'emmanuel oriel' },
    ],
    galleryWall: [
      { role: 'Illusionist of Aesthetics', name: 'juril digamon' },
      { role: 'Phoenix Squire of Support', name: 'Bryan Jim Paano' },
      { role: 'Apprentice of the Guild', name: 'Louise the intern' },
    ],
    executive: [
      { role: 'Overlord of the Realm', name: 'Dave overton' },
      { role: 'Arch-Technomancer', name: 'raven duran' },
    ],
  };



  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Modal content */}
          <motion.div
            className="relative rounded-lg p-8 max-w-4xl w-full mx-4 overflow-y-auto"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 20,
              duration: 0.6
            }}
          >
            {/* Header */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.h1
                className="text-white text-xl mb-2"
                style={{
                  fontFamily: 'Novecento Bold, sans-serif',
                  fontWeight: 700,
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                Credits
              </motion.h1>
            </motion.div>

            {/* Teams Grid */}
            <motion.div
              className="flex flex-col justify-center items-start gap-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {/* Coastal Protectors Team */}
              <motion.div
                className="flex flex-col justify-center w-full items-center gap-2"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                <motion.div
                  className="w-full max-w-[606px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.2 }}
                >
                  <motion.h2
                    className="text-white text-2xl text-center mb-4"
                    style={{
                      fontFamily: 'novecento-sans-narrow, sans-serif',
                      fontWeight: 400,
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1.4 }}
                  >
                    COASTAL PROTECTORS TEAM
                  </motion.h2>
                </motion.div>

                {teamMembers.coastalProtectors.map((member, index) => (
                  <motion.div
                    key={index}
                    className="w-full max-w-[606px] flex items-center gap-2 flex-wrap"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 1.6 + index * 0.1 }}
                  >
                <span
                  className="text-white text-2xl"
                  style={{
                    fontFamily: 'novecento-sans-narrow, sans-serif',
                    fontWeight: 400,
                  }}
                >
                  {member.role}
                </span>
                <div className="flex-1 min-w-0 border-b border-dashed border-[#2A81FA] mx-2" />
                <span
                  className="text-white text-2xl text-right"
                  style={{
                    fontFamily: 'Novecento Bold, sans-serif',
                    fontWeight: 700,
                  }}
                >
                  {member.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Gallery Wall Team */}
              <motion.div
                className="flex flex-col justify-center w-full items-center gap-2"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.8 }}
              >
                <motion.div
                  className="w-full max-w-[606px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 2.0 }}
                >
                  <motion.h2
                    className="text-white text-2xl text-center mb-4"
                    style={{
                      fontFamily: 'novecento-sans-narrow, sans-serif',
                      fontWeight: 400,
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 2.2 }}
                  >
                    Gallery Wall Team
                  </motion.h2>
                </motion.div>

                {teamMembers.galleryWall.map((member, index) => (
                  <motion.div
                    key={index}
                    className="w-full max-w-[606px] flex items-center gap-2 flex-wrap"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 2.4 + index * 0.1 }}
                  >
                <span
                  className="text-white text-2xl"
                  style={{
                    fontFamily: 'novecento-sans-narrow, sans-serif',
                    fontWeight: 400,
                  }}
                >
                  {member.role}
                </span>
                <div className="flex-1 min-w-0 border-b border-dashed border-[#2A81FA] mx-2" />
                <span
                  className="text-white text-2xl text-right"
                  style={{
                    fontFamily: 'Novecento Bold, sans-serif',
                    fontWeight: 700,
                  }}
                >
                  {member.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Executive Team */}
              <motion.div
                className="flex flex-col justify-center w-full items-center gap-2"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.8 }}
              >
                <motion.div
                  className="w-full max-w-[606px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 3.0 }}
                >
                  <motion.h2
                    className="text-white text-2xl text-center mb-4"
                    style={{
                      fontFamily: 'novecento-sans-narrow, sans-serif',
                      fontWeight: 400,
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 3.2 }}
                  >
                    Executive team
                  </motion.h2>
                </motion.div>

                {teamMembers.executive.map((member, index) => (
                  <motion.div
                    key={index}
                    className="w-full max-w-[606px] flex items-center gap-2 flex-wrap"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 3.4 + index * 0.1 }}
                  >
                <span
                  className="text-white text-2xl"
                  style={{
                    fontFamily: 'novecento-sans-narrow, sans-serif',
                    fontWeight: 400,
                  }}
                >
                  {member.role}
                </span>
                <div className="flex-1 min-w-0 border-b border-dashed border-[#2A81FA] mx-2" />
                <span
                  className="text-white text-2xl text-right"
                  style={{
                    fontFamily: 'Novecento Bold, sans-serif',
                    fontWeight: 700,
                  }}
                >
                  {member.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Footer */}
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 3.8 }}
            >
              <motion.p
                className="text-white text-xl"
                style={{
                  fontFamily: 'Novecento Bold, sans-serif',
                  fontWeight: 700,
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 4.0 }}
              >
                ˗ˏˋ MADE WITH LOVE BY SYMPH ˎˊ˗
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

