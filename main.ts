input.onButtonPressed(Button.A, function () {
    player.move(-1)
})
input.onButtonPressed(Button.AB, function () {
    if (game.isRunning()) {
        mobs.unshift(game.createSprite(randint(0, 4), 0))
        mobs[0].turn(Direction.Right, 90)
    }
})
input.onButtonPressed(Button.B, function () {
    player.move(1)
})
let mobs: game.LedSprite[] = []
let player: game.LedSprite = null
let zycie = 2
let wynik = 0
player = game.createSprite(2, 4)
mobs = []
basic.forever(function () {
    for (let mob of mobs) {
        mob.move(1)
        if (player.isTouching(mob)) {
            mob.delete()
            mobs.removeAt(mobs.indexOf(mob))
            zycie += -1
            music._playDefaultBackground(music.builtInPlayableMelody(Melodies.JumpDown), music.PlaybackMode.InBackground)
        } else {
            if (mob.get(LedSpriteProperty.Y) == 4) {
                mob.delete()
                mobs.removeAt(mobs.indexOf(mob))
                wynik += 1
            }
        }
    }
    if (zycie == 0) {
        game.setScore(wynik)
        game.gameOver()
    }
    basic.pause(350)
})
loops.everyInterval(450, function () {
    if (game.isRunning()) {
        control.raiseEvent(
        EventBusSource.MICROBIT_ID_BUTTON_AB,
        EventBusValue.MICROBIT_BUTTON_EVT_CLICK
        )
    }
})
