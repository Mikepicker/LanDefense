// Main Menu State
var TILE_SIZE = 64;

var MainState =
{
	initialized: false,
	
	init: function()
	{
		SFXSystem.reset();
		this.loadAssets();
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
		
		this.initialized = true;
	},
	
	loadAssets: function()
	{
		// All entities
		AssetsManager.loadImage("warrior", ASSETS.characters["warrior"].resName);
		AssetsManager.loadImage("ranger", ASSETS.characters["ranger"].resName);
		AssetsManager.loadImage("wizard", ASSETS.characters["wizard"].resName);
		AssetsManager.loadImage("infantry", ASSETS.characters["infantry"].resName);
		AssetsManager.loadImage("rogue", ASSETS.characters["rogue"].resName);
		AssetsManager.loadImage("skeleton", ASSETS.characters["skeleton"].resName);
		AssetsManager.loadImage("vampire", ASSETS.characters["vampire"].resName);
		AssetsManager.loadImage("phantom", ASSETS.characters["phantom"].resName);
		AssetsManager.loadImage("zombie", ASSETS.characters["zombie"].resName);
		AssetsManager.loadImage("orc", ASSETS.characters["orc"].resName);
		AssetsManager.loadImage("werewolf", ASSETS.characters["werewolf"].resName);
		
		// Weapons
		AssetsManager.loadImage("javelin", "./assets/javelin.png");
		AssetsManager.loadImage("arrow", "./assets/arrow.png");
		AssetsManager.loadImage("magic_ball", "./assets/magic_ball.png");
		AssetsManager.loadImage("fire_arrow", "./assets/fire_arrow.png");
		
		// Load icon for selected entity
		AssetsManager.loadImage("entity_selected_icon", "./assets/entity_selected_icon.png");
		
		// Load gravestone image
		AssetsManager.loadImage("gravestone", "./assets/gravestone.png");
		
		// Load shadow
		AssetsManager.loadImage("shadow", "./assets/shadow.png");
		
		// Load Red Cross
		AssetsManager.loadImage("red_cross", "./assets/red_cross.png");
		
		// Load ice drops (wizard skill)
		AssetsManager.loadImage("icedrop", "./assets/icedrop.png");
		
		// Load Bonuses
		AssetsManager.loadImage("life_bonus", "./assets/hearth.png");
		AssetsManager.loadImage("gold_bonus", "./assets/chest.png");
		
		//--------------------------------------------------------------//
		//------------------------USER INTERFACE------------------------//
		//--------------------------------------------------------------//
		AssetsManager.loadImage("pause_button", "./assets/pause_button.png");
		AssetsManager.loadImage("pause_button_selected", "./assets/pause_button_pressed.png");
		AssetsManager.loadImage("resume_button", "./assets/resume_button.png");
		AssetsManager.loadImage("resume_button_sel", "./assets/resume_button_selected.png");
		AssetsManager.loadImage("quit_button", "./assets/quit_button.png");
		AssetsManager.loadImage("quit_button_sel", "./assets/quit_button_selected.png");
		AssetsManager.loadImage("restart_button", "./assets/restart_button.png");
		AssetsManager.loadImage("restart_button_sel", "./assets/restart_button_selected.png");
		AssetsManager.loadImage("paused_text", "./assets/game_paused_text.png");
		AssetsManager.loadImage("defeat_text", "./assets/defeat_text.png");
		
		// Load General skills
		AssetsManager.loadImage("reinforcement_button", "./assets/reinforcement_skill.png");
		AssetsManager.loadImage("reinforcement_button_sel", "./assets/reinforcement_skill_selected.png");
		
		// Load special skills
		AssetsManager.loadImage("earthstrike_skill", "./assets/earthstrike_skill.png");
		AssetsManager.loadImage("earthstrike_skill_sel", "./assets/earthstrike_skill_selected.png");
		AssetsManager.loadImage("precisionshot_skill", "./assets/precisionshot_skill.png");
		AssetsManager.loadImage("precisionshot_skill_sel", "./assets/precisionshot_skill_selected.png");
		AssetsManager.loadImage("frozenrain_skill", "./assets/frozenrain_skill.png");
		AssetsManager.loadImage("frozenrain_skill_sel", "./assets/frozenrain_skill_selected.png");
		
		// Load score board image
		AssetsManager.loadImage("score_board", "./assets/score_board.png");
		
		// Load pause board image
		AssetsManager.loadImage("pause_board", "./assets/pause_board.png");
		
		// Lives & Score icons
		AssetsManager.loadImage("lives_icon", "./assets/lives_icon.png");
		AssetsManager.loadImage("score_icon", "./assets/score_icon.png");
		//--------------------------------------------------------------//
		//--------------------------------------------------------------//
		//--------------------------------------------------------------//
	}
};