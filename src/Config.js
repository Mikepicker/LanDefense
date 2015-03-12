// Gameplay Data
var CONFIG =
{
	// Game State data
	initialGolds: 0,
	lives: 20,
	
	// Misc
	reinforcementCost: 800,
	
	// Skills
	earthstrikeDamage: 130,
	earthstrikeImpulse: 50,
	earthstrikeRange: 300,
	multiplearrowsSize: 10,
	multiplearrowsRange: 800,
	
	// Weapons
	fireArrowsDamageOverTime: 10,
	fireArrowsBurningTime: 10000,
	fireArrowsDamage: 40,
	fireArrowsSpeed: 0.3,
	
	// Missiles
	arrowSpeed: 0.3,
	magicBallSpeed: 0.3,
	
	// Player Characters data
	playerRegenRate: 5,
	
	warriorHealth: 1000,
	warriorShootingCooldown: 800,
	warriorMeleeDmg: 60,
	warriorRangeDmg: 50,
	warriorSpeed: 4,
	warriorSkillCooldown: 10000,
	
	rangerHealth: 800,
	rangerShootingCooldown: 500,
	rangerMeleeDmg: 20,
	rangerRangeDmg: 50,
	rangerSpeed: 5,
	rangerSkillCooldown: 15000,
	
	wizardHealth: 600,
	wizardShootingCooldown: 500,
	wizardMeleeDmg: 10,
	wizardRangeDmg: 70,
	wizardSpeed: 4,
	wizardSkillCooldown: 20000,
	
	// Infantry (Reinforcement) data
	infantryHealth: 800,
	infantryFov: 150,
	infantryChaseRange: 150,
	infantryMeleeDmg: 20,
	infantrySpeed: 2,
	
	// Crossbowman (Reinforcement) data
	crossbowmanHealth: 600,
	crossbowmanFov: 150,
	crossbowmanChaseRange: 150,
	crossbowmanMeleeDmg: 8,
	crossbowmanRangeDmg: 15,
	crossbowmanShootingCooldown: 700,	
	crossbowmanSpeed: 2,
	
	enemies: 
	[
		"rogue",
		"skeleton",
		"vampire",
		"phantom",
		"zombie",
		"orc",
		"werewolf",
		"kamikaze",
		"shaman",
		"ghost"
	],
	
	// Skeleton (enemy) data
	skeletonHealth: 250,
	skeletonFov: 100,
	skeletonChaseRange: 100,
	skeletonMeleeDmg: 25,
	skeletonSpeed: 1,
	skeletonGolds: 5,
	
	// Vampire (enemy) data
	vampireHealth: 300,
	vampireFov: 100,
	vampireChaseRange: 100,
	vampireMeleeDmg: 20,
	vampireSpeed: 1.2,
	vampireGolds: 10,
	
	// Rogue (enemy) data
	rogueHealth: 100,
	rogueFov: 100,
	rogueChaseRange: 100,
	rogueMeleeDmg: 20,
	rogueSpeed: 1.8,
	rogueGolds: 10,
	
	// Phantom (enemy) data
	phantomHealth: 400,
	phantomFov: 100,
	phantomChaseRange: 100,
	phantomMeleeDmg: 40,
	phantomSpeed: 1.7,
	phantomGolds: 12,
	phantomRegenRate: 5,
	
	// Zombie (enemy) data
	zombieHealth: 120,
	zombieFov: 100,
	zombieChaseRange: 100,
	zombieMeleeDmg: 7,
	zombieSpeed: 0.8,
	zombieGolds: 5,
	
	// Orc (enemy) data
	orcHealth: 400,
	orcFov: 100,
	orcChaseRange: 100,
	orcMeleeDmg: 100,
	orcSpeed: 1,
	orcGolds: 15,
	
	// Werewolf (enemy) data
	werewolfHealth: 300,
	werewolfFov: 150,
	werewolfChaseRange: 100,
	werewolfMeleeDmg: 50,
	werewolfSpeed: 2,
	werewolfGolds: 15,
	
	// Kamikaze (enemy) data
	kamikazeHealth: 80,
	kamikazeFov: 100,
	kamikazeChaseRange: 100,
	kamikazeMeleeDmg: 140,
	kamikazeExplosionRange: 250,
	kamikazeExplosionMagnitude: 50,
	kamikazeSpeed: 2,
	kamikazeGolds: 8,
	
	// Shaman (enemy) data
	shamanHealth: 300,
	shamanFov: 450,
	shamanChaseRange: 100,
	shamanRangeDmg: 50,
	shamanSpeed: 1,
	shamanGolds: 15,
	shamanShootingCooldown: 700,
	
	// Ghost (enemy) data
	ghostHealth: 180,
	ghostSpeed: 2,
	ghostGolds: 8,
}