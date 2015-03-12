// Main Menu State
var TILE_SIZE = 64;

var MainState =
{
	initialized: false,
	
	init: function()
	{
		SFXSystem.reset();
		SoundSystem.reset();
		
		EntityFactory.createMap();
		EntityFactory.createCamera();
		EntityFactory.createGameState();
		
		// Systems
		ECSManager.addSystem(Object.create(WavesSystem));
		ECSManager.addSystem(Object.create(GameEntitySystem));
		ECSManager.addSystem(Object.create(SkillSystem));
		ECSManager.addSystem(Object.create(AISystem));
		ECSManager.addSystem(Object.create(MotionSystem));
		ECSManager.addSystem(Object.create(BoundaryCollisionSystem));
		ECSManager.addSystem(Object.create(CameraSystem));
		ECSManager.addSystem(Object.create(AnimationSystem));
		ECSManager.addSystem(Object.create(MissileSystem));
		ECSManager.addSystem(Object.create(GameStateSystem));
		ECSManager.addSystem(Object.create(DisplayMapSystem));
		ECSManager.addSystem(Object.create(DisplayEntitiesSystem));
		ECSManager.addSystem(Object.create(UISystem));
		ECSManager.addSystem(Object.create(SFXSystem));
		ECSManager.addSystem(Object.create(ControlSystem));
		ECSManager.addSystem(Object.create(BonusSystem));
		ECSManager.addSystem(Object.create(SoundSystem));
		
		this.initialized = true;
	},
};