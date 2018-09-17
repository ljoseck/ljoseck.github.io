var files = Ext.create('Ext.data.Store', {  data: [

          {'1':"Realm Trader.ahk", '2':"AutoHotkey", '3':"2015", '4':"2015", '5':538},
]});

var title = "Auto Trader";

var discription = "";


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
