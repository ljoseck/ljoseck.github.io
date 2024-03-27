var files = Ext.create('Ext.data.Store', {  data: [

          {'1':"index.html", '2':"Html", '3':"2022", '4':"2022", '5':""},
          {'1':"main.js", '2':"JavaScript", '3':"2022", '4':"2022", '5':456},
          {'1':"Board.js", '2':"JavaScript", '3':"2022", '4':"2022", '5':232},
          {'1':"ToolBar.js", '2':"JavaScript", '3':"2022", '4':"2022", '5':80},
          {'1':"HelperRandom.js", '2':"JavaScript", '3':"2022", '4':"2022", '5':26},
]});

var title = "Infinite Chess";

var discription = "";

var demoLink = "src/index.html";

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
