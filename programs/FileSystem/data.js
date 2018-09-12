var files = Ext.create('Ext.data.Store', {  data: [

          {'1':"main.c", '2':"C", '3':"2016", '4':"2016", '5':426},
          {'1':"sampleInput.c", '2':"", '3':"", '4':"", '5':""},
          {'1':"sampleOutput.c", '2':"", '3':"", '4':"", '5':""},
]});

var title = "File System";

var discription = "";


var discriptionBox = Ext.create('Ext.form.Panel', {

	//width: "80%",
	height: 250,
	layout: 'fit', 
	resizable:{
			pinned:true,
			dynamic:true,
			handles: 's',
			minHeight: 150,
		},	
	items: [{
		padding: "0 0 0 10",
		
		xtype: 'fieldset',
		title:'Discription',
		margin: '10 0 0 0',
		height: 500,
		scrollable : {
			direction     : 'vertical'
		},
		
		html: discription,
		id: "disc"
		
	}],
	
});
