{ ; Auto-Execute
	#NoTrayIcon
	SetBatchLines, -1
	CoordMode, Mouse, Screen
	Gui, +ToolWindow +AlwaysOnTop
	SetKeyDelay, 0, 10
	vsleepTime = 6000
	
}

{ ; GUI

	Gui, Add, Button, x6 y10 w50 h20 vGo, Go
        Gui, Add, Button, x66 y10 w50 h20 vExit, Exit
	Gui, Show, w126 h79, Realm Script
	+0:: GoSub, ButtonGo
	+9:: GoSub, ButtonExit
	flip = true
	return
}

ButtonGo:
{

num = 1
loop 8
{
	TradeUb()
	MoveItem(num)
	TradeForUb()
	num++
}
return


num = 1

loop 7
{
	TradeUb()
	TradeMana()
	MoveItem(num)
	TradeForUb()

	TradeUb()
	MoveItem(num)
	TradeForUb()
	num++
}

return
}

TradeForUb()
{


sleep 3000 ;detect Life
PixelSearch, Px, Py, 640, 534, 640, 534, 0xDDD73B, 0, Fast
if ErrorLevel = 0
{

while(true)
{
	flip = 1
	while(!Trading())
	{
		PixelSearch, Px, Py, 655,526,655,526,0x5454FF, 0, Fast
		if ErrorLevel = 0
		{
			break
		}

		if (flip = 1)
		{
		Send {Enter}
		Send B>UNBoundHP - 4.75 life @Rambos

		Send {Enter}
		flip = 2
		}
		else
		{
		Send {Enter}
		Send B> UNBoundHP 4.75 life @Rambos
		Send {Enter}
		flip = 1
		}
		

		Sleep 5000
		DetectTrade()
		
	}

	if DetectUb()
	{
		PixelSearch, Px, Py, 625, 455, 625, 455, 0x57CDFF, 0, Fast
		if ErrorLevel != 0
		{
				click 626 ,444	;click all pots
				click 670 ,444
				click 714 ,444
				click 758 ,444
				click 626 ,499
				click 670 ,499
				MouseMove 500,400
			
		}

		time = 0
		while(Trading() && time < 120)
		{
			
			if DetectSelectedUb()
			{
				MouseMove, 791, 704
				PixelSearch, Px, Py, 791, 704, 791, 704, 0x85dCFF, 0, Fast
				if ErrorLevel = 0
				{
					click	
				}
			}
		}
			sleep 5000
			time++
	}
	else
	{
		click 654,704     ;end trade
		MouseMove 500,400	
	}


if(!Trading())
{
	sleep 3000 ;detect Ub
	PixelSearch, Px, Py, 655,526,655,526,0x5454FF, 0, Fast
	if ErrorLevel = 0
	{
		break
	}
}

}

}

return
}


TradeMana()
{
hasLife = true

;detect Life
PixelSearch, Px, Py, 640, 578, 640, 578, 0xDDD73B, 0, Fast
if ErrorLevel = 0
{


while(true)
{
	flip = 1
	while(!Trading())
	{
		

		if flip = 1
		{
		Send {Enter}
		Send Buying Mana 2:1 Rambos
		Send {Enter}
		flip = 2
		}
		else
		{
		Send {Enter}
		Send Buying Mana 2-1 Rambos
		Send {Enter}
		flip = 1
		}
		

		Sleep 5000
		DetectTrade()
	}

	if DetectMana()
	{
		PixelSearch, Px, Py, 626, 498, 626, 498, 0x545454, 0, Fast
		if ErrorLevel = 0
		{
			click 640,483      		;click Life
		}

		time = 0
		while(Trading() && time < 120)
		{
			
			if DetectSelectedMana()
			{
				MouseMove, 791, 704
				PixelSearch, Px, Py, 791, 704, 791, 704, 0x85dCFF, 0, Fast
				if ErrorLevel = 0
				{
					click	
				}
			}
		}
			sleep 5000
			time++
	}
	else
	{
		click 654,704     ;end trade
		MouseMove 500,400	
	}


if(!Trading())
{
	sleep 3000 ;detect Life
	PixelSearch, Px, Py, 640, 578, 640, 578, 0xDDD73B, 0, Fast
	if ErrorLevel != 0
	{
		break
	}
}
}
}
return
}

MoveItem(x)
{
y = 0
x--
if x >= 4
{
	y = 1
	x -= 4
}


Click down 640, 578
sleep 1000
MouseMove 645, 578 
sleep 1000
send bb


MouseMove 640+44*x, 534+44*y 
Click up 640+44*x, 534+44*y 
sleep 1000
send bb
MouseMove 500,400
return
}

TradeUb()
{


PixelSearch, Px, Py, 640, 534, 640, 534, 0xDDD73B, 0, Fast
	if ErrorLevel != 0
{


while(true)
{
	flip = 1
	while(!Trading())
	{
		PixelSearch, Px, Py, 640, 534, 640, 534, 0xDDD73B, 0, Fast
		if ErrorLevel = 0
		{
			break
		}


		if (flip = 1)
		{
		Send {Enter}
		Send S> UNBoundHP - 5 life @Rambos
		Send {Enter}
		flip = 2
		}
		else
		{
		Send {Enter}
		Send S> UNBoundHP 5 life @Rambos
		Send {Enter}
		flip = 1
		}
		

		Sleep 5000
		DetectTrade()
		
	}

	if DetectLife()
	{
		PixelSearch, Px, Py, 625, 455, 625, 455, 0x53C4F5, 0, Fast
		if ErrorLevel != 0
		{
			click 626,455      		;click ub
		}

		time = 0
		while(Trading() && time < 120)
		{
			
			if DetectSelectedLife()
			{
				MouseMove, 791, 704
				PixelSearch, Px, Py, 791, 704, 791, 704, 0x85dCFF, 0, Fast
				if ErrorLevel = 0
				{
					click	
				}
			}
		}
			sleep 5000
			time++
	}
	else
	{
		click 654,704     ;end trade
		MouseMove 500,400	
	}

	sleep 3000	;detect Life
	PixelSearch, Px, Py, 640, 534, 640, 534, 0xDDD73B, 0, Fast
	if ErrorLevel = 0
	{
		break
	}
}
}
return
}



DetectTrade()
{
	if (!Trading())
	{
		PixelSearch, Px, Py, 759, 711, 759, 711, 0xFFFFFF, 0, Fast
		if ErrorLevel = 0
			Click 759, 711		;click trade
		MouseMove 400, 400
	}
}

Trading()
{
	PixelSearch, Px, Py, 625, 336, 625, 336, 0xB3B3B3, 0, Fast
	return ErrorLevel = 0
}

DetectSelectedLife()
{
lives  = 0;
dx = 0
dy = 0
loop 2
{
	loop 4
	{
		PixelSearch, Px, Py, 625+dx, 629+dy, 625+dx, 629+dy, 0x57CDFF, 0, Fast
		if ErrorLevel = 0
		{
			PixelSearch, Px, Py, 638+dx, 618+dy, 638+dx, 618+dy, 0xDDD73B, 0, Fast
			if ErrorLevel = 0
				lives++
			else
				return false
		}
		dx += 44
	}
	dx = 0
	dy = 44
}
if lives < 5
{ 
	return false
}
return true

}

DetectLife()
{
lives = 0
dx = 0
dy = 0
loop 2
{
	loop 4
	{
	PixelSearch, Px, Py, 638+dx, 618+dy, 638+dx, 618+dy, 0xDDD73B, 0, Fast
	if ErrorLevel = 0
		lives++
	dx += 44
	}
	dx = 0
	dy = 44
}
if lives < 5
{	
	return false
}
return true
}

DetectSelectedMana()
{
Mana  = 0;
dx = 0
dy = 0
loop 2
{
	loop 4
	{
		PixelSearch, Px, Py, 625+dx, 629+dy, 625+dx, 629+dy, 0x57CDFF, 0, Fast
		if ErrorLevel = 0
		{
			PixelSearch, Px, Py, 634+dx, 623+dy, 634+dx, 623+dy, 0x0B859F, 0, Fast
			if ErrorLevel = 0
				Mana++
			else
				return false
		}
		dx += 44
	}
	dx = 0
	dy = 44
}
if Mana < 2
{ 
	return false
}
return true

}

DetectMana()
{
Mana = 0
dx = 0
dy = 0
loop 2
{
	loop 4
	{
	PixelSearch, Px, Py, 634+dx, 623+dy, 634+dx, 623+dy, 0x0B859F, 0, Fast
	if ErrorLevel = 0
		Mana++
	dx += 44
	}
	dx = 0
	dy = 44
}
if Mana < 2
{	
	return false
}
return true
}

DetectSelectedUb()
{
Ub  = 0;
dx = 0
dy = 0
loop 2
{
	loop 4
	{
		PixelSearch, Px, Py, 625+dx, 629+dy, 625+dx, 629+dy, 0x53c4F5, 0, Fast
		if ErrorLevel = 0
		{
			PixelSearch, Px, Py, 656+dx, 610+dy, 656+dx, 610+dy, 0x5454FF, 0, Fast
			if ErrorLevel = 0
				Ub++
			else
				return false
		}
		dx += 44
	}
	dx = 0
	dy = 44
}
if Ub < 1
{ 
	return false
}
return true

}

DetectUb()
{
Ub = 0
dx = 0
dy = 0
loop 2
{
	loop 4
	{
	PixelSearch, Px, Py, 656+dx, 610+dy, 656+dx, 610+dy, 0x5454FF, 0, Fast
	if ErrorLevel = 0
		Ub++
	dx += 44
	}
	dx = 0
	dy = 44
}
if Ub < 1
{	
	return false
}
return true
}

ButtonExit:
{
	ExitApp
}

GuiClose:
{
	ExitApp
}