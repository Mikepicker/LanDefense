// Sound System
var SoundSystem =
{
	MAX_SOUNDS: 20,
	playingCount: 0,
	playingSounds: [],
	
	init: function() {},
	
	update: function(dt)
	{
		for (var i = 0; i < SoundSystem.playingCount; i++)
		{
			if (SoundSystem.playingSounds[i].ended)
			{
				SoundSystem.playingSounds.splice(i,1);
				SoundSystem.playingCount--;
			}
		}
	},
	
	playSound: function(soundID, volume, playbackRate, currentTime)
	{
		if (SoundSystem.playingCount < SoundSystem.MAX_SOUNDS)
		{
			var sound = AssetsManager.sounds[soundID].cloneNode();
			sound.volume = volume;
			sound.playbackRate = playbackRate;
			sound.addEventListener('loadedmetadata',function()
				{
					this.currentTime = currentTime;
				}, false );
				
			sound.play();
			
			SoundSystem.playingSounds.push(sound);
			SoundSystem.playingCount++;
		}
	},
	
	reset: function()
	{
		SoundSystem.playingCount = 0;
		SoundSystem.playingSounds = [];
		SoundSystem.playingSounds.length = 0;
	}
}