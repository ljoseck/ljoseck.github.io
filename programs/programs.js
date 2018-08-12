function fileRenderer(val) {
    if (val != null) {
		var folder = window.location.href.split('/')
		folder = folder[folder.length - 2];
		console.log(folder);
		//https://github.com/ljoseck/ljoseck.github.io/blob/master/programs/MandelbrotSet/Mandelbrot.py
		return "<a href='https://github.com/ljoseck/ljoseck.github.io/blob/master/programs/" + folder + '/' + val + "'>" + val + "</a>";
		//return "<a href='./" + val + "'>" + val + "</a>";
    }
    return val;
}

/*
var discription = Ext.create('Ext.panel.Panel', {
	
	bodyPadding: 10,
	scrollable : {
		direction     : 'vertical'
	},
	xtype: 'panel',
	//layout: 'fit',
	height: 300,
	//flex: 1,
	html: discription,
});*/


var table = Ext.create('Ext.grid.Panel', {

    defaults: {
        bodyPadding: 10,
    },
	
	
    scrollable: true,
    features: [{
        id: 'group1',
        ftype: 'grouping',
        groupHeaderTpl: '{name}',
        hideGroupedHeader: true,
        enableGroupingMenu: false,
        //startCollapsed: true
    }],
	
	
    columns: [
        { text: "Files", width: 300, dataIndex: '1', sortable: true, renderer: fileRenderer },
        { text: "Language", width: 120, dataIndex: '2', sortable: true },
        { text: "Development Start Date", width: 160, dataIndex: '3', sortable: true },
        { text: "Development Time", width: 150, dataIndex: '4', sortable: true },
        { text: "Lines of Code", flex: 1, dataIndex: '5', sortable: true }
    ],
    store: files
});


if(discriptionBox == null){
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
			height: 300,
			scrollable : {
				direction     : 'vertical'
			},
			
			html: discription,
			
		}],
		
	});
}

Ext.onReady(function () {
 	var viewport = Ext.create('Ext.container.Viewport', {
        margin: '20 20 0 20',
 	//var viewport = Ext.create('Ext.panel.Panel', {
		scrollable : {
			direction     : 'vertical'
		},
        //layout: 'fit', 
		items: [{
			margin: '0 0 10 0',
			xtype: 'button',
			text: 'Back',
			handler: function() {
				
			window.open("../index.html", "_self");
			}
		},
		discriptionBox,
		table,
		]
    });
	//viewport.add([discription,table]);
	viewport.show();
	document.getElementById('disc-innerCt').appendChild(
    document.getElementById('Discription')
  );
});