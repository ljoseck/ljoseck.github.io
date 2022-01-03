var files = Ext.create('Ext.data.Store', {  data: [

          {'1':"main.html", '2':"Html", '3':"2022", '4':"2022", '5':""},
          {'1':"main.js", '2':"JavaScript", '3':"2022", '4':"2022", '5':126},
]});

var title = "3-4-7 Star Puzzle";
var discription = "";

var demoLink = "main.html";

var discriptionBox = Ext.create('Ext.form.Panel', {

	//width: "80%",
	height: 400,
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
