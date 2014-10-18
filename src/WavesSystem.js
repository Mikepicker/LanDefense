// Wave System (Handle levels)
var WavesSystem =
{
	gameTime: 0,
	totalWaves: 0,
	waveIndex: 0,
	gameState: null,
	
	init: function()
	{
		// Get map and camera
		for (var i = 0; i < ECSManager.entities.length; i++)
		{
			if (ECSManager.hasComponent(ECSManager.entities[i], ComponentType.COMPONENT_GAMESTATE))
			{
				this.gameState = ECSManager.getComponent(ECSManager.entities[i], ComponentType.COMPONENT_GAMESTATE);
				break;
			}
		}
		
		// Total Waves
		this.totalWaves = WAVES.waves.length;
	},
	
	update: function(dt)
	{
		if (this.gameState.gamePaused || this.gameState.gameWon)
			return;
				
		// Read data and spawn monsters
		var waveData = WAVES.waves[this.gameState.currentWave-1];
		
		// Don't do anything if we've done with current wave
		if (this.waveIndex >= waveData.length)
		{
			// Check for wave end
			if (this.gameState.enemiesAlive <= 0)
			{
				console.log("Wave " + this.gameState.currentWave + " Complete!");
				
				// Next level?
				this.gameTime = 0;
				this.gameState.currentWave++;
				this.gameState.waveIndex = 0;
				
				// Check for game end
				if (this.gameState.currentWave > this.totalWaves)
				{
					// Game Won!
					console.log("You win!");
					this.gameState.gameWon = true;
					return;
				}
				else // Next wave 
				{
					console.log("Begin wave " + this.gameState.currentWave);
					this.waveIndex = 0;
					return;
				}
			}
			
			// Increase game time
			this.gameTime += dt;
			return;
		}
		
		var currentWaveData = waveData[this.waveIndex];
		
		if (this.gameTime >= parseInt(currentWaveData[0]))
		{
			this.waveIndex++;
			
			for (var i = 1; i < currentWaveData.length; i++)
			{
				// http://stackoverflow.com/questions/1216505/how-to-parse-a-string-in-javascript
				var parseRes = currentWaveData[i].split('-');
				this.gameState.enemiesAlive += parseInt(parseRes[0]);
				
				for (var j = 0; j < parseRes[0]; j++)
				{
					switch(parseRes[1])
					{
						case "rogue": 
							EntityFactory.createRogue(Math.floor((Math.random() * 2500) + 2000), 
													  Math.floor((Math.random() * 600) + 1), "enemy");
							break;
																
						case "skeleton":
							EntityFactory.createSkeleton(Math.floor((Math.random() * 2500) + 2000), 
														 Math.floor((Math.random() * 600) + 1), "enemy");
							break;
							
						case "vampire":
							EntityFactory.createVampire(Math.floor((Math.random() * 2500) + 2000), 
														Math.floor((Math.random() * 600) + 1), "enemy");
							break;
							
						case "phantom":
							EntityFactory.createPhantom(Math.floor((Math.random() * 2500) + 2000), 
														Math.floor((Math.random() * 600) + 1), "enemy");
							break;
							
						case "zombie":
							EntityFactory.createZombie(Math.floor((Math.random() * 2500) + 2000), 
														Math.floor((Math.random() * 600) + 1), "enemy");
							break;
							
						case "orc":
							EntityFactory.createOrc(Math.floor((Math.random() * 2500) + 2000), 
														Math.floor((Math.random() * 600) + 1), "enemy");
							break;
							
						case "werewolf":
							EntityFactory.createWerewolf(Math.floor((Math.random() * 2500) + 2000), 
														Math.floor((Math.random() * 600) + 1), "enemy");
							break;
					}
				}
			}
		}
		
		// Increase game time
		this.gameTime += dt;
	}
}