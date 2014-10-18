// User Interface System
var UISystem = 
{
	CLICKED: false,
	
	gameState: null,
	camera: null,
	map: null,
	player: null,
	scoreBoard: null,
	pauseButton: null,
	pauseBoard: null,
	livesIcon: null,
	scoreIcon: null,
	
	// Display wave number
	currentWave: 0,
	displayLevelTime: 5000,
	displayLevelTimer: 0,
	
	reinforcementsButton: null,
	
	specialSkillButton: null,
	
	playerClass: null,
	
	init: function()
	{
		// Get the Game State and Player
		for (var i = 0; i < ECSManager.entities.length; i++)
		{
			if (ECSManager.hasComponent(ECSManager.entities[i], ComponentType.COMPONENT_GAMESTATE))
			{
				this.gameState = ECSManager.getComponent(ECSManager.entities[i], ComponentType.COMPONENT_GAMESTATE);
			}
			
			if (ECSManager.hasComponent(ECSManager.entities[i], ComponentType.COMPONENT_CAMERA))
			{
				this.camera = ECSManager.entities[i];
			}
			
			if (ECSManager.hasComponent(ECSManager.entities[i], ComponentType.COMPONENT_MAP))
			{
				this.map = ECSManager.getComponent(ECSManager.entities[i], ComponentType.COMPONENT_MAP);
			}
			
			if (ECSManager.hasComponent(ECSManager.entities[i], ComponentType.COMPONENT_PLAYER))
			{
				this.player = ECSManager.entities[i];
			}
		}
		
		this.playerClass = ECSManager.getComponent(this.player, ComponentType.COMPONENT_PLAYER).class;
		
		// Pause Button
		this.pauseButton = Object.create(ImageButton);
		var pauseButtonX = canvas.width - 32 - 10;
		var pauseButtonY = 10;
		var pauseButtonImg = "pause_button";
		var pauseButtonImgSel = "pause_button_selected";
		this.pauseButton.init(pauseButtonX, pauseButtonY, 32, 32, pauseButtonImg, pauseButtonImgSel, true);
		
		var pauseBoardPos = Object.create(Vector2);
		pauseBoardPos.set((canvas.width/2) - (700/2), (canvas.height/2) - (500/2));
		
		this.pauseBoard = Object.create(PauseBoard);
		this.pauseBoard.init(pauseBoardPos, 700, 500, "pause_board", this.gameState, this.playerClass);
		
		// Load End Game board
		this.endGameBoard = Object.create(EndGameBoard);
		this.endGameBoard.init(pauseBoardPos, 700, 500, "pause_board", this.playerClass);
		
		// General Skills
		this.reinforcementsButton = Object.create(SkillButton);
		this.reinforcementsButton.init(10, canvas.height - 64 - 10, 64, 64, "reinforcement_button", "reinforcement_button_sel", 10000, true);
		
		// Class-specific Skills
		this.specialSkillButton = Object.create(SkillButton);
		
		switch(this.playerClass)
		{
			case "warrior":
				this.specialSkillButton.init(canvas.width - 64 - 10, 
											 canvas.height - 64 - 10, 
											 64, 
											 64, 
											 "earthstrike_skill", 
											 "earthstrike_skill_sel", 
											 CONFIG.warriorSkillCooldown, 
											 true);
				break;
				
			case "ranger":
				this.specialSkillButton.init(canvas.width - 64 - 10, 
											 canvas.height - 64 - 10, 
											 64, 
											 64, 
											 "precisionshot_skill", 
											 "precisionshot_skill_sel", 
											 CONFIG.rangerSkillCooldown, 
											 true);
				break;
			
			case "wizard":
				this.specialSkillButton.init(canvas.width - 64 - 10, 
											 canvas.height - 64 - 10, 
											 64, 
											 64, 
											 "frozenrain_skill", 
											 "frozenrain_skill_sel", 
											 CONFIG.wizardSkillCooldown, 
											 true);
				break;
		}
	},
	
	update: function(dt)
	{
		// Score Board
		drawingSurface.drawImage(AssetsManager.images["score_board"], 10, 10, 256, 32);
		
		var scoreText = this.gameState.golds;
		var livesText = this.gameState.lives + " / " + this.gameState.maxLives;
		drawingSurface.font = "18px gothic";
		drawingSurface.textAlign = "left";
		drawingSurface.fillStyle = 'rgb(255,255,255)';
		drawingSurface.strokeStyle = 'black';
		drawingSurface.lineWidth = 6;
		
		drawingSurface.fillText(livesText, 45, 30);
		drawingSurface.fillText(scoreText, 175, 30);
		
		// Game Won
		if (this.gameState.gameWon)
		{
			if (this.displayLevelTimer >= this.displayLevelTime)
			{
				if (SFXSystem.fadeOutComplete)
				{
					this.displayLevelTimer = 0;
					ECSManager.changeState(Object.create(MainMenuState));
				}
			}
			else
			{
				this.handleGameWon(dt);
				this.displayLevelTimer += dt;
			}
		}
		// Display Wave number (beginning of new level)
		else if (this.gameState.currentWave > this.currentWave)
		{
			if (this.displayLevelTimer >= this.displayLevelTime)
			{
				this.displayLevelTimer = 0;
				this.currentWave++;
			}
			else
			{
				this.drawWaveNumber(dt);
				this.displayLevelTimer += dt;
			}
		}
		
		// Draw game state information
		drawingSurface.drawImage(AssetsManager.images["lives_icon"],
								 0, 0,
								 16, 16,
								 20, 18,
								 16, 16);
								 
		drawingSurface.drawImage(AssetsManager.images["score_icon"],
								 0, 0,
								 16, 16,
								 150, 18,
								 16, 16);
								 
		// Check for game ended
		if (this.gameState.lives === 0)
		{
			this.gameState.gamePaused = true;
			this.endGameBoard.active = true;
			this.endGameBoard.textID = "defeat_text";
			
			this.endGameBoard.update(dt);
			this.endGameBoard.draw();
			
			return;
		}
		
		// Pause Board
		this.pauseBoard.update(dt);
		this.pauseBoard.draw();
		
		if (this.gameState.gamePaused)
			return;
		
		//---------------------------------------//
		//----------------BUTTONS----------------//
		//---------------------------------------//
		var focus = false;
		
		//--------------Pause Button-------------//
		if (this.pauseButton.clicked)
		{
			focus = true;
			this.gameState.gamePaused = !this.gameState.gamePaused;
		}
			
		this.pauseButton.update(dt);
		this.pauseButton.draw();
		//---------------------------------------//
		
		//--------------Skills Button-------------//
		// Reinforcements
		if (this.reinforcementsButton.selected)
		{
			focus = true;
			this.handleReinforcementsButton();
		}
			
		this.reinforcementsButton.update(dt);
		this.reinforcementsButton.draw();
		
		// Special Skill
		if (this.specialSkillButton.selected)
		{
			switch(this.playerClass)
			{
				case "warrior":
					this.handleWarriorSkill();
					break;
					
				case "ranger":
					this.handleRangerSkill();
					break;
					
				case "wizard":
					this.handleWizardSkill();
					break;
			}
		}
		
		this.specialSkillButton.update(dt);
		this.specialSkillButton.draw();
		//---------------------------------------//
		
		UISystem.CLICKED = focus;
	},
	
	uiClicked: function() { return UISystem.CLICKED; },
	
	handleReinforcementsButton: function()
	{
		var cameraPos = ECSManager.getComponent(this.camera, ComponentType.COMPONENT_POSITION).position;
		var targetPos = Object.create(Vector2);
		
		// Get desired position for reinforcements
		if (MOUSE_CLICKED)
		{
			MOUSE_CLICKED = false;
			targetPos.set(cameraPos.x + MOUSE_X, cameraPos.y + MOUSE_Y);
			
			this.reinforcementsButton.selected = false;
			
			// Call reinforcements
			if (this.gameState.golds >= CONFIG.reinforcementCost)
			{
				this.reinforcementsButton.active = false;
				EntityFactory.callReinforcements(targetPos);
				this.gameState.golds -= CONFIG.reinforcementCost;
			}
			
			// Red Cross to mark position
			EntityFactory.createRedCross(targetPos);
		}
		else if (TOUCH_TAP)
		{
			TOUCH_TAP = false;
			targetPos.set(cameraPos.x + TOUCH_X, cameraPos.y + TOUCH_Y);
			
			this.reinforcementsButton.selected = false;
			
			// Call reinforcements
			if (this.gameState.golds >= CONFIG.reinforcementCost)
			{
				this.reinforcementsButton.active = false;
				EntityFactory.callReinforcements(targetPos);
				this.gameState.golds -= CONFIG.reinforcementCost;
			}
			
			// Red Cross to mark position
			EntityFactory.createRedCross(targetPos);			
		}
	},
	
	handleWarriorSkill: function()
	{
		this.specialSkillButton.selected = false;
		this.specialSkillButton.active = false;
		
		SFXSystem.enableColorMask("rgb(0,0,0)", 3000);
		SkillSystem.toEarthStrikeState(this.player);
	},
	
	handleRangerSkill: function()
	{
		SFXSystem.enableColorMask("rgb(0,0,0)", 3000);
		this.specialSkillButton.selected = false;
		this.specialSkillButton.active = false;
		var plGameEntity = ECSManager.getComponent(this.player, ComponentType.COMPONENT_GAMEENTITY);
		plGameEntity.rangeWeapon = EntityFactory.createFireArrow(CONFIG.fireArrowsDamage);
		SkillSystem.toMultipleArrowsSkill(this.player);
	},
	
	handleWizardSkill: function()
	{
		SFXSystem.enableColorMask("rgb(50,100,255)", 3500);
		this.specialSkillButton.selected = false;
		this.specialSkillButton.active = false;
		SkillSystem.toFrozenRainSkill(this.player);
	},
	
	drawWaveNumber: function(dt)
	{
		drawingSurface.save();
		
		if (this.displayLevelTimer < 1000)
			drawingSurface.globalAlpha = this.displayLevelTimer / 1000;
		else if (this.displayLevelTimer > this.displayLevelTime - 1000)
			drawingSurface.globalAlpha = (this.displayLevelTime - this.displayLevelTimer) / 1000;
		else
			drawingSurface.globalAlpha = 1;
			
		drawingSurface.font = "100px gothic";
		drawingSurface.textAlign = "center";
		drawingSurface.fillStyle = 'rgb(255,255,255)';
		drawingSurface.strokeStyle = 'black';
		drawingSurface.lineWidth = 12;
		
		drawingSurface.strokeText("Wave " + this.gameState.currentWave, canvas.width/2, canvas.height/2);
		drawingSurface.fillText("Wave " + this.gameState.currentWave, canvas.width/2, canvas.height/2);
		
		drawingSurface.restore();
	},
	
	handleGameWon: function(dt)
	{
		// Enable fade out (if it's not active yet)
		if (!SFXSystem.fadeOutEnabled)
			SFXSystem.enableFadeOut(this.displayLevelTime * 2);
			
		drawingSurface.save();
		
		if (this.displayLevelTimer < 1000)
			drawingSurface.globalAlpha = this.displayLevelTimer / 1000;
		else if (this.displayLevelTimer > this.displayLevelTime - 1000)
			drawingSurface.globalAlpha = (this.displayLevelTime - this.displayLevelTimer) / 1000;
		else
			drawingSurface.globalAlpha = 1;
			
		drawingSurface.font = "100px gothic";
		drawingSurface.textAlign = "center";
		drawingSurface.fillStyle = 'rgb(255,255,255)';
		drawingSurface.strokeStyle = 'black';
		drawingSurface.lineWidth = 12;
		
		drawingSurface.strokeText("You Won!", canvas.width/2, canvas.height/2);
		drawingSurface.fillText("You Won!", canvas.width/2, canvas.height/2);
		
		drawingSurface.restore();
	}
}