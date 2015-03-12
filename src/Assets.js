var ASSETS =
{
	"characters":	// Da qua in poi comincia la definizione delle animazioni per i personaggi
	{
		"warrior":
		{
			"resName": "./assets/warrior.png",	
			"type": "warrior",					
			
			"walking_right":	// Animazione Camminata Destra
			{
				"animationTime": 150,	// Quanto dura
				"framesCount": 4,		// Quanti frame (immagini) ci sono
				"loop": false,			// Falso se non cicla "all'infinito"
				"orientation": "right",
				"frames":				// Da qua in poi ci sono tutti i dati per i frame
				[
					{	// Primo Frame
						"sourceX": 4*64,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 5*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 6*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 7*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"walking_left":
			{
				"animationTime": 150,	
				"framesCount": 4,		
				"loop": false,
				"orientation": "left",				
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 3*64,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 2*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 1*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 0,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"attack_right":
			{
				"animationTime": 100,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "right",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 4*64,
						"sourceY": 64,
						"width": 80,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (4*64) + 80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					}
				]
			},
			
			"attack_left":
			{
				"animationTime": 100,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "left",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": (4*64) - 80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (4*64) - 2*80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					}
				]
			},
			
			"shoot_right":
			{
				"animationTime": 500,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "right",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 4*64,
						"sourceY": 128,
						"width": 64,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (5*64),
						"sourceY": 128,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"shoot_left":
			{
				"animationTime": 500,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "left",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": (3*64),
						"sourceY": 128,
						"width": 64,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (2*64),
						"sourceY": 128,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"skill_left":
			{
				"animationTime": 400,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "left",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": (3*64),
						"sourceY": 192,
						"width": 64,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (2*64),
						"sourceY": 192,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"skill_right":
			{
				"animationTime": 400,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "left",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": (3*64),
						"sourceY": 192,
						"width": 64,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (2*64),
						"sourceY": 192,
						"width": 64,
						"height": 64
					}
				]
			}
		},
		
		"ranger":
		{
			"resName": "./assets/ranger.png",	
			"type": "ranger",					
			
			"walking_right":	// Animazione Camminata Destra
			{
				"animationTime": 150,	// Quanto dura
				"framesCount": 4,		// Quanti frame (immagini) ci sono
				"loop": false,			// Falso se non cicla "all'infinito"
				"orientation": "right",
				"frames":				// Da qua in poi ci sono tutti i dati per i frame
				[
					{	// Primo Frame
						"sourceX": 4*64,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 5*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 6*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 7*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"walking_left":
			{
				"animationTime": 150,	
				"framesCount": 4,		
				"loop": false,
				"orientation": "left",				
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 3*64,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 2*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 1*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 0,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"attack_right":
			{
				"animationTime": 100,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "right",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 4*64,
						"sourceY": 64,
						"width": 80,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (4*64) + 80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					}
				]
			},
			
			"attack_left":
			{
				"animationTime": 100,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "left",
				"frames":				
				[
					{
						"sourceX": (4*64) - 80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					},
					
					{
						"sourceX": (4*64) - 2*80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					}
				]
			},
			
			"shoot_right":
			{
				"animationTime": 300,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "right",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 4*64,
						"sourceY": 128,
						"width": 64,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (5*64),
						"sourceY": 128,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"shoot_left":
			{
				"animationTime": 300,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "left",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": (3*64),
						"sourceY": 128,
						"width": 64,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (2*64),
						"sourceY": 128,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"skill_right":
			{
				"animationTime": 600,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "right",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 4*64,
						"sourceY": 192,
						"width": 64,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (5*64),
						"sourceY": 192,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"skill_left":
			{
				"animationTime": 600,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "left",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": (3*64),
						"sourceY": 192,
						"width": 64,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (2*64),
						"sourceY": 192,
						"width": 64,
						"height": 64
					}
				]
			}
		},
		
		"wizard":
		{
			"resName": "./assets/wizard.png",	
			"type": "wizard",					
			
			"walking_right":	// Animazione Camminata Destra
			{
				"animationTime": 150,	// Quanto dura
				"framesCount": 4,		// Quanti frame (immagini) ci sono
				"loop": false,			// Falso se non cicla "all'infinito"
				"orientation": "right",
				"frames":				// Da qua in poi ci sono tutti i dati per i frame
				[
					{	// Primo Frame
						"sourceX": 4*64,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 5*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 6*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 7*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"walking_left":
			{
				"animationTime": 150,	
				"framesCount": 4,		
				"loop": false,
				"orientation": "left",				
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 3*64,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 2*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 1*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 0,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"attack_right":
			{
				"animationTime": 200,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "right",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 4*64,
						"sourceY": 64,
						"width": 80,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (4*64) + 80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					}
				]
			},
			
			"attack_left":
			{
				"animationTime": 200,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "left",
				"frames":				
				[
					{
						"sourceX": (4*64) - 80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					},
					
					{
						"sourceX": (4*64) - 2*80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					}
				]
			},
			
			"shoot_right":
			{
				"animationTime": 400,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "right",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 4*64,
						"sourceY": 128,
						"width": 64,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (5*64),
						"sourceY": 128,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"shoot_left":
			{
				"animationTime": 400,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "left",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": (3*64),
						"sourceY": 128,
						"width": 64,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (2*64),
						"sourceY": 128,
						"width": 64,
						"height": 64
					}
				]
			}
		},
		
		"infantry":
		{
			"resName": "./assets/infantry.png",	
			"type": "infantry",					
			
			"walking_right":	// Animazione Camminata Destra
			{
				"animationTime": 150,	// Quanto dura
				"framesCount": 4,		// Quanti frame (immagini) ci sono
				"loop": false,			// Falso se non cicla "all'infinito"
				"orientation": "right",
				"frames":				// Da qua in poi ci sono tutti i dati per i frame
				[
					{	// Primo Frame
						"sourceX": 4*64,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 5*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 6*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 7*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"walking_left":
			{
				"animationTime": 150,	
				"framesCount": 4,		
				"loop": false,
				"orientation": "left",				
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 3*64,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 2*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 1*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 0,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"attack_right":
			{
				"animationTime": 200,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "right",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 4*64,
						"sourceY": 64,
						"width": 80,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (4*64) + 80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					}
				]
			},
			
			"attack_left":
			{
				"animationTime": 200,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "left",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": (4*64) - 80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (4*64) - 2*80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					}
				]
			}
		},
		
		"crossbowman":
		{
			"resName": "./assets/crossbowman.png",	
			"type": "crossbowman",					
			
			"walking_right":	// Animazione Camminata Destra
			{
				"animationTime": 150,	// Quanto dura
				"framesCount": 4,		// Quanti frame (immagini) ci sono
				"loop": false,			// Falso se non cicla "all'infinito"
				"orientation": "right",
				"frames":				// Da qua in poi ci sono tutti i dati per i frame
				[
					{	// Primo Frame
						"sourceX": 4*64,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 5*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 6*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 7*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"walking_left":
			{
				"animationTime": 150,	
				"framesCount": 4,		
				"loop": false,
				"orientation": "left",				
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 3*64,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 2*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 1*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 0,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"attack_right":
			{
				"animationTime": 100,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "right",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 4*64,
						"sourceY": 64,
						"width": 80,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (4*64) + 80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					}
				]
			},
			
			"attack_left":
			{
				"animationTime": 100,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "left",
				"frames":				
				[
					{
						"sourceX": (4*64) - 80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					},
					
					{
						"sourceX": (4*64) - 2*80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					}
				]
			},
			
			"shoot_right":
			{
				"animationTime": 300,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "right",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 4*64,
						"sourceY": 128,
						"width": 64,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (5*64),
						"sourceY": 128,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"shoot_left":
			{
				"animationTime": 300,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "left",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": (3*64),
						"sourceY": 128,
						"width": 64,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (2*64),
						"sourceY": 128,
						"width": 64,
						"height": 64
					}
				]
			}
		},
		
		"skeleton":
		{
			"resName": "./assets/skeleton.png",	
			"type": "skeleton",					
			
			"walking_right":	// Animazione Camminata Destra
			{
				"animationTime": 150,	// Quanto dura
				"framesCount": 4,		// Quanti frame (immagini) ci sono
				"loop": false,			// Falso se non cicla "all'infinito"
				"orientation": "right",
				"frames":				// Da qua in poi ci sono tutti i dati per i frame
				[
					{	// Primo Frame
						"sourceX": 4*64,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 5*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 6*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 7*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"walking_left":
			{
				"animationTime": 150,	
				"framesCount": 4,		
				"loop": false,
				"orientation": "left",				
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 3*64,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 2*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 1*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 0,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"attack_right":
			{
				"animationTime": 300,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "right",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 4*64,
						"sourceY": 64,
						"width": 80,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (4*64) + 80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					}
				]
			},
			
			"attack_left":
			{
				"animationTime": 300,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "left",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": (4*64) - 80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (4*64) - 2*80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					}
				]
			}
		},
		
		"vampire":
		{
			"resName": "./assets/vampire.png",	
			"type": "vampire",					
			
			"walking_right":	// Animazione Camminata Destra
			{
				"animationTime": 150,	// Quanto dura
				"framesCount": 4,		// Quanti frame (immagini) ci sono
				"loop": false,			// Falso se non cicla "all'infinito"
				"orientation": "right",
				"frames":				// Da qua in poi ci sono tutti i dati per i frame
				[
					{	// Primo Frame
						"sourceX": 4*64,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 5*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 6*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 7*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"walking_left":
			{
				"animationTime": 150,	
				"framesCount": 4,		
				"loop": false,
				"orientation": "left",				
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 3*64,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 2*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 1*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 0,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"attack_right":
			{
				"animationTime": 300,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "right",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 4*64,
						"sourceY": 64,
						"width": 80,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (4*64) + 80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					}
				]
			},
			
			"attack_left":
			{
				"animationTime": 300,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "left",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 2 + (4*64) - 80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": 2 + (4*64) - 2*80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					}
				]
			}
		},
		
		"rogue":
		{
			"resName": "./assets/rogue.png",	
			"type": "rogue",					
			
			"walking_right":	// Animazione Camminata Destra
			{
				"animationTime": 150,	// Quanto dura
				"framesCount": 4,		// Quanti frame (immagini) ci sono
				"loop": false,			// Falso se non cicla "all'infinito"
				"orientation": "right",
				"frames":				// Da qua in poi ci sono tutti i dati per i frame
				[
					{	// Primo Frame
						"sourceX": 4*64,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 5*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 6*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 7*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"walking_left":
			{
				"animationTime": 150,	
				"framesCount": 4,		
				"loop": false,
				"orientation": "left",				
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 3*64,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 2*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 1*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 0,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"attack_right":
			{
				"animationTime": 150,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "right",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 4*64,
						"sourceY": 64,
						"width": 80,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (4*64) + 80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					}
				]
			},
			
			"attack_left":
			{
				"animationTime": 150,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "left",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": (4*64) - 80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (4*64) - 2*80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					}
				]
			}
		},
		
		"phantom":
		{
			"resName": "./assets/phantom.png",	
			"type": "phantom",					
			
			"walking_right":	// Animazione Camminata Destra
			{
				"animationTime": 250,	// Quanto dura
				"framesCount": 2,		// Quanti frame (immagini) ci sono
				"loop": false,			// Falso se non cicla "all'infinito"
				"orientation": "right",
				"frames":				// Da qua in poi ci sono tutti i dati per i frame
				[
					{	// Primo Frame
						"sourceX": 32 + (2*64),	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 32 + (3*64),
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"walking_left":
			{
				"animationTime": 250,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "left",				
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 34 + 64,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 34,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"attack_right":
			{
				"animationTime": 300,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "right",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 32 + (2*64),
						"sourceY": 64,
						"width": 80,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": 32 + (3*64) + 18,
						"sourceY": 64,
						"width": 80,
						"height": 64
					}
				]
			},
			
			"attack_left":
			{
				"animationTime": 300,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "left",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 18 + 64,
						"sourceY": 64,
						"width": 80,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": 0,
						"sourceY": 64,
						"width": 80,
						"height": 64
					}
				]
			}
		},
		
		"zombie":
		{
			"resName": "./assets/zombie.png",	
			"type": "zombie",					
			
			"walking_right":	// Animazione Camminata Destra
			{
				"animationTime": 300,	// Quanto dura
				"framesCount": 4,		// Quanti frame (immagini) ci sono
				"loop": false,			// Falso se non cicla "all'infinito"
				"orientation": "right",
				"frames":				// Da qua in poi ci sono tutti i dati per i frame
				[
					{	// Primo Frame
						"sourceX": 4*64,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 5*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 6*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 7*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"walking_left":
			{
				"animationTime": 300,	
				"framesCount": 4,		
				"loop": false,
				"orientation": "left",				
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 3*64,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 2*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 1*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 0,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"attack_right":
			{
				"animationTime": 300,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "right",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 4*64,
						"sourceY": 64,
						"width": 80,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (4*64) + 80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					}
				]
			},
			
			"attack_left":
			{
				"animationTime": 300,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "left",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": (4*64) - 80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (4*64) - 2*80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					}
				]
			}
		},
		
		"orc":
		{
			"resName": "./assets/orc.png",	
			"type": "orc",					
			
			"walking_right":	// Animazione Camminata Destra
			{
				"animationTime": 300,	// Quanto dura
				"framesCount": 4,		// Quanti frame (immagini) ci sono
				"loop": false,			// Falso se non cicla "all'infinito"
				"orientation": "right",
				"frames":				// Da qua in poi ci sono tutti i dati per i frame
				[
					{	// Primo Frame
						"sourceX": 4*64,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 5*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 6*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 7*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"walking_left":
			{
				"animationTime": 300,	
				"framesCount": 4,		
				"loop": false,
				"orientation": "left",				
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 3*64 + 1,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 2*64 + 1,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 1*64 + 1,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 0,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"attack_right":
			{
				"animationTime": 300,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "right",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 4*64,
						"sourceY": 64,
						"width": 80,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (4*64) + 80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					}
				]
			},
			
			"attack_left":
			{
				"animationTime": 300,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "left",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": (4*64) - 80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (4*64) - 2*80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					}
				]
			}
		},
		
		"werewolf":
		{
			"resName": "./assets/werewolf.png",	
			"type": "werewolf",					
			
			"walking_right":	// Animazione Camminata Destra
			{
				"animationTime": 250,	// Quanto dura
				"framesCount": 4,		// Quanti frame (immagini) ci sono
				"loop": false,			// Falso se non cicla "all'infinito"
				"orientation": "right",
				"frames":				// Da qua in poi ci sono tutti i dati per i frame
				[
					{	// Primo Frame
						"sourceX": 4*64,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 5*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 6*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 7*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"walking_left":
			{
				"animationTime": 250,	
				"framesCount": 4,		
				"loop": false,
				"orientation": "left",				
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 3*64 + 1,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 2*64 + 1,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 1*64 + 1,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 0,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"attack_right":
			{
				"animationTime": 300,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "right",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 4*64,
						"sourceY": 64,
						"width": 80,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (4*64) + 80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					}
				]
			},
			
			"attack_left":
			{
				"animationTime": 300,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "left",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": (4*64) - 80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (4*64) - 2*80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					}
				]
			}
		},
		
		"kamikaze":
		{
			"resName": "./assets/kamikaze.png",	
			"type": "kamikaze",					
			
			"walking_right":	// Animazione Camminata Destra
			{
				"animationTime": 200,	// Quanto dura
				"framesCount": 4,		// Quanti frame (immagini) ci sono
				"loop": false,			// Falso se non cicla "all'infinito"
				"orientation": "right",
				"frames":				// Da qua in poi ci sono tutti i dati per i frame
				[
					{	// Primo Frame
						"sourceX": 4*64,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 5*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 6*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 7*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"walking_left":
			{
				"animationTime": 200,	
				"framesCount": 4,		
				"loop": false,
				"orientation": "left",				
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 3*64 + 1,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 2*64 + 1,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 1*64 + 1,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 0,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			}
		},
		
		"shaman":
		{
			"resName": "./assets/shaman.png",	
			"type": "shaman",					
			
			"walking_right":	// Animazione Camminata Destra
			{
				"animationTime": 150,	// Quanto dura
				"framesCount": 4,		// Quanti frame (immagini) ci sono
				"loop": false,			// Falso se non cicla "all'infinito"
				"orientation": "right",
				"frames":				// Da qua in poi ci sono tutti i dati per i frame
				[
					{	// Primo Frame
						"sourceX": 4*64,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 5*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 6*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 7*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"walking_left":
			{
				"animationTime": 150,	
				"framesCount": 4,		
				"loop": false,
				"orientation": "left",				
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 3*64,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 2*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 1*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 0,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"shoot_right":
			{
				"animationTime": 400,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "right",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 4*64,
						"sourceY": 64,
						"width": 80,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (4*64) + 80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					}
				]
			},
			
			"shoot_left":
			{
				"animationTime": 400,	
				"framesCount": 2,		
				"loop": false,
				"orientation": "left",
				"frames":				
				[
					{	// Primo Frame
						"sourceX": (4*64) - 80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					},
					
					{	// Secondo Frame..
						"sourceX": (4*64) - 2*80,
						"sourceY": 64,
						"width": 80,
						"height": 64
					}
				]
			}
		},
		
		"ghost":
		{
			"resName": "./assets/ghost.png",	
			"type": "ghost",					
			
			"walking_right":	// Animazione Camminata Destra
			{
				"animationTime": 200,	// Quanto dura
				"framesCount": 4,		// Quanti frame (immagini) ci sono
				"loop": false,			// Falso se non cicla "all'infinito"
				"orientation": "right",
				"frames":				// Da qua in poi ci sono tutti i dati per i frame
				[
					{	// Primo Frame
						"sourceX": 4*64,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 5*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 6*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 7*64,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			},
			
			"walking_left":
			{
				"animationTime": 200,	
				"framesCount": 4,		
				"loop": false,
				"orientation": "left",				
				"frames":				
				[
					{	// Primo Frame
						"sourceX": 3*64 + 1,	// Posizione X sullo sprite-sheet
						"sourceY": 0,	// Positione Y 
						"width": 64,	// Larghezza
						"height": 64	// Altezza
					},
					
					{	// Secondo Frame..
						"sourceX": 2*64 + 1,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 1*64 + 1,
						"sourceY": 0,
						"width": 64,
						"height": 64
					},
					
					{
						"sourceX": 0,
						"sourceY": 0,
						"width": 64,
						"height": 64
					}
				]
			}
		},
	},
	
	"effects":
	{
		"explosion":
		{
			"resName": "./assets/explosion.png",	
			"type": "explosion",					
			
			"explode":	
			{
				"animationTime": 40,	
				"framesCount": 8,	
				"loop": false,	
				"orientation": "right",
				"frames":
				[
					{
						"sourceX": 0,
						"sourceY": 0,
						"width": 128,
						"height": 128
					},
					
					{
						"sourceX": 128,
						"sourceY": 0,
						"width": 128,
						"height": 128
					},
					
					{
						"sourceX": 2*128,
						"sourceY": 0,
						"width": 128,
						"height": 128
					},
					
					{
						"sourceX": 3*128,
						"sourceY": 0,
						"width": 128,
						"height": 128
					},
					
					{
						"sourceX": 4*128,
						"sourceY": 0,
						"width": 128,
						"height": 128
					},
					
					{
						"sourceX": 5*128,
						"sourceY": 0,
						"width": 128,
						"height": 128
					},
					
					{
						"sourceX": 6*128,
						"sourceY": 0,
						"width": 128,
						"height": 128
					},
					
					{
						"sourceX": 7*128,
						"sourceY": 0,
						"width": 128,
						"height": 128
					}
				]
			},
		}
	}
};