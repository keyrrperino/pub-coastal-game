import React from 'react';
import { SplineTriggersEnum, useGameContext } from './GlobalGameContext';
import ResetButton from './components/ResetButton';
import StartButton from './components/StartButton';

const pillBase =
  'font-bold text-[100%] rounded-full w-10 h-10 flex items-center justify-center mx-2 shadow cursor-pointer transition';
const pillSelected = 'bg-[#cdcdfc] text-[#1B1B6B]';
const pillUnselected = 'bg-[#1B1B6B] text-white';

const buttonBase =
  'bg-[#4B2992] text-white font-bold text-[100%] rounded-[20px] py-2 px-8 ml-3 shadow hover:bg-[#3a2173] transition cursor-pointer';
const smallButtonBase =
  'bg-[#4B2992] text-white font-bold text-[100%] rounded-[20px] py-2 px-8 shadow hover:bg-[#3a2173] transition cursor-pointer';

const SplineActionButtons: React.FC = () => {
  const {
    seawallValue,
    revetmentValue,
    setSeawallValue,
    setRevetmentValue,
    triggerSeawallBuild,
    triggerRevetmentBuild,
    triggerSingleBuild,
    isGameLoaded,
    isGameStarted
  } = useGameContext();

  const renderStartAndResetButton = (
    <div className="flex gap-2 justify-center mb-3">
      {isGameStarted && <ResetButton onClick={() => triggerSingleBuild(SplineTriggersEnum.RESTART_BTN)} />}
      {!isGameStarted && <StartButton onClick={() => triggerSingleBuild(SplineTriggersEnum.RAISE_WATER_BTN)} />}
    </div>
  )

  const renderActionButtons = (
    isGameStarted && <div className="flex flex-col lg:flex-row justify-center gap-6">
      <div>
        {/* Seawall */}
        <div className="bg-[#8EC3E6] rounded-[1vw] py-6 px-8 mb-6 flex items-center">
          <span className="font-bold text-[100%] text-white tracking-wider mr-6 flex items-center">
            SEAWALL
          </span>
          {[5, 10, 15].map((val) => (
            <span
              key={val}
              className={
                pillBase + ' ' + (seawallValue === val ? pillSelected : pillUnselected)
              }
              onClick={() => setSeawallValue(val)}
            >
              {val}
            </span>
          ))}
          <button className={buttonBase} onClick={triggerSeawallBuild}>BUILD</button>
        </div>
        {/* Revetment */}
        <div className="bg-[#8EC3E6] rounded-[1vw] py-6 px-8 mb-6 flex items-center">
          <span className="font-bold text-[100%] text-white tracking-wider mr-6 flex items-center">REVETMENT</span>
          {[10, 20].map((val) => (
            <span
              key={val}
              className={
                pillBase + ' ' + (revetmentValue === val ? pillSelected : pillUnselected)
              }
              onClick={() => setRevetmentValue(val)}
            >
              {val}
            </span>
          ))}
          <button className={buttonBase} onClick={triggerRevetmentBuild}>BUILD</button>
        </div>
      </div>
      {/* Right Panel */}
      <div className="flex flex-col lg:flex-row gap-6 justify-center">
        {/* Plant Mangroves */}
        <div className="bg-[#8EC3E6] rounded-[1vw] py-4 px-8 flex flex-col max-w-[300px]">
          <span className="font-bold text-[100%] text-white tracking-wider mb-2">PLANT MANGROVES</span>
          <div className="flex gap-4 flex-col">
            <button className={buttonBase} onClick={() => { triggerSingleBuild(SplineTriggersEnum.WEST_MANGROVES_BTN) }}>WEST COAST</button>
            <button className={buttonBase} onClick={() => { triggerSingleBuild(SplineTriggersEnum.EAST_MANGROVES_BTN) }}>EAST COAST</button>
            <button className={buttonBase} onClick={() => { triggerSingleBuild(SplineTriggersEnum.SOUTH_MANGROVES_BTN) }}>SOUTH COAST</button>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {/* Reclaim Area */}
          <div className="bg-[#8EC3E6] rounded-[1vw] py-4 px-8 flex flex-col max-w-[300px]">
            <span className="font-bold text-[100%] text-white tracking-wider mb-2">RECLAIM AREA</span>
            <div className="flex gap-4 flex-col">
              <button className={buttonBase} onClick={() => { triggerSingleBuild(SplineTriggersEnum.WEST_RECLAMATION_BTN) }}>WEST COAST</button>
              <button className={buttonBase} onClick={() => { triggerSingleBuild(SplineTriggersEnum.EAST_RECLAMATION_BTN) }}>EAST COAST</button>
            </div>
          </div>
          {/* Build Earth Bunds */}
          <div className="bg-[#8EC3E6] rounded-[1vw] py-2 px-6 min-w-0 flex flex-col max-w-[300px]">
            <button className={smallButtonBase} onClick={() => { triggerSingleBuild(SplineTriggersEnum.EAST_EARTH_BUNDS_BTN) }}>BUILD EARTH BUNDS</button>
          </div>
        </div>
      </div>
    </div>
  )

  return isGameLoaded && (
    <>
      {renderStartAndResetButton}
      {renderActionButtons}
    </>
  );
};

export default SplineActionButtons; 