let elevatorID = 1;
let floorRequestButtonID = 1;
let callButtonID = 1;

class Column {
    constructor(_id, _amountOfFloors, _amountOfElevators) {
        this.ID = _id;
        this.status = 'I dunno';
        this.elevatorList = [];
        this.callButtonList = [];

        this.createElevators(_amountOfFloors, _amountOfElevators);
        this.createCallButtons(_amountOfFloors);
    }

        createCallButtons(_amountOfFloors) {
            let buttonFloor = 1;

            for (let i = 0; i < _amountOfFloors; i++){
                if(buttonFloor < _amountOfFloors){
                    let callButton = new CallButton(i, 'OFF', buttonFloor, 'up');
                    this.callButtonList.push(callButton);
                } if(buttonFloor > 1) {
                    let callButton = new CallButton(i, 'OFF', buttonFloor, 'down');
                    this.callButtonList.push(callButton);
                }
                buttonFloor++;
            }
        }

        createElevators(_amountOfFloors, _amountOfElevators) {
            for (let i = 0; i < _amountOfElevators; i++){
                let elevator = new Elevator(i, _amountOfFloors);
                this.elevatorList.push(elevator);
            }

            // console.log("inside createElevators function")
            // console.log(this.elevatorsList.length)
        }

        //Everything until there is good -------------------------

        requestElevator (floor, direction) {
            // double-check if it bugs, line 45.
            let elevator = this.findElevator(floor, direction);
            elevator.floorRequestList.push(floor);
            elevator.move(); 
            elevator.operateDoors();
            return elevator;
        }

        findElevator (requestedFloor, requestedDirection) {
            let bestElevator;
            let elevator = new Elevator(1, 'up');
            let bestScore = 5;
            let referenceGap = 10000000;
            let bestElevatorInformations;

            this.elevatorList.forEach((elevator) => {
                if(requestedFloor == elevator.currentFloor && elevator.status == 'stopped' && requestedDirection == elevator.direction){
                    bestElevatorInformations = this.checkIfElevatorIsBetter(1, elevator, bestScore, referenceGap, bestElevator, requestedFloor);
                } else if(requestedFloor > elevator.currentFloor && elevator.direction == 'up' && requestedDirection == elevator.direction) {
                    bestElevatorInformations = this.checkIfElevatorIsBetter(2, elevator, bestScore, referenceGap, bestElevator, requestedFloor);
                } else if(requestedFloor < elevator.currentFloor && elevator.direction == 'down' && requestedDirection == elevator.direction){
                    bestElevatorInformations = this.checkIfElevatorIsBetter(2, elevator, bestScore, referenceGap, bestElevator, requestedFloor);
                } else if(elevator.status == 'idle'){
                    bestElevatorInformations = this.checkIfElevatorIsBetter(3, elevator, bestScore, referenceGap, bestElevator, requestedFloor);
                } else {
                    bestElevatorInformations = this.checkIfElevatorIsBetter(4, elevator, bestScore, referenceGap, bestElevator, requestedFloor);
                }
                bestElevator = bestElevatorInformations.bestElevator;
                bestScore = bestElevatorInformations.bestScore;
                referenceGap = bestElevatorInformations.referenceGap;
            });
            return elevator;
            //return bestElevator;
        }

        checkIfElevatorIsBetter(scoreToCheck, newElevator, bestScore, referenceGap, bestElevator, floor){
            if(scoreToCheck < bestScore){
                bestScore = scoreToCheck;
                bestElevator = newElevator;
                referenceGap = Math.abs(newElevator.currentFloor - floor);
            } else if(bestScore == scoreToCheck){
                let gap = Math.abs(newElevator.currentFloor - floor);
                if(referenceGap > gap){
                    bestElevator = newElevator;
                    referenceGap = gap;
                }
            }
            return {bestElevator, bestScore, referenceGap};
            
        }

}

class Elevator {
    constructor(_id, _amountOfFloors) {
        this.ID = _id;
        this.status = 'my ass, bitch';
        this.currentFloor = 1;
        this.direction = null;
        this.door = new Door(_id, 'closed')
        this.floorRequestButtonList = [];
        this.floorRequestList = [];
        this.overweight = false;
        this.obstruction = false;

        this.createFloorRequestButton (_amountOfFloors);
    }

        createFloorRequestButton (_amountOfFloors){
            this.buttonFloor = 1;
            for (let i = 0; i < _amountOfFloors; i++){
                let floorRequestButton = new FloorRequestButton (floorRequestButtonID, 'OFF', this.buttonFloor);
                this.floorRequestButtonList.push(floorRequestButton);
                this.buttonFloor++;
                floorRequestButtonID++;
            }
        }

        requestFloor(floor){
            this.floorRequestList.push(floor);
            this.move();
            this.operateDoors();
        }

        move(){
            while(this.floorRequestList.length > 0){
                let destination = this.floorRequestList[0];
                this.status = 'moving';
                if(this.currentFloor < destination){
                    this.direction = 'up'
                    this.sortFloorList();
                    while(this.currentFloor < destination){
                        this.currentFloor++;
                        //this.screenDisplay = this.currentFloor;
                    }
                } else if(this.currentFloor > destination){
                    this.direction = 'down';
                    this.sortFloorList();
                    while(this.currentFloor > destination){
                        this.currentFloor--;
                        //this.screenDisplay = this.currentFloor;
                    }
                }
                this.status = 'stopped';
                this.floorRequestList.shift()
            }
            this.status = 'idle';
        }

        sortFloorList(){
            if(this.direction == 'up'){
               this.floorRequestList.sort((a,b) => a-b);
            } else {
                this.floorRequestList.sort((b,a) => b-a); 
            }
        }

        operateDoors(){
            this.door.status = 'opened';
            //WAIT 5 seconds
            if(!this.overweight){
                this.door.status = 'closing';
                if(!this.obstruction){
                    this.door.status = 'closed';
                } else {
                    this.operateDoors();
                }
            } else {
                while(this.overweight){
                    console.log('overweight alarm')
                }
                this.operateDoors();
            }
        }

}

class CallButton {
    constructor(_id, _floor, _direction) {
        this.ID = _id;
        this.status = 'fuck you all';
        this.floor = _floor; 
        this.direction = _direction;       
    }
}

class FloorRequestButton {
    constructor(_id, _floor) {
        this.ID = _id;
        this.status = "I'm not having fun debugging tbh.";
        this.floor = _floor;
    }
}

class Door {
    constructor(_id, _status) {
        this.ID = _id;
        this.status = _status;
    }
}

console.log(this.elevatorList);
// let elevator = new Elevator(1, 10);
// console.log(elevator.floorRequestList);
module.exports = { Column, Elevator, CallButton, FloorRequestButton, Door }