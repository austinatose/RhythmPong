#**2024 CEP WA4 - RHYTHM PONG**

# Features

## Title Screen

The title screen is just a title screen, and it features a small demo synced with a pulsing effect. Unfortunately I cannot play music because of browser restrictions.

## Game

The main gameplay of this game consists of returning a ping pong ball that an opponents sends to you, with a paddle that follows your mouse. 

The catch is that the player must hit the ball in time with a song of their choosing. The players are graded based on the accuracy of their hits, and a multiplier is applied based on their current combo. 

Different songs also have difficulties corresponding to their tempo, as faster/harder songs require the player to react and send the ball back faster. Since the length of the songs are somewhat similar, the point system is able to represent a player’s skill level reasonably well.

### Ball Physics & Game Mechanics

The ball’s destination is predetermined, whether it is going towards the player or returning to the opponent. The x-coordinate of the target location is random, within a certain range.

The ball’s movement is completely 2D, but it shrinks a little after travelling a certain fraction of a “lap” to give it the illusion of being 3D, like it actually bounces on the table. The ball draws a simple trail itself.

The game keeps the ball in time by adjusting the speed of the ball depending on when the player hits hit. For example if the player hits the ball too early it will return to the opponent slower, and vice versa if the player hits the ball too late. Although this may not be very realistic, this is necessary to keep the game in time and the tempo consistent.

The game detects if the player has successfully hit the ball by checking for hits every two beats; if the player had hit the ball within this time it would have been logged, otherwise the ball has to be respawned anyways as the player had missed it. In any case the ball is unconditionally respawned at the opponent’s paddle and served after every 2 beats, because if the player had hit the ball it would look seamless as the ball would have been recreated in the same location it had reached. The only thing the game checks if the ball had been hit within these 2 beats; the movement and returning of the ball is handled completely separately.

### Point and Combo System

Since the target location of each ball is predetermined, the point system and works by simply checking how far the ball is from its target location when it is hit, and grades the player accordingly. 

The combo system increments the combo if the player scores a “OK”, “Good” or “Perfect” (as opposed to “Bad” or a miss). Otherwise it is reset to zero and a very demoralising sound effect is played.

### Restart, Exit and Game End

Pretty self-explanatory, there are restart and exit buttons for the player to try again or return to the menu. The exit button skips the end screen directly, which tells the reader their score and allows them to return back to the menu.

## Menu

### Overview

The menu is inspired my the one from Osu, with the cycling sidebar elements that recede back into the screen. The menu element also displays the title and artist of the song. When a user clicks to select a different song, the demo on the right changes to reflect the tempo of the song, and the song plays. The tempo and difficulty of the song is also displayed on the top left hand corner of the screen.

### Custom Song

### Settings

In case the juiciness features (sound effect / effect etc) are too obstructive for the player, it can be turned off from settings which can be found at the bottom left corner of the menu

## Other Things

### Style and Colour Scheme

I tried to stick with a cute cartoony style for most things - the buttons, balls, UI elements 

### Juiciness

Juiciness in the game is contributed by:

- Easing of opponent paddle
- Very cool menu animations
- Highlighting and clicking sound effect when selecting a different menu element
- Hit effect (White particles)
- Perfect hit effect (Rainbow particles)
- Fire effect that progressively gets bigger as combo increases past 5
- Hit sound

### QoL Changes

- After feedback from some friends, I decided to make the ball’s target position constant if the player constantly misses it on the serve
