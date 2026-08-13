# Random Game Blocks Extension

A custom MakeCode Arcade extension providing additional blocks to place solid tile maps dynamically, execute conditional jumps based on physics, and easily build tile layers underneath sprites.

## Block API Reference

### 1. Set Custom Tile
* **Block UI:** `tile col \$col row \$row \$tileImage`
* **Group:** Tiles
* **Description:** Positions a given tile image at specified column and row coordinate grids and automatically designates it as a solid wall collision obstacle.
* **Signature:** `randomGameBlocks.setCustomTile(col: number, row: number, tileImage: Image)`

### 2. Smart Jump
* **Block UI:** `make \$sprite jump || velocity \$v and camera shake \$d by \$z pixels for \$f miniseconds`
* **Group:** Sprites
* **Description:** Triggers a upward jump only if the designated sprite is touching an environment floor. Offers optional configurations for custom vertical velocity vectors and responsive camera-shake properties.
* **Signature:** `randomGameBlocks.jump(sprite: Sprite, v?: number, d?: boolean, z?: number, f?: number)`

### 3. Sprite Build Tile
* **Block UI:** `sprite \$s build with \$m`
* **Group:** Tiles
* **Description:** Signals a sprite to place a selected tile image asset directly onto the grid block beneath its position, setting wall parameters to active.
* **Signature:** `randomGameBlocks.setCustomTileSprite(s: Sprite, m: Image)`

### 4. Tile Overlap Trap (Incomplete)
* **Block UI:** `spritekind \$S dies by \$a`
* **Group:** Sprites
* **Description:** Listens for collision interactions where specific Sprite kinds overlap with selected trap tile patterns.
* **Signature:** `randomGameBlocks.setTraps(S: number, a: Image)`

## Quick Sandbox Example

```typescript
let heroicPlayer = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . 5 5 5 . . . . . . .
    . . . . . 5 5 5 5 5 . . . . . .
    . . . . . 5 d 5 d 5 . . . . . .
    . . . . . 5 5 5 5 5 . . . . . .
    . . . . . . 2 2 2 . . . . . . .
    . . . . . 2 2 2 2 2 . . . . . .
    . . . . . 2 2 2 2 2 . . . . . .
    . . . . . 2 . . . 2 . . . . . .
    . . . . . 2 . . . 2 . . . . . .
`, SpriteKind.Player)

// Jump whenever button A is hit
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    randomGameBlocks.jump(heroicPlayer, -220, true, 3, 200)
})
```
