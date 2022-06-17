# Rocket-Elevators-Javascript-Controller

# Description

The code is the fondation to call elevators in a residential building
setting. While trying to be the most effective to facilitate
the service for the people living in the building.


			THE COLUMN LOGIC
createCallButtons()
The column check if there is a need of an elevatoron any 
particular floor. So it check each floor to verify the info.

createElevators()
Some scenarios will need different numbers of elevators and depending
on those requirement we will have to spawn a diffrent amount for each
scenario.

requestElevator()
The Column class register the need of an elevator and try to find one
to fill the need.

findElevator()
So there the program try to find the best elevator to do the job.
Basically the closest one, to avoid wasted time.

checkIfElevatorIsBetter()
To verify which one is better, there is a parameter named "bestScore"
that gives the program an idea of which one would be best suited depending
of the situation and distance of the floor that need an elevator.


		THE ELEVATOR LOGIC
createFloorRequestButtons()
So if someone gets into the elevetor on the 5th floor and then want to go
at the 9th floor. We need to create a button that take that info into
account to then know where to go and pick up people along the way.

requestFloor()
The floor resquested then go into a list that will excute in order of 
priority.

move()
That's elevator move depending if it has to go down or up.

sortFloorList()
It will prioritize the floor on which to stop

operateDoors()
If somebody is singing in the middle of the door, the elevator won't
kill and split that apprentice opera singer in two. Unless I miss-coded it.