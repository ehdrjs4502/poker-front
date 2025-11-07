"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { PATH } from "@/_lib/constants/path";

interface Player {
  id: string;
  name: string;
  chips: number;
  position: number;
  cards?: string[];
  currentBet: number;
  isActive: boolean;
  isFolded: boolean;
  isDealer: boolean;
}

interface PokerGameBoardProps {
  roomId: string;
  onGameEnd: () => void;
}

export default function PokerGameBoard({ roomId, onGameEnd }: PokerGameBoardProps) {
  const router = useRouter();

  // TODO: WebSocket으로 실제 게임 데이터를 받아오도록 수정
  const [gameState] = useState({
    pot: 5000,
    communityCards: ["A♠", "K♥", "Q♦"],
    currentBet: 1000,
    bigBlind: 1000,
    smallBlind: 500,
  });

  const [players] = useState<Player[]>([
    {
      id: "1",
      name: "John Doe",
      chips: 9000,
      position: 0,
      cards: ["A♠", "K♠"],
      currentBet: 1000,
      isActive: true,
      isFolded: false,
      isDealer: true,
    },
    {
      id: "2",
      name: "Jane Smith",
      chips: 8500,
      position: 1,
      currentBet: 1000,
      isActive: false,
      isFolded: false,
      isDealer: false,
    },
    {
      id: "3",
      name: "Bob Johnson",
      chips: 7000,
      position: 2,
      currentBet: 0,
      isActive: false,
      isFolded: true,
      isDealer: false,
    },
  ]);

  const [betAmount, setBetAmount] = useState(gameState.currentBet);

  const handleFold = () => {
    // TODO: WebSocket으로 폴드 액션 전송
    console.log("Fold");
  };

  const handleCall = () => {
    // TODO: WebSocket으로 콜 액션 전송
    console.log("Call");
  };

  const handleRaise = () => {
    // TODO: WebSocket으로 레이즈 액션 전송
    console.log("Raise:", betAmount);
  };

  const handleAllIn = () => {
    // TODO: WebSocket으로 올인 액션 전송
    console.log("All In");
  };

  const handleLeaveGame = () => {
    router.push(PATH.MAIN);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-green-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-white">
            <h2 className="text-xl font-bold">텍사스 홀덤 포커</h2>
            <p className="text-sm text-green-200">
              BB: {gameState.bigBlind} / SB: {gameState.smallBlind}
            </p>
          </div>
          <Button variant="outline" onClick={handleLeaveGame} size="sm">
            나가기
          </Button>
        </div>

        {/* Poker Table */}
        <div className="relative bg-green-700 rounded-full border-8 border-yellow-700 shadow-2xl h-[500px] mb-6">
          {/* Center - Pot and Community Cards */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-center mb-4">
              <p className="text-yellow-400 font-bold text-2xl">Pot: {gameState.pot.toLocaleString()}</p>
            </div>
            {/* Community Cards */}
            <div className="flex gap-2 justify-center">
              {gameState.communityCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg w-16 h-24 flex items-center justify-center text-2xl font-bold shadow-lg"
                >
                  {card}
                </div>
              ))}
              {Array.from({
                length: 5 - gameState.communityCards.length,
              }).map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className="bg-gray-600 rounded-lg w-16 h-24 border-2 border-dashed border-gray-500"
                />
              ))}
            </div>
          </div>

          {/* Players around the table */}
          {players.map((player, index) => {
            const positions = [
              { top: "75%", left: "50%", transform: "translateX(-50%)" }, // Bottom (You)
              { top: "20%", left: "20%" }, // Top Left
              { top: "20%", left: "75%" }, // Top Right
            ];

            return (
              <div key={player.id} className="absolute" style={positions[index]}>
                <div
                  className={`bg-gray-800 rounded-lg p-3 min-w-[180px] border-2 ${
                    player.isActive ? "border-yellow-400 shadow-lg shadow-yellow-400/50" : "border-gray-600"
                  } ${player.isFolded ? "opacity-50" : ""}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {player.name[0]}
                      </div>
                      <span className="text-white font-semibold text-sm">{player.name}</span>
                    </div>
                    {player.isDealer && <Badge className="bg-yellow-600 text-xs">D</Badge>}
                  </div>
                  <div className="text-xs text-gray-300 mb-2">칩: {player.chips.toLocaleString()}</div>
                  {player.currentBet > 0 && (
                    <div className="text-xs text-yellow-400 font-bold">베팅: {player.currentBet.toLocaleString()}</div>
                  )}
                  {/* Player Cards (only show for active player) */}
                  {player.cards && index === 0 && (
                    <div className="flex gap-1 mt-2">
                      {player.cards.map((card, cardIndex) => (
                        <div
                          key={cardIndex}
                          className="bg-white rounded w-10 h-14 flex items-center justify-center text-lg font-bold"
                        >
                          {card}
                        </div>
                      ))}
                    </div>
                  )}
                  {player.isFolded && (
                    <Badge variant="secondary" className="mt-2 text-xs">
                      폴드
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="text-white">
              <p className="text-sm text-gray-400 mb-1">현재 베팅 금액</p>
              <p className="text-2xl font-bold">{gameState.currentBet.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={gameState.currentBet}
                max={players[0].chips}
                value={betAmount}
                onChange={(e) => setBetAmount(Number(e.target.value))}
                className="w-64"
              />
              <span className="text-white font-bold w-24 text-right">{betAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="destructive" onClick={handleFold} className="flex-1">
              폴드
            </Button>
            <Button variant="secondary" onClick={handleCall} className="flex-1">
              콜 ({gameState.currentBet.toLocaleString()})
            </Button>
            <Button onClick={handleRaise} className="flex-1">
              레이즈 ({betAmount.toLocaleString()})
            </Button>
            <Button variant="outline" onClick={handleAllIn} className="flex-1">
              올인
            </Button>
          </div>
        </div>

        {/* Game Info */}
        <div className="mt-4 bg-blue-900/20 border border-blue-700 rounded-lg p-3">
          <p className="text-blue-300 text-sm text-center">💡 당신의 차례입니다. 액션을 선택해주세요.</p>
        </div>
      </div>
    </div>
  );
}
