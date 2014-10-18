// Components 
var ComponentType =
{
	COMPONENT_POSITION: 		0,
	COMPONENT_BOX:				1,
	COMPONENT_DISPLAY:			2,
	COMPONENT_ANIMATION:		3,
	COMPONENT_KEYBOARD:			4,
	
	COMPONENT_MAP:				5,
	COMPONENT_MOTION:			6,
	COMPONENT_PLAYER:			7,
	COMPONENT_CAMERA:			8,
	COMPONENT_COLLISION:		9,
	COMPONENT_GAMEENTITY:		10,
	
	// Behaviors
	COMPONENT_MELEEATTACKER:	11,
	COMPONENT_MELEEATTACKED:	12,
	COMPONENT_RANGEATTACKER:	13,
	COMPONENT_MOVETOLOCATION:	14,
	COMPONENT_SEEKENTITY:		15,
	
	// AI Behaviors
	COMPONENT_STANDARDENEMYAI:	16,
	COMPONENT_REINFORCEMENTAI:	17,
	COMPONENT_AGGRESSIVEAI:		18,
	COMPONENT_ELUSIVEAI:		19,
	
	// Weapons
	COMPONENT_WEAPON:			20,
	COMPONENT_MISSILE:			21,
	
	COMPONENT_GAMESTATE:		22,
	COMPONENT_RESPAWN:			23,
	
	// Factions
	COMPONENT_ALLIED:			24,
	COMPONENT_ENEMY:			25,
	
	COMPONENT_REINFORCEMENT:	26,
	
	// Damage System
	COMPONENT_DEAD:				27,
	COMPONENT_HIT:				28,
	
	// Red cross (Movement..)
	COMPONENT_REDCROSS:			29,
	
	// Skills
	COMPONENT_EARTHSTRIKE:		30,
	COMPONENT_MULTIPLEARROWS:	31,
	COMPONENT_FROZENRAIN:		32,
	
	// Special skills effects
	COMPONENT_IMPULSE:			33,
	COMPONENT_FROZEN:			34,
	COMPONENT_BURN:				35,
	
	// Passive abilities
	COMPONENT_LIFESTEALING:		36,
	COMPONENT_VIRUST:			37,
	
	// Scene object
	COMPONENT_SCENEOBJECT:		38,
	
	// Bonuses
	COMPONENT_LIFEBONUS:		39,
	COMPONENT_GOLDBONUS:		40,
	COMPONENT_GOLDSCORE:		41
};

var PositionComponent =
{
	type: ComponentType.COMPONENT_POSITION,
	position: null
};

var BoxComponent =
{
	type: ComponentType.COMPONENT_BOX,
	width: 0,
	height: 0
};

var DisplayComponent =
{
	type: ComponentType.COMPONENT_DISPLAY,
	alpha: 1,
	scale: 1
};

var AnimationComponent =
{
	type: ComponentType.COMPONENT_ANIMATION,
	
	// General Attributes 
	active: false,
	triggered: false,
	animationData: null,		// Encodes all the data for this animation
	currentAnimation: null,		// The current animation
	currentFrame: 0,			// The current frame
	timer: 0,
	finished: false
};

var KeyboardComponent =
{
	type: ComponentType.COMPONENT_KEYBOARD,
	upKey: 0,
	leftKey: 0,
	downKey: 0,
	rightKey: 0,
	pauseKey: 0,
};

var MapComponent =
{
	type: ComponentType.COMPONENT_MAP,
	
	tileSize: 0,
	tileSets: {},	// Tile Sets
	tiles: {},		// Tiles
	mapCanvas: null,	// Drawing surface for map and entities
};

var MotionComponent =
{
	type: ComponentType.COMPONENT_MOTION,
	velocity: null,
	speed: 0
};

var PlayerComponent =
{
	type: ComponentType.COMPONENT_PLAYER,
	class: null,	// "warrior", "ranger", "wizard"
	regenTime: 1000,
	regenTimer: 0
};

var CameraComponent =
{
	type: ComponentType.COMPONENT_CAMERA
};

var CollisionComponent =
{
	type: ComponentType.COMPONENT_COLLISION
};

var GameEntityComponent = 
{
	type: ComponentType.COMPONENT_GAMEENTITY,
	
	orientation: null,		// Can be "left" or "right"
	name: null,
	health: 0,
	maxHealth: 0,

	shootingCooldown: 0,	// How fast the entity can shoot (from range)
	shootingTimer: 0,		// Time to next range attack
	
	strength: 0,
	dexterity: 0,
	
	meleeWeapon: null,		// Entity
	rangeWeapon: null,		// Entity: missile ready to be shot
	quiver: null			// Entity: missile stored in the quiver
	
};

// Attached to an entity which is attacking
var MeleeAttackerComponent =
{
	type: ComponentType.COMPONENT_MELEEATTACKER,
	targetEntity: null		// Entity
};

// Attached to an entity which is being attacked
var MeleeAttackedComponent =
{
	type: ComponentType.COMPONENT_MELEEATTACKED,
	
	attackDelivered: false,
	attacker: null		// The Attacker entity
};

var RangeAttackerComponent =
{
	type: ComponentType.COMPONENT_RANGEATTACKER,
	targetEntity: null,		// Entity
};

// Attached to an entity which has to move toward a specific position
var MoveToLocationComponent =
{
	type: ComponentType.COMPONENT_MOVETOLOCATION,
	
	targetPos: null		// Vector2
};

var SeekEntityComponent =
{
	type: ComponentType.COMPONENT_SEEKENTITY,
	
	targetEntity: null
};

// AI Behaviors

// Standard Enemy AI: go toward the goal, if player or a reinforcement
// is in range -> Attack
var StandardEnemyAIComponent =
{
	type: ComponentType.COMPONENT_STANDARDENEMYAI,
	
	fov: 0,				// Field of View
	lastPos: null,		// Vector2: the last position the entity was occupying before chasing player
	chaseRange: null	// How far the entity can go away from "lastPos" in order to attack player 	
};

// Reinforcement AI: if range weapon is available shoot random enemies in range
// If only melee weapon is avaliable chase and attack nearby enemies
var ReinforcementAIComponent =
{
	type: ComponentType.COMPONENT_REINFORCEMENTAI,
	
	fov: 0,
	lastPos: null,
	chaseRange: null
};

// Aggressive AI: chase player and try to kill him, if player dies
// act like standard enemy AI
var AggressiveAIComponent =
{
	type: ComponentType.COMPONENT_AGGRESSIVEAI,
	
	fov: 0,
	lastPos: null,
	chaseRange: null
};

// Elusive AI: simply go straight toward the goal
var ElusiveAIComponent =
{
	type: ComponentType.COMPONENT_ELUSIVEAI
};

// WEAPONS
var WeaponComponent =
{
	type: ComponentType.COMPONENT_WEAPON,
	
	name: null,			// Weapon name
	damage: 0,			// Weapon damage
};

var MissileComponent =
{
	type: ComponentType.COMPONENT_MISSILE,
	
	img: null,			// Weapon image
	startPos: null,		// Vector2
	targetPos: null,	// Vector2
	targetEntity: null,	// Entity
	initVel: null,		// Vector2
	speed: 0,
	flyTime: 0,
	time: 0,
	decayTime: 3000,		// Seconds to disappear after hitting the ground
	decayTimer: 0,
	owner:	null		// Entity who own shot this missile
};

// GAME STATE
var GameStateComponent =
{
	type: ComponentType.COMPONENT_GAMESTATE,
	
	gamePaused: false,
	gameWon: false,
	maxLives: 0,
	lives: 0,
	golds: 0,
	selectedEntity: null,
	enemiesAlive: 0,
	currentWave: 1
};

var RespawnComponent =
{
	type: ComponentType.COMPONENT_RESPAWN
};

// FACTIONS
var AlliedComponent =
{
	type: ComponentType.COMPONENT_ALLIED
};

var EnemyComponent =
{
	type: ComponentType.COMPONENT_ENEMY,
	
	golds: 0
};

var ReinforcementComponent =
{
	type: ComponentType.COMPONENT_REINFORCEMENT,
	
	position: null	// Vector2
};

var DeadComponent =
{
	type: ComponentType.COMPONENT_DEAD,
	
	fadeTime: 3000,
	fadeTimer: 0,
	impulse: 0
};

var HitComponent =
{
	type: ComponentType.COMPONENT_HIT,
	
	attacker: null,		// Entity
	damageApplied: false,
	damage: 0,
	time: 100,
	timer: 0
};

var RedCrossComponent =
{
	type: ComponentType.COMPONENT_REDCROSS,
	
	state: "enter",			// "enter", "stop", "exit"
	redCrossPos: null,		// Vector2
	time: 200,
	timer: 0
};

var EarthStrikeComponent =
{
	type: ComponentType.COMPONENT_EARTHSTRIKE,
	
	triggered: false
};

var MultipleArrowsComponent =
{
	type: ComponentType.COMPONENT_MULTIPLEARROWS,
	
	triggered: false,
	enemies: null,	// Array of enemies to send arrows to
};

var FrozenRainComponent =
{
	type: ComponentType.COMPONENT_FROZENRAIN,
	
	triggered: false
};

var ImpulseComponent =
{
	type: ComponentType.COMPONENT_IMPULSE
};

var FrozenComponent =
{
	type: ComponentType.COMPONENT_FROZEN,
	
	damageOverTime: 0,
	damageStep: 0,		// Used to give a timing to hits
	time: 0,
	timer: 0
};

var BurnComponent =
{
	type: ComponentType.COMPONENT_BURN,
	
	damageOverTime: 0,
	damageStep: 0,		// Used to give a timing to hits
	time: 0,
	timer: 0
};

var LifeStealingComponent =
{
	type: ComponentType.COMPONENT_LIFESTEALING
};

var VirusTComponent =
{
	type: ComponentType.COMPONENT_VIRUST
};

// Scene object (icedrops..)
var SceneObjectComponent =
{
	type: ComponentType.COMPONENT_SCENEOBJECT,
	
	img: null
};

// Bonuses
var LifeBonusComponent =
{
	type: ComponentType.COMPONENT_LIFEBONUS,
	img: null
};

var GoldBonusComponent =
{
	type: ComponentType.COMPONENT_GOLDBONUS,
	img: null
};

var GoldScoreComponent =
{
	type: ComponentType.COMPONENT_GOLDSCORE,
	score: 0
};