//% weight=200 color=#0fbc11 icon="\uf12e"
//% block="Random Game Blocks"
namespace randomGameBlocks {
    /**
     * Places a specific tile at a given column and row coordinate and sets a wall.
     */
    //% group=Tiles color=#003FAD
    //% block="tile col $col row $row $tileImage"
    //% tileImage.shadow="tileset_tile_picker"
    export function setCustomTile(col: number, row: number, tileImage: Image): void {
        tiles.setTileAt(tiles.getTileLocation(col, row), tileImage)
        tiles.setWallAt(tiles.getTileLocation(col, row), true)
    }
    /**
     * Allows your sprite to jump only if it's currently
     * on a floor or without velocity.
     */
    //% group=Sprites
    //% block="make $sprite jump || velocity $v and camera shake $d by $z pixels for $f miniseconds"
    //% sprite.shadow="variables_get"
    //% sprite.defl="mySprite"
    //% v.defl=-200
    export function jump(sprite: Sprite, v?: number, d?: boolean, z?: number, f?: number): void {
        if (v == undefined) {
            v = -200;
        }
        if (sprite.isHittingTile(CollisionDirection.Bottom)) {
            sprite.vy += v
        }

        if (d) {
            scene.cameraShake(z, f)
        }
    }
    /**
    * Makes sprites build.
    */
    //% group=Tiles color=#003FAD
    //% block="sprite $s build with $m"
    //% m.shadow="tileset_tile_picker"
    //% s.shadow="variables_get"
    //% s.defl="mySprite"
    export function setCustomTileSprite(s:Sprite, m: Image): void {
        tiles.setTileAt(s.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom), m)
        tiles.setWallAt(s.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom), true)
    }
    /**
    * Makes sprites die.
    */
    //% group=Sprites
    //% block="spritekind $S dies by $a"
    //% a.shadow="tileset_tile_picker"
    //% S.shadow="spritekind"
    export function setTraps(S: number, a: Image,): void {
        scene.onOverlapTile(S, a, function (sprite, location) {
            game.gameOver(false)
        })
    }
    /**
    * Makes sprites bump. Put this on your spawn enemy function
    */
    //% group=Sprites
    //% block="make $spr bump pt1"
    //% spr.shadow="variables_get"
    //% spr.defl="mySprite" 
    export function bump(spr: Sprite): void {
        if (Math.percentChance(50)) {
            spr.vx = Math.randomRange(30, 60)
        } else {
            spr.vx = Math.randomRange(-60, -30)
        }
    }
    /**
    * Makes sprites bump. Put this on your game update function
    */
    //% group=Sprites
    //% block="make $spri bump pt2"
    //% spri.shadow="variables_get"
    //% spri.defl="mySprite" 
    export function bump2(spri: Sprite): void {
        if (spri.isHittingTile(CollisionDirection.Left)) {
            spri.vx = Math.randomRange(30, 60)
        } else if (spri.isHittingTile(CollisionDirection.Right)) {
            spri.vx = Math.randomRange(-60, -30)
        }
    }
    /**
    * Makes sprites bump. Put this on your game update function
    */
    //% group=Sprites
    //% block="game is over"
    export function g(): boolean {
        return true
    }
    //% group=Sprites
    //% block="enable gravity $m for $w || with gravity power $u"
    //% m.defl=true 
    //% w.shadow="variables_get"
    //% w.defl="mySprite"
    //% u.defl=500
    export function gravity(m: boolean, w: Sprite, u?: number): void {
        if (m) {
            w.ay = u
        }
    }
    /**
    * Makes sprites spawn in a new tilemap.
    */
    //% group=Tilemap color=#249CA3
    //% block="spritekind $q exits by $r to tilemap $o and spawns on $g || and add boss with image $im with kind $kw on top of $spawn with animation $c and interval $inter with loop $fa"
    //% r.shadow="tileset_tile_picker"
    //% q.shadow="spritekind"
    //% o.shadow="tiles_tilemap_editor"
    //% g.shadow="tileset_tile_picker"
    //% im.shadow="screen_image_picker"
    //% kw.shadow="spritekind"
    //% kw.defl= SpriteKind.Enemy
    //% spawn.shadow="tileset_tile_picker"
    //% c.shadow="animation_editor"
    //% inter.defl=100
    //% fa.shadow="toggleOnOff"
    export function setExits(q: number, r: Image, o: tiles.TileMapData,  g: Image, im?: Image, kw?: number, spawn?: Image, c?: Image[], inter?: number, fa?: boolean): void {
        scene.onOverlapTile(q, r, function (sprite, location) {
            tiles.setCurrentTilemap(o)
            tiles.placeOnRandomTile(sprite, g)
            let mySprite2 = sprites.create(im, kw)
            mySprite2.ay = 500
            tiles.placeOnRandomTile(mySprite2, spawn)
            animation.runImageAnimation(mySprite2, c, inter, fa)
        })
    }
    /**
 * Places a specific tile at a given column and row coordinate and sets a wall.
 */
    //% group="Sprites"
    //% block="start auto-blinking sprite $sprit with $frames animation || every $interval ms at framerate $framerate"
    //% sprit.shadow="variables_get"
    //% sprit.defl="mySprite"
    //% frames.shadow="animation_editor"
    //% interval.defl=5000
    //% framerate.defl=200
    export function startAutoBlink(sprit: Sprite, frames: Image[], interval?: number, framerate?: number): void {
        const actualInterval = interval !== undefined ? interval : 5000;
        const actualFramerate = framerate !== undefined ? framerate : 200;

        // Establish the repeating global timer loop
        game.onUpdateInterval(actualInterval, function () {
            // Safety check: Don't try to animate a sprite that was destroyed
            if (sprit && !(sprit.flags & sprites.Flag.Destroyed)) {
                // Play once (false) every time the 5-second timer fires
                animation.runImageAnimation(sprit, frames, actualFramerate, false);
            }
        });
    }
    /**
    * Makes sprites die.
    */
    //% group=Tilemap color=#249CA3
    //% block="generate random tile map with base tiles $tileImage and deathtrap $tileImage2 and with spritekind $spritek and sprite $sss on location $l"
    //% tileImage.shadow="tileset_tile_picker"
    //% spritek.shadow="spritekind"
    //% tileImage2.shadow="tileset_tile_picker"
    //% sss.shadow="variables_get"
    //% sss.defl="mySprite"
    //% l.shadow="tileset_tile_picker"
    export function random(tileImage: Image, tileImage2: Image, spritek: number, sss: Sprite, l:Image): void {
        let Lazer_beside_block1 = randint(6, 9)
        let Lazer_beside_block2 = randint(6, 9)
        let Lazer_beside_block3 = randint(6, 9)
        let Lazer_beside_block4 = randint(6, 9)
        let Lazer_beside_block5 = randint(6, 9)
        let Lazer_beside_block6 = randint(6, 9)
        let LazerPosY1 = Lazer_beside_block1 - 1
        let LazerPosY2 = Lazer_beside_block2 - 1
        let LazerPosY3 = Lazer_beside_block3 - 1
        let LazerPosY4 = Lazer_beside_block4 - 1
        let LazerPosY5 = Lazer_beside_block5 - 1
        let LazerPosY6 = Lazer_beside_block6 - 1
        tiles.setTileAt(tiles.getTileLocation(3, randint(6, 9)), tileImage)
        tiles.setTileAt(tiles.getTileLocation(6, randint(6, 9)), tileImage)
        tiles.setTileAt(tiles.getTileLocation(10, Lazer_beside_block1), tileImage)
        tiles.setTileAt(tiles.getTileLocation(14, randint(6, 9)), tileImage)
        tiles.setTileAt(tiles.getTileLocation(17, randint(6, 9)), tileImage)
        tiles.setTileAt(tiles.getTileLocation(21, randint(6, 9)), tileImage)
        tiles.setTileAt(tiles.getTileLocation(25, Lazer_beside_block2), tileImage)
        tiles.setTileAt(tiles.getTileLocation(29, randint(6, 9)), tileImage)
        tiles.setTileAt(tiles.getTileLocation(32, randint(6, 9)), tileImage)
        tiles.setTileAt(tiles.getTileLocation(37, randint(6, 9)), tileImage)
        tiles.setTileAt(tiles.getTileLocation(43, Lazer_beside_block3), tileImage)
        tiles.setTileAt(tiles.getTileLocation(48, randint(6, 9)), tileImage)
        tiles.setTileAt(tiles.getTileLocation(53, randint(6, 9)), tileImage)
        tiles.setTileAt(tiles.getTileLocation(57, Lazer_beside_block4), tileImage)
        tiles.setTileAt(tiles.getTileLocation(61, randint(6, 9)), tileImage)
        tiles.setTileAt(tiles.getTileLocation(73, randint(6, 9)), tileImage)
        tiles.setTileAt(tiles.getTileLocation(79, Lazer_beside_block5), tileImage)
        tiles.setTileAt(tiles.getTileLocation(84, randint(6, 9)), tileImage)
        tiles.setTileAt(tiles.getTileLocation(89, randint(6, 9)), tileImage)
        tiles.setTileAt(tiles.getTileLocation(93, Lazer_beside_block6), tileImage)
        tiles.setTileAt(tiles.getTileLocation(98, randint(6, 9)), tileImage)
        tiles.setTileAt(tiles.getTileLocation(11, LazerPosY1), tileImage2)
        tiles.setTileAt(tiles.getTileLocation(26, LazerPosY2), tileImage2)
        tiles.setTileAt(tiles.getTileLocation(44, LazerPosY3), tileImage2)
        tiles.setTileAt(tiles.getTileLocation(58, LazerPosY4), tileImage2)
        tiles.setTileAt(tiles.getTileLocation(80, LazerPosY5), tileImage2)
        tiles.setTileAt(tiles.getTileLocation(94, LazerPosY6), tileImage2)
            for (let Value of tiles.getTilesByType(tileImage)) {
                tiles.setWallAt(Value, true)
            }
        
        tiles.placeOnRandomTile(sss, l)
        scene.onOverlapTile(spritek, tileImage2, function (sprite, location) {
            game.gameOver(false)
        })
    }
    /**
    * Gives a console error.
    * @param cons desc, eg: ""
    */
    //% group=Utility color=#000000
    //% block="console error $cons"
    export function con(cons: string): void {
        console.error(cons);
    }
    /**
    * Turns on the gamestats.
    * @param cons desc, eg: "Oh No"
    */
    //% group=Utility color=#000000
    //% block="Game stats $gs"
    //% gs.shadow="toggleOnOff"
    export function gstat(gs: boolean): void {
        game.stats = gs
    }
    /**
    * Turns on the gamestats.
    * @param cons desc, eg: "Oh No"
    */
    //% group=Utility color=#000000
    //% block="is game stats on $tuv"
    //% tuv.shadow="toggleOnOff"
    export function gsd(tuv:boolean): boolean {
        if (tuv) {
          return true  
        } else {
           return false 
        }
    }
    /**
    * Turns on the gamestats.
    * @param cons desc, eg: "Oh No"
    */
    //% group=scene 
    //% block="render pixel with priority $prior color $one $two $three"
    //% tuv.shadow="toggleOnOff"
    export function ren(prior:number, one:number, two:number, three:number): void {
        // Draws a custom red pixel at coordinates (0,0) at z-index 0
        scene.createRenderable(prior, function (target: Image, camera: scene.Camera) {
            target.setPixel(one, two, three); // 5 is the color red in the palette
        });

    }
    /**
    * Turns on the gamestats.
    * @param cons desc, eg: "Oh No"
    */
    //% group=scene 
    //% block="physics priority"
    //% tuv.shadow="toggleOnOff"
    export function phy(): number {
        return scene.PHYSICS_PRIORITY
    }
    /**
    * Resets the whole controller.
    * @param cons desc, eg: "Oh No"
    */
    //% group=scene 
    //% block="reset controller"
    //% tuv.shadow="toggleOnOff"
    export function reset(): void {
        // This is the correct way to reset your game programmatically
        game.reset()

    }
    /**
    * Adds the screen brightness.
    * @param cons desc, eg: "Oh No"
    */
    //% group=screen 
    //% block="set screen brightness $bright"
    //% tuv.shadow="toggleOnOff"
    export function brightness(bright: number): void {
        screen.setBrightness(bright)
    }
    /**
    * returns the screen brightness.
    * @param cons desc, eg: "Oh No"
    */
    //% group=screen 
    //% block="screen brightness"
    //% tuv.shadow="toggleOnOff"
    export function brig(): number {
        return screen.brightness()
    }
    /**
    * makes the screen draw a image.
    * @param cons desc, eg: "Oh No"
    */
    //% group=screen 
    //% block="screen draw image $imc in x $exx and y $yii"
    //% tuv.shadow="toggleOnOff"
    //% imc.shadow="screen_image_picker"
    export function idk(imc:Image, exx:number, yii:number): void {
       screen.drawImage(imc,exx,yii)
    }
    //% draggableParameters="reporter"
    //% block="Add system menu option $name icon $imae enabled $ena function:"
    //% handlerStatement=1
    //% imae.shadow=screen_image_picker
    //% ena.defl=true
    export function addmenuoption(name: string, imae: Image, ena: boolean , handler: () => void): void {
        if (ena) {
            scene.systemMenu.addEntry(() => name, handler, imae);
        }
    }
    //% block="null"
    export function idc(): null {
        return null
    }

}

