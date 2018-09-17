var cloneSets = Ext.create('Ext.data.Store', {  data: [

          {'1':"3D Renderer", '2':"JavaScript", '3':"2018", '4':"2018", '5': "Personal Project",'6':404},
          {'1':"Game Of Codes", '2':"JavaScript", '3':"2018", '4':"2018", '5': "School Project",'6':1334},
          {'1':"File System", '2':"C", '3':"2016", '4':"2016", '5': "School Project",'6':426},
          {'1':"Mandelbrot Set", '2':"Python", '3':"2015", '4':"", '5': "Personal Project",'6':""},
          {'1':"8 Queens Problem", '2':"Python", '3':"2015", '4':"2015", '5': "Personal Project",'6':86},
          {'1':"Auto Trader", '2':"AutoHotkey", '3':"2015", '4':"2015", '5': "Personal Project",'6':538},
          {'1':"Boolean Expression Interpreter", '2':"JavaScript", '3':"2014", '4':"2014", '5': "School Project",'6':332},
          {'1':"2048", '2':"Ti-Basic", '3':"2014", '4':"2014", '5': "Personal Project",'6':227},
          {'1':"SkyRidge", '2':"Ti-Basic", '3':"2011", '4':"2014", '5': "Personal Project",'6':718},
]});

function projectRenderer(val) {
    if (val != null) {
		return "<a href='./" + val.replace(/ /g,"") + "/index.html'>" + val + "</a>";
        //return "<a href=\'xCloneSet" + val + ".html'  target='_blank'>CloneSet" + val + "</a>"; open new tab for cloneSet
    }
    return val;//{static variables, functions, charts, and tables
}

var table = Ext.create('Ext.grid.Panel', {

    //width: "80%",

	
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
        { text: "Project", width: 250, dataIndex: '1', sortable: true, renderer: projectRenderer },
        { text: "Language", width: 150, dataIndex: '2', sortable: true },
        { text: "Development Start", width: 160, dataIndex: '3', sortable: true },
        { text: "Development End", width: 150, dataIndex: '4', sortable: true },
        { text: "Type", width: 150, dataIndex: '5', sortable: true },
        { text: "Lines of Code", flex: 1, dataIndex: '6', sortable: true }
    ],
    store: cloneSets
});


var header = Ext.create('Ext.form.Panel', {
	html:'<div class="header"><h1>Programming Projects</h1>',

    width: 308,
    height: 36,
	margin: '0 0 10 0',
	// items: [{
		// xtype: 'fieldset',

        // columnWidth: 0.35,
        // //
        // layout: 'anchor',
        // defaultType: 'textfield',

        // // items: [{
            // // fieldLabel: 'Name',
        // // }, {
            // // fieldLabel: 'Price',
        // // }, {
            // // fieldLabel: '% Change',
        // // }, {
            // // xtype: 'datefield',
            // // fieldLabel: 'Last Updated',
        // // }, {
			// // xtype: 'button',
			// // text: 'Language',
			// // menu: [{
                // // text:'C'
            // // },{
                // // text:'C#'
            // // },{
                // // text:'Python'	
            // // }]
		// // }]

		
	// }],
	
});


Ext.onReady(function () {
 	var viewport = Ext.create('Ext.container.Viewport', {
        margin: '20 20 0 20',
 	//var viewport = Ext.create('Ext.panel.Panel', {
		
        //layout: 'fit', 
    });
	viewport.add([{
			margin: '0 0 10 0',
			xtype: 'button',
			text: 'Back',
			handler: function() {
				
			window.open("../index.html", "_self");
			}
		},header,table]);
	//viewport.add(table);
});