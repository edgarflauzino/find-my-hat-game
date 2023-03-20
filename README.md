we have the initial map
then we start a loop until it breaks by losing or winning
    the program will read a user input
    the program will check if the direction is valid
        if not, then the player loses (off-map or hole)
        if yes, then the player moves or win
            if moves map needs update, previous location = field and current location = *


LOOP:
- updateState(): gets user move
- checkMove(): checks the move, returns boolean to end or continue the game
- updateMap(): if the end continues, update the map
- print(): prints the updated map

