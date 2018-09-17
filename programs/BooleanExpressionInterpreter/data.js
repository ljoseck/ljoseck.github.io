var files = Ext.create('Ext.data.Store', {  data: [

          {'1':"main.js", '2':"JavaScript", '3':"March 2017", '4':"March 2017", '5':260},
          {'1':"main2.js", '2':"JavaScript", '3':"March 2017", '4':"March 2017", '5':332},
          {'1':"interpreter.html", '2':"HTML", '3':"March 2017", '4':"March 2017", '5':""},
]});

var title = "Boolean Expression Interpreter";

var discription = "";

var demoLink = "interpreter.html";


var discriptionBox = Ext.create('Ext.form.Panel', {

	//width: "80%",
	height: 300,
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
