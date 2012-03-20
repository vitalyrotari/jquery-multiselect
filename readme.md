# jQuery Multi-Select Plugin

#### Requirements

* jQuery 1.7+

#### Default Options

	{
		max: 5,
    	title: '',
    	buttons: {
    		add: "<a href=\"#\">add</a>",
        	del: "<a href=\"#\">delete</a>"
    	}
    }

####  CSS Classes

	.multifields
	.multifields-row
	.multifields-row-buttons
	.multifields-add-field
	.multifields-del-field
	
#### Container Events

	MultiFields.add
	MultiFields.remove
	MultiFields.update
	
Example:

	var elem = $('.multifields').eq(0);
	
	elem.on('MultiFields.add', function(event, row) {
		// do something
	});
	
	elem.on('MultiFields.remove', function(event, index) {
		// do something
	});
	
	elem.on('MultiFields.update', function(event) {
		// do something
	});

#### Class Instance
	
	form.MultiFields
	
Example:
	
	var elem = $('.multifields').eq(0),
		instance = elem.data('form.MultiFields');
		
	instance.add();
	instance.remove(1);
	...
	

#### Layout Example

	<div class="multifields" data-max-fields="5" data-title="Name">
		<div>
			<label for="names_0">Foo</label>
			<input name="names[0]" id="names_0" type="text" value>
		</div>
	</div>