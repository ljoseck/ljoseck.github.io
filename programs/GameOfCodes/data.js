var files = Ext.create('Ext.data.Store', {  data: [

          {'1':"main.py", '2':"Python", '3':"2018", '4':"", '5':114},
]});


var discription = "&emsp;I am very fond of the mathematical concepts where complexity forms out of simplicity. The Mandelbrot set is a great example. I made these programs as a test to see if I could render the Mandelbrot with the language<br/><img src='mandelbrot1.png' style='width:1200px;height:600px;'><br/><img src='mandelbrot2.png' style='width:1200px;height:600px;'>";

var discriptionBox = Ext.create('Ext.form.Panel', {

	//width: "80%",
	height: 500,
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
		
	}],
	
});