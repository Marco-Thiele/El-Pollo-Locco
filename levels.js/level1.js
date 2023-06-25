let level1;
function initLevel(){
 level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall(),
    ],
    [
        new Endboss(),
    ],
    [
        new cloud('img/5_background/layers/4_clouds/1.png', 0),
        new cloud('img/5_background/layers/4_clouds/2.png', 719),
        new cloud('img/5_background/layers/4_clouds/1.png', 719*2),
        new cloud('img/5_background/layers/4_clouds/2.png', 719*3),
    ],
    [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3)
    ],
    [
        new Coins('img/8_coin/coin_2.png'),
        new Coins('img/8_coin/coin_2.png'),
        new Coins('img/8_coin/coin_2.png'),
        new Coins('img/8_coin/coin_2.png'),
        new Coins('img/8_coin/coin_2.png'),
        new Coins('img/8_coin/coin_2.png'),
        new Coins('img/8_coin/coin_2.png'),
        new Coins('img/8_coin/coin_2.png'),
        new Coins('img/8_coin/coin_2.png'),
        new Coins('img/8_coin/coin_2.png'),
    ],
    [
        new Bottles('img/6_salsa_bottle/salsa_bottle.png'),
        new BottlesGround(),
        new Bottles('img/6_salsa_bottle/salsa_bottle.png'),
        new BottlesGround(),
        new Bottles('img/6_salsa_bottle/salsa_bottle.png'),
        new BottlesGround(),
        new Bottles('img/6_salsa_bottle/salsa_bottle.png'),
        new BottlesGround(),
        new Bottles('img/6_salsa_bottle/salsa_bottle.png'),
        new BottlesGround(),
    ]
);
}