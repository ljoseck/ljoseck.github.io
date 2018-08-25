var files = Ext.create('Ext.data.Store', {  data: [

          {'1':"SkyRidge.txt", '2':"Ti-Basic", '3':"2011", '4':"2014", '5':718},
]});


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
