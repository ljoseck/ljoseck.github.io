#MendelBrot Set 2
from tkinter import *
import sys
if(1==1):

    gridsizex = 1200
    gridsizey = 600
    iterations = 64
    global xmin,xmax,ymin,ymax
    
    xmin =  -2-1.25 #  -.11157#
    xmax = .5+1.25  #-.105935#
    
    ymin = -1.25 # -.903165#
    ymax = 1.25  #-.894621#
    
WIDTH, HEIGHT = 1200, 600

window = Tk()
canvas = Canvas(window, width=WIDTH, height=HEIGHT, bg="#000000")
canvas.pack()
img = PhotoImage(width=WIDTH, height=HEIGHT)
canvas.create_image((WIDTH/2, HEIGHT/2), image=img, state="normal")
   
    
def mandel():
    global xmin,xmax,ymin,ymax
    

    
    ycord = 0
    
    y = ymin
    while(y<=ymax):     
        x = xmin
        xcord = 0
        while(x<=xmax):
            tempx = 0
            tempy = 0
            counter = 0
            while((tempx*tempx+tempy*tempy) <= 4 and counter < iterations):
                temp = tempx*tempx - tempy*tempy + x 
                tempy = 2*tempx*tempy + y
                tempx = temp
                counter += 1
            if counter == iterations:
                img.put("#000000", (xcord,ycord))
            else:
                img.put('#%02x%02x%02x' % (255/iterations*counter, 255/iterations*counter, 255/iterations*counter), (xcord,ycord))
                #img.put('#%02x%02x%02x' % (255/iterations*counter, 7*abs((counter % 64)-32)+1, 255), (xcord,ycord))

                    

                
            
            x += (xmax-xmin)/gridsizex
            xcord += 1
        
        print(gridsizey-ycord)
        y += (ymax-ymin)/gridsizey
        ycord += 1


b1 = "up"
xold, yold = None, None
mandel()

def main():


    canvas.bind("<ButtonPress-1>", b1down)
    canvas.bind("<ButtonRelease-1>", b1up)
    window.mainloop()

def b1down(event):
    global b1, xold, yold
    b1 = "down"           # you only want to draw when the button is down
    xold = event.x
    yold = event.y                      # because "Motion" events happen -all the time-

def b1up(event):
    global b1, xold, yold
    b1 = "up"
    global xmin,xmax,ymin,ymax
    tempx = xmin
    if(event.x < xold):
        xmin = event.x*(xmax-xmin)/gridsizex+tempx
        xmax = xold*(ymax-ymin)/gridsizey+tempx
    else:
        xmax = event.x*(xmax-xmin)/gridsizex+tempx
        xmin = xold*(ymax-ymin)/gridsizey+tempx


    ymin += yold*(ymax-ymin)/gridsizey
    ymax = ymin + .5*(xmax-xmin)


    
    mandel()
    
    print(xmin)
    print(xmax)
    print(ymin)
    print(ymax)
    print(xold)
    print(event.x)
    print(yold)
    print(event.y)
    print((xmax-xmin)/gridsizex)
    print((ymax-ymin)/gridsizey)


if __name__ == "__main__":
    main()
