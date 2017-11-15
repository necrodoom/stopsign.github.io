function View() {

    this.update = function() {
        this.updateInfo();
        this.updateIce();
        this.updateWater();
        this.updateClouds();
        this.updateLand();
        this.updateTrees();
        this.updateFarms();
        this.updatePopulation();
        this.updateComputerRowProgress();
        this.updateRobots();
    };

    this.updateInfo = function() {
        document.getElementById('totalWater').innerHTML = intToString(game.ice.ice + game.water.indoor + game.water.outdoor + game.clouds.water + game.land.water + game.trees.water + game.farms.water);
        document.getElementById('cash').innerHTML = intToString(game.cash);
        document.getElementById('oxygen').innerHTML = intToString(game.oxygen);
        document.getElementById('science').innerHTML = intToString(game.science);
        document.getElementById('wood').innerHTML = intToString(game.wood);
        document.getElementById('metal').innerHTML = intToString(game.metal);
    };

    this.updateIce = function() {
        document.getElementById('ice').innerHTML = intToString(game.ice.ice);
        document.getElementById('buyableIce').innerHTML = intToString(game.ice.buyable);
        document.getElementById('iceTransferred').innerHTML = intToString(game.ice.transferred, 4);
    };

    this.updateWater = function() {
        document.getElementById('indoorWater').innerHTML = intToString(game.water.indoor);
        document.getElementById('indoorWaterMax').innerHTML = intToString(game.water.maxIndoor);

        document.getElementById('outdoorWater').innerHTML = intToString(game.water.outdoor);
        document.getElementById('waterTransferred').innerHTML = intToString(game.water.transferred, 4);
    };

    this.updateClouds = function() {
        document.getElementById('clouds').innerHTML = intToString(game.clouds.water);
        document.getElementById('stormTimer').innerHTML = game.clouds.stormTimer+"";
        document.getElementById('stormRate').innerHTML = game.clouds.stormRate+"%";
        document.getElementById('stormDuration').innerHTML = game.clouds.stormDuration+"";
        document.getElementById('rain').innerHTML = intToString(game.clouds.transferred, 4);
    };

    this.updateLand = function() {
        document.getElementById('landWater').innerHTML = intToString(game.land.water);
        document.getElementById('land').innerHTML = intToString(game.land.land);
        document.getElementById('soil').innerHTML = intToString(game.land.soil);
        document.getElementById('landConverted').innerHTML = intToString(game.land.convertedLand, 4);
        document.getElementById('soilWaterTransferred').innerHTML = intToString(game.land.transferred, 4);
    };

    this.updateTrees = function() {
        document.getElementById('treesWater').innerHTML = intToString(game.trees.water);
        document.getElementById('ferns').innerHTML = intToString(game.trees.ferns);
        document.getElementById('fernsDelta').innerHTML = intToString(game.trees.fernsDelta, 4);
        document.getElementById('fernsDying').innerHTML = intToString(game.trees.fernsDying, 4);
        document.getElementById('trees').innerHTML = intToString(game.trees.trees);
        document.getElementById('treesDelta').innerHTML = intToString(game.trees.treesDelta, 4);
        document.getElementById('treesDying').innerHTML = intToString(game.trees.treesDying, 4);
        document.getElementById('compost').innerHTML = intToString(game.trees.compost, 4);
        document.getElementById('co2').innerHTML = intToString(game.trees.co2, 4);
        document.getElementById('oxygenGain').innerHTML = intToString(game.trees.oxygenGain, 4);
        document.getElementById('oxygenLeak').innerHTML = intToString(game.oxygenLeak, 4);

    };

    this.updateFarms = function() {
        document.getElementById('farmsWater').innerHTML = intToString(game.farms.water);
        document.getElementById('farms').innerHTML = intToString(game.farms.farms);
        document.getElementById('food').innerHTML = intToString(game.farms.food);
        document.getElementById('foodCreated').innerHTML = intToString(game.farms.foodCreated);
    };

    this.updatePopulation = function() {
        document.getElementById('population').innerHTML = intToString(game.population.people);
        document.getElementById('foodEaten').innerHTML = intToString(game.population.foodEaten, 4);
        document.getElementById('populationGrowth').innerHTML = intToString(game.population.popGrowth, 4);
        document.getElementById('starving').innerHTML = intToString(game.population.starving, 4);
        document.getElementById('scienceDelta').innerHTML = intToString(game.population.scienceDelta, 4);
        document.getElementById('cashDelta').innerHTML = intToString(game.population.cashDelta, 4);
        document.getElementById('scienceRatio').innerHTML = game.population.scienceRatio+"%";
        document.getElementById('happiness').innerHTML = intToString(game.population.happiness, 4);
        document.getElementById('happinessFromHouse').innerHTML = intToString(game.population.houseBonus);
        document.getElementById('happinessFromTrees').innerHTML = intToString(game.population.happinessFromTrees, 4);
        document.getElementById('happinessFromOxygen').innerHTML = intToString(game.population.happinessFromOxygen, 4);
    };

    this.checkComputerUnlocked = function() {
        if(game.computer.unlocked) {
            document.getElementById('unlockedComputer').style.display = "inline-block";
            document.getElementById('unlockComputer').style.display = "none";
        } else {
            document.getElementById('unlockedComputer').style.display = "none";
            document.getElementById('unlockComputer').style.display = "inline-block";
        }
    };

    this.updateComputerRowProgress = function() {
        for(var i = 0; i < game.computer.processes.length; i++) {
            var row = game.computer.processes[i];
            if(!row) {
                continue;
            }
            document.getElementById("computerRow"+i+"PB").style.width = (row.currentTicks / row.ticksNeeded)*100 + "%";
            document.getElementById("computerRow"+i+"TicksNeeded").innerHTML = row.ticksNeeded+"";
            if(row.cost !== 0) {
                document.getElementById("computerRow"+i+"Cost").style.display = "block";
                document.getElementById("computerRow"+i+"Cost").innerHTML = "Each tick costs "+row.cost + " "+row.costType;
            } else {
                document.getElementById("computerRow"+i+"Cost").style.display = "none";
            }
        }
        document.getElementById('landOptimized').innerHTML = round2((game.land.optimizedLand / (game.land.baseLand * 10))*100)+"%";
    };

    this.updateComputer = function() {
        document.getElementById('freeThreads').innerHTML = game.computer.freeThreads+"";
        document.getElementById('threads').innerHTML = game.computer.threads+"";
        document.getElementById('speed').innerHTML = game.computer.speed+"";
        document.getElementById('threadCost').innerHTML = intToString(game.computer.getThreadCost());
        document.getElementById('speedCost').innerHTML = intToString(game.computer.getSpeedCost());
        for(var i = 0; i < game.computer.processes.length; i++) {
            var row = document.getElementById('computerRow'+i+'Threads');
            if(!row) {
                continue;
            }
            document.getElementById('computerRow'+i+'Threads').innerHTML = game.computer.processes[i].threads;
        }
    };

    this.addComputerRow = function(dataPos) {
        var containerDiv = document.getElementById('computerRows');
        var rowContainer = document.createElement("div");
        rowContainer.className = "computerRow";
        var baseId = "computerRow" + dataPos;
        var plusButton = "<div id='"+baseId+"Plus' class='button' onclick='game.computer.addThread("+dataPos+", 1)'>+</div>";
        var minusButton = "<div id='"+baseId+"Minus' class='button' onclick='game.computer.removeThread("+dataPos+", 1)'>-</div>";
        var threads = " <div id='"+baseId+"Threads' class='small' style='margin-right:4px'></div>" ;
        var text = "<div>" + processesView[dataPos].text + "</div>";
        var progressBar = "<div class='computerProgressBarOuter'><div class='computerProgressBarInner' id='"+baseId+"PB'></div></div>";

        var tooltip = "<div id='"+baseId+"TicksNeeded'></div> ticks needed<br>" +
            "<div id='"+baseId+"Cost'></div>";
        var tooltipContainer = "<div class='computerTooltipContainer' id='"+baseId+"Tooltip'><div class='computerTooltip'>" + tooltip + "<br>" + processesView[dataPos].tooltip + "</div></div>";
        rowContainer.onmouseover = function () {
            document.getElementById(baseId+"Tooltip").style.display = "block";
        };
        rowContainer.onmouseout = function() {
            document.getElementById(baseId+"Tooltip").style.display = "none";
        };

        rowContainer.innerHTML = plusButton + threads + minusButton + text + progressBar + tooltipContainer;
        containerDiv.appendChild(rowContainer);
    };

    this.updateRobots = function() {
        document.getElementById('robots').innerHTML = game.robots.robots+"";
        document.getElementById('robotMax').innerHTML = game.robots.robotMax+"";
    };

}