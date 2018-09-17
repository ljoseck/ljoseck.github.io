var files = Ext.create('Ext.data.Store', {  data: [

		{'1':"main.js", '2':"JavaScript", '3':"2018", '4':"2018", '5':695},
		{'1':"testing.js", '2':"JavaScript", '3':"2018", '4':"2018", '5':347},
		{'1':"level1.js", '2':"JavaScript", '3':"2018", '4':"2018", '5':32},
		{'1':"level2.js", '2':"JavaScript", '3':"2018", '4':"2018", '5':64},
		{'1':"level3.js", '2':"JavaScript", '3':"2018", '4':"2018", '5':45},
		{'1':"level4.js", '2':"JavaScript", '3':"2018", '4':"2018", '5':53},
		{'1':"level5.js", '2':"JavaScript", '3':"2018", '4':"2018", '5':49},
		{'1':"level6.js", '2':"JavaScript", '3':"2018", '4':"2018", '5':49},
]});


var title = "Game of Codes";

var discription = "";
var demoLink = "../../gameofcodes/web/main_menu.html";

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
