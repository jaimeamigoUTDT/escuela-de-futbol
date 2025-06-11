
export function formatCanchas (canchasList){
    return canchasList.map(cancha => ({
        id: cancha.cancha_id,
        size: cancha.size,
        shoe_type: cancha.shoe_type,
        buffet_available: cancha.buffet_available,
        parking_available: cancha.parking_available,
        name: cancha.address,
    }))
}
    

