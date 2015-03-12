var AssetsManager =
{
	images: new Object(),
	sounds: new Object(),
	
	assetsLoaded: 0,
	assetsToLoad: 0,
	
	reset: function()
	{
		this.images = new Object();
		this.sounds = new Object();
	},
	
	loadImage: function(resID, path)
	{
		if (!this.images[resID])
		{
			AssetsManager.assetsToLoad++;
			
			var image = new Image();
			image.src = path;
			image.onerror = function() { console.log("Failed to load image"); }
			image.onload = function()
			{ 
				AssetsManager.assetsLoaded++;
				AssetsManager.assetsToLoad--;
			}
			
			this.images[resID] = image;
		}
	},
	
	loadSound: function(resID, path)
	{
		if (!this.sounds[resID])
		{
			AssetsManager.assetsToLoad++;
			
			var sound = new Audio(path);
			sound.load();
			sound.onerror = function() 
			{ 
				console.log("Failed to load sound");
				AssetsManager.assetsLoaded++;
				AssetsManager.assetsToLoad--; 
			}
			sound.oncanplay = function()
			{ 
				AssetsManager.assetsLoaded++;
				AssetsManager.assetsToLoad--;
			}
			
			this.sounds[resID] = sound;
		}
	}
};
