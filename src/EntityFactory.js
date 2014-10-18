// Entity factory
var EntityFactory =
{
	createMap : function()
	{
		// Build Map
		var map = ECSManager.createEntity();
		
		// Map Component
		var mapComp = Object.create(MapComponent);
		mapComp.tileSize = TILE_SIZE;
		mapComp.tileSets = MapBuilder.loadTileSets(MAP);
		mapComp.tiles = MapBuilder.loadTiles(MAP);
		
		// Position Component
		var mapPos = Object.create(PositionComponent);	
		mapPos.position = Object.create(Vector2);
		mapPos.position.x = 0;
		mapPos.position.y = 0;
		
		// Box Component
		var mapBox = Object.create(BoxComponent);
		mapBox.width = mapComp.tiles.length * TILE_SIZE;
		mapBox.height = mapComp.tiles[0].length * TILE_SIZE;
		
		// Initialize map canvas
		mapComp.mapCanvas = document.createElement('canvas');
		mapComp.mapCanvas.width = mapBox.width;
		mapComp.mapCanvas.height = mapBox.height;
		
		ECSManager.attachComponent(mapComp, map);
		ECSManager.attachComponent(mapPos, map);
		ECSManager.attachComponent(mapBox, map);
		
		return map;
	},
	
	createRedCross: function(targetPos)
	{
		var redCross = ECSManager.createEntity();
		
		// RedCross Component
		var redCrossComp = Object.create(RedCrossComponent);
		
		// Position Component
		var redCrossPos = Object.create(PositionComponent);	
		redCrossPos.position = targetPos;
		
		// Box Component
		var redCrossBox = Object.create(BoxComponent);
		redCrossBox.width = 32;
		redCrossBox.height = 16;
		
		// Display Component
		var redCrossDisp = Object.create(DisplayComponent);
		
		ECSManager.attachComponent(redCrossComp, redCross);
		ECSManager.attachComponent(redCrossPos, redCross);
		ECSManager.attachComponent(redCrossBox, redCross);
		ECSManager.attachComponent(redCrossDisp, redCross);
	},
	
	createPlayer: function(playerClass)
	{
		// Player
		var pl = ECSManager.createEntity();
		
		// GameEntity Component
		var gameEntity = Object.create(GameEntityComponent);
		gameEntity.orientation = "right";
		gameEntity.name = "Mike";
		
		// Player Component
		var plComp = Object.create(PlayerComponent);
		plComp.class = playerClass;
		
		// Position Component
		var plPos = Object.create(PositionComponent);	
		plPos.position = Object.create(Vector2);
		plPos.position.x = -32;
		plPos.position.y = 320 - 16;
		
		// Box Component
		var plBox = Object.create(BoxComponent);
		plBox.width = 64;
		plBox.height = 64;
		
		// Display Component
		var plDisp = Object.create(DisplayComponent);
		
		// Motion Component
		var plMot = Object.create(MotionComponent);
		plMot.velocity = Object.create(Vector2);
		
		// Animation Component
		var plAnim = Object.create(AnimationComponent);	
		plAnim.animationData = ASSETS.characters[playerClass];
		plAnim.currentAnimation = plAnim.animationData["walking_right"];
		
		// Keyboard Component
		var plControl = Object.create(KeyboardComponent);
		plControl.upKey = KeyboardKeys.UP;
		plControl.leftKey = KeyboardKeys.LEFT;
		plControl.downKey = KeyboardKeys.DOWN;
		plControl.rightKey = KeyboardKeys.RIGHT;
		
		// Allied Component
		var plAllied = Object.create(AlliedComponent);
		
		// Respawn Component
		var plRespawn = Object.create(RespawnComponent);
		
		switch(playerClass)
		{
			case "warrior":
				gameEntity.maxHealth = CONFIG.warriorHealth;
				gameEntity.health = gameEntity.maxHealth;
				gameEntity.shootingCooldown = CONFIG.warriorShootingCooldown;
				gameEntity.meleeWeapon = EntityFactory.createSword("Mike's Blade", CONFIG.warriorMeleeDmg);
				gameEntity.rangeWeapon = EntityFactory.createJavelin("Mike's Touch", CONFIG.warriorRangeDmg);
				gameEntity.quiver = EntityFactory.createJavelin("Mike's Touch", CONFIG.warriorRangeDmg);
				plMot.speed = CONFIG.warriorSpeed;
				break;
				
			case "ranger":
				gameEntity.maxHealth = CONFIG.rangerHealth;
				gameEntity.health = gameEntity.maxHealth;
				gameEntity.shootingCooldown = CONFIG.rangerShootingCooldown;
				gameEntity.meleeWeapon = EntityFactory.createSword("Mike's Blade", CONFIG.rangerMeleeDmg);
				gameEntity.rangeWeapon = EntityFactory.createArrow("Mike's Touch", CONFIG.rangerRangeDmg);
				gameEntity.quiver = EntityFactory.createArrow("Mike's Touch", CONFIG.rangerRangeDmg);
				plMot.speed = CONFIG.rangerSpeed;
				break;
				
			case "wizard":
				gameEntity.maxHealth = CONFIG.wizardHealth;
				gameEntity.health = gameEntity.maxHealth;
				gameEntity.shootingCooldown = CONFIG.wizardShootingCooldown;
				gameEntity.meleeWeapon = EntityFactory.createSword("Mike's Blade", CONFIG.wizardMeleeDmg);
				gameEntity.rangeWeapon = EntityFactory.createMagicBall("Mike's Touch", CONFIG.wizardRangeDmg);
				gameEntity.quiver = EntityFactory.createMagicBall("Mike's Touch", CONFIG.wizardRangeDmg);
				plMot.speed = CONFIG.wizardSpeed;
				break;
		}
		
		ECSManager.attachComponent(gameEntity, pl);
		ECSManager.attachComponent(plPos, pl);
		ECSManager.attachComponent(plBox, pl);
		ECSManager.attachComponent(plDisp, pl);
		ECSManager.attachComponent(plMot, pl);
		ECSManager.attachComponent(plAnim, pl);
		ECSManager.attachComponent(plControl, pl);
		ECSManager.attachComponent(plComp, pl);
		ECSManager.attachComponent(plAllied, pl);
		ECSManager.attachComponent(plRespawn, pl);
		
		return pl;
	},
	
	createCamera: function()
	{
		// Camera
		var camera = ECSManager.createEntity();
		
		// Camera Component
		var cameraComp = Object.create(CameraComponent);
		
		// Position Component
		var cameraPos = Object.create(PositionComponent);
		cameraPos.position = Object.create(Vector2);
		cameraPos.position.set(0,0);
		
		// Box Component
		var cameraBox = Object.create(BoxComponent);
		cameraBox.width = canvas.width;
		cameraBox.height = canvas.height;
		
		ECSManager.attachComponent(cameraComp, camera);
		ECSManager.attachComponent(cameraPos, camera);
		ECSManager.attachComponent(cameraBox, camera);
		
		return camera;
	},
	
	createGameState: function()
	{
		var gameState = ECSManager.createEntity();
		
		var gsComp = Object.create(GameStateComponent);
		gsComp.pauseKey = KeyboardKeys.PAUSE;
		gsComp.maxLives = CONFIG.lives;
		gsComp.lives = gsComp.maxLives;
		gsComp.golds = CONFIG.initialGolds;
		
		ECSManager.attachComponent(gsComp, gameState);
	},
	
	createInfantry: function(x,y, side)
	{
		var ent = ECSManager.createEntity();
		
		// Box Component
		var entBox = Object.create(BoxComponent);
		entBox.width = 64;
		entBox.height = 64;
		
		// Position Component
		var entPos = Object.create(PositionComponent);	
		entPos.position = Object.create(Vector2);
		entPos.position.x = x - (entBox.width/2);
		entPos.position.y = y - (entBox.height/2);
		
		// GameEntity Component
		var gameEntity = Object.create(GameEntityComponent);
		gameEntity.name = "Infantry " + ent;
		gameEntity.maxHealth = CONFIG.infantryHealth;
		gameEntity.health = gameEntity.maxHealth;
		
		// Weapons
		gameEntity.meleeWeapon = EntityFactory.createSword("Infantry hammer", CONFIG.infantryMeleeDmg);
		
		// AI Component
		var entAI = Object.create(ReinforcementAIComponent);
		entAI.fov = CONFIG.infantryFov;
		entAI.chaseRange = CONFIG.infantryChaseRange;
		entAI.lastPos = Object.create(Vector2);
		entAI.lastPos.set(entPos.position.x, entPos.position.y);
		
		// Display Component
		var entDisp = Object.create(DisplayComponent);
		
		// Motion Component
		var entMot = Object.create(MotionComponent);
		entMot.velocity = Object.create(Vector2);
		entMot.speed = CONFIG.infantrySpeed;
		
		// Animation Component
		var entAnim = Object.create(AnimationComponent);	
		entAnim.animationData = ASSETS.characters.infantry;
		
		// Side
		var sideComp;
		if (side === "allied")
			sideComp = Object.create(AlliedComponent);
		else if (side === "enemy")
			sideComp = Object.create(EnemyComponent);
			
		ECSManager.attachComponent(gameEntity, ent);
		ECSManager.attachComponent(entAI, ent);
		ECSManager.attachComponent(entPos, ent);
		ECSManager.attachComponent(entBox, ent);
		ECSManager.attachComponent(entDisp, ent);
		ECSManager.attachComponent(entMot, ent);
		ECSManager.attachComponent(entAnim, ent);
		ECSManager.attachComponent(sideComp, ent);
		
		// Move to location (if enemy)
		if (side === "enemy")
		{
			var targetPos = Object.create(Vector2);
			targetPos.set(-100, y);
			GameEntitySystem.toMoveToLocationState(ent, targetPos);
		}
		
		return ent;
	},
	
	createSkeleton: function(x,y, side)
	{
		var ent = ECSManager.createEntity();
		
		// Box Component
		var entBox = Object.create(BoxComponent);
		entBox.width = 64;
		entBox.height = 64;
		
		// Position Component
		var entPos = Object.create(PositionComponent);	
		entPos.position = Object.create(Vector2);
		entPos.position.x = x - (entBox.width/2);
		entPos.position.y = y - (entBox.height/2);
		
		// GameEntity Component
		var gameEntity = Object.create(GameEntityComponent);
		gameEntity.name = "Skeleton " + ent.ID;
		gameEntity.maxHealth = CONFIG.skeletonHealth;
		gameEntity.health = gameEntity.maxHealth;
		
		// Weapons
		gameEntity.meleeWeapon = EntityFactory.createSword("Skeleton Rusty Sword", CONFIG.skeletonMeleeDmg);
		
		// AI Component
		var entAI = Object.create(StandardEnemyAIComponent);
		entAI.fov = CONFIG.skeletonFov;
		entAI.chaseRange = CONFIG.skeletonChaseRange;
		entAI.lastPos = Object.create(Vector2);
		entAI.lastPos.set(entPos.position.x, entPos.position.y);
		
		// Display Component
		var entDisp = Object.create(DisplayComponent);
		
		// Motion Component
		var entMot = Object.create(MotionComponent);
		entMot.velocity = Object.create(Vector2);
		entMot.speed = CONFIG.skeletonSpeed;
		
		// Animation Component
		var entAnim = Object.create(AnimationComponent);	
		entAnim.animationData = ASSETS.characters.skeleton;
		
		// Side
		var sideComp;
		if (side === "allied")
			sideComp = Object.create(AlliedComponent);
		else if (side === "enemy")
		{
			sideComp = Object.create(EnemyComponent);
			sideComp.golds = CONFIG.skeletonGolds;
		}
			
		ECSManager.attachComponent(gameEntity, ent);
		ECSManager.attachComponent(entAI, ent);
		ECSManager.attachComponent(entPos, ent);
		ECSManager.attachComponent(entBox, ent);
		ECSManager.attachComponent(entDisp, ent);
		ECSManager.attachComponent(entMot, ent);
		ECSManager.attachComponent(entAnim, ent);
		ECSManager.attachComponent(sideComp, ent);
		
		// Move to location (if enemy)
		if (side === "enemy")
		{
			var targetPos = Object.create(Vector2);
			targetPos.set(-100, y);
			GameEntitySystem.toMoveToLocationState(ent, targetPos);
		}
		
		return ent;
	},
	
	createVampire: function(x,y, side)
	{
		var ent = ECSManager.createEntity();
		
		// Box Component
		var entBox = Object.create(BoxComponent);
		entBox.width = 64;
		entBox.height = 64;
		
		// Position Component
		var entPos = Object.create(PositionComponent);	
		entPos.position = Object.create(Vector2);
		entPos.position.x = x - (entBox.width/2);
		entPos.position.y = y - (entBox.height/2);
		
		// GameEntity Component
		var gameEntity = Object.create(GameEntityComponent);
		gameEntity.name = "Vampire " + ent.ID;
		gameEntity.maxHealth = CONFIG.vampireHealth;
		gameEntity.health = gameEntity.maxHealth;
		
		// Weapons
		gameEntity.meleeWeapon = EntityFactory.createSword("Vampire's Phantom Blade", CONFIG.vampireMeleeDmg);
		
		// AI Component
		var entAI = Object.create(StandardEnemyAIComponent);
		entAI.fov = CONFIG.vampireFov;
		entAI.chaseRange = CONFIG.vampireChaseRange;
		entAI.lastPos = Object.create(Vector2);
		entAI.lastPos.set(entPos.position.x, entPos.position.y);
		
		// Display Component
		var entDisp = Object.create(DisplayComponent);
		
		// Motion Component
		var entMot = Object.create(MotionComponent);
		entMot.velocity = Object.create(Vector2);
		entMot.speed = CONFIG.vampireSpeed;
		
		// Animation Component
		var entAnim = Object.create(AnimationComponent);	
		entAnim.animationData = ASSETS.characters.vampire;
		
		// Side
		var sideComp;
		if (side === "allied")
			sideComp = Object.create(AlliedComponent);
		else if (side === "enemy")
		{
			sideComp = Object.create(EnemyComponent);
			sideComp.golds = CONFIG.vampireGolds;
		}
			
		ECSManager.attachComponent(gameEntity, ent);
		ECSManager.attachComponent(entAI, ent);
		ECSManager.attachComponent(entPos, ent);
		ECSManager.attachComponent(entBox, ent);
		ECSManager.attachComponent(entDisp, ent);
		ECSManager.attachComponent(entMot, ent);
		ECSManager.attachComponent(entAnim, ent);
		ECSManager.attachComponent(sideComp, ent);
		ECSManager.attachComponent(Object.create(LifeStealingComponent), ent);
		
		// Move to location (if enemy)
		if (side === "enemy")
		{
			var targetPos = Object.create(Vector2);
			targetPos.set(-100, y);
			GameEntitySystem.toMoveToLocationState(ent, targetPos);
		}
		
		return ent;
	},
	
	createRogue: function(x,y, side)
	{
		var ent = ECSManager.createEntity();
		
		// Box Component
		var entBox = Object.create(BoxComponent);
		entBox.width = 64;
		entBox.height = 64;
		
		// Position Component
		var entPos = Object.create(PositionComponent);	
		entPos.position = Object.create(Vector2);
		entPos.position.x = x - (entBox.width/2);
		entPos.position.y = y - (entBox.height/2);
		
		// GameEntity Component
		var gameEntity = Object.create(GameEntityComponent);
		gameEntity.name = "Rogue " + ent.ID;
		gameEntity.maxHealth = CONFIG.rogueHealth;
		gameEntity.health = gameEntity.maxHealth;
		
		// Weapons
		gameEntity.meleeWeapon = EntityFactory.createSword("Rogue Machete", CONFIG.rogueMeleeDmg);
		
		// AI Component
		var entAI = Object.create(StandardEnemyAIComponent);
		entAI.fov = CONFIG.rogueFov;
		entAI.chaseRange = CONFIG.rogueChaseRange;
		entAI.lastPos = Object.create(Vector2);
		entAI.lastPos.set(entPos.position.x, entPos.position.y);
		
		// Display Component
		var entDisp = Object.create(DisplayComponent);
		
		// Motion Component
		var entMot = Object.create(MotionComponent);
		entMot.velocity = Object.create(Vector2);
		entMot.speed = CONFIG.rogueSpeed;
		
		// Animation Component
		var entAnim = Object.create(AnimationComponent);	
		entAnim.animationData = ASSETS.characters.rogue;
		
		// Side
		var sideComp;
		if (side === "allied")
			sideComp = Object.create(AlliedComponent);
		else if (side === "enemy")
		{
			sideComp = Object.create(EnemyComponent);
			sideComp.golds = CONFIG.rogueGolds;
		}
			
		ECSManager.attachComponent(gameEntity, ent);
		ECSManager.attachComponent(entAI, ent);
		ECSManager.attachComponent(entPos, ent);
		ECSManager.attachComponent(entBox, ent);
		ECSManager.attachComponent(entDisp, ent);
		ECSManager.attachComponent(entMot, ent);
		ECSManager.attachComponent(entAnim, ent);
		ECSManager.attachComponent(sideComp, ent);
		
		// Move to location (if enemy)
		if (side === "enemy")
		{
			var targetPos = Object.create(Vector2);
			targetPos.set(-100, y);
			GameEntitySystem.toMoveToLocationState(ent, targetPos);
		}
		
		return ent;
	},
	
	createPhantom: function(x,y, side)
	{
		var ent = ECSManager.createEntity();
		
		// Box Component
		var entBox = Object.create(BoxComponent);
		entBox.width = 64;
		entBox.height = 64;
		
		// Position Component
		var entPos = Object.create(PositionComponent);	
		entPos.position = Object.create(Vector2);
		entPos.position.x = x - (entBox.width/2);
		entPos.position.y = y - (entBox.height/2);
		
		// GameEntity Component
		var gameEntity = Object.create(GameEntityComponent);
		gameEntity.name = "Phantom " + ent.ID;
		gameEntity.maxHealth = CONFIG.phantomHealth;
		gameEntity.health = gameEntity.maxHealth;
		
		// Weapons
		gameEntity.meleeWeapon = EntityFactory.createSword("Phantom Scythe", CONFIG.phantomMeleeDmg);
		
		// AI Component
		var entAI = Object.create(AggressiveAIComponent);
		entAI.fov = CONFIG.phantomFov;
		entAI.chaseRange = CONFIG.phantomChaseRange;
		entAI.lastPos = Object.create(Vector2);
		entAI.lastPos.set(entPos.position.x, entPos.position.y);
		
		// Display Component
		var entDisp = Object.create(DisplayComponent);
		
		// Motion Component
		var entMot = Object.create(MotionComponent);
		entMot.velocity = Object.create(Vector2);
		entMot.speed = CONFIG.phantomSpeed;
		
		// Animation Component
		var entAnim = Object.create(AnimationComponent);	
		entAnim.animationData = ASSETS.characters.phantom;
		
		// Side
		var sideComp;
		if (side === "allied")
			sideComp = Object.create(AlliedComponent);
		else if (side === "enemy")
		{
			sideComp = Object.create(EnemyComponent);
			sideComp.golds = CONFIG.phantomGolds;
		}
			
		ECSManager.attachComponent(gameEntity, ent);
		ECSManager.attachComponent(entAI, ent);
		ECSManager.attachComponent(entPos, ent);
		ECSManager.attachComponent(entBox, ent);
		ECSManager.attachComponent(entDisp, ent);
		ECSManager.attachComponent(entMot, ent);
		ECSManager.attachComponent(entAnim, ent);
		ECSManager.attachComponent(sideComp, ent);
		
		// Move to location (if enemy)
		if (side === "enemy")
		{
			var targetPos = Object.create(Vector2);
			targetPos.set(-100, y);
			GameEntitySystem.toMoveToLocationState(ent, targetPos);
		}
		
		return ent;
	},
	
	createZombie: function(x,y, side)
	{
		var ent = ECSManager.createEntity();
		
		// Box Component
		var entBox = Object.create(BoxComponent);
		entBox.width = 64;
		entBox.height = 64;
		
		// Position Component
		var entPos = Object.create(PositionComponent);	
		entPos.position = Object.create(Vector2);
		entPos.position.x = x - (entBox.width/2);
		entPos.position.y = y - (entBox.height/2);
		
		// GameEntity Component
		var gameEntity = Object.create(GameEntityComponent);
		gameEntity.name = "Zombie " + ent.ID;
		gameEntity.maxHealth = CONFIG.zombieHealth;
		gameEntity.health = gameEntity.maxHealth;
		
		// Weapons
		gameEntity.meleeWeapon = EntityFactory.createSword("Zombie strike", CONFIG.zombieMeleeDmg);
		
		// AI Component
		var entAI = Object.create(StandardEnemyAIComponent);
		entAI.fov = CONFIG.zombieFov;
		entAI.chaseRange = CONFIG.zombieChaseRange;
		entAI.lastPos = Object.create(Vector2);
		entAI.lastPos.set(entPos.position.x, entPos.position.y);
		
		// Display Component
		var entDisp = Object.create(DisplayComponent);
		
		// Motion Component
		var entMot = Object.create(MotionComponent);
		entMot.velocity = Object.create(Vector2);
		entMot.speed = CONFIG.zombieSpeed;
		
		// Animation Component
		var entAnim = Object.create(AnimationComponent);	
		entAnim.animationData = ASSETS.characters.zombie;
		
		// Side
		var sideComp;
		if (side === "allied")
			sideComp = Object.create(AlliedComponent);
		else if (side === "enemy")
		{
			sideComp = Object.create(EnemyComponent);
			sideComp.golds = CONFIG.zombieGolds;
		}
			
		ECSManager.attachComponent(gameEntity, ent);
		ECSManager.attachComponent(entAI, ent);
		ECSManager.attachComponent(entPos, ent);
		ECSManager.attachComponent(entBox, ent);
		ECSManager.attachComponent(entDisp, ent);
		ECSManager.attachComponent(entMot, ent);
		ECSManager.attachComponent(entAnim, ent);
		ECSManager.attachComponent(sideComp, ent);
		ECSManager.attachComponent(Object.create(VirusTComponent), ent);	// Virus T
		
		// Move to location (if enemy)
		if (side === "enemy")
		{
			var targetPos = Object.create(Vector2);
			targetPos.set(-100, y);
			GameEntitySystem.toMoveToLocationState(ent, targetPos);
		}
		
		return ent;
	},
	
	createOrc: function(x,y, side)
	{
		var ent = ECSManager.createEntity();
		
		// Box Component
		var entBox = Object.create(BoxComponent);
		entBox.width = 64;
		entBox.height = 64;
		
		// Position Component
		var entPos = Object.create(PositionComponent);	
		entPos.position = Object.create(Vector2);
		entPos.position.x = x - (entBox.width/2);
		entPos.position.y = y - (entBox.height/2);
		
		// GameEntity Component
		var gameEntity = Object.create(GameEntityComponent);
		gameEntity.name = "Orc " + ent.ID;
		gameEntity.maxHealth = CONFIG.orcHealth;
		gameEntity.health = gameEntity.maxHealth;
		
		// Weapons
		gameEntity.meleeWeapon = EntityFactory.createSword("Orc Double Axe", CONFIG.orcMeleeDmg);
		
		// AI Component
		var entAI = Object.create(StandardEnemyAIComponent);
		entAI.fov = CONFIG.orcFov;
		entAI.chaseRange = CONFIG.orcChaseRange;
		entAI.lastPos = Object.create(Vector2);
		entAI.lastPos.set(entPos.position.x, entPos.position.y);
		
		// Display Component
		var entDisp = Object.create(DisplayComponent);
		
		// Motion Component
		var entMot = Object.create(MotionComponent);
		entMot.velocity = Object.create(Vector2);
		entMot.speed = CONFIG.orcSpeed;
		
		// Animation Component
		var entAnim = Object.create(AnimationComponent);	
		entAnim.animationData = ASSETS.characters.orc;
		
		// Side
		var sideComp;
		if (side === "allied")
			sideComp = Object.create(AlliedComponent);
		else if (side === "enemy")
		{
			sideComp = Object.create(EnemyComponent);
			sideComp.golds = CONFIG.orcGolds;
		}
			
		ECSManager.attachComponent(gameEntity, ent);
		ECSManager.attachComponent(entAI, ent);
		ECSManager.attachComponent(entPos, ent);
		ECSManager.attachComponent(entBox, ent);
		ECSManager.attachComponent(entDisp, ent);
		ECSManager.attachComponent(entMot, ent);
		ECSManager.attachComponent(entAnim, ent);
		ECSManager.attachComponent(sideComp, ent);
		
		// Move to location (if enemy)
		if (side === "enemy")
		{
			var targetPos = Object.create(Vector2);
			targetPos.set(-100, y);
			GameEntitySystem.toMoveToLocationState(ent, targetPos);
		}
		
		return ent;
	},
	
	createWerewolf: function(x,y, side)
	{
		var ent = ECSManager.createEntity();
		
		// Box Component
		var entBox = Object.create(BoxComponent);
		entBox.width = 64;
		entBox.height = 64;
		
		// Position Component
		var entPos = Object.create(PositionComponent);	
		entPos.position = Object.create(Vector2);
		entPos.position.x = x - (entBox.width/2);
		entPos.position.y = y - (entBox.height/2);
		
		// GameEntity Component
		var gameEntity = Object.create(GameEntityComponent);
		gameEntity.name = "Werewolf " + ent.ID;
		gameEntity.maxHealth = CONFIG.werewolfHealth;
		gameEntity.health = gameEntity.maxHealth;
		
		// Weapons
		gameEntity.meleeWeapon = EntityFactory.createSword("Fullmoon blade", CONFIG.werewolfMeleeDmg);
		
		// AI Component
		var entAI = Object.create(StandardEnemyAIComponent);
		entAI.fov = CONFIG.werewolfFov;
		entAI.chaseRange = CONFIG.werewolfChaseRange;
		entAI.lastPos = Object.create(Vector2);
		entAI.lastPos.set(entPos.position.x, entPos.position.y);
		
		// Display Component
		var entDisp = Object.create(DisplayComponent);
		
		// Motion Component
		var entMot = Object.create(MotionComponent);
		entMot.velocity = Object.create(Vector2);
		entMot.speed = CONFIG.werewolfSpeed;
		
		// Animation Component
		var entAnim = Object.create(AnimationComponent);	
		entAnim.animationData = ASSETS.characters.werewolf;
		
		// Side
		var sideComp;
		if (side === "allied")
			sideComp = Object.create(AlliedComponent);
		else if (side === "enemy")
		{
			sideComp = Object.create(EnemyComponent);
			sideComp.golds = CONFIG.werewolfGolds;
		}
			
		ECSManager.attachComponent(gameEntity, ent);
		ECSManager.attachComponent(entAI, ent);
		ECSManager.attachComponent(entPos, ent);
		ECSManager.attachComponent(entBox, ent);
		ECSManager.attachComponent(entDisp, ent);
		ECSManager.attachComponent(entMot, ent);
		ECSManager.attachComponent(entAnim, ent);
		ECSManager.attachComponent(sideComp, ent);
		
		// Move to location (if enemy)
		if (side === "enemy")
		{
			var targetPos = Object.create(Vector2);
			targetPos.set(-100, y);
			GameEntitySystem.toMoveToLocationState(ent, targetPos);
		}
		
		return ent;
	},
	
	//-------------------------------------------------------------//
	//------------------------// WEAPONS //------------------------//
	//-------------------------------------------------------------//
	createJavelin: function(name, damage)
	{
		var jav = ECSManager.createEntity();
		
		// Weapon Component
		var weaponComp = Object.create(WeaponComponent);
		weaponComp.name = name;
		weaponComp.damage = damage;
		
		// Missile Component
		var missileComp = Object.create(MissileComponent);
		missileComp.speed = 0.2;
		missileComp.damage = 30;
		missileComp.img = "javelin";
		
		// Box Component
		var missileBox = Object.create(BoxComponent);
		missileBox.width = 64;
		missileBox.height = 20;
		
		ECSManager.attachComponent(weaponComp, jav);
		ECSManager.attachComponent(missileComp, jav);
		ECSManager.attachComponent(missileBox, jav);
		
		return jav;
	},
	
	createArrow: function(name, damage)
	{
		var arrow = ECSManager.createEntity();
		
		// Weapon Component
		var weaponComp = Object.create(WeaponComponent);
		weaponComp.name = name;
		weaponComp.damage = damage;
		
		// Missile Component
		var missileComp = Object.create(MissileComponent);
		missileComp.speed = CONFIG.arrowSpeed;
		missileComp.img = "arrow";
		
		// Box Component
		var missileBox = Object.create(BoxComponent);
		missileBox.width = 40;
		missileBox.height = 12;
		
		ECSManager.attachComponent(weaponComp, arrow);
		ECSManager.attachComponent(missileComp, arrow);
		ECSManager.attachComponent(missileBox, arrow);
		
		return arrow;
	},
	
	createFireArrow: function(damage)
	{
		var arrow = ECSManager.createEntity();
		
		// Weapon Component
		var weaponComp = Object.create(WeaponComponent);
		weaponComp.name = "Fire Arrow";
		weaponComp.damage = damage;
		
		// Missile Component
		var missileComp = Object.create(MissileComponent);
		missileComp.speed = CONFIG.fireArrowsSpeed;
		missileComp.img = "fire_arrow";
		
		// Box Component
		var missileBox = Object.create(BoxComponent);
		missileBox.width = 40;
		missileBox.height = 12;
		
		ECSManager.attachComponent(weaponComp, arrow);
		ECSManager.attachComponent(missileComp, arrow);
		ECSManager.attachComponent(missileBox, arrow);
		
		return arrow;
	},
	
	createMagicBall: function(name, damage)
	{
		var magicBall = ECSManager.createEntity();
		
		// Weapon Component
		var weaponComp = Object.create(WeaponComponent);
		weaponComp.name = name;
		weaponComp.damage = damage;
		
		// Missile Component
		var missileComp = Object.create(MissileComponent);
		missileComp.speed = CONFIG.magicBallSpeed;
		missileComp.img = "magic_ball";
		
		// Box Component
		var missileBox = Object.create(BoxComponent);
		missileBox.width = 32;
		missileBox.height = 32;
		
		ECSManager.attachComponent(weaponComp, magicBall);
		ECSManager.attachComponent(missileComp, magicBall);
		ECSManager.attachComponent(missileBox, magicBall);
		
		return magicBall;
	},
	
	createSword: function(name, damage)
	{
		var sword = ECSManager.createEntity();
		
		// Weapon Component
		var weaponComp = Object.create(WeaponComponent);
		weaponComp.name = name;
		weaponComp.damage = damage;
		
		ECSManager.attachComponent(weaponComp, sword);
		
		return sword;
	},
	
	// BONUSES
	createLifeBonus: function(x, y)
	{
		var ent = ECSManager.createEntity();
		
		// Life Bonus Component
		var lifeBonusComp = Object.create(LifeBonusComponent);
		lifeBonusComp.img = "life_bonus";
		
		// Box Component
		var entBox = Object.create(BoxComponent);
		entBox.width = 32;
		entBox.height = 32;
		
		// Position Component
		var entPos = Object.create(PositionComponent);	
		entPos.position = Object.create(Vector2);
		entPos.position.x = x - (entBox.width/2);
		entPos.position.y = y - (entBox.height/2);
		
		// Display Component
		var display = Object.create(DisplayComponent);
		
		ECSManager.attachComponent(lifeBonusComp, ent);
		ECSManager.attachComponent(entBox, ent);
		ECSManager.attachComponent(entPos, ent);
		ECSManager.attachComponent(display, ent);
	},
	
	createGoldBonus: function(x, y)
	{
		var ent = ECSManager.createEntity();
		
		// Gold Bonus Component
		var goldBonusComp = Object.create(GoldBonusComponent);
		goldBonusComp.img = "gold_bonus";
		
		// Box Component
		var entBox = Object.create(BoxComponent);
		entBox.width = 32;
		entBox.height = 32;
		
		// Position Component
		var entPos = Object.create(PositionComponent);	
		entPos.position = Object.create(Vector2);
		entPos.position.x = x - (entBox.width/2);
		entPos.position.y = y - (entBox.height/2);
		
		// Display Component
		var display = Object.create(DisplayComponent);
		
		ECSManager.attachComponent(goldBonusComp, ent);
		ECSManager.attachComponent(entBox, ent);
		ECSManager.attachComponent(entPos, ent);
		ECSManager.attachComponent(display, ent);
	},
	
	createScoreBonus: function(x, y, score)
	{
		var ent = ECSManager.createEntity();
		
		// Score Bonus Component
		var scoreBonusComp = Object.create(GoldScoreComponent);
		scoreBonusComp.score = score;
		
		// Motion Component
		var entMot = Object.create(MotionComponent);
		entMot.velocity = Object.create(Vector2);
		entMot.velocity.set(0, -0.5);
		
		// Box Component
		/*var entBox = Object.create(BoxComponent);
		entBox.width = 32;
		entBox.height = 32;*/
		
		// Position Component
		var entPos = Object.create(PositionComponent);	
		entPos.position = Object.create(Vector2);
		entPos.position.x = x;
		entPos.position.y = y;
		
		// Display Component
		var display = Object.create(DisplayComponent);
		
		ECSManager.attachComponent(scoreBonusComp, ent);
		//ECSManager.attachComponent(entBox, ent);
		ECSManager.attachComponent(entPos, ent);
		ECSManager.attachComponent(entMot, ent);
		ECSManager.attachComponent(display, ent);
	},
	
	callReinforcements: function(targetPos)
	{
		var size = 2;
		var offsetX = 64;
		var offsetY = 20;
		
		// Adjust near boundaries
		if (targetPos.y + (-Math.floor(size/2) * offsetY) < 0)
			targetPos.y += (Math.floor(size/2) * offsetY) + 20;
		
		if (targetPos.y + ((size-Math.floor(size/2)) * offsetY) > canvas.height)
			targetPos.y -= (Math.floor(size/2) * offsetY) + 20;
			
		// First Row
		for (var i = 0; i < size; i++)
		{
			var realTargetY = targetPos.y + ((i-Math.floor(size/2)) * offsetY);
			
			var ent = EntityFactory.createInfantry(-32, realTargetY, "allied");
			var location = Object.create(Vector2);
			location.set(targetPos.x, realTargetY);
			GameEntitySystem.toMoveToLocationState(ent, location);
			
			// Attach component
			var reinf = Object.create(ReinforcementComponent);
			reinf.position = Object.create(Vector2);
			reinf.position.set(targetPos.x, realTargetY);
			ECSManager.attachComponent(reinf, ent);
		}
		
		// Second Row
		for (var i = 0; i < size; i++)
		{
			var realTargetY = Math.floor(targetPos.y + ((i-Math.floor(size/2)) * offsetY));
			
			var ent = EntityFactory.createInfantry(-32 - offsetX, realTargetY, "allied");
			var location = Object.create(Vector2);
			location.set(targetPos.x - offsetX, realTargetY);
			GameEntitySystem.toMoveToLocationState(ent, location);
			
			// Attach component
			var reinf = Object.create(ReinforcementComponent);
			reinf.position = Object.create(Vector2);
			reinf.position.set(targetPos.x - offsetX, realTargetY);
			ECSManager.attachComponent(reinf, ent);
		}
	},
	
	createIceDrop: function()
	{
		var ent = ECSManager.createEntity();
		
		// Scene Object
		var sceneObject = Object.create(SceneObjectComponent);
		sceneObject.img = "icedrop";
		
		// Box Component
		var entBox = Object.create(BoxComponent);
		entBox.width = 32;
		entBox.height = 50;
		
		// Position Component
		var entPos = Object.create(PositionComponent);	
		entPos.position = Object.create(Vector2);
		entPos.position.x = (Math.random() * 5000) - 500;
		entPos.position.y = (Math.random() * -500);
		//entPos.position.y = 10;
		
		// Display Component
		var entDisp = Object.create(DisplayComponent);
		entDisp.scale = (Math.random() * 0.1) + 0.6;
		
		// Motion Component
		var entMot = Object.create(MotionComponent);
		entMot.velocity = Object.create(Vector2);
		entMot.velocity.set(1,1);
		entMot.velocity.normalize();
		entMot.speed = (Math.random() * 30) + 20;
		entMot.velocity.mulScalar(entMot.speed);
		
		ECSManager.attachComponent(sceneObject, ent);
		ECSManager.attachComponent(entPos, ent);
		ECSManager.attachComponent(entBox, ent);
		ECSManager.attachComponent(entDisp, ent);
		ECSManager.attachComponent(entMot, ent);
	}
}