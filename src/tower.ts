module TowerModule {

    export interface IMyTower {
        defendRoom():boolean;
        repairRoads():boolean;
        healCreeps():boolean;
        runRoutine():boolean;
    }


    export class MyTower implements IMyTower {
        public constructor(private tower:Tower) {
        }

        private creepHealThreshold = 0.4;
        private maxHealRange = 10;

        private roadRepairThreshold = 0.3;
        private maxRepairRange = 20;

        public runRoutine() {
            // De Morgan law ftw :)
            return !(!this.defendRoom() && !this.healCreeps() && !this.repairRoads());
        }

        public defendRoom() {
            let hostiles:Creep[] = this.tower.room.find(FIND_HOSTILE_CREEPS);
            if (hostiles.length > 0) {
                var username = hostiles[0].owner.username;
                Game.notify('User ' + username + ' spotted in room ' + this.tower.room.name, 1);
                this.tower.attack(hostiles[0]);
                return true;
            }
            return false;
        }

        public healCreeps() {
            //let dedCreeps = this.tower.pos.findInRange(FIND_MY_CREEPS,
            //    this.maxHealRange, {
            //        filter: (c:Creep) => c.ticksToLive < this.creepHealThreshold*1000
            //    });
            //if (dedCreeps.length > 0) {
            //
            //    console.log(this.tower.heal(dedCreeps[0]));
            //    return true;
            //}
            //return false;
        }

        public repairRoads() {

            let bumpyRoads:Road[] = this.tower.pos.findInRange(FIND_STRUCTURES,
                this.maxRepairRange, {
                filter: (o:Structure) => {
                    return o.structureType == STRUCTURE_ROAD && o.hits / o.hitsMax < this.roadRepairThreshold;
                }
            });

            if (bumpyRoads.length > 0) {
                this.tower.repair(bumpyRoads[0]);
                return true;
            }
            return false;
        }
    }
}

module.exports = TowerModule;