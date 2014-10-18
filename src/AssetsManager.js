var AssetsManager =
{
	images: new Object(),
	sounds: new Object(),
	
	reset: function()
	{
		this.images = new Object();
		this.sounds = new Object();
	},
	
	loadImage: function(resID, path)
	{
		if (!this.images[resID])
		{
			var image = new Image();
			image.src = path;
			image.onerror = function() { console.log("Failed to load image"); }
			
			this.images[resID] = image;
		}
	},
	
	// Declared in HTML
	loadSound: function(resID)
	{
		// Load sound and put it inside the table
		var sound = document.querySelector("#" + resID);
		this.sounds[resID] = sound;
		sound.load();
	}
};