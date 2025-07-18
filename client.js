// Main
import * as alt from 'alt-client';
import * as native from 'natives';

function showNotification(msg) {
    native.beginTextCommandThefeedPost('STRING');
    native.addTextComponentSubstringPlayerName(msg);
    native.endTextCommandThefeedPostTicker(false, true);
}

let lastTrunkTime = 0;
const TRUNK_COOLDOWN = 1500;

alt.on('keyup', (key) => {
    if (key !== 71) return; // G

    const now = Date.now();
    if (now - lastTrunkTime < TRUNK_COOLDOWN) return;
    lastTrunkTime = now;

    const player = alt.Player.local;
    const vehIn = native.getVehiclePedIsIn(player.scriptID, false);
    if (vehIn === 0) return;

    const doorCount = native.getNumberOfVehicleDoors(vehIn);
    if (doorCount < 6) return;

    const isOpen = native.getVehicleDoorAngleRatio(vehIn, 5) > 0.1;
    if (isOpen) {
        native.setVehicleDoorShut(vehIn, 5, false);
        showNotification('~r~Trunk is closed');
    } else {
        native.setVehicleDoorOpen(vehIn, 5, false, false);
        showNotification('~b~Trunk is open');
    }
});

// MADE BY TXXICU
