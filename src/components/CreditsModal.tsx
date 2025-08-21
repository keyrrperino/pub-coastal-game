import React, { useEffect } from 'react';

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
      }, 5000); // Auto-hide after 5 seconds

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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Modal content */}
      <div className="relative rounded-lg p-8 max-w-4xl w-full mx-4 overflow-y-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-white text-xl mb-2"
            style={{
              fontFamily: 'Novecento Bold, sans-serif',
              fontWeight: 700,
            }}
          >
            Credits
          </h1>
        </div>

        {/* Teams Grid */}
        <div className="flex flex-col justify-center items-start gap-10">
          {/* Coastal Protectors Team */}
          <div className="flex flex-col justify-center w-full items-center gap-2">
            <div className="w-full max-w-[606px]">
              <h2
                className="text-white text-2xl text-center mb-4"
                style={{
                  fontFamily: 'novecento-sans-narrow, sans-serif',
                  fontWeight: 400,
                }}
              >
                COASTAL PROTECTORS TEAM
              </h2>
            </div>

            {teamMembers.coastalProtectors.map((member, index) => (
              <div
                key={index}
                className="w-full max-w-[606px] flex items-center gap-2 flex-wrap"
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
              </div>
            ))}
          </div>

          {/* Gallery Wall Team */}
          <div className="flex flex-col justify-center w-full items-center gap-2">
            <div className="w-full max-w-[606px]">
              <h2
                className="text-white text-2xl text-center mb-4"
                style={{
                  fontFamily: 'novecento-sans-narrow, sans-serif',
                  fontWeight: 400,
                }}
              >
                Gallery Wall Team
              </h2>
            </div>

            {teamMembers.galleryWall.map((member, index) => (
              <div
                key={index}
                className="w-full max-w-[606px] flex items-center gap-2 flex-wrap"
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
              </div>
            ))}
          </div>

          {/* Executive Team */}
          <div className="flex flex-col justify-center w-full items-center gap-2">
            <div className="w-full max-w-[606px]">
              <h2
                className="text-white text-2xl text-center mb-4"
                style={{
                  fontFamily: 'novecento-sans-narrow, sans-serif',
                  fontWeight: 400,
                }}
              >
                Executive team
              </h2>
            </div>

            {teamMembers.executive.map((member, index) => (
              <div
                key={index}
                className="w-full max-w-[606px] flex items-center gap-2 flex-wrap"
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
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p
            className="text-white text-xl"
            style={{
              fontFamily: 'Novecento Bold, sans-serif',
              fontWeight: 700,
            }}
          >
            ˗ˏˋ MADE WITH LOVE BY SYMPH ˎˊ˗
          </p>
        </div>
      </div>
    </div>
  );
}

