var files = Ext.create('Ext.data.Store', {  data: [

          {'1':"queenproblem.py", '2':"Python", '3':"2015", '4':"", '5':86},
]});


var discription = "&emsp;The eight queens problem is the problem of placing eight queens on an 8x8 sized chessboard such that none of them attack one another. I first solved this basic problem before solving the more general case of nxn sized chessboard. This program prints the solutions starting with a 0x0 board then incrmenting upwards <br/> example output: <br/> 0 by 0 board<br/>\
<br/>\
1 by 1 board<br/>\
Q <br/>\
<br/>\
2 by 2 board<br/>\
No soulution?<br/>\
3 by 3 board<br/>\
No soulution?<br/>\
4 by 4 board<br/>\
. Q . . <br/>\
. . . Q <br/>\
Q . . . <br/>\
. . Q . <br/>\
<br/>\
5 by 5 board<br/>\
Q . . . . <br/>\
. . Q . . <br/>\
. . . . Q <br/>\
. Q . . . <br/>\
. . . Q . <br/>\
<br/>\
6 by 6 board<br/>\
. Q . . . . <br/>\
. . . Q . . <br/>\
. . . . . Q <br/>\
Q . . . . . <br/>\
. . Q . . . <br/>\
. . . . Q . <br/>\
<br/>\
7 by 7 board<br/>\
Q . . . . . . <br/>\
. . Q . . . . <br/>\
. . . . Q . . <br/>\
. . . . . . Q <br/>\
. Q . . . . . <br/>\
. . . Q . . . <br/>\
. . . . . Q . <br/>\
<br/>\
8 by 8 board<br/>\
Q . . . . . . . <br/>\
. . . . Q . . . <br/>\
. . . . . . . Q <br/>\
. . . . . Q . . <br/>\
. . Q . . . . . <br/>\
. . . . . . Q . <br/>\
. Q . . . . . . <br/>\
. . . Q . . . . <br/>\
<br/>\
9 by 9 board<br/>\
Q . . . . . . . . <br/>\
. . Q . . . . . . <br/>\
. . . . . Q . . . <br/>\
. . . . . . . Q . <br/>\
. Q . . . . . . . <br/>\
. . . Q . . . . . <br/>\
. . . . . . . . Q <br/>\
. . . . . . Q . . <br/>\
. . . . Q . . . . <br/>\
<br/>\
10 by 10 board<br/>\
Q . . . . . . . . . <br/>\
. . Q . . . . . . . <br/>\
. . . . . Q . . . . <br/>\
. . . . . . . Q . . <br/>\
. . . . . . . . . Q <br/>\
. . . . Q . . . . . <br/>\
. . . . . . . . Q . <br/>\
. Q . . . . . . . . <br/>\
. . . Q . . . . . . <br/>\
. . . . . . Q . . . <br/>\
(cont)...";