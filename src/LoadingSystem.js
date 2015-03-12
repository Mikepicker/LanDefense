// Loading System
var LoadingSystem =
{
	init: function()
	{
		// Splash Screen
		AssetsManager.loadImage("splash", "./assets/splash.png");
		
		// Menus
		AssetsManager.loadImage("play_button", "./assets/play_button.png");
		AssetsManager.loadImage("play_button_selected", "./assets/play_button_selected.png");
		
		AssetsManager.loadImage("warrior_button", "./assets/warrior_button.png");
		AssetsManager.loadImage("warrior_button_selected", "./assets/warrior_button_selected.png");
		AssetsManager.loadImage("ranger_button", "./assets/ranger_button.png");
		AssetsManager.loadImage("ranger_button_selected", "./assets/ranger_button_selected.png");
		AssetsManager.loadImage("wizard_button", "./assets/wizard_button.png");
		AssetsManager.loadImage("wizard_button_selected", "./assets/wizard_button_selected.png");
		AssetsManager.loadImage("select_shadow", "./assets/select_shadow.png");
		
		// All entities
		AssetsManager.loadImage("warrior", ASSETS.characters["warrior"].resName);
		AssetsManager.loadImage("ranger", ASSETS.characters["ranger"].resName);
		AssetsManager.loadImage("wizard", ASSETS.characters["wizard"].resName);
		AssetsManager.loadImage("infantry", ASSETS.characters["infantry"].resName);
		AssetsManager.loadImage("crossbowman", ASSETS.characters["crossbowman"].resName);
		AssetsManager.loadImage("rogue", ASSETS.characters["rogue"].resName);
		AssetsManager.loadImage("skeleton", ASSETS.characters["skeleton"].resName);
		AssetsManager.loadImage("vampire", ASSETS.characters["vampire"].resName);
		AssetsManager.loadImage("phantom", ASSETS.characters["phantom"].resName);
		AssetsManager.loadImage("zombie", ASSETS.characters["zombie"].resName);
		AssetsManager.loadImage("orc", ASSETS.characters["orc"].resName);
		AssetsManager.loadImage("werewolf", ASSETS.characters["werewolf"].resName);
		AssetsManager.loadImage("kamikaze", ASSETS.characters["kamikaze"].resName);
		AssetsManager.loadImage("shaman", ASSETS.characters["shaman"].resName);
		AssetsManager.loadImage("ghost", ASSETS.characters["ghost"].resName);
		
		// Weapons
		AssetsManager.loadImage("javelin", "./assets/javelin.png");
		AssetsManager.loadImage("arrow", "./assets/arrow.png");
		AssetsManager.loadImage("magic_ball", "./assets/magic_ball.png");
		AssetsManager.loadImage("dark_ball", "./assets/dark_ball.png");
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
		
		// Load Explosion
		AssetsManager.loadImage("explosion", ASSETS.effects["explosion"].resName);
		
		// Load Bonuses
		AssetsManager.loadImage("life_bonus", "./assets/hearth.png");
		AssetsManager.loadImage("gold_bonus", "./assets/chest.png");
		AssetsManager.loadImage("heal_potion", "./assets/heal_potion.png");
		
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
		AssetsManager.loadImage("golds_icon", "./assets/golds_icon.png");
		AssetsManager.loadImage("score_icon", "./assets/score_icon.png");
		//--------------------------------------------------------------//
		//--------------------------------------------------------------//
		//--------------------------------------------------------------//
		
		//------------------------------------------------------//
		//------------------------AUDIO------------------------//
		//-----------------------------------------------------//
		
		AssetsManager.loadSound("arrow_hit", "./assets/sounds/arrow_hit.mp3");
		AssetsManager.loadSound("explosion", "./assets/sounds/explosion.mp3");
		AssetsManager.loadSound("bonus", "./assets/sounds/bonus.mp3");
		AssetsManager.loadSound("gold", "./assets/sounds/gold.mp3");
		AssetsManager.loadSound("potion", "./assets/sounds/potion.mp3");
		AssetsManager.loadSound("life", "./assets/sounds/life.mp3");
		AssetsManager.loadSound("punch", "./assets/sounds/punch.mp3");
		AssetsManager.loadSound("arrow_shot", "./assets/sounds/arrow_shot.mp3");
		AssetsManager.loadSound("magic_shot", "./assets/sounds/magic_shot.mp3");
		AssetsManager.loadSound("magic_hit", "./assets/sounds/magic_hit.mp3");
		AssetsManager.loadSound("reinforcements", "./assets/sounds/reinforcements.mp3");
		AssetsManager.loadSound("earthstrike", "./assets/sounds/earthstrike.mp3");
		AssetsManager.loadSound("multiplearrows", "./assets/sounds/multiplearrows.mp3");
		AssetsManager.loadSound("frozenrain", "./assets/sounds/frozenrain.mp3");
		
		AssetsManager.loadSound("button_click", "./assets/sounds/button_click.mp3");
	},
	
	update: function(dt)
	{
		drawingSurface.fillStyle = "black";
		drawingSurface.fillRect(0, 0, canvas.width, canvas.height);
		
		drawingSurface.font = "100px gothic";
		drawingSurface.textAlign = "center";
		drawingSurface.fillStyle = 'rgb(255,255,255)';
		drawingSurface.strokeStyle = 'black';
		drawingSurface.lineWidth = 12;
		
		drawingSurface.strokeText("Loading", canvas.width/2, canvas.height/2);
		drawingSurface.fillText("Loading", canvas.width/2, canvas.height/2);
		
		if (AssetsManager.assetsToLoad === 0)
		{
			ECSManager.reset();
			ECSManager.changeState(Object.create(MainMenuState));
		}
	}
}