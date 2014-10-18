// Entity Component System Manager
var ECSManager =
{
	nextValidID: 0,

	currentState: null,	// Current State
	
	entityIDPool: [],
	
	entities: [],
	components: [],		// [Entity][ComponentType]
	systems: [],

	createEntity: function()
	{
		var entity = Object.create(Entity);					// New Entity
		
		// Assign new ID or rycicle an old one
		if (this.entityIDPool.length > 0)
		{
			entity.ID = this.entityIDPool.pop();
			this.entities[entity.ID] = entity;
			//console.log("Re-Assigning: " + entity.ID);
		}
		else
		{
			entity.ID = this.nextValidID++;	// Assign new ID
			this.entities.push(entity);		// Push entity in array
			this.components.push(entity.ID);
			//console.log("Assigning: " + entity.ID);
		}
		
		this.components[entity.ID] = new Array(ComponentType.length)	// Initialize components
		
		return entity;				// Return new entity
	},

	removeEntity: function(entity)
	{
		this.entities[entity.ID] = undefined;
		this.components[entity.ID] = undefined;
		this.entityIDPool.push(entity.ID);
		//console.log("Removing: " + entity.ID);
	},

	attachComponent: function(component, entity)
	{
		this.components[entity.ID][component.type] = component;
	},

	detachComponent: function(componentType, entity)
	{
		this.components[entity.ID][componentType] = undefined;
	},
	
	addSystem: function(system)
	{
		this.systems.push(system);
		system.init();
	},

	update: function(dt)
	{
		// Init State
		if (!this.currentState.initialized)
			this.currentState.init();
			
		for (var i = 0; i < this.systems.length; i++)
			this.systems[i].update(dt);
	},

	hasComponent: function(entity, componentType)
	{
		return entity &&
			   this.components[entity.ID] &&
			   this.components[entity.ID][componentType];	
	},

	getComponent: function(entity, componentType)
	{
		return this.components[entity.ID][componentType];
	},
	
	changeState: function(state)
	{
		this.currentState = state;
	},
	
	// Reset ECS Manager
	reset: function()
	{
		this.nextValidID = 0;
		this.entityIDPool.length = 0;
		this.entityIDPool = [];
		this.entities.length = 0;
		this.entities = [];
		this.components.length = 0;
		this.components = [];
		this.systems.length = 0;
		this.systems = [];
	},
	
	resetSystems: function()
	{
		this.systems.length = 0;
		this.systems = [];
	}
};