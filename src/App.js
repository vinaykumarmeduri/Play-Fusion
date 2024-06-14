// src/App.js

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Settings from './components/Settings';
import Profile from './components/Profile';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Pubg from './components/game/Pubg';
import FreeFire from './components/game/FreeFire';
import LudoKing from './components/game/LudoKing';
import WCC2 from './components/game/WCC2';
import FFCreateTournament from './components/game/FFCreateTournament';
import PubgCT from './components/game/PubgCT';
import LudoKingCT from './components/game/LudoKingCT';
import WCCCT from './components/game/WCCCT';
import PubgTournaments from './components/game/PubgTournaments';
import FreefireTournaments from './components/game/FreeFireTournaments';
import LudoKingTournaments from './components/game/LudoKingTournaments';
import WCC2Tournaments from './components/game/WCC2Tournaments';
import GroupChats from './components/game/GroupChats';
import ChatGroup from './components/game/ChatGroup';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/game/pubg" element={<Pubg />} />
          <Route path="/game/freefire" element={<FreeFire />} />
          <Route path="/game/ludoking" element={<LudoKing />} />
          <Route path="/game/wcc2" element={<WCC2 />} />
          <Route path="/game/FFCreateTournament" element={<FFCreateTournament />} />
          <Route path="/game/PubgCT" element={<PubgCT />} />
          <Route path="/game/LudoKingCT" element={<LudoKingCT />} />
          <Route path="/game/WCCCT" element={<WCCCT />} />
          <Route path="/pubgtournamnets" element={<PubgTournaments />} />
          <Route path="/freefiretournamnets" element={<FreefireTournaments />} />
          <Route path="/ludokingtournamnets" element={<LudoKingTournaments />} />
          <Route path="/wcc2tournamnts" element={<WCC2Tournaments />} />
          <Route path="/group-chats" element={<GroupChats />} />
          <Route path="/chat/:groupName" element={<ChatGroup />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
