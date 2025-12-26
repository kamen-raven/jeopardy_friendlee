'use client';

import React, { useState } from 'react';
import styles from './TeamBoard.module.scss';
import { TeamCard } from './elements';


export interface Team {
  id: number;
  name: string;
  score: number;
}



const TeamBoard: React.FC = () => {
  const teamData = [
    { id: 1, name: 'Команда 1', score: 0 },
    { id: 2, name: 'Команда 2', score: 0 },
    { id: 3, name: 'Команда 3', score: 0 },
    { id: 4, name: 'Команда 4', score: 0 },
  ];

  const [teams, setTeams] = useState<Team[]>(teamData);

  //# Изменение имени команды
  const handleNameChange = (teamId: number, newName: string) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) => (team.id === teamId ? { ...team, name: newName } : team)),
    );
  };

  //# Добавление очков команде
  const handleScoreAdd = (teamId: number, points: number) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === teamId ? { ...team, score: team.score + points } : team,
      ),
    );
  };

  //# Сброс очков команды
  const handleScoreReset = (teamId: number) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) => (team.id === teamId ? { ...team, score: 0 } : team)),
    );
  };

  const maxScore = Math.max(...teams.map((team) => team.score));

  return (
    <div className={styles.teamBoard}>
      {teams.map((team) => (
        <TeamCard
          key={team.id}
          team={team}
          maxScore={maxScore}
          onNameChange={handleNameChange}
          onScoreAdd={handleScoreAdd}
          onScoreReset={handleScoreReset}
        />
      ))}
    </div>
  );
};

export { TeamBoard };